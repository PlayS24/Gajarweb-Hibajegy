const Discord = require("discord.js");
const config = require("../config.json");
const cmdname = require("../cmdname.json");

module.exports.run = async (bot, message, args) => {

    message.delete();

    let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    let username = message.author.username;
    if(!user) return message.channel.send(`:x: **Használat:** -${cmdname.removeFromTicket} @felhasználó#0000`)

    let removed = new Discord.RichEmbed()
    .setColor(config.colour)
    .setTitle("Felhasználó eltávolítva!")
    .setDescription(`${user} eltávolította a hibajegyből ${username}!`);

    if (!message.channel.name.startsWith("ticket")) return message.channel.send(":x: Ezt a parancsot csak a hibajegy szobában lehet használni!");

    message.channel.overwritePermissions(user, {
        READ_MESSAGES: false,
        SEND_MESSAGES: false
    })

    message.channel.send(removed);

}
module.exports.help = {
    name: cmdname.removeFromTicket
}