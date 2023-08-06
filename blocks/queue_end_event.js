module.exports = {
    name: "Queue End [Event]",

    description: "Triggers when a Queue Ends",

    category: ".Audio V2",

    auto_execute: true,

    inputs: [],

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
            "description": "Type: Object, Unspecified\n\nDescription: The Queue Object",
            "types": ["object", "list", "unspecified"]
        }
    ],

    async code(cache) {
        const player = await this.getDependency("DiscordPlayer", cache).player;
        player.events.on("emptyQueue", (queue) => {
            this.StoreOutputValue(queue, "queue", cache);
            this.RunNextBlock("action", cache);
        })
    }
}