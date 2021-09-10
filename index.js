const { Client } = require('discord.js');
const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"], partials: ["CHANNEL"] });
const config = require('./config.json');

const idCache = [];

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
        let authorId = msg.author.id;

        // Cache the id and make sure it won't reply to their message again to avoid getting reported for being a bot
        if (idCache.includes(authorId)) {
            return;
        }

        idCache.push(authorId);
        console.log(msg.author.tag);

        // make look realistic hh
        setTimeout(() => {
            msg.channel.sendTyping();
        }, 4000);

        setTimeout(() => {
            msg.reply(config.message);
        }, 6000);
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