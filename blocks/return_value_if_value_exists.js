module.exports = {
    name: "Return Value If Value Exists",

    description: "Checks the first \"Value\" exists, if not; it will return \"undefined\".",

    category: "Extras",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "value1",
            "name": "Value",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Object, Boolean, Date, Number, Text, List\n\nDescription: The value you want to check.",
            "types": ["unspecified", "undefined", "null", "object", "boolean", "date", "number", "text", "list"]
        },
        {
            "id": "value2",
            "name": "Return Value",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Object, Boolean, Date, Number, Text, List\n\nDescription: Will return this value if the first value exists, if not; will return \"undefined\".",
            "types": ["unspecified", "undefined", "null", "object", "boolean", "date", "number", "text", "list"]
        },
    ],

    options: [
        {
            "id": "value2",
            "name": "Return Value",
            "description": "Description: Will return this value if the first value exists, if not; will return \"undefined\".",
            "type": "TEXT"
        }
    ],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
            "id": "value2",
            "name": "Return Value",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Object, Boolean, Date, Number, Text, List\n\nDescription: The returned value.",
            "types": ["unspecified", "undefined", "null", "object", "boolean", "date", "number", "text", "list"]
        },
    ],

    code(cache) {
        const value1 = this.GetInputValue("value1", cache);
        const value2 = this.GetInputValue("value2", cache) || this.GetOptionValue("value2", cache);

        this.StoreOutputValue(value1 ? value1.length >= 1 ? value2 : undefined : undefined, "value2", cache)
        this.RunNextBlock("action", cache)
    }
}