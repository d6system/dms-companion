module.exports = {
    name: "Buttons Text",

    description: "Block to use in your buttons.",

    category: "Buttons",

    auto_execute: true,

    inputs: [],

    options: [
        {
            "id": "style",
            "name": "Style",
            "description": "Type: Text\n\nDescription: The Style of the Button. [blurple], [grey], [green], [red], [url]",
            "type": "SELECT",
            "options": {                
                "primary": "Blurple / Primary",
                "secondary": "Grey / Secondary",
                "success": "Green / Success",
                "danger": "Red / Danger",
                "link": "Link / Url"
            }
        },
        {
            "id": "label",
            "name": "Label",
            "description": "Type: Text\n\nDescription: The Label of the Button.",
            "type": "TEXT"
        },
        {
            "id": "emoji",
            "name": "Emoji",
            "description": "Type: Text\n\nDescription: The Emoji of the Button.",
            "type": "TEXT"
        },
		{
            "id": "id",
            "name": "ID / URL",
            "description": "Type: Text\n\nDescription: The ID or URL of the Button.",
            "type": "TEXT"
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
            "id": "style",
            "name": "Style",
            "description": "Type: Text\n\nDescription: The Style of your choice for the Button",
            "types": ["text"]
        },
        {
            "id": "label",
            "name": "Label",
            "description": "Type: Text\n\nDescription: The Label of the Button.",
            "types": ["text"]
        },
        {
            "id": "emoji",
            "name": "Emoji",
            "description": "Type: Text\n\nDescription: The Emoji of the Button.",
            "types": ["text"]
        },
        {
            "id": "id",
            "name": "ID / URL",
            "description": "Type: Text\n\nDescription: The ID or URL of the Button.",
            "types": ["text"]
        },
        {
            "id": "enable",
            "name": "Enabled / Disabled",
            "description": "Type: Text\n\nDescription: Whether the button is clickable or not.",
            "types": ["text"]
        }
    ],

    code(cache) {
        const style = this.GetOptionValue("style", cache);
        this.StoreOutputValue(this.GetOptionValue("style", cache), "style", cache);
        this.StoreOutputValue(this.GetOptionValue("label", cache), "label", cache);
        this.StoreOutputValue(this.GetOptionValue("emoji", cache), "emoji", cache);
        this.StoreOutputValue(this.GetOptionValue("enable", cache), "enable", cache);
        this.StoreOutputValue(this.GetOptionValue("id", cache), "id", cache);
    }
}