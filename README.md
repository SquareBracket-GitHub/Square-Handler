# DYMIC
the discord bot

# config file
Yep, config file is nothing here. **But** it is very important that config file for dymic and this bot needs it.
```js
const { GatewayIntentBits } = require("discord.js");

const config = {
    TOKEN: '', //type dymic's token here
    INTENTS: [], //type dymic's intents here
    COMMAND_MODE: '', //GUILD and GLOBAL
    TEST_GUILD: '' //type test guild's id here
}

module.exports = config;
```

# npm
### discord.js
```cmd
npm install discord.js
```
### nodemon
```cmd
npm install nodemon
```
### discord-modals
```cmd
npm install discord-modals
```

# Made by Team **PixelPunk**