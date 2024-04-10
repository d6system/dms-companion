module.exports = {
    name: "Find Voice Connection",

    description: "Finds a Voice Connection of a Guild",

    category: "Audio Stuff",

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
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The Guild to get the Voice Connection from!",
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
        },
        {
            "id": "connection",
            "name": "Connection",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The voice channel to join.",
            "types": ["object", "unspecified"]
        }
    ],

    async code(cache) {

        const guild = this.GetInputValue("guild", cache);

        const { getVoiceConnection } = require('@discordjs/voice');

        const connection = await getVoiceConnection(guild.id);

        this.StoreOutputValue(connection, "connection", cache)
        this.RunNextBlock("action", cache);
    }
}