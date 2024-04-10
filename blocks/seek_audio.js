module.exports = {
    name: "Seek Audio",

    description: "Seek current Song to a specific time.",

    category: ".Audio V2",

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
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The Server to seek in!",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "amount",
            "name": "Amount",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The Time to seek to.",
            "types": ["number", "string", "unspecified"],
            "required": true
        }
    ],

    options: [],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        }
    ],

    async code(cache) {
        const amount = parseInt(this.GetInputValue("amount", cache)) || 0;

        const guild = this.GetInputValue("guild", cache);
        const { useQueue } = require("discord-player");
        const queue = useQueue(guild.id);

        queue.node.seek(amount);

        this.RunNextBlock("action", cache);
    }
}