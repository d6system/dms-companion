module.exports = {
    name: "Find Solo Server (For 1 DC-Server)",

    description: "Find your Solo Discord Server",

    category: "Server Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
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
            "id": "result",
            "name": "Server",
            "description": "Type: Unspecified\n\nDescription: The information obtained from the object.",
            "types": ["object"]
        }
    ],

    async code(cache) {
         const client = this.client;

        list = Array.from(client.guilds.cache.values());
        result = list[0];

        this.StoreOutputValue(result, "result", cache);
        this.RunNextBlock("action", cache);
    }
}