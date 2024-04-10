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

    options: [
        {
            "id": "checktype",
            "name": "Mode",
            "description": "The Type you want to log, these Types are available: \nINFO, WARN, SUCCESS, LOG.",
            "type": "SELECT",
            "options": {
                1: "With Bot",
                2: "Non Bot",
            }
        },
    ],

    outputs: [
        {
            "id": "action1",
            "name": "Action (True)",
            "description": "Type: Runs the next block.",
            "types": ["action"]
        },
        {
            "id": "action2",
            "name": "Action (False)",
            "description": "Type: Action\n\nDescription: The number.",
            "types": ["action"]
        }
    ],

    code(cache) {
        const voice_channel = this.GetInputValue("voice_channel", cache);
        const checktype = parseInt(this.GetOptionValue("checktype", cache));

        let amount = voice_channel.members.size;

        switch (checktype) {
            case 1:
                if (amount >= 1) {
                    this.RunNextBlock("action1", cache)
                } else {
                    this.RunNextBlock("action2", cache)
                }
                break;
            case 2:
                if (voice_channel.members.find(x => x.user.id == this.client.user.id) ? (amount - 1) >= 1 ? true : false : amount >= 1) {
                    this.RunNextBlock("action1", cache)
                } else {
                    this.RunNextBlock("action2", cache)
                }
                break;
        }
    }
}