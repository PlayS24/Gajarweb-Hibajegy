const Discord = require("discord.js");
const config = require("../config.json");
const cmdname = require("../cmdname.json");
const fs = require("fs");
const cases = require("../cases.json");

module.exports.run = async (bot, message, args) => {

    message.delete();
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You do not have KICK_MEMBERS!");

    let caseID = cases[0].caseID;
    let nought = 4-(caseID.toString().length);
    let nought1 = "0".repeat(nought);

    let kickedUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!kickedUser) return message.channel.send(`:x: **Usage**: -${cmdname.mute} (@user) (reason)`)
    let kickedReason = args.join(" ").slice(22);
    if (!kickedReason) return message.channel.send(`:x: **Usage**: -${cmdname.mute} (@user) (reason)`)
    let punishmentchannel = message.guild.channels.find(pc => pc.name === config.punishLogName)
    if (!punishmentchannel) return message.channel.send("Channel could not be found!")
    
    let avatar2 = message.author.avatarURL;
    let kicked = new Discord.RichEmbed()
    .setColor(config.colour)
    .setTitle(`User has been kicked!`)
    .addField("Kicked user", kickedUser, true)
    .addField("Case ID", `${nought1}${caseID}`, true)
    .addField("Reason", kickedReason)
    .setFooter(`Performed by: ${message.author.tag}`, avatar2)
    message.guild.member(kickedUser).kick(kickedReason);
    punishmentchannel.send(kicked);

    cases[0].caseID++;
    fs.writeFile("./cases.json", JSON.stringify(cases), (err) => {
        if(err) console.log(err)
    })

}
module.exports.help = {
    name: cmdname.kick
}