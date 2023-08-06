module.exports = {
    name: "Tracks Add [Event]",

    description: "Triggers when Tracks were added",

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
            "id": "tracks",
            "name": "Tracks",
            "description": "Type: List, Unspecified\n\nDescription: The Tracks that were added",
            "types": ["list", "unspecified"]
        }
    ],

    async code(cache) {
        const player = await this.getDependency("DiscordPlayer", cache).player;
        player.events.on("audioTracksAdd", (queue, track) => {
            this.StoreOutputValue(queue, "queue", cache);
            this.StoreOutputValue(track, "tracks", cache);
            this.RunNextBlock("action", cache);
        })
    }
}