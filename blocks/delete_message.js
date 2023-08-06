module.exports = {
    name: "Delete Message",

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
            "id": "message",
            "name": "Message",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The message to delete.",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "timeout",
            "name": "Timeout (Milliseconds)",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: How long to wait to delete the message in milliseconds. Default: \"0\". (OPTIONAL)",
            "types": ["number", "unspecified"]
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
        const message = this.GetInputValue("message", cache);
        const timeout = Math.max(0, parseInt(this.GetInputValue("timeout", cache)));

        setTimeout(() => 
            message.delete().then(() => {
                this.RunNextBlock("action", cache);
            })
        , timeout);
    }
}