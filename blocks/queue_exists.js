module.exports = {
    name: "Queue (Exists?)",

    description: "This Block Finds a Queue of a Server by linelab.dev",

    category: ".MJ",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "guild",
            "name": "Server",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The Server Object",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "channel",
            "name": "Text Channel",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The text channel to send no queue messsage to",
            "types": ["object", "unspecified"],
            "required": true
        }
    ],

    options: [
        {
            "id": "message",
            "name": "No queue message",
            "description": "Description: Sends message, when no queue",
            "type": "TEXT"
        }
    ],

    outputs: [
        {
            "id": "action",
            "name": "Queue exists",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
            "id": "noqueue",
            "name": "No queue",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        }
    ],

    async code(cache) {
        const { useQueue } = require('discord-player');
        const message = this.GetOptionValue("message", cache);
        const guild = await this.GetInputValue("guild", cache);
        const channel = await this.GetInputValue("channel", cache);

        const queue = await useQueue(guild);

        if (queue) {
            this.RunNextBlock("action", cache);
        } else {
            if (message) {        
                channel.send(message);
            }
            this.RunNextBlock("noqueue", cache);
        }
    }
}