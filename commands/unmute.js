const Discord = require("discord.js");
const config = require("../config.json");
const cmdname = require("../cmdname.json");

module.exports.run = async (bot, message, args) => {

    message.delete();
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You do not have BAN_MEMBERS!");

    let mutedUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!mutedUser) return message.channel.send(`:x: **Használat**: -${cmdname.mute} (@felhasználó) (indok)`)
    let mutedRole = message.guild.roles.find(mr => mr.name === config.mutedRoleName)
    if (!mutedRole) return message.channel.send("A Nemitva rang nem található! Légy benne biztos, hogy létezik!")

    if (!mutedUser.roles.has(mutedRole.id)) return message.channel.send(":x: Ez a felhasznála nincs lenémítva!");

    mutedUser.removeRole(mutedRole.id);
    message.channel.send(mutedUser + "-ról/ről fel lett oldva a némítás!");


}
module.exports.help = {
    name: cmdname.unmute
}