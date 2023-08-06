module.exports = {
    name: "Player Error [Event]",

    description: "Triggers when the Player has an Error",

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
            "id": "error",
            "name": "Error",
            "description": "Type: Text, Unspecified\n\nDescription: The Error of the Player",
            "types": ["text", "unspecified"]
        }
    ],

    async code(cache) {
        const player = await this.getDependency("DiscordPlayer", cache).player;
        player.events.on("error", (queue, error) => {
            this.StoreOutputValue(queue, "queue", cache);
            this.StoreOutputValue(error, "error", cache);
            this.RunNextBlock("action", cache);
        })
    }
}