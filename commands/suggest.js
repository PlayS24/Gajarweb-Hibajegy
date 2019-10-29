const Discord = require("discord.js");
const config = require("../config.json");
const cmdname = require("../cmdname.json");

module.exports.run = async (bot, message, args) => {

    message.delete();

    if(!args[0]) return message.channel.send(`:x: **Használat:** -${cmdname.suggest} (javaslat)`)

    let avatar = message.author.avatarURL;
    let suggestion = new Discord.RichEmbed()
    .setColor(config.colour)
    .setTitle(`Új javaslat!`)
    .setDescription(args.join(" "))
    .setTimestamp()
    .setFooter(`Javasolta: ${message.author.tag}`, avatar);
  
    let sChannel = message.guild.channels.find(sc => sc.name === config.suggestionChannel)
    if(!sChannel) return message.channel.send("Nem található a hibajegy szobálya!");
  
    sChannel.send(suggestion).then(async (messages) => {
      await messages.react("✅")
      await messages.react("❌")
    })

}
module.exports.help = {
    name: cmdname.suggest
}