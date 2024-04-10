module.exports = {
    name: "Get Currently Playing Track",

    description: "Gets the Currently Playing Track",

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
            "id": "track",
            "name": "Track",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The Track Object",
            "types": ["object", "unspecified"]
        }
    ],

    async code(cache) {
        const guild = this.GetInputValue("guild", cache);
        const { useQueue } = require("discord-player");
        const queue = useQueue(guild.id);
        
        if(queue) {
            var track = queue.currentTrack;
        } else {
            var track = undefined;
        }

        this.StoreOutputValue(track, "track", cache)
        this.RunNextBlock("action", cache);
    }
}