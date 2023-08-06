module.exports = {
    name: "Create Button",
    description: "Create a button.",
    category: "Buttons",
    inputs: [
        {
            id: "action",
            name: "Action",
            description: "Type: Action\n\nDescription: Executes this block.",
            types: ["action"]
        },
        {
            id: "styles",
            name: "Style",
            description: "Type: Text\n\nDescription: The Style of the Button. [blurple], [grey], [green], [red], [url]",
            types: ["text"],
        },
        {
            id: "label",
            name: "Label",
            description: "Type: Text\n\nDescription: The Label of the Button.",
            types: ["text"]
        },
        {
            id: "emoji",
            name: "Emoji",
            description: "Type: Text\n\nDescription: The Emoji for the Button. (OPTIONAL)",
            types: ["text"]
        },
		{
            id: "id",
            name: "ID / URL",
            description: "Type: Text\n\nDescription: The ID or URL of the Button.",
            types: ["text"]
        },
        {
            id: "enable",
            name: "Enabled or Disabled?",
            description: "Description: Whether this button is enabled or disabled",
            types: ["text"],
        }
    ],
    options: [
        {
            id: "styles",
            name: "Style",
            description: "Type: Text\n\nDescription: The Style of the Button. [blurple], [grey], [green], [red], [url]",
            type: "SELECT",
            options: {                
                "primary": "Blurple / Primary",
                "secondary": "Grey / Secondary",
                "success": "Green / Success",
                "danger": "Red / Danger",
                "link": "Link / Url"
            }
        },
        {
            id: "label",
            name: "Label",
            description: "Type: Text\n\nDescription: The Label of the Button.",
            type: "TEXT"
        },
        {
            id: "emoji",
            name: "Emoji",
            description: "Type: Text\n\nDescription: The Emoji for the Button. (OPTIONAL)",
            type: "TEXT"
        },
		{
            id: "id",
            name: "ID / URL",
            description: "Type: Text\n\nDescription: The ID or URL of the Button.",
            type: "TEXT"
        },
        {
            id: "enable",
            name: "Enabled or Disabled?",
            description: "Description: Whether this button is enabled or disabled",
            type: "SELECT",
            options: {                
                "enabled": "Enabled",
                "disabled": "Disabled"
            }
        }
    ],
    outputs: [
        {
            id: "action",
            name: "Action",
            description: "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            types: ["action"]
        },
        {
            id: "button",
            name: "Button",
            description: "Description: The Button output.",
            types: ["object"]
        },
    ],
    async code(cache) {

        const { ButtonBuilder, ButtonStyle } = require('discord.js');

        var style = this.GetInputValue("styles", cache);
        var enable = this.GetInputValue("enable", cache);
        var emoji = this.GetInputValue("emoji", cache);
        var label = this.GetInputValue("label", cache);      
        var id = this.GetInputValue("id", cache);

        if(style == undefined) {
            style = this.GetOptionValue("styles", cache);
        }

        if(enable == undefined) {
            enable = this.GetOptionValue("enable", cache);
        }

        if(emoji == undefined || emoji == null || emoji == '') {
            emoji = this.GetOptionValue("emoji", cache);
        }

        if(label == undefined) {
            label = this.GetOptionValue("label", cache);
        }

        if(id == undefined) {
            id = this.GetOptionValue("id", cache);
        }
        
        const end = (button) => {
        this.StoreOutputValue(button, "button", cache);
        this.RunNextBlock("action", cache);
        }

        if(style == "primary"){
            style = ButtonStyle.Primary
        } else if(style == "secondary") {
            style = ButtonStyle.Secondary
        } else if(style == "success") {
            style = ButtonStyle.Success
        } else if(style == "danger") {
            style = ButtonStyle.Danger
        } else if(style == "link") {
            style = ButtonStyle.Link
        }

        if(enable == "enabled"){
            enable = false
        } else if(enable == "disabled") {
            enable = true
        }

        if(style == ButtonStyle.Link && emoji !== '') {
            link()
        }else if(style == ButtonStyle.Link && emoji == ''){
            linkNoEmoji()
        }else if(emoji == undefined || emoji == null || emoji == '') {
            noEmoji()
        } else {
            Emoji()
        }


        
  
        function Emoji() {
            const button = [
                    new ButtonBuilder()
                        .setCustomId(id)
                        .setLabel(label)
                        .setStyle(style)
                        .setEmoji(emoji)
                        .setDisabled(enable)
            ]
            end(button)
        }


        function noEmoji() {
            const button = [
                    new ButtonBuilder()
                        .setCustomId(id)
                        .setLabel(label)
                        .setStyle(style)
                        .setDisabled(enable)
            ]
            end(button)
        }

        function link() {
            const button = [
                new ButtonBuilder()
                    .setURL(id)
                    .setLabel(label)
                    .setStyle(style)
                    .setEmoji(emoji)
                    .setDisabled(enable)
        ]
        end(button)
        }

        function linkNoEmoji() {
            const button = [
                new ButtonBuilder()
                    .setURL(id)
                    .setLabel(label)
                    .setStyle(style)
                    .setDisabled(enable)
        ]
        end(button)
        }
    }
}

