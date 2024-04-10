module.exports = {
    name: "Find Scheduled Event",

    description: "Finds a Scheduled Event.",

    category: "Scheduled Event",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "server",
            "name": "Server",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The server to find the Scheduled Event.",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "search_value",
            "name": "Search Value",
            "description": "Acceptable Types: Unspecified, Text, Number\n\nDescription: The value according to your choice in the \"Find Scheduled Event By\" option.",
            "types": ["unspecified", "text", "number", "object"],
            "required": true
        }
    ],

    options: [],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
            "id": "event",
            "name": "Event",
            "description": "Type: Object\n\nDescription: The Scheduled Event found if possible.",
            "types": ["object"]
        }
    ],

    async code(cache) {        
        const server = this.GetInputValue("server", cache, false, this.client);
        const search_value = this.GetInputValue("search_value", cache);

        const events = server.scheduledEvents;

        let result;

        result = await events.fetch(search_value)

        this.StoreOutputValue(result, "event", cache);
        this.RunNextBlock("action", cache);
    }
}