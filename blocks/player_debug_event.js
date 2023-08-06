module.exports = {
    name: "Player Debug [Event]",

    description: "Triggers when the Player sends a Debug Message",

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
            "types": ["object", "unspecified"]
        },
        {
            "id": "msg",
            "name": "Message",
            "description": "Type: Text, Unspecified\n\nDescription: The Message of the Debug Event",
            "types": ["text", "unspecified"]
        }
    ],

    async code(cache) {
        const player = await this.getDependency("DiscordPlayer", cache).player;
        player.events.on("debug", (queue, msg) => {
            this.StoreOutputValue(queue, "queue", cache);
            this.StoreOutputValue(msg, "msg", cache);
            this.RunNextBlock("action", cache);
        })
    }
}