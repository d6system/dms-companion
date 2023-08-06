module.exports = {
    name: "Send Webhook Message",

    description: "Sends a message with a webhook.",

    category: "Webhook Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "webhook",
            "name": "Webhook",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The webhook to send this message.",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "webhook_username_override",
            "name": "Webhook Username Override",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The webhook username override for this message. (OPTIONAL)",
            "types": ["text", "unspecified"]
        },
        {
            "id": "webhook_avatar_url_override",
            "name": "Webhook Avatar URL Override",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The webhook avatar URL override for this message. (OPTIONAL)",
            "types": ["text", "unspecified"]
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
        const webhook = this.GetInputValue("webhook", cache);
        const text = this.GetInputValue("text", cache);
        const webhook_username_override = this.GetInputValue("webhook_username_override", cache);
        const webhook_avatar_url_override = this.GetInputValue("webhook_avatar_url_override", cache);
        const embed = this.GetInputValue("embed", cache);
        const attachment = this.GetInputValue("attachment", cache);

        const data = {
            content: text,
            username: webhook_username_override,
            avatarURL: webhook_avatar_url_override,
            embeds: embed && embed.hasOwnProperty('data') && [embed.data],
            files: attachment ? [attachment] : undefined
        }

        const cleanData = Object.keys(data).reduce((accumulator, key) => {
            if (data[key] !== undefined)
                accumulator[key] = data[key]
          
            return accumulator;
        }, {});

        webhook.send(cleanData).then(msg => {
            this.StoreOutputValue(msg, "message", cache);
            this.RunNextBlock("action", cache);
        });
    }
}