import fs from 'fs';
import { Events } from 'discord.js';

export default {
    event: Events.InteractionCreate,
    once: false,
    async execute(interaction, client) {
        if (interaction.isCommand()) {
            const commandFiles = fs
                .readdirSync('./src/commands')
                .filter((file) => file.endsWith(".js"));

            commandFiles.forEach(async file => {
                const command = await import(`../commands/${file}`);

                if (interaction.commandName === command.default.data.name) {
                    command.default.execute(interaction);
                }
            })
        } else if (interaction.isModalSubmit) {
            const buttonFiles = fs
                .readdirSync('./src/buttons')
                .filter((file) => file.endsWith(".js"));

            buttonFiles.forEach(async file => {
                const button = await import(`../buttons/${file}`);

                if (interaction.customId === button.default.id) {
                    button.default.execute(interaction, client);
                } else if (button.default.hasExtraData && interaction.customId.startsWith(button.default.id)) {
                    button.default.execute(interaction, client);
                }
            })
        }
    }
}