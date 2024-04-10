module.exports = {
    name: "Control Queue",

    description: "Control Queue with different Actions",

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
            "id": "action",
            "name": "Action",
            "description": "Description: What to do with the Queue.",
            "type": "SELECT",
            "options": {
                "pause": "Pause",
                "resume": "Resume",
                "play": "Play",
                "skip": "Skip",
                "stop": "Stop",
                "shuffle": "Shuffle",
                "clear": "Clear",
                "back": "Back"
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
        const action = this.GetOptionValue("action", cache);

        switch (action) {
            case "pause":
                queue.node.pause();
                break;
            case "resume":
                queue.node.resume();
                break;
            case "play":
                queue.node.play();
                break;
            case "skip":
                await queue.node.skip();
                break;
            case "stop":
                queue.node.stop();
                break;
            case "shuffle":
                queue.tracks.shuffle();
                break;
            case "clear":
                queue.tracks.clear();
                break;
            case "back":
                queue.history.back();
                break;
        }
        this.RunNextBlock("action", cache);
    }
}