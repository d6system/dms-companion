module.exports = {
    name: "Track Start [Event]",

    description: "Triggers when a Track Starts",

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
            "id": "server",
            "name": "Server",
            "description": "Type: Object, Unspecified\n\nDescription: The Server Object",
            "types": ["object", "unspecified"]
        },
        {
            "id": "track",
            "name": "Track",
            "description": "Type: Object, Unspecified\n\nDescription: The Track Object",
            "types": ["object", "unspecified"]
        }
    ],

    async code(cache) {
        const player = await this.getDBB().Dependencies["DiscordPlayer"].player;
        player.events.on("playerStart", (queue, track) => {
            this.StoreOutputValue(queue, "queue", cache);
            this.StoreOutputValue(queue.guild, "server", cache);
            this.StoreOutputValue(track, "track", cache);
            this.RunNextBlock("action", cache);
        })
    }
}