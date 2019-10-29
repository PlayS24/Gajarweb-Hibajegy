const Discord = require("discord.js");
const fs = require("fs");
const tickets = require("../tickets.json");
const config = require("../config.json");
const cmdname = require("../cmdname.json");

module.exports.run = async (bot, message, args) => {

    message.delete();

    let ticketID = tickets[0].ticketID;
    let nought = 4-(ticketID.toString().length);
    let nought1 = "0".repeat(nought);

    let reason = args.join();
    if(!reason) return message.channel.send(":x: Kérlek adj meg egy tárgyat a hibajegynek!").then(msg => msg.delete(10000))

    let SupportRole = message.guild.roles.find(sr => sr.name === config.ticketRoleName)
    if(!SupportRole) return message.channel.send(config.ticketRoleName + " rang nem található! Légy benne biztos, hogy létezik!");
    let everyone = message.guild.roles.find(e => e.name === "@everyone");

    const newTicket = new Discord.RichEmbed()
    .setColor(config.colour)
    .setTitle(`Új hibajegy!`)
    .addField(`Hibajegy ID`, `${nought1}${ticketID}`, true)
    .addField(`Létrehozta`, message.author, true)
    .addField(`Tárgy`, reason)
    .setTimestamp();

    message.guild.createChannel(`hibajegy- ${nought1}${ticketID}`, "text").then(c => {
        c.setParent(config.ticketCategoryID); // Sets ticket category. Editable in config.json
        
        c.overwritePermissions(SupportRole, { // Allows SupportRole to view the ticket.
            READ_MESSAGES: true,
            SEND_MESSAGES: true
        })
        c.overwritePermissions(everyone, { // Disallows default users from seeing the ticket.
            READ_MESSAGES: false,
            SEND_MESSAGES: false
        })
        c.overwritePermissions(message.author, { // Allows the ticket creator to view the ticket.
            READ_MESSAGES: true,
            SEND_MESSAGES: true
        })

        const ticketCreated = new Discord.RichEmbed()
        .setColor(config.colour)
        .setTitle(`A hibajegy sikeresen létrehozva!`)
        .setDescription(`A hibajegy sikeresen létrejött! Nézd meg hibajegyedet a következő szobában: ${c}`)
        .setTimestamp();
    
        message.channel.send(ticketCreated).then(msg => msg.delete(10000));
    
        const newTicket = new Discord.RichEmbed()
        .setColor(config.colour)
        .setTitle(`Új hibajegy!`)
        .addField(`Hibajegy ID`, `${nought1}${ticketID}`, true)
        .addField(`Létrehozta`, message.author, true)
        .addField(`Tárgy`, reason)
        .setTimestamp();
    
        c.send(newTicket);
    })

    tickets[0].ticketID++;
    fs.writeFile("./tickets.json", JSON.stringify(tickets), (err) => {
        if(err) console.log(err)
    })

}
module.exports.help = {
    name: cmdname.newticket
}