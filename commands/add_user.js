const Discord = require("discord.js");
const config = require("../config.json");
const cmdname = require("../cmdname.json");

module.exports.run = async (bot, message, args) => {

    message.delete();

    let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    let username = message.author.username;
    if(!user) return message.channel.send(`:x: **Használat:** -${cmdname.addToTicket} @felhasználó#0000`)

    let added = new Discord.RichEmbed()
    .setColor(config.colour)
    .setTitle("Felhasználó hozzáadva!")
    .setDescription(`${user} felhasználót hozzáadta a hibajegyhez ${username}!`);

    if (!message.channel.name.startsWith("ticket")) return message.channel.send(":x: Ezt a parancsot csak a hibajegy szobában lehet használni!");

    message.channel.overwritePermissions(user, {
        READ_MESSAGES: true,
        SEND_MESSAGES: true
    })

    message.channel.send(added);

}
module.exports.help = {
    name: cmdname.addToTicket
}