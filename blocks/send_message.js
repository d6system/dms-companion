module.exports = {
    name: "Send Message",

    description: "Sends a message.",

    category: "Message Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "channel",
            "name": "Channel",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The text channel or DM channel to send this message.",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "text",
            "name": "Text",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The text to put in the message. (OPTIONAL)",
            "types": ["text", "unspecified"]
        },
        {
            "id": "embed",
            "name": "Embed",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The embed to put in the message. (OPTIONAL)",
            "types": ["object", "unspecified"]
        },
        {
            "id": "attachment",
            "name": "Attachment",
            "description": "Acceptable Types: Object, Text, Unspecified\n\nDescription: The attachment to put in the message. Supports Image, file path and URL. (OPTIONAL)",
            "types": ["object", "text", "unspecified"]
        }
    ],

    options: [],

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
            "description": "Type: Object\n\nDescription: The message obtained.",
            "types": ["object"]
        }
    ],

    code(cache) {
        const channel = this.GetInputValue("channel", cache);
        const text = this.GetInputValue("text", cache);
        const embed = this.GetInputValue("embed", cache);
        const attachment = this.GetInputValue("attachment", cache);

        const data = {
            content: text,
            embeds: embed && embed.hasOwnProperty('data') && [embed.data],
            files: attachment ? [attachment] : undefined
        }

        const cleanData = Object.keys(data).reduce((accumulator, key) => {
            if (data[key] !== undefined)
                accumulator[key] = data[key]
          
            return accumulator;
        }, {});

        channel.send(cleanData).then(msg => {
            this.StoreOutputValue(msg, "message", cache);
            this.RunNextBlock("action", cache);
        });
    }
}