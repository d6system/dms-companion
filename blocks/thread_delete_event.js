module.exports = {
    name: "Thread Deletion [Event]",

    description: "Emitted when a thread is deleted",

    category: "Threads",

    auto_execute: true,

    inputs: [

    ],

    options: [
        
    ],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
            "id": "thread",
            "name": "Thread Channel",
            "description": "A discord thread object, of the deleted thread",
            "types": ["object"]
        }
    ],

    code(cache) {
        const { Events } = require("discord.js");
        this.events.on(Events.ThreadDelete, (thread) => {
            this.StoreOutputValue(thread, "thread", cache);
            this.RunNextBlock("action", cache);
        })
    }
}