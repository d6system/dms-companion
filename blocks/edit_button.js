module.exports = {
    name: "Edit Button",
    description: "Edit a button.",
    category: "Buttons",
    inputs: [
        {
            id: "action",
            name: "Action",
            description: "Type: Action\n\nDescription: Executes this block.",
            types: ["action"]
        },
        {
            id: "button",
            name: "Button",
            description: "Description: The Button output.",
            types: ["object", "unspecified"]
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
        }
    ],
    async code(cache) {

        const { ButtonBuilder, ButtonStyle } = require('discord.js');

        var obutton = this.GetInputValue("button", cache);
        var style = this.GetInputValue("styles", cache);
        var enable = this.GetInputValue("enable", cache);
        var emoji = this.GetInputValue("emoji", cache);
        var label = this.GetInputValue("label", cache);
        var id = this.GetInputValue("id", cache);

        if (style == undefined) {
            style = this.GetOptionValue("styles", cache);
            style ? style : style = undefined;
        }

        if (enable == undefined) {
            enable = this.GetOptionValue("enable", cache);
            enable ? enable : enable = undefined;
        }

        if (emoji == undefined || emoji == null || emoji == '') {
            emoji = this.GetOptionValue("emoji", cache);
            emoji ? emoji : emoji = undefined;
        }

        if (label == undefined) {
            label = this.GetOptionValue("label", cache);
            label ? label : label = undefined;
        }

        if (id == undefined) {
            id = this.GetOptionValue("id", cache);
            label ? label : label = undefined;
        }

        const end = (button) => {
            this.StoreOutputValue(button, "button", cache);
            this.RunNextBlock("action", cache);
        }

        if (style == "primary") {
            style = ButtonStyle.Primary
        } else if (style == "secondary") {
            style = ButtonStyle.Secondary
        } else if (style == "success") {
            style = ButtonStyle.Success
        } else if (style == "danger") {
            style = ButtonStyle.Danger
        } else if (style == "link") {
            style = ButtonStyle.Link
        }

        if (enable == "enabled") {
            enable = false
        } else if (enable == "disabled") {
            enable = true
        }

        if (style == ButtonStyle.Link && emoji !== '') {
            link()
        } else if (style == ButtonStyle.Link && emoji == '') {
            linkNoEmoji()
        } else if (emoji == undefined || emoji == null || emoji == '') {
            noEmoji()
        } else {
            Emoji()
        }




        function Emoji() {
            const button = new ButtonBuilder()
            if (id) { button.setCustomId(id) } else {button.setCustomId(obutton['data'].custom_id)};
            if (label) { button.setLabel(label) } else {button.setLabel(obutton['data'].label)};
            if (emoji) { button.setEmoji(emoji) } else {button.setEmoji(obutton['data'].emoji)};
            if (style) { button.setStyle(style) } else {button.setStyle(obutton['data'].style)};
            if (enable) { button.setDisabled(enable) } else {button.setDisabled(obutton['data'].disabled || false)};
            end(button)
        }


        function noEmoji() {
            const button = new ButtonBuilder()
            if (id) { button.setCustomId(id) } else {button.setCustomId(obutton['data'].custom_id)};
            if (label) { button.setLabel(label) } else {button.setLabel(obutton['data'].label)};
            if (style) { button.setStyle(style) } else {button.setStyle(obutton['data'].style)};
            if (enable) { button.setDisabled(enable) } else {button.setDisabled(obutton['data'].disabled || false)};
            end(button)
        }

        function link() {
            const button = new ButtonBuilder()
            if (id) { button.setURL(id) } else {button.setURL(obutton['data'].custom_id)};
            if (label) { button.setLabel(label) } else {button.setLabel(obutton['data'].label)};
            if (emoji) { button.setEmoji(emoji) } else {button.setEmoji(obutton['data'].emoji)};
            if (style) { button.setStyle(style) } else {button.setStyle(obutton['data'].style)};
            if (enable) { button.setDisabled(enable) } else {button.setDisabled(obutton['data'].disabled || false)};
            end(button)
        }

        function linkNoEmoji() {
            const button = new ButtonBuilder()
            if (id) { button.setURL(id) } else {button.setURL(obutton['data'].custom_id)};
            if (label) { button.setLabel(label) } else {button.setLabel(obutton['data'].label)};
            if (style) { button.setStyle(style) } else {button.setStyle(obutton['data'].style)};
            if (enable) { button.setDisabled(enable) } else {button.setDisabled(obutton['data'].disabled || false)};
            end(button)
        }
    }
}

