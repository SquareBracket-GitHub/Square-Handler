import { Events } from "discord.js";

export default {
    event: Events.ClientReady,
    once: true,
    async execute() {
        console.log('ready');
    }
}