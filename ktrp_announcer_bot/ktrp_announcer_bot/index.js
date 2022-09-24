const Discord = require("discord.js")
const { Client, Intents } = require('discord.js');
const config = require('./config.json');
const cron = require('cron')

const Client_D = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });



Client_D.on("ready", () => {
    console.log("Bot is Ready")
    
  const guild = Client_D.guilds.cache.get(config.SERVER_ID);
    
    let commands
    
    if (guild) {
        commands = guild.commands
    } else {
        commands = Client_D.application?.commands
    }

    commands?.create({
        name: 'vpa',
        description: 'Announcement on Voice Process channel --use',
    })

  commands?.create({
        name: 'visa_accepted',
        description: 'Announcement on visa accepted channel --use',
        options: [
            {
                name: 'citizen_tag',
                description: 'tag the citizen',
                required: true,
                type: Discord.Constants.ApplicationCommandOptionTypes.STRING,
            },
            {
                name: 'visa_number',
                description: 'visa number',
                required: true,
                type: Discord.Constants.ApplicationCommandOptionTypes.STRING,
            },
            {
                name: 'steam_link',
                description: 'steam link',
                required: true,
                type: Discord.Constants.ApplicationCommandOptionTypes.STRING,
            },
        ],
    })

    commands?.create({
        name: 'server_restart',
        description: 'Announcement on Tsunami Alert --use ',
        options: [
            {
                name: 'restart',
                description: 'Restart (or) Server is Back',
                required: true,
                type: Discord.Constants.ApplicationCommandOptionTypes.STRING,
            },
            {
                name: 'time',
                description: 'Minutes to restart',
                required: false,
                type: Discord.Constants.ApplicationCommandOptionTypes.NUMBER,
            },
        ],
    })

    commands?.create({
        name: 'custom_msg',
        description: 'Announcement on any channel with custom msg --use',
        options: [
            {
                name: 'channel_id',
                description: 'Channel ID of that particular channel',
                required: true,
                type: Discord.Constants.ApplicationCommandOptionTypes.STRING,
            },
            {
                name: 'message',
                description: 'Custom msg for that channel',
                required: true,
                type: Discord.Constants.ApplicationCommandOptionTypes.STRING,
            },
        ],
    })

})

Client_D.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) {
        return
    }
    if (!interaction.member.roles.cache.has('949223591419998268')) {
        return;
    }


    const { commandName, options } = interaction

        if (commandName === 'vpa') {
        const guild = Client_D.guilds.cache.get(config.SERVER_ID);
        const channel = guild.channels.cache.get(config.VP_CHANNEL_ID);
        const Emoji = "<:myLogo:" + Client_D.emojis.cache.find(emoji => emoji.name === "myLogo") + ">";

        var channel_VPA = "<@&" + config.NW_ROLE_MENTION + "> Those who didn't apply for visa can apply here " + guild.channels.cache.get(config.HTA_CHANNEL_MENTION).toString() + " and get visa directly and enter the city. Please enter the details properly. Happy RP " + Emoji
        channel.send(channel_VPA);
    }

    
    if (commandName === 'server_restart') {
        const tsunami = options.getString('restart')
        const time = options.getNumber('time')
        const Emoji = "<:myLogo:" + Client_D.emojis.cache.find(emoji => emoji.name === "myLogo") + ">";
        const guild = Client_D.guilds.cache.get(config.SERVER_ID);
        const channel = guild.channels.cache.get(config.TA_CHANNEL_ID);

        if (tsunami === 'restart' && time !== null) {
            var channel_TA = "<@&" + config.WL_ROLE_MENTION + "> Server Restart in " + time + "mins"
            channel.send(channel_TA);
        }

        else if (tsunami === 'fivem') {
            var channel_TA = "<@&" + config.WL_ROLE_MENTION + "> Sorry for the inconvenience. Fivem side issues.\n Don't enter the city until further announcement."
            channel.send(channel_TA);
        }

        else if (tsunami === 'host') {
            var channel_TA = "<@&" + config.WL_ROLE_MENTION + "> Sorry for the inconvenience. Hosting side issues.\n Don't enter the city until further announcement."
            channel.send(channel_TA);
        }

        else if (tsunami === 'back') {
            var channel_TA = Emoji + " <@&" + config.WL_ROLE_MENTION + "> Server is Back. Enjoy RP " + Emoji
            channel.send(channel_TA);
        }

    }

    if (commandName === "custom_msg") {
        const guild = Client_D.guilds.cache.get(config.SERVER_ID);
        const channel = guild.channels.cache.get(options.getString('channel_id'))

        var msg = options.getString('message')
        channel.send(msg)

    }
	
    if (commandName === "visa_accepted") {
        const guild = Client_D.guilds.cache.get(config.SERVER_ID);
        const channel = guild.channels.cache.get(config.VA_CHANNEL_ID)
		const Emoji_logo = "<:myLogo:" + Client_D.emojis.cache.find(emoji => emoji.name === "myLogo") + ">";
		const Emoji_tick = "<:emoji_37:" + Client_D.emojis.cache.find(emoji => emoji.name === "emoji_37") + ">";
        
        var steam_link = options.getString('steam_link')
        var visa_number = options.getString('visa_number')
        var tag = options.getString('citizen_tag')
        var msg_next = ' Your Visa Has Been Approved'+ Emoji_tick +'.Thanks For Applying Enjoy Rp '+ Emoji_logo + '\n' + steam_link
        var msg_before = '[VISA ID #' + visa_number + '] '
       
        channel.send(msg_before + tag + msg_next)

    }



})

Client_D.login(config.TOKEN)