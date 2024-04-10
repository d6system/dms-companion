module.exports = {
    name: "Get Message Info",

    description: "Gets the message information.",

    category: "Message Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "message",
            "name": "Message",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The message to get the information.",
            "types": ["object", "unspecified"],
            "required": true
        }
    ],

    options: [
        {
            "id": "message_info",
            "name": "Message Info",
            "description": "Description: The message information to get.",
            "type": "SELECT",
            "options": {
                1: "Message Attachment List [List <Message Attachment>]",
                2: "Message Author [User]",
                3: "Message Channel [Text Channel]",
                4: "Message Clean Content [Text]",
                5: "Message Content [Text]",
                6: "Message Created At [Date]",
                7: "Is Message Deletable By The Bot? [Boolean]",
                9: "Is Message Editable By The Bot? [Boolean]",
                10: "Message Edited At [Date]",
                11: "Cached Edited Message List [List <Message>]",
                12: "Message Embed List [List <Message Embed>]",
                13: "Message Server [Server]",
                15: "Message ID [Text]",
                16: "Message Author [Member]",
                17: "Message Channel Mention List [List <Channel>]",
                18: "Message Member Mention List [List <Member>]",
                19: "Message Role Mention List [List <Role>]",
                20: "Message User Mention List [List <User>]",
                21: "Has Message Been Mentioned @everyone/@here? [Boolean]",
                22: "Message Nonce [Text]",
                23: "Is Message Pinnable By The Bot? [Boolean]",
                24: "Is Message Pinned? [Boolean]",
                25: "Message Reaction List [List <Message Reaction>]",
                26: "Was Message Sent By Discord? [Boolean]",
                27: "Was Message Text-To-Speech? [Boolean]",
                28: "Message Type [Text]",
                29: "Message URL [Text]",
                30: "Message Webhook [Webhook]",
                31: "Message Webhook ID [Text]",
                32: "Message Activity Party ID [Text]",
                33: "Message Activity Type [Text]",
                34: "Message Discord Application [Application]",
                35: "Message Flag [Text]",
                36: "Is Message Replying? [Boolean]",
                37: "Message Reply Guild ID [Text]",
                38: "Message Reply Channel ID [Text]",
                39: "Message Reply Message ID [Text]",
                40: "Has Massage a Thread? [Boolean]",
                41: "Message Thread [Object <Thread Channel>]"
            }
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
            "id": "result",
            "name": "Result",
            "description": "Type: Unspecified\n\nDescription: The information obtained from the message.",
            "types": ["unspecified"]
        }
    ],

    async code(cache) {
        const message = this.GetInputValue("message", cache);
        const message_info = parseInt(this.GetOptionValue("message_info", cache));

        const {MessageType, MessageActivityType} = require("discord.js");
        const simplify = txt => txt.replace(/([A-Z])/g, ' $1').trim();

        let result;
        switch(message_info) {
            case 1:
                result = Array.from(message.attachments.values());
                break;
            case 2:
                result = message.author;
                break;
            case 3:
                result = message.channel;
                break;
            case 4:
                result = message.cleanContent;
                break;
            case 5:
                result = message.content;
                break;
            case 6:
                result = message.createdAt;
                break;
            case 7:
                result = message.deletable;
                break;
            case 9:
                result = message.editable;
                break;
            case 10:
                result = message.editedAt;
                break;
            case 11:
                result = message.edits;
                break;
            case 12:
                result = message.embeds;
                break;
            case 13:
                result = message.guild;
                break;
            case 15:
                result = message.id;
                break;
            case 16:
                result = message.member;
                break;
            case 17:
                result = Array.from(message.mentions.channels.values());
                break;
            case 18:
                result = Array.from(message.mentions.members.values());
                break;
            case 19:
                result = Array.from(message.mentions.roles.values());
                break;
            case 20:
                result = Array.from(message.mentions.users.values());
                break;
            case 21:
                result = message.mentions.everyone;
                break;
            case 22:
                result = message.nonce;
                break;
            case 23:
                result = message.pinnable;
                break;
            case 24:
                result = message.pinned;
                break;
            case 25:
                result = Array.from(message.reactions.cache.values());
                break;
            case 26:
                result = message.system;
                break;
            case 27:
                result = message.tts;
                break;
            case 28:
                result = simplify(MessageType[message.type]);
                break;
            case 29:
                result = message.url;
                break;
            case 30:
                result = await message.fetchWebhook();
                break;
            case 31:
                result = message.webhookID;
                break;
            case 32:
                result = message.activity && message.activity.partyID;
                break;
            case 33:
                result = message.activity && simplify(MessageActivityType[message.activity.type]);
                break;
            case 34:
                result = message.application;
                break;
            case 35:
                result = message.message.flags.toArray();
                break;
            case 36:
                if(message.reference !== null){
                    result = true
                }else{
                    result = false
                }
            break;
            case 37:
                result = message.reference.guildId;                      
                break;
            case 38:
                result = message.reference.channelId;                      
                break;
            case 39:
                result = message.reference.messageId;                      
                break;
            case 40:
                result = message.hasThread;
                break;
            case 41:
                result = message.thread;
                break;
        }

        this.StoreOutputValue(result, "result", cache);
        this.RunNextBlock("action", cache);
    }
}