module.exports = {
    name: "Get Message Embed Info",

    description: "Gets the message embed information.",

    category: "Message Embed Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "message_embed",
            "name": "Message Embed",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The message embed to get the information.",
            "types": ["object", "unspecified"],
            "required": true
        }
    ],

    options: [
        {
            "id": "message_embed_info",
            "name": "Message Embed Info",
            "description": "Description: The message embed information to get.",
            "type": "SELECT",
            "options": {
                1: "Message Embed Title [Text]",
                2: "Message Embed Author Name [Text]",
                3: "Message Embed Author URL [Text]",
                4: "Message Embed Author Icon URL [Text]",
                5: "Message Embed Author Icon Proxied URL [Text]",
                6: "Message Embed Color (Hex) [Text]",
                7: "Message Embed Color (Base 10) [Text]",
                8: "Message Embed Created At [Date]",
                9: "Message Embed Description [Text]",
                10: "Message Embed Fields [List <Embed Fields>]",
                11: "Message Embed Files [List <Embed Files>]",
                12: "Message Embed Footer Text [Text]",
                13: "Message Embed Footer Icon URL [Text]",
                14: "Message Embed Footer Icon Proxied URL [Text]",
                15: "Message Embed Image URL [Text]",
                16: "Message Embed Image Proxied URL [Text]",
                17: "Message Embed Image Height [Number]",
                18: "Message Embed Image Width [Number]",
                19: "Message Embed Thumbnail URL [Text]",
                20: "Message Embed Thumbnail Proxied URL [Text]",
                21: "Message Embed Thumbnail Height [Number]",
                22: "Message Embed Thumbnail Width [Number]",
                23: "Message Embed Characters Number [Number]",
                24: "Message Embed Provider Text [Text]",
                25: "Message Embed Provider URL [Text]",
                26: "Message Embed Timestamp [Number]",
                28: "Message Embed URL [Text]",
                29: "Message Embed Video URL [Text]",
                30: "Message Embed Video Proxied URL [Text]",
                31: "Message Embed Video Height [Number]",
                32: "Message Embed Video Width [Number]"
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
            "description": "Type: Unspecified\n\nDescription: The information obtained from the message embed.",
            "types": ["unspecified"]
        }
    ],

    code(cache) {
        let message_embed = this.GetInputValue("message_embed", cache);
        const message_embed_info = parseInt(this.GetOptionValue("message_embed_info", cache));

        const {Embed} = require("discord.js");

        if (message_embed && !(message_embed instanceof Embed) && message_embed.hasProperty('data'))
            message_embed = new Embed(message_embed.data)

        let result;
        switch(message_embed_info) {
            case 1:
                result = message_embed.title;
                break;
            case 2:
                result = message_embed.author && message_embed.author.name;
                break;
            case 3:
                result = message_embed.author && message_embed.author.url;
                break;
            case 4:
                result = message_embed.author && message_embed.author.iconURL;
                break;
            case 5:
                result = message_embed.author && message_embed.author.proxyIconURL;
                break;
            case 6:
                result = message_embed.hexColor;
                break;
            case 7:
                result = message_embed.color;
                break;
            case 8: {
                const {timestamp} = message_embed;
                if (timestamp >= 0) result = new Date(timestamp);
                break;
            }
            case 9:
                result = message_embed.description;
                break;
            case 10:
                result = message_embed.fields;
                break;
            case 11:
                result = message_embed.files;
                break;
            case 12:
                result = message_embed.footer && message_embed.footer.text;
                break;
            case 13:
                result = message_embed.footer && message_embed.footer.iconURL;
                break;
            case 14:
                result = message_embed.footer && message_embed.footer.proxyIconURL;
                break;
            case 15:
                result = message_embed.image && message_embed.image.url;
                break;
            case 16:
                result = message_embed.image && message_embed.image.proxyURL;
                break;
            case 17:
                result = message_embed.image && message_embed.image.height;
                break;
            case 18:
                result = message_embed.image && message_embed.image.width;
                break;
            case 19:
                result = message_embed.thumbnail && message_embed.thumbnail.url;
                break;
            case 20:
                result = message_embed.thumbnail && message_embed.thumbnail.proxyURL;
                break;
            case 21:
                result = message_embed.thumbnail && message_embed.thumbnail.height;
                break;
            case 22:
                result = message_embed.thumbnail && message_embed.thumbnail.width;
                break;
            case 23:
                result = message_embed.length;
                break;
            case 24:
                result = message_embed.provider && message_embed.provider.name;
                break;
            case 25:
                result = message_embed.provider && message_embed.provider.url;
                break;
            case 26:
                result = message_embed.timestamp;
                break;
            case 28:
                result = message_embed.url;
                break;
            case 29:
                result = message_embed.video && message_embed.video.url;
                break;
            case 30:
                result = message_embed.video && message_embed.video.proxyURL;
                break;
            case 31:
                result = message_embed.video && message_embed.video.height;
                break;
            case 32:
                result = message_embed.video && message_embed.video.width;
                break;
        }

        this.StoreOutputValue(result, "result", cache);
        this.RunNextBlock("action", cache);
    }
}