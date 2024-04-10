module.exports = {
    name: "On Bot Mention",

    description: "Executes when Bot is Ping",

    category: "Events",

    auto_execute: true,

    inputs: [],

    options: [
        {
            id: "allow_bots",
            name: "Allow Bot Mentions",
            description: "Choose if bot messages mentioning the bot will also trigger this block.",
            type: "select",
            options: {
                "true": "Yes, allow bot mentions",
                "false": "No, only user mentions",
            },
        },
        {
            id: "include_mention",
            name: "Include Mention Prefix",
            description: "Choose if the mention `@` prefix will be included in the output message content.",
            type: "select",
            options: {
                "true": "Yes, include mentions",
                "false": "No, exclude mention",
            },
        }
    ],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
            "id": "message",
            "name": "Message",
            "description": "Type: Object\n\nDescription: The message object after processing for bot mention options.",
            "types": ["object"]
        },
        {
            "id": "server",
            "name": "Server",
            "description": "Type: Object\n\nDescription: The server the message was sent in.",
            "types": ["object"]
        },
        {
            "id": "channel",
            "name": "Channel",
            "description": "Type: Object\n\nDescription: The channel the message was sent in.",
            "types": ["object"]
        },
        {
            "id": "user",
            "name": "User",
            "description": "Type: Object\n\nDescription: The user who mentioned the bot.",
            "types": ["object"]
        },
        {
            "id": "member",
            "name": "Member",
            "description": "Type: Object\n\nDescription: The guild member who mentioned the bot.",
            "types": ["object"]
        }
    ],

    code(cache, DBB) {
        const client = DBB.DiscordJS.client;
    
        
        const allowBotsOption = this.GetOptionValue("allow_bots", cache);
        const includeMentionOption = this.GetOptionValue("include_mention", cache);
    
       
        const allowBots = allowBotsOption === "true";
        const includeMention = includeMentionOption === "true";
    
        client.on('messageCreate', message => {
           
            if ((!allowBots && message.author.bot) || message.author.id === client.user.id) return;
    
            if (message.mentions.users.has(client.user.id)) {
               
                if (!includeMention) {
                    const mentionRegex = new RegExp(`<@!?${client.user.id}>`, "g");
                    message.content = message.content.replace(mentionRegex, '').trim();
                }
    
                if (!message.guild) return;
    
              
                this.StoreOutputValue(message, "message", cache);
                this.StoreOutputValue(message.guild, "server", cache);
                this.StoreOutputValue(message.channel, "channel", cache);
                this.StoreOutputValue(message.author, "user", cache);
                this.StoreOutputValue(message.member, "member", cache);
               
                this.RunNextBlock("action", cache);
            }
        });
    } 
}