const { Client } = require('discord.js');
const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"], partials: ["CHANNEL"] });
const config = require('./config.json');

client.on('ready', () => {
    // Logged into discord gateway
    console.log(`Logged in as ${client.user.tag}!`);

    /*
        Send message in disboard channel stating that the bot has started 
        (make sure this channel is private in your server)
    */
    const channel = client.channels.cache.get(config.disboard.channelID);
    channel.send('Advertising bot started');

    atdm();
});

// Set interval for bump message
setInterval(() => {
    // Send bump message
    const channel = client.channels.cache.get(config.disboard.channelID);
    channel.send('!d bump');
}, (7500 * 1000));

// Set interval for advertising message
setInterval(() => {
    atdm();
}, (1200 * 1000));

client.on('messageCreate', (msg) => {
    // idk
    if (msg.partial) {
        console.log('partial');
    }

    // Reply to DM message and log user tag
    if (msg.channel.type === 'DM' && msg.author.id !== client.user.id) {
        console.log(msg.author.tag);

        msg.reply(config.message);
    }
});

/*
    Function that sends a custom message in the specified advertising channel
*/
const atdm = () => {
    const channel = client.channels.cache.get(config.advChannelID);
    channel.send(config.serverMessage);
}

// Login to gateway
client.login(config.token);