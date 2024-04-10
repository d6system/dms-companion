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
            types: ["text", "unspecified"]
        },
        {
            id: "label",
            name: "Label",
            description: "Type: Text\n\nDescription: The Label of the Button.",
            types: ["text", "unspecified"]
        },
        {
            id: "emoji",
            name: "Emoji",
            description: "Type: Text\n\nDescription: The Emoji for the Button. (OPTIONAL)",
            types: ["text", "unspecified"]
        },
		{
            id: "id",
            name: "ID / URL",
            description: "Type: Text\n\nDescription: The ID or URL of the Button.",
            types: ["text", "unspecified"]
        },
        {
            id: "enable",
            name: "Enabled or Disabled?",
            description: "Description: Whether this button is enabled or disabled",
            types: ["boolean", "unspecified"]
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

        const style_input = this.GetInputValue("styles", cache);
        const label_input = this.GetInputValue("label", cache);      
        const emoji_input = this.GetInputValue("emoji", cache);
        const id_input = this.GetInputValue("id", cache);
        const enable_input = this.GetInputValue("enable", cache);

        const style_option = this.GetOptionValue("styles", cache);
        const label_option = this.GetOptionValue("label", cache) !== undefined ? this.GetOptionValue("label", cache) : undefined;
        const emoji_option = this.GetOptionValue("emoji", cache) !== undefined ? this.GetOptionValue("emoji", cache) : undefined;
        const id_option = this.GetOptionValue("id", cache) !== undefined ? this.GetOptionValue("id", cache) : undefined;
        const enable_option = this.GetOptionValue("enable", cache);

        var style = style_input !== undefined ? style_input : style_option;
        const label = label_input !== undefined ? label_input : label_option;
        const emoji = emoji_input !== undefined ? emoji_input : emoji_option;
        const id = id_input !== undefined ? id_input : id_option;
        var enable = enable_input !== undefined ? enable_input : enable_option;        

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
        
            if(style == ButtonStyle.Link && label == undefined || style == ButtonStyle.Link && label == '') {
                linkNoLabel()
            }else if(style == ButtonStyle.Link && emoji == undefined  || style == ButtonStyle.Link && emoji == ''){
                linkNoEmoji()
            }else if(style == ButtonStyle.Link && emoji !== undefined) {
                link()
            }else if(emoji == undefined || emoji == '') {
                noEmoji()
            }else if(label == undefined || label == '') {
                noLabel()
            } else {
                Emoji()
            }
        
            function noLabel() {
                const button = [
                        new ButtonBuilder()
                            .setCustomId(id)
                            .setStyle(style)
                            .setEmoji(emoji)
                            .setDisabled(enable)
                ]
                end(button)
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

            function linkNoLabel() {
                const button = [
                    new ButtonBuilder()
                        .setURL(id)
                        .setEmoji(emoji)
                        .setStyle(style)
                        .setDisabled(enable)
            ]
            end(button)
            }
        
    }
}

