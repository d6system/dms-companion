module.exports = {
    name: "Get Song Queue",

    description: "Gets the bot audio information from the server.\n\nNOTE: Your bot needs to be on a voice channel and playing any audio for this block to work well.",

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
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The server to get the bot audio information.",
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
            "id": "result",
            "name": "Result",
            "description": "Type: Unspecified\n\nDescription: The information obtained from the bot audio.",
            "types": ["unspecified"]
        }
    ],

    async code(cache, DBB) {
        const DiscordPlayer = this.getDependency("DiscordPlayer", cache.name)

        const server = this.GetInputValue("server", cache);
        const audio_info = parseInt(this.GetOptionValue("audio_info", cache));

        const queue = DiscordPlayer.player.getQueue(server);

        let result;
        
        result = queue.tracks.id
        const results = result

        console.log(result)
                    
        this.StoreOutputValue(result, "result", cache);
        this.RunNextBlock("action", cache);
    }
}