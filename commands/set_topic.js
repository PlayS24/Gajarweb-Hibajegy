const Discord = require("discord.js");
const config = require("../config.json");
const cmdname = require("../cmdname.json");

module.exports.run = async (bot, message, args) => {

    message.delete();
    
    let SupportRole = message.guild.roles.find(sr => sr.name === config.ticketRoleName)
    if(!SupportRole) return message.channel.send(config.ticketRoleName + " rang nem található! Légy benne biztos, hogy létezik!");

    if (!message.channel.name.startsWith("ticket")) return message.channel.send(":x: Ezt a parancsot csak a hibajegy szobájában használhatod!");
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Kell, hogy legyen \"MANAGE_MESSAGES\" jogosultságod a parancs használatához!");

    if(!args[0]) return message.channel.send(`:x: **Használat:** gt!${cmdname.setTopic} (tárgy)`)

    let topic = args.join("");

    message.channel.setTopic(topic);

    let complete = new Discord.RichEmbed()
    .setColor(config.color)
    .setTitle("Befejezve!")
    .setDescription(`A szoba új tárgya: ${topic}`)
    message.channel.send(complete);

}
module.exports.help = {
    name: cmdname.setTopic
}