module.exports = {
    name: "Loop Audio",

    description: "Change the Loop Mode of the Current Queue!",

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

    options: [
        {
            "id": "mode",
            "name": "Loop Mode",
            "description": "Description: Loop Mode",
            "type": "SELECT",
            "options": {
                "track": "Loop Track",
                "queue": "Loop Queue",
                "autoplay": "Autoplay",
                "off": "Off"
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

    async code(cache) {
        const guild = this.GetInputValue("guild", cache);
        const { useQueue } = require("discord-player");
        const queue = useQueue(guild.id);
        const mode = this.GetOptionValue("mode", cache);
        const { QueueRepeatMode } = require("discord-player");

        switch (mode) {
            case "track":
                queue.setRepeatMode(QueueRepeatMode.TRACK);
                break;
            case "queue":
                queue.setRepeatMode(QueueRepeatMode.QUEUE);
                break;
            case "autoplay":
                queue.setRepeatMode(QueueRepeatMode.AUTOPLAY);
                break;
            case "off":
                queue.setRepeatMode(QueueRepeatMode.OFF);
                break;
        }

        this.RunNextBlock("action", cache);
    }
}