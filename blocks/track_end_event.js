module.exports = {
    name: "Track End [Event]",

    description: "Triggers when a Track Ends",

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
        },
        {
            "id": "track",
            "name": "Track",
            "description": "Type: Object, Unspecified\n\nDescription: The Track Object",
            "types": ["object", "list", "unspecified"]
        }
    ],

    async code(cache) {
        const player = await this.getDependency("DiscordPlayer", cache).player;
        player.events.on("playerFinish", (queue, track) => {
            this.StoreOutputValue(queue, "queue", cache);
            this.StoreOutputValue(track, "track", cache);
            this.RunNextBlock("action", cache);
        })
    }
}