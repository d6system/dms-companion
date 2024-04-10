module.exports = {
    name: "Switch Audio Channel",

    description: "Switch To a Different Audio Channel",

    category: ".Audio V2",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "voicechannel",
            "name": "Voice Channel",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The Voice Channel to Switch to!",
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

    async code(cache) {
        const voicechannel = this.GetInputValue("voicechannel", cache);
        const { useQueue } = require("discord-player");
        const queue = useQueue(voicechannel.guild.id);

        await queue.connect(voicechannel);

        this.StoreOutputValue(queue, "queue", cache);
        this.RunNextBlock("action", cache);
    }
}