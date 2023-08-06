module.exports = {
    name: "Thread Creation [Event]",

    description: "Emitted when a thread is created",

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
            "description": "A discord thread object",
            "types": ["object"]
        },
        {
            "id": "newlyCreated",
            "name": "Newly Created?",
            "description": "If the thread is newly created, most of the time this is true",
            "types": ["boolean"]
        }
    ],

    code(cache) {
        const { Events } = require("discord.js");
        this.events.on(Events.ThreadCreate, (thread, newlyCreated) => {
            this.StoreOutputValue(thread, "thread", cache);
            this.StoreOutputValue(newlyCreated, "newlyCreated", cache);
            this.RunNextBlock("action", cache);
        })
    }
}