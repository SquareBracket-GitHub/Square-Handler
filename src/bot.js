import { Client } from 'discord.js';
import config from '../configs/config.js';
import fs from 'fs';

const { TOKEN, INTENTS } = config;

const client = new Client({ intents: INTENTS });

const eventFolders = fs.readdirSync('./src/events').filter((file) => file.endsWith(".js"));
eventFolders.forEach(async file => {
    const event = await import(`./events/${file}`);
    if (event.default.once) {
        client.once(event.default.event, (...args) => event.default.execute(...args, client));
    } else if (!event.default.once) {
        client.on(event.default.event, (...args) => event.default.execute(...args, client));
    }
})

client.login(TOKEN);