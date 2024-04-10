module.exports = {
    name: "Await Message(s)",

    description: "Awaits for the message(s). Useful for making questions for an user. Please join our Discord server or read the DBB Docs if you do not understand how this block works.",

    category: "Message Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "channel",
            "name": "Channel",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The text channel or DM channel to await for the message(s).",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "max_messages",
            "name": "Max Messages",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The maximum amount of messages to collect. Default: \"1\". (OPTIONAL)",
            "types": ["number", "unspecified"]
        },
        {
            "id": "max_time",
            "name": "Max Time",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: How long to run the collector of messages in seconds. Default: \"60\". (OPTIONAL)",
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
    ],

    outputs: [
        {
            "id": "action1",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks after the message(s) is/are received.",
            "types": ["action"]
        },
        {
            "id": "action2",
            "name": "Action (Timeout)",
            "description": "Type: Action\n\nDescription: Executes the following blocks after the timeout expires.",
            "types": ["action"]
        },
        {
            "id": "messages",
            "name": "Message(s)",
            "description": "Type: List, Object, Unspecified\n\nDescription: The list or Object containing the message(s) received.",
            "types": ["list", "object", "unspecified"]
        }
    ],

    code(cache) {
        const channel = this.GetInputValue("channel", cache);
        const max_messages = parseInt(this.GetInputValue("max_messages", cache)) || 1;
        const max_time = parseInt(this.GetInputValue("max_time", cache))*1000 || 60000;
        const javascript_filter_code = this.GetInputValue("javascript_filter_code", cache);

        const user = this.GetInputValue("user", cache);
        const target_type = parseInt(this.GetOptionValue("target_type", cache));
        let result;
        switch (target_type) {
            case 2:
                result = `message.author.id == ${user.id}`;
                break;
            case 1:
                result = true;
                break;
            case 3:
                result = javascript_filter_code;
                break;
        }

        channel.awaitMessages({
            filter: message => {
                const user = message.author;
                const member = message.member;

                try {
                    return Boolean(eval(result));
                } catch {
                    return false;
                }
            },
            errors: ["time"],
            max: max_messages,
            time: max_time
        })
            .then(msgs => {
                if(msgs.size == 1) {
                    this.StoreOutputValue(msgs.first(), "messages", cache);
                } else {
                    this.StoreOutputValue(Array.from(msgs.values()), "messages", cache);
                }
                this.RunNextBlock("action1", cache);
            })
            .catch(msgs => {
                if(msgs.size == 1) {
                    this.StoreOutputValue(msgs.first(), "messages", cache);
                } else {
                    this.StoreOutputValue(Array.from(msgs.values()), "messages", cache);
                }
                this.RunNextBlock("action2", cache);
            });
    }
}