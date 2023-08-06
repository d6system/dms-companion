module.exports = {
    name: "Find Queue",

    description: "This Block Finds a Queue of a Server by @XCraftTM",

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
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The Server Object",
            "types": ["object", "unspecified"],
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
            "id": "queue",
            "name": "Queue",
            "description": "Type: Object, Unspecified\n\nDescription: The Queue Object!",
            "types": ["object", "unspecified"]
        }
    ],

    async code(cache) {
        const { useQueue } = require('discord-player');

        const guild = await this.GetInputValue("guild", cache);
        
        const queue = await useQueue(guild);
		
		this.StoreOutputValue(queue, "queue", cache);
        this.RunNextBlock("action", cache);
    }
}