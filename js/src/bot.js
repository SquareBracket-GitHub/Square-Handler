const { Client, IntentsBitField } = require("discord.js");
const fs = require("fs");
require('dotenv').config();

const client = new Client({ intents: [] });

const eventFolders = fs.readdirSync('./src/events').filter((file) => file.endsWith(".js"));
eventFolders.forEach(async file => {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.event, (...args) => event.execute(...args, client));
    } else if (!event.once) {
        client.on(event.event, (...args) => event.execute(...args, client));
    }
})

client.login(process.env.TOKEN);