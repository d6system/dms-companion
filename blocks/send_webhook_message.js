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
            "id": "message",
            "name": "Text",
            "description": "Type: Text\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["text", "unspecified"]
        },
        {
            id: "embeds",
            name: "Embed",
            description: "Description: To add a single Button to the Message. (NOT A ROW) (MUST EITHER BE BUTTON OR ROW -- NOT BOTH --)",
            types: ["object", "unspecified"],
        },
        {
            id: "menu",
            name: "Menu",
            description: "Description: To add a single Button to the Message. (NOT A ROW) (MUST EITHER BE BUTTON OR ROW -- NOT BOTH --)",
            types: ["object", "unspecified"],
        },
        {
            id: "button_row",
            name: "Button Row",
            description: "Description: To add a Button Row to the Message. (MUST EITHER BE BUTTON OR ROW -- NOT BOTH --)",
            types: ["object", "unspecified"],
        },
        {
            id: "button",
            name: "Button",
            description: "Description: To add a single Button to the Message. (NOT A ROW) (MUST EITHER BE BUTTON OR ROW -- NOT BOTH --)",
            types: ["object", "unspecified"],
        },
        {
            id: "attachment",
            name: "Attachment",
            description: "Acceptable Types: Object, Text, Unspecified\n\nDescription: The attachment to put in the message. Supports Image, file path and URL. (OPTIONAL)",
            types: ["object", "text", "unspecified"]
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
        const webhook_username_override = this.GetInputValue("webhook_username_override", cache);
        const webhook_avatar_url_override = this.GetInputValue("webhook_avatar_url_override", cache);

        const { ActionRowBuilder } = require('discord.js');

        const msg = this.GetInputValue("message", cache);
        const em = this.GetInputValue("embeds", cache);
        const attachment = this.GetInputValue("attachment", cache);
        const button1 = this.GetInputValue("button", cache);
        const button_row = this.GetInputValue("button_row", cache);
        const menu1 = this.GetInputValue("menu", cache);
        let components;
        let button;
        let menu;

        if (button1 !== undefined) {
            button =
                new ActionRowBuilder()
                    .addComponents(button1)
        }

        if (menu1 !== undefined) {
            menu =
                new ActionRowBuilder()
                    .addComponents(menu1)
        }

        if (button1 == undefined && button_row == undefined && menu1 !== undefined) {
            components = [menu]
        } else if (button_row == undefined && menu1 == undefined && button1 !== undefined) {
            components = [button]
        } else if (menu1 == undefined && button1 == undefined && button_row !== undefined) {
            components = [button_row]
        } else if (menu1 !== undefined && button_row !== undefined && button1 == undefined) {
            components = [menu, button_row]
        } else if (menu1 !== undefined && button1 !== undefined && button_row == undefined) {
            components = [menu, button]
        } else if (menu1 == undefined && button1 !== undefined && button_row !== undefined) {
            components = [button_row, button]
        } else if (menu1 !== undefined && button1 !== undefined && button_row !== undefined) {
            components = [menu, button_row, button]
        }

        if (em !== undefined) {
            data = { username: webhook_username_override, avatarURL: webhook_avatar_url_override, content: msg, embeds: [em], components: components, files: attachment ? [attachment] : null }
            const cleanData = Object.keys(data).reduce((accumulator, key) => {
                if (data[key] !== undefined)
                    accumulator[key] = data[key]

                return accumulator;
            }, {});
            webhook.send(cleanData).then(msg => {
                this.StoreOutputValue(msg, "message", cache);
                this.RunNextBlock("action", cache)
            });
        } else {
            data = {
                username: webhook_username_override,
                avatarURL: webhook_avatar_url_override,
                content: msg,
                components: components,
                files: attachment ? [attachment] : null
            }
            const cleanData = Object.keys(data).reduce((accumulator, key) => {
                if (data[key] !== undefined)
                    accumulator[key] = data[key]

                return accumulator;
            }, {});
            webhook.send(cleanData).then(msg => {
                this.StoreOutputValue(msg, "message", cache);
                this.RunNextBlock("action", cache)
            });
        }
    }
}