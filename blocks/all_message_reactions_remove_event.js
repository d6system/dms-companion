module.exports = {
    name: "All Message Reactions Add [Event]",

    description: "When all reactions are removed from a message, this event will trigger.",

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
            "id": "message",
            "name": "Message",
            "description": "Type: Object\n\nDescription: The message the reactions were removed from.",
            "types": ["object"]
        },
        {
            "id": "reactions",
            "name": "Reactions",
            "description": "Type: List\n\nDescription: The cached reactions removed.",
            "types": ["list"]
        }
    ],

    code(cache) {
        this.events.on("messageReactionRemoveAll", (message, reactions) => {
            this.StoreOutputValue(message, "message", cache);
            this.StoreOutputValue(reactions, "reactions", cache);
            this.RunNextBlock("action", cache);
        });
    }
}