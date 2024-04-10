module.exports = {
    name: "Get Queued Tracks",

    description: "Gets the Queue Tracks",

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
            "id": "tracks",
            "name": "Tracks",
            "description": "Acceptable Types: List, Unspecified\n\nDescription: The Track List",
            "types": ["list", "unspecified"]
        }
    ],

    async code(cache) {
        const guild = this.GetInputValue("guild", cache);
        const { useQueue } = require("discord-player");
        const queue = useQueue(guild.id);
        
        const tracks = queue.tracks.toArray();

        this.StoreOutputValue(tracks, "tracks", cache)
        this.RunNextBlock("action", cache);
    }
}