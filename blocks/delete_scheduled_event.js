module.exports = {
    name: "Delete Scheduled Event",

    description: "Deletes a Scheduled Event.",

    category: "Scheduled Event",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "event",
            "name": "Event",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The Scheduled Event to delete.",
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

    code(cache) {
        const event = this.GetInputValue("event", cache);

        event.delete()
            .catch(console.error);
    }
}