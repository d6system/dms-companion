module.exports = {
    name: "Join Voice Channel",

    description: "Joins the voice channel.",

    category: "Audio Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "voice_channel",
            "name": "Voice Channel",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The voice channel to join.",
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
        }
    ],

    code(cache) {
        const DiscordPlayer = this.getDependency("DiscordPlayer", cache.name)

        const voice_channel = this.GetInputValue("voice_channel", cache);

        const queue = DiscordPlayer.player.createQueue(voice_channel);

        if (queue.connection)
            this.RunNextBlock("action", cache);
        else
            queue.connect(voice_channel).then(() => {
                this.RunNextBlock("action", cache);
            });
    }
}