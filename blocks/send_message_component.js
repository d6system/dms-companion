module.exports = {
    name: "Send Message (Components)",

    description: "Sends a message with components.",

    category: "Component Stuff",

    inputs: [
        {
            id: "action",
            name: "Action",
            description: "Acceptable Types: Action\n\nDescription: Executes this block.",
            types: ["action"]
        },
        {
            id: "channel",
            name: "Channel",
            description: "Acceptable Types: Object, Unspecified\n\nDescription: The text channel or DM channel to send this message.",
            types: ["object", "unspecified"],
            required: true
        },
        {
            id: "text",
            name: "Text",
            description: "Acceptable Types: Text, Unspecified\n\nDescription: The text to put in the message. (OPTIONAL)",
            types: ["text", "unspecified"]
        },
        {
            id: "embed",
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
            id: "file",
            name: "File Path",
            description: "Description: To add a file to the message",
            types: ["text", "object", "unspecified"],
        }
        
        
    ],

    options: [],

    outputs: [
        {
            id: "action",
            name: "Action",
            description: "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            types: ["action"]
        },
        {
            id: "message",
            name: "Message",
            description: "Description: The message that was sent.",
            types: ["object", "unspecified"]
        }
    ],

    code(cache) {
        
        const { ActionRowBuilder } = require('discord.js');

        const channel = this.GetInputValue("channel", cache);
        const msg = this.GetInputValue("text", cache);
        const embed = this.GetInputValue("embed", cache);
        const button1 = this.GetInputValue("button", cache);
		const button_row = this.GetInputValue("button_row", cache);
        const menu1 = this.GetInputValue("menu", cache);
        const file = this.GetInputValue("file", cache);
        let button;
        let menu;
        let components;

        if(button1 !== undefined) {
            button =
                new ActionRowBuilder()
                    .addComponents(button1)
        }

        if(menu1 !== undefined) {
            menu = 
                new ActionRowBuilder()
                    .addComponents(menu1)
        }

        if(button1 == undefined && button_row == undefined && menu1 !== undefined) {
            components = [menu]
        }else if(button_row == undefined && menu1 == undefined && button1 !== undefined) {
            components = [button]
        }else if(menu1 == undefined && button1 == undefined && button_row !== undefined) {
            components = [button_row]
        }else if(menu1 !== undefined && button_row !== undefined && button1 == undefined) {
            components = [menu, button_row]
        }else if(menu1 !== undefined && button1 !== undefined && button_row == undefined) {
            components = [menu, button]
        }else if(menu1 == undefined && button1 !== undefined && button_row !== undefined) {
            components = [button_row, button]
        }else if(menu1 !== undefined && button1 !== undefined && button_row !== undefined) {
            components = [menu, button_row, button]
        }
        

        if(embed !== undefined) {
            // channel.send({ content: msg, embeds: [embed], components: [menu, button_row, button] }).then(message => {
            channel.send({ content: msg, embeds: [embed], files: file ? [file] : null, components: components,  }).then(message => {
                this.StoreOutputValue(message, "message", cache);
                this.RunNextBlock("action", cache);
            });
            
        } else {
            channel.send({
                content: msg,
                files: file ? [file] : null,
                components: components
            }).then(message => {
                this.StoreOutputValue(message, "message", cache);
                this.RunNextBlock("action", cache);
            });
        }
    }
}