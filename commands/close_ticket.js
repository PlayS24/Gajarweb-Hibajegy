const Discord = require("discord.js");
const config = require("../config.json");
const cmdname = require("../cmdname.json");

module.exports.run = async (bot, message, args) => {

    message.delete();

    if(!message.channel.name.startsWith("ticket")) return message.channel.send(":x: Nem használhatod a lezárás parancsot a hibajegy szobáján kivűl!");
    
    let confirm = new Discord.RichEmbed()
    .setColor(config.colour)
    .setTitle(`Biztos vagy benne?`)
    .setDescription("Ezt a műveletet nem lehet visszavonni! Ha folytatni akarod a hibajegy lezárását, kérlek, reagálj a zöld pipával. Ha nem akarod, hogy lezárja reagálj a piros kereszttel. 20 másodperc múlva az üzenet lejár, tehát légy gyors!")
    .setTimestamp();

    message.channel.send(confirm)
    .then ((m => {
        m.react('✅').then(() => m.react('❌'));

        const filter = (reaction, user) => {
            return ['✅', '❌'].includes(reaction.emoji.name) && user.id === message.author.id;
        };

        m.awaitReactions(filter, { max: 1, time: 20000, errors: ['time']})
        .then(collected => {
            const reaction = collected.first();

            if (reaction.emoji.name === '✅') {
                m.channel.send("Hibajegy lezárása megerősítve! A hibajegy bezárúl 10 másodperc múlva!")
                var interval = setInterval(function() {
                    message.channel.delete()
                    clearInterval(interval);
                }, 10 * 1000);
            } else {
                m.delete();
                m.channel.send(`Hibajegy lezárása visszavonva! Ha hibából nem zártad be akkor írd be újra \`gt!${cmdname.closeticket}\`!`);
            }
        })
    }))

}
module.exports.help = {
    name: cmdname.closeticket
}