module.exports = {
    name: "Bot Error [Event]",

    description: "When there is a bot error, this event will trigger.",

    category: "Events",

    auto_execute: true,

    inputs: [],

    options: [],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
            "id": "error",
            "name": "Error",
            "description": "Type: Object\n\nDescription: The Error that was caught(FULL ERROR BACKTRACE)",
            "types": ["object", "unspecified"]
        },
        {
            "id": "error_message",
            "name": "Error Message",
            "description": "Type: Object\n\nDescription: The Error Reason(SHORT)",
            "types": ["text", "unspecified"]
        }
    ],

    code(cache) {
        process.on('unhandledRejection', error => {
            this.StoreOutputValue(error, "error", cache);
            this.StoreOutputValue(error.message, "error_message", cache);
            this.RunNextBlock("action", cache);
        });
        process.on('uncaughtException', error => {
            this.StoreOutputValue(error, "error", cache);
            this.StoreOutputValue(error.message, "error_message", cache);
            this.RunNextBlock("action", cache);
        });
        this.client.on('error', error => {
            this.StoreOutputValue(error, "error", cache);
            this.StoreOutputValue(error.message, "error_message", cache);
            this.RunNextBlock("action", cache);
        });
    }
}