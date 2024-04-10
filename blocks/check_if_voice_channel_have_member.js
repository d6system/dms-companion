module.exports = {
    name: "Check if voice channel have no member",

    description: "If a voice channel have no member.",

    category: "Channel Stuff",

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
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The voice channel to get the information.",
            "types": ["object", "unspecified"],
            "required": true
        }
    ],

    options: [],

    outputs: [
        {
            "id": "action1",
            "name": "Action if True",
            "description": "Type: Runs the next block.",
            "types": ["action"]
        },
        {
            "id": "action2",
            "name": "Action if False",
            "description": "Type: Number\n\nDescription: The number.",
            "types": ["action"]
        }
    ],

    async code(cache) {
        const voice_channel = this.GetInputValue("voice_channel", cache);

        if (parseInt(Array.from(voice_channel.members.values()).length) == 0){this.RunNextBlock("action1", cache)}
        else{this.RunNextBlock("action2", cache)}
    }
}