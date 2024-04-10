module.exports = {
    name: "Collect Interaction Component(s)",

    description: "Collect Interaction Component(s). Useful for making questions for an user. Please join our Discord server or read the DBB Docs if you do not understand how this block works.",

    category: "Interaction Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "message",
            "name": "Message",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The Message to await for the component(s).",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "max_components",
            "name": "Max Components",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The maximum amount of messages to collect. Default: \"1\". (OPTIONAL)",
            "types": ["number", "unspecified"]
        },
        {
            "id": "user",
            "name": "User",
            "description": "The user to listen for. (OPTIONAL, if \"Target Type\" is Anyone)",
            "types": ["object", "unspecified"]
        },
        {
            "id": "javascript_filter_code",
            "name": "JavaScript Filter Code",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The JavaScript code to filter the result.\n\nVariables:\n\"reaction\" -> The message reaction object\n\"user\" -> The user object that reacted",
            "types": ["text", "unspecified"]
        }
    ],

    options: [
        {
            id: "type",
            name: "The Type of the Interaction",
            description: "Description: This will decide which interaction type the block will react to",
            type: "SELECT",
            options: {
                "button": "Button",
                "stringmenu": "String Select Menu",
                "rolemenu": "Role Select Menu",
                "usermenu": "User Select Menu",
                "channelmenu": "Channel Select Menu",
                "mentionmenu": "Mentionable Select Menu",
                "any": "Any",
            }
        },
        {
            "id": "target_type",
            "name": "Target Type",
            "description": "Who to listen for on the Await Message",
            "type": "SELECT",
            "options": {
                1: "Anyone",
                2: "Specific User",
                3: "Custom Code"
            }
        }
    ],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks after the message(s) is/are received.",
            "types": ["action"]
        },
        {
            "id": "interaction",
            "name": "Interaction",
            "description": "Type: List, Object, Unspecified\n\nDescription: The Interaction of each Interaction ^^",
            "types": ["object", "unspecified"]
        }
    ],

    code(cache) {
        const { ComponentType } = require("discord.js");
        const message = this.GetInputValue("message", cache);
        const max_components = parseInt(this.GetInputValue("max_components", cache)) || 1;
        const javascript_filter_code = this.GetInputValue("javascript_filter_code", cache);

        const user = this.GetInputValue("user", cache);
        const target_type = parseInt(this.GetOptionValue("target_type", cache));
        const type = this.GetOptionValue("type", cache)
        let result;
        switch (target_type) {
            case 2:
                result = `i.user.id == ${user.id}`;
                break;
            case 1:
                result = true;
                break;
            case 3:
                result = javascript_filter_code;
                break;
        }

        let ctype;
        switch (type) {
            case "button":
                ctype = ComponentType.Button;
                break;
            case "stringmenu":
                ctype = ComponentType.StringSelect;
                break;
            case "rolemenu":
                ctype = ComponentType.RoleSelect;
                break;
            case "usermenu":
                ctype = ComponentType.UserSelect;
                break;
            case "channelmenu":
                ctype = ComponentType.ChannelSelect;
                break;
            case "mentionmenu":
                ctype = ComponentType.MentionableSelect;
                break;
            case "any":
                break;
        }

        const collector = message.createMessageComponentCollector({
            filter: i => {
                //i.deferUpdate();
                const user = i.user;
                const member = i.member;

                try {
                    return Boolean(eval(result));
                } catch {
                    return false;
                }
            },
            componentType: ctype,
            max: max_components
        })
        collector.on("collect", async i => {
            this.StoreOutputValue(i, "interaction", cache);
            this.RunNextBlock("action", cache);
        })
    }
}