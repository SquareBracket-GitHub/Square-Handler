const { REST, Routes } = require('discord.js');
const fs = require("fs");
require('dotenv').config();

let commands = [];

const commandsFiles = fs
  .readdirSync('./src/commands')
  .filter((file) => file.endsWith(".js"));

commandsFiles.forEach(async file => {
  const command = require(`./commands/${file}`);

  commands.push(command.data);
});

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    if (process.env.COMMAND_MODE === 'GLOBAL') {
      await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });
    } else if (process.env.COMMAND_MODE === 'GUILD') {
      await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: {} })
      await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: commands });
    }

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();