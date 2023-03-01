const { GatewayIntentBits } = require("discord.js");

const config = {
    TOKEN: 'token', /* The bot token used by Discord.js */
    CLIENT_ID: 'client id', /* The client ID of the bot */
    INTENTS: [], /* Intents used by the bot */
    COMMAND_MODE: 'GUILD', /* Mode in which the bot's commands will be executed (GUILD or GLOBAL) */
    TEST_GUILD: 'test guild', /* ID of the server used for testing */
}

module.exports = config;