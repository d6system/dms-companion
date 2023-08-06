module.exports = {
    name: "Merge Actions 5x",

    description: "Merge the two \"action\"'s into a single one.",

    category: ".MOD",

    inputs: [
        {
            "id": "action1",
            "name": "Action 1",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "action2",
            "name": "Action 2",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "action3",
            "name": "Action 3",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "action4",
            "name": "Action 4",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "action5",
            "name": "Action 5",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
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