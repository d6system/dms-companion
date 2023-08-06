module.exports = {
    name: "Shuffle Server Queue",

    description: "Shuffles or restores the server queue if possible.",

    category: "Audio Stuff",

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
            "description": "Acceptable Types: Object, Text, Unspecified\n\nDescription: The server to shuffle its audio queue. Supports server ID.",
            "types": ["object", "text", "unspecified"],
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
        }
    ],

    code(cache) {
        const DiscordPlayer = this.getDependency("DiscordPlayer", cache.name)

        const server = this.GetInputValue("server", cache);

        const queue = DiscordPlayer.player.getQueue(server);
        
        if(queue && queue.tracks.length)
            queue.shuffle();

        this.RunNextBlock("action", cache);
    }
}