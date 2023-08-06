module.exports = {
    name: "Control Bot Audio",

    description: "Controls the current bot audio (i.e. stop, pause or resume audio).",

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
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The server to control the bot audio.",
            "types": ["object", "unspecified"],
            "required": true
        }
    ],

    options: [
        {
            "id": "audio_action_type",
            "name": "Audio Action Type",
            "description": "Description: The type of action to be performed on the current audio.",
            "type": "SELECT",
            "options": {
                "resume": "Resume Audio",
                "pause": "Pause Audio",
                "end": "End Audio",
            }
        }
    ],

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
        const audio_action_type = this.GetOptionValue("audio_action_type", cache) + "";

        const queue = DiscordPlayer.player.getQueue(server);

        if(queue)
            switch (audio_action_type) {
                case "resume":
                    queue.setPaused(false);
                    break;
                case "pause":
                    queue.setPaused(true);
                    break;
                case "end":
                    queue.stop();
                    break;
            }

        this.RunNextBlock("action", cache);
    }
}