import { Client, IntentsBitField } from 'discord.js';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const client = new Client({ intents: [] });

const eventFolders = fs.readdirSync('./src/events').filter((file) => file.endsWith(".js"));
eventFolders.forEach(async file => {
    const event = await import(`./events/${file}`);
    if (event.default.once) {
        client.once(event.default.event, (...args) => event.default.execute(...args, client));
    } else if (!event.default.once) {
        client.on(event.default.event, (...args) => event.default.execute(...args, client));
    }
})

client.login(process.env.TOKEN);