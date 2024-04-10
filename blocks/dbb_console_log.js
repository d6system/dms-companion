module.exports = {
    name: "DBB Console Log",

    description: "Sends a value to your console, with DBB Formatting.",

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
            "description": "Acceptable Types: Unspecified, Undefined, Null, Object, Boolean, Date, Number, Text, List\n\nDescription: The value to send to your console.",
            "types": ["unspecified", "undefined", "null", "object", "boolean", "date", "number", "text", "list"]
        }
    ],

    options: [
        {
            id: "type",
            "name": "Log Type",
            "description": "The Type you want to log, these Types are available: \nINFO, WARN, SUCCESS, LOG.",
            "type": "SELECT",
            "options": {
                INFO: "INFO",
                WARN: "WARN",
                SUCCESS: "SUCCESS",
                LOG: "LOG",
            }
        },
        {
            id: "value",
            name: "Value",
            description: "Description: The value of the Console Log",
            type: "TEXT"
        }
    ],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        }
    ],

    code(cache) {
        let content = this.GetInputValue("value", cache);

        if (content == undefined) {
            content = this.GetOptionValue("value", cache);
        }

        const type = this.GetOptionValue("type", cache);

        this.console(type, content);

        this.RunNextBlock("action", cache);
    }
}