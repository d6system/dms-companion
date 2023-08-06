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
            "id": "queue",
            "name": "Queue",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The Queue Object!",
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
                "pause": "Pause/Resume",
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
        const queue = this.GetInputValue("queue", cache);
        const action = this.GetOptionValue("action", cache);

        switch (action) {
            case "pause":
                if (queue.isPlaying()) {
                    queue.node.pause();
                } else if (!queue.isPlaying()) {
                    queue.node.resume();
                }
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