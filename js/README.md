# Get Started (JS)
## Step 1: Downloading npms.
After downloading the engine, please install the required npm packages used by the engine. The following are the npm packages used by the engine:
+ Discord.js: `npm i discord.js`
+ Nodemon: `npm i nodemon`

However, since both of these npm packages are included in the **package.json** file, you can download both of them at once by running `npm i`.

## Step 2: Setting Environment Variables
Now we need some minimal information for the bot to function properly. All the information about the bot is in the `config.js` file located in the `configs` folder.
### Config.js:
```js
const { GatewayIntentBits } = require("discord.js");

const config = {
    TOKEN: 'token', /* The bot token used by Discord.js */
    CLIENT_ID: 'client id', /* The client ID of the bot */
    INTENTS: [], /* Intents used by the bot */
    COMMAND_MODE: 'GUILD', /* Mode in which the bot's commands will be executed (GUILD or GLOBAL) */
    TEST_GUILD: 'test guild', /* ID of the server used for testing */
}

module.exports = config;
```
+ **TOKEN:** You will need your **Discord bot token** here. As this is a very important piece of information, **do not use it in any other code**.
+ **CLIENT_ID:** You will need your client ID here, which is the **ID of your bot**.
+ **INTENTS:** You will put multiple INTENTs in this array, using GatewayIntentBits.
+ **COMMAND_MODE:** You can set the type of commands your bot will use here. COMMAND_MODE is divided into `GUILD` and `GLOBAL` modes. If you set the mode to `GUILD`, the slash commands can only be used in the designated guild. If you set it to `GLOBAL`, the slash commands will be applied to all servers, but it may take some time.
+ **TEST_GUILD:** If you set COMMAND_MODE to `GUILD`, please write a **guild ID** here. The bot's commands will be applied to that guild.

#### As this file contains very important information about your bot, do not upload it to a public space.

## STEP 3: To run the Discord bot
+ To run the Discord bot, you can use `npm run test`. However, if you are using nodemon, run it with `npm run dev`.
+ To delete or add commands, you can update the commands using `npm run deployCommands`. If this is your first time running the bot, please use this command first.

# Additional Help

## Creating Command Files
To add a new command, you can create a new file in the `commands` folder inside the `src` folder.

### The command file should have a structure similar to the following example:
```js
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    /* Create a new SlashCommandBuilder object. */
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replise wiht Pong!'),
     /* Execute the slash command when it is called by a user. */
    async execute(interaction) {
        await interaction.reply('**Pong!**');
    }
}
```
In the `data` section, you can create the command using `SlashCommandBuilder`. Once you've created the entire `data`, you can update it using `npm run deployCommands`.

The `execute` function runs when the command is used by a user.

## Creating Event Files
To add a new event, you can create a new file in the `events` folder inside the `src` folder.

### The event file should have a structure similar to the following example:
```js
const { Events } = require("discord.js");

module.exports = {
    event: Events.ClientReady, /* This object exports an event listener for the Discord.js 'ClientReady' event. */
    once: true, /* The 'once' property is set to true, indicating that the event listener should only be executed once. */
    async execute() {
        console.log('ready');
    }
}
```
In the `event` field, you should specify the type of event. We recommend using `Events` as shown in the example above.

The `once` field specifies whether the event should only be executed once. For events that are only executed once, set this to `true`. For events that can be executed multiple times, set this to `false`.

The `execute` function will be executed when the specified event is detected.

#### Do not modify the `InteractionCreate` file that is included in the engine by default. This could cause commands and buttons to not work properly.

## Creating Button Files
To add a new button, you can create a new file in the `buttons` folder inside the `src` folder.

### The button file should have a structure to the following example:
```js
module.exports = {
    id: 'ping', /* Unique ID for this button */
    hasExtraData: false,
    /* Execute the button's action when it is clicked by a user */
    async execute(interaction, client) {
        await interaction.reply('**Pong!**');
    }
}
```
To the `id` field, you should put the custom ID of the button.

`hasExtraData` is a boolean indicating whether there is additional data in the button's ID besides the `customID`. For example, if the button's ID is not just 'ping', but something like 'ping|0009', then you would set it to `true`.

The `execute` function will be executed when the button is clicked.