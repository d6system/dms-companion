module.exports = {
    name: "Toggle Audio",

    description: "Toggles the audio (Play/Pause).",

    category: ".MOD",

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
        const audio = (queue.connection && queue.connection.paused) || false

        if(audio == false){
            queue.setPaused(true);
        }else if(audio == true){
            queue.setPaused(false);
        }

        this.RunNextBlock("action", cache);
     }          
}