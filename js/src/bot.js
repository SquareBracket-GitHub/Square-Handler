const { Client } = require("discord.js");
const { TOKEN, INTENTS } = require("../configs/config.js");
const fs = require("fs");

const client = new Client({ intents: INTENTS });

const eventFolders = fs.readdirSync('./src/events').filter((file) => file.endsWith(".js"));
eventFolders.forEach(async file => {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.event, (...args) => event.execute(...args, client));
    } else if (!event.once) {
        client.on(event.event, (...args) => event.execute(...args, client));
    }
})

client.login(TOKEN);