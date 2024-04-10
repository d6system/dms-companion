module.exports = {
    name: "Merge Actions",

    description: "Merge multiple \"action\"'s into a single one.",

    category: "Extras",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"],
            "multiInput": true
        }
    ],

    options: [],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks.",
            "types": ["action"]
        }
    ],

    code: function(cache) {
        this.RunNextBlock("action", cache);
    }
}