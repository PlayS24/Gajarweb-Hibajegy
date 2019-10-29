const Discord = require("discord.js");
const config = require("../config.json");
const cmdname = require("../cmdname.json");
const fs = require("fs");
const cases = require("../cases.json");

module.exports.run = async (bot, message, args) => {

    message.delete();
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You do not have BAN_MEMBERS!");

    let caseID = cases[0].caseID;
    let nought = 4-(caseID.toString().length);
    let nought1 = "0".repeat(nought);

    let mutedUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!mutedUser) return message.channel.send(`:x: **Használat**: gt!${cmdname.mute} (@felhasználó) (indok)`)
    let mutedReason = args.join(" ").slice(22);
    if (!mutedReason) return message.channel.send(`:x: **Használat**: gt!${cmdname.mute} (@felhasználó) (indok)`)
    let punishmentchannel = message.guild.channels.find(pc => pc.name === config.punishLogName)
    if (!punishmentchannel) return message.channel.send("Channel could not be found!")
    let mutedRole = message.guild.roles.find(mr => mr.name === config.mutedRoleName)
    if (!mutedRole) return message.channel.send("Muted role could not be found!")
    
    let avatar2 = message.author.avatarURL;
    let muted = new Discord.RichEmbed()
    .setColor(config.colour)
    .setTitle(`Felhasználó némítva!`)
    .addField("Némított", mutedUser, true)
    .addField("Case ID", `${nought1}${caseID}`, true)
    .addField("Indok", mutedReason)
    .setFooter(`Némította: ${message.author.tag}`, avatar2)
    mutedUser.addRole(mutedRole.id)
    punishmentchannel.send(muted);

    cases[0].caseID++;
    fs.writeFile("./cases.json", JSON.stringify(cases), (err) => {
        if(err) console.log(err)
    })

}
module.exports.help = {
    name: cmdname.mute
}