module.exports = {
    name: "Change Queue Volume",

    description: "Changes the Server Queue Volume",

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
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The Server Object!",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "amount",
            "name": "Amount",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The Amount of Volume to set!",
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
        },
        {
            "id": "amount",
            "name": "Amount",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The Amount of Volume to set!",
            "types": ["number", "string", "unspecified"],
            "required": true
        }
    ],

    async code(cache) {
        const guild = this.GetInputValue("guild", cache);
        const { useQueue } = require("discord-player");
        const queue = useQueue(guild.id);
        const amount = parseInt(this.GetInputValue("amount", cache)) || 30;
        
        queue.node.setVolume(amount);

        this.StoreOutputValue(amount, "amount", cache)
        this.RunNextBlock("action", cache);
    }
}