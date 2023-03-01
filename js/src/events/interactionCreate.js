const fs = require('fs');
const { Events } = require("discord.js");

module.exports = {
    event: Events.InteractionCreate,
    once: false,
    async execute(interaction, client) {
        if (interaction.isCommand()) {
            const commandFiles = fs
                .readdirSync('./src/commands')
                .filter((file) => file.endsWith(".js"));

            commandFiles.forEach(async file => {
                const command = require(`../commands/${file}`);

                if (interaction.commandName === command.data.name) {
                    command.execute(interaction);
                }
            })
        } else if (interaction.isModalSubmit) {
            const buttonFiles = fs
                .readdirSync('./src/buttons')
                .filter((file) => file.endsWith(".js"));

            buttonFiles.forEach(async file => {
                const button = require(`../buttons/${file}`);

                if (interaction.customId === button.id) {
                    button.execute(interaction, client);
                } else if (button.hasExtraData && interaction.customId.startsWith(button.id)) {
                    button.execute(interaction, client);
                }
            })
        }
    }
}