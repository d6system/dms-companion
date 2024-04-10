module.exports = {
    name: "Delete Message (MOD)",

    description: "Deletes the message.",

    category: "Message Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "object",
            "name": "Message",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: How long to wait to delete the message in milliseconds. Default: \"0\". (OPTIONAL)",
            "types": ["object", "unspecified"]
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
            "id": "action_err",
            "name": "Action (Error)",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
            "id": "error",
            "name": "Error Message",
            "description": "Type: Unspecified\n\nDescription: The information obtained from the object.",
            "types": ["unspecified", "text", "number", "list"]
        }
    ],

    async code(cache) {
        const message = this.GetInputValue("object", cache);
        await message.delete().catch((e) => {
             this.StoreOutputValue(e.message, "error", cache);
             this.RunNextBlock("action_err", cache);
             console.err(e);
        });
        this.RunNextBlock("action", cache);
    }
}