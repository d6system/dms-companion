module.exports = {
    name: "Leave Voice Channel",

    description: "Leaves the voice channel.",

    category: "Audio Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "connection",
            "name": "Connection",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The Voice Connection",
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

        const connection = this.GetInputValue("connection", cache);

        await connection.destroy();

        this.RunNextBlock("action", cache);
    }
}