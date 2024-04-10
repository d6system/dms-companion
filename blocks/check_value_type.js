module.exports = {
    name: "Check Value Type",

    description: "Checks if the Type of a Value equals the Option Type Set.",

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
            "description": "Acceptable Types: Unspecified, Undefined, Null, Object, Boolean, Date, Number, Text, List\n\nDescription: The Value to check the Type of.",
            "types": ["unspecified", "undefined", "null", "object", "boolean", "date", "number", "text", "list"],
            "required": true
        }
    ],

    options: [
        {
            "id": "type",
            "name": "Check Type",
            "description": "Description: The Type the value should be to return true",
            "type": "SELECT",
            "options": {
                "bool": "Boolean",
                "func": "Function",
                "num": "Number/Int",
                "obj": "Object",
                "list": "List/Array",
                "text": "Text/String",
                "undf": "Undefined"
            }
        }
    ],

    outputs: [
        {
            "id": "action1",
            "name": "Action (If True)",
            "description": "Type: Action\n\nDescription: Executes the following blocks if true.",
            "types": ["action"]
        },
        {
            "id": "action2",
            "name": "Action (If False)",
            "description": "Type: Action\n\nDescription: Executes the following blocks if false.",
            "types": ["action"]
        }
    ],

    code(cache) {
        const value = this.GetInputValue("value", cache);
        const type = this.GetOptionValue("type", cache) + "";

        let result;
        switch(type) {
            case "bool":
                if(!value) return this.RunNextBlock("action2", cache);
                result = typeof value == "boolean"
                break;
            case "func":
                if(!value) return this.RunNextBlock("action2", cache);
                result = typeof value == "function"
                break;
            case "num":
                if(!value) return this.RunNextBlock("action2", cache);
                result = typeof value == "number"
                break;
            case "obj":
                if(!value) return this.RunNextBlock("action2", cache);
                result = typeof value == "object"
                break;
            case "list":
                if(!value) return this.RunNextBlock("action2", cache);
                result = Array.isArray(value)
                break;
            case "text":
                if(!value) return this.RunNextBlock("action2", cache);
                result = typeof value == "string"
                break;
            case "undf":
                result = typeof value == "undefined"
                break;
        }

        this.RunNextBlock(result ? "action1" : "action2", cache);
    }
}