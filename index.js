const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client();
const config = require("./config.json")

bot.commands = new Discord.Collection()
let prefix = config.prefix;

fs.readdir("./commands/", (err, files) => {

    if(err) console.log(err);
  
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0 ){
      console.log("Couldn't find commands!");
      return;
    }
  
    jsfile.forEach((f, i) => {
      let props = require(`./commands/${f}`);
      console.log(`${i + 1}: ${f} loaded successfully!`);
      bot.commands.set(props.help.name, props);
    });
  
  });

bot.on("ready", async () => {
    console.log(" ")
    console.log(`${bot.user.username} has been loaded.`)
    console.log("This bot was created by ItsSzaby#4802.")
    console.log("Support discord: https://discord.gg/BBfnHV5")
    console.log(" ")
    bot.user.setActivity("www.gajarweb.com")
});

bot.on("message", async message => {

    if (!message.content.startsWith(prefix)) return;
  
    if(message.author.bot) return;
    if(message.channel == "dm") return message.channel.send("This feature is currently unavailable. We will release the PM for support feature in a future update!");
  
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
  
    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot,message,args);
  });
  
  bot.login(config.token);