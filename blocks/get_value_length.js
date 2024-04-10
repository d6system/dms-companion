module.exports = {
    name: "Get Value Length",

    description: "Returns the number of items in a list/object, and returns the number of letters/numbers in a string.",

    category: "Extras",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "value",
            "name": "Value",
            "description": "Acceptable Types: List, Object, Text, Unspecified\n\nDescription: The value to get the length of.",
            "types": ["unspecified", "list", "object", "text"],
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
        },
        {
            "id": "number",
            "name": "Number",
            "description": "Type: Number\n\nDescription: The length of the value.",
            "types": ["number"]
        }
    ],

    code(cache) {
        const value = this.GetInputValue("value", cache);

        this.StoreOutputValue(value.length, "number", cache);
        this.RunNextBlock("action", cache);
    }
}