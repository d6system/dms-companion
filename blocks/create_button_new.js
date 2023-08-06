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
            name: "Component",
            description: "Description: The Button output.",
            types: ["object"]
        },
    ],
    async code(cache) {

        const { ButtonBuilder, ButtonStyle } = require('discord.js');

        var style = this.GetOptionValue("styles", cache);
        var enable = this.GetOptionValue("enable", cache);
        var emoji = this.GetOptionValue("emoji", cache);
        const label = this.GetOptionValue("label", cache);      
        const id = this.GetOptionValue("id", cache);

        const end = (button) => {
        this.StoreOutputValue(button, "button", cache);
        this.RunNextBlock("action", cache);
        }

        if(style == "primary"){
            var style = ButtonStyle.Primary
        } else if(style == "secondary") {
            var style = ButtonStyle.Secondary
        } else if(style == "success") {
            var style = ButtonStyle.Success
        } else if(style == "danger") {
            var style = ButtonStyle.Danger
        } else if(style == "link") {
            var style = ButtonStyle.Link
        }

        if(enable == "enabled"){
            var enable = false
        } else if(enable == "disabled") {
            var enable = true
        }

        if(emoji == null || emoji == "") {
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
    }
}

