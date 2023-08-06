module.exports = {
    name: "Thread Member Update [Event]",

    description: "Emitted when a member is added/removed from a thread",

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
            "id": "added",
            "name": "Added Thread Member",
            "description": "The members added to the thread",
            "types": ["object"]
        },
        {
            "id": "removed",
            "name": "Removed Thread Member",
            "description": "The members removed from the thread",
            "types": ["object"]
        }

    ],

    code(cache) {
        const { Events } = require("discord.js");
        this.events.on(Events.ThreadMembersUpdate, (addedMembers, removedMembers, thread) => {
            this.StoreOutputValue(thread, "thread", cache);
            if (Array.from(addedMembers)[0]) {this.StoreOutputValue((Array.from(addedMembers)[0][1]), "added", cache)};
            if (Array.from(removedMembers)[0]) {this.StoreOutputValue((Array.from(removedMembers)[0][1]), "removed", cache)};
            this.RunNextBlock("action", cache);
        })
    }
}