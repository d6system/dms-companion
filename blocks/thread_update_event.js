module.exports = {
    name: "Thread Update [Event]",

    description: "Emitted when a thread has been changed - e.g. name change, archive state change, locked state change",

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
            "id": "oldthread",
            "name": "Old Thread Channel",
            "description": "A discord thread object, of the old thread",
            "types": ["object"]
        },
        {
            "id": "newthread",
            "name": "New Thread Channel",
            "description": "A discord thread object, of the new thread",
            "types": ["object"]
        }
    ],

    code(cache) {
        const { Events } = require("discord.js");
        this.events.on(Events.ThreadUpdate, (oldThread, newThread) => {
            this.StoreOutputValue(oldThread, "oldthread", cache);
            this.StoreOutputValue(newThread, "newthread", cache);
            this.RunNextBlock("action", cache);
        })
    }
}