module.exports = {
    name: "Await Message Reaction(s)",

    description: "Awaits for the message reaction(s). Useful for making questions for an user using message reaction. Please join our Discord server or read the DBB Docs if you do not understand how this block works.",

    category: "Message Stuff",

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
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The message to await for the reaction(s).",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "max_reactions",
            "name": "Max Reactions",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The maximum total amount of reactions to collect. Default: \"1\". (OPTIONAL)",
            "types": ["number", "unspecified"]
        },
        {
            "id": "max_time",
            "name": "Max Time",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: How long to run the collector of message reactions in seconds. Default: \"60\". (OPTIONAL)",
            "types": ["number", "unspecified"]
        },
        {
            "id": "max_emojis",
            "name": "Maximum Emojis",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The maximum number of emojis to collect. (OPTIONAL)",
            "types": ["number", "unspecified"]
        },
        {
            "id": "max_users",
            "name": "Maximum Users",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The maximum number of users to react. (OPTIONAL)",
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
            "id": "target_type",
            "name": "Target Type",
            "description": "Who to listen for on the Await Message",
            "type": "SELECT",
            "options": {
                1: "Anyone",
                2: "Specific User",
                3: "Custom Code"
            }
        },
        {
            "id": "emoji_input",
            "name": "Emoji",
            "description": "Ussage is: <emoji>, <emoji>, <emoji> \nYou can leave this empty if you didn't select for reactions.\nYou can put as many emojis as discord allows.\nThe user input only gets used if you selected specific user.",
            "type": "JUST GIVE ME TEXT FOR FUCK SAKE"
        }
    ],

    outputs: [
        {
            "id": "action1",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks after the message reaction(s) is/are received.",
            "types": ["action"]
        },
        {
            "id": "action2",
            "name": "Action (Timeout)",
            "description": "Type: Action\n\nDescription: Executes the following blocks after the timeout expires.",
            "types": ["action"]
        },
        {
            "id": "message_reactions",
            "name": "Message Reactions",
            "description": "Type: List, Object, unspecified\n\nDescription: The list or Object containing the message reaction(s) received.",
            "types": ["list", "object", "unspecified"]
        }
    ],

    code(cache) {
        const message = this.GetInputValue("message", cache);
        const emoji_input = this.GetOptionValue("emoji_input", cache).split("<").join("'<").split(">").join(">'");
        const max_reactions = parseInt(this.GetInputValue("max_reactions", cache)) || 1;
        const max_emojis = parseInt(this.GetInputValue("max_emojis", cache));
        const max_users = parseInt(this.GetInputValue("max_users", cache));
        const max_time = parseInt(this.GetInputValue("max_time", cache)) * 1000 || 60000;

        const javascript_filter_code = this.GetInputValue("javascript_filter_code", cache);

        const target_user = this.GetInputValue("user", cache);
        const target_type = parseInt(this.GetOptionValue("target_type", cache));

        const emojis = emoji_input.split(", ")

        const filter = (reaction, user) => {
            if(target_type == 1) {
                return emojis.includes(reaction.emoji.name) && !user.bot;
            } else if (target_type == 2) {
                return emojis.includes(reaction.emoji.name) && user.id === target_user.id && !user.bot;
            } else {
                try {
                    return Boolean(eval(javascript_filter_code));
                } catch {
                    return false;
                }
            }
        };

        message.awaitReactions({filter, max: max_reactions, maxEmojis: max_emojis, maxUsers: max_users, time: max_time, errors: ["time"]})
            .then(reactions => {
                if (reactions.size == 1) {
                    this.StoreOutputValue(reactions.first(), "message_reactions", cache);
                } else {
                    this.StoreOutputValue(Array.from(reactions.values()), "message_reactions", cache);
                }
                this.RunNextBlock("action1", cache);
            })
            .catch(reactions => {
                if (reactions.size == 1) {
                    this.StoreOutputValue(reactions.first(), "message_reactions", cache);
                } else {
                    this.StoreOutputValue(Array.from(reactions.values()), "message_reactions", cache);
                }
                this.RunNextBlock("action2", cache);
            });
    }
}