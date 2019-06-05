const moment = require('moment');
module.exports = async(client, message) => {
    //Dashboard Owner Sync
    client.appInfo = await client.fetchApplication();
    setInterval( async () => {
      client.appInfo = await client.fetchApplication();
    }, 60000);
    require("../modules/dashboard")(client); 

    //Console Log for startup.
    const timestamp = `[${moment().format("YYYY-MM-DD HH:mm:ss")}]:`;
    console.log(`${timestamp} ${client.user.tag}, ${client.guilds.reduce((p, c) => p + c.memberCount, 0)} users, in ${client.channels.size} channels of ${client.guilds.size} servers.`);
};