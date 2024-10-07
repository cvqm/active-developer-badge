const { GatewayIntentBits, Client, Events, REST, Routes, SlashCommandBuilder } = require("discord.js");
const { token, id } = require("./src/config.json");
const fs = require("fs");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent
    ]
});

const rest = new REST({ version: "10"}).setToken(token);

client.on(Events.ClientReady, () => {
    console.log(`The bot has been activated`); //-- console message (optional)
    client.user.setStatus('dnd'); //-- this is optional for if you want the bot on do not disturb
});

client.on(Events.InteractionCreate, (interaction) => {
    if (!interaction.isCommand()) return;
    if (interaction.user.bot) return;

    interaction.reply('wait 24h and go [here](https://discord.com/developers/active-developer)');
});

(async () => {
    try {
        await rest.put(Routes.applicationCommands(id), {body: [
            new SlashCommandBuilder().setName("claim badge").setDescription("responds with 'pong'"),
        ]});
    } catch (err) {
        console.warn(err)    
    }
})()

client.login(token);
