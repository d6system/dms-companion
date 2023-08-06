module.exports = {
    name: "Loop Server Queue",

    description: "Sets a loop for a server audio queue.",

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
            "description": "Acceptable Types: Object, Text, Unspecified\n\nDescription: The server to loop its audio queue. Supports server ID.",
            "types": ["object", "text", "unspecified"],
            "required": true
        }
    ],

    options: [
        {
            "id": "loop_type",
            "name": "Loop Type",
            "description": "Description: The type of loop to be performed on the server audio queue.",
            "type": "SELECT",
            "options": {
                "all": "Loop All Audios",
                "queue": "Loop Current Queue",
                "current": "Loop Current Audio",
                "off": "No Loop"
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
        const loop_type = this.GetOptionValue("loop_type", cache) + "";

        const queue = DiscordPlayer.player.getQueue(server);

        if(queue && queue.tracks.length) {
            let mode;
            switch (loop_type) {
                case "all":
                    mode = DiscordPlayer.module.QueueRepeatMode.AUTOPLAY
                    break;
                case "queue":
                    mode = DiscordPlayer.module.QueueRepeatMode.QUEUE
                    break;
                case "current":
                    mode = DiscordPlayer.module.QueueRepeatMode.TRACK
                    break;
                case "off":
                    mode = DiscordPlayer.module.QueueRepeatMode.OFF
                    break;
            }

            if (mode != undefined)
                queue.setRepeatMode(mode);
        }

        this.RunNextBlock("action", cache);
    }
}