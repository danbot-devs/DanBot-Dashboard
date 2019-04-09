const Discord = require("discord.js");
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const client = new Discord.Client();
client.config = require("./config.js");
client.logger = require("./modules/Logger");

process.on('uncaughtException', function (err) {
  client.channels.get("563473333069414400").send(`Got disconnected from discord, Reconnecting...`);
})

const init = async () => {
  const evtFiles = await readdir("./events/");
  client.logger.log(`Loading a total of ${evtFiles.length} events.`);
  evtFiles.forEach(file => {
    const eventName = file.split(".")[0];
    client.logger.log(`Loading Event: ${eventName}`);
    const event = require(`./events/${file}`);
    client.on(eventName, event.bind(null, client));
  });


  client.login(client.config.token);
};
init();
 