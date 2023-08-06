module.exports = {
    name: "Switch (conditional)",

    description: "compares the input to the values, and only runs the output of the matching case.",

    category: "Extras",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"],
            "required": true
        },
        {
            "id": "value1",
            "name": "Input",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Object, Boolean, Date, Number, Text\n\nDescription: the input for the switch.",
            "types": ["unspecified", "undefined", "null", "object", "boolean", "date", "number", "text"]
        },
        {
            "id": "sw0",
            "name": "Value 1",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Object, Boolean, Date, Number, Text\n\nDescription: The 1st value to compare the 'Input' to.",
            "types": ["unspecified", "undefined", "null", "object", "boolean", "date", "number", "text"]
        },
        {
            "id": "sw1",
            "name": "Value 2",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Object, Boolean, Date, Number, Text\n\nDescription: The 2nd value to compare the 'Input' to.",
            "types": ["unspecified", "undefined", "null", "object", "boolean", "date", "number", "text"]
        },
        {
            "id": "sw2",
            "name": "Value 3",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Object, Boolean, Date, Number, Text\n\nDescription: The 3rd value to compare the 'Input' to.",
            "types": ["unspecified", "undefined", "null", "object", "boolean", "date", "number", "text"]
        },
        {
            "id": "sw3",
            "name": "Value 4",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Object, Boolean, Date, Number, Text\n\nDescription: The 4th value to compare the 'Input' to.",
            "types": ["unspecified", "undefined", "null", "object", "boolean", "date", "number", "text"]
        },
        {
            "id": "sw4",
            "name": "Value 5",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Object, Boolean, Date, Number, Text\n\nDescription: The 5th value to compare the 'Input' to.",
            "types": ["unspecified", "undefined", "null", "object", "boolean", "date", "number", "text"]
        },
        {
            "id": "sw5",
            "name": "Value 6",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Object, Boolean, Date, Number, Text\n\nDescription: The 6th value to compare the 'Input' to.",
            "types": ["unspecified", "undefined", "null", "object", "boolean", "date", "number", "text"]
        }
    ],

    options: [
        {
            "id": "operation",
            "name": "Comparison Type",
            "description": "Description: The type of comparison between the two values.",
            "type": "SELECT",
            "options": {
                "equal": "Equal To",
                "includes": "Includes",
            }
        }
    ],

    outputs: [
        {
            "id": "swo0",
            "name": "Value 1 Action",
            "description": "Type: Action\n\nDescription: Runs this action if the 'input' matches 'Value 1.",
            "types": ["action"]
        },
        {
            "id": "swo1",
            "name": "Value 2 Action",
            "description": "Type: Action\n\nDescription: Runs this action if the 'input' matches 'Value 2'.",
            "types": ["action"]
        },
        {
            "id": "swo2",
            "name": "Value 3 Action",
            "description": "Type: Action\n\nDescription: Runs this action if the 'input' matches 'Value 3'.",
            "types": ["action"]
        },
        {
            "id": "swo3",
            "name": "Value 4 Action",
            "description": "Type: Action\n\nDescription: Runs this action if the 'input' matches 'Value 4'.",
            "types": ["action"]
        },
        {
            "id": "swo4",
            "name": "Value 5 Action",
            "description": "Type: Action\n\nDescription: Runs this action if the 'input' matches 'Value 5'.",
            "types": ["action"]
        },
        {
            "id": "swo5",
            "name": "Value 6 Action",
            "description": "Type: Action\n\nDescription: Runs this action if the 'input' matches 'Value 6'.",
            "types": ["action"]
        },
        {
            "id": "swo6",
            "name": "Failure Action",
            "description": "Type: Action\n\nDescription: Runs this action if none of the 'Values' match the 'input'.",
            "types": ["action"]
        }
    ],

    code(cache) {
        var input = this.GetInputValue("value1", cache);
        let case0 = this.GetInputValue("sw0", cache);
        let case1 = this.GetInputValue("sw1", cache);
        let case2 = this.GetInputValue("sw2", cache);
        let case3 = this.GetInputValue("sw3", cache);
        let case4 = this.GetInputValue("sw4", cache);
        let case5 = this.GetInputValue("sw5", cache);
        const operation = this.GetOptionValue("operation", cache);

        let result;
        if (operation == "equal") {
        switch(input) {
            case case0:
                input = case0;
        this.RunNextBlock("swo0", cache);
                break;
            case case1:
                input = case1;
        this.RunNextBlock("swo1", cache);
                break;
            case case2:
                input = case2;
        this.RunNextBlock("swo2", cache);
                break;
            case case3:
                input = case3;
        this.RunNextBlock("swo3", cache);
                break;
            case case4:
                input = case4;
        this.RunNextBlock("swo4", cache);
                break;
            case case5:
                input = case5;
        this.RunNextBlock("swo5", cache);
                break;    
            default:
        this.RunNextBlock("swo6", cache);
                break;  
            }  
        };
        if (operation == "includes") {
        if (input.includes(case0)) {
            this.RunNextBlock("swo0", cache);
            }
        else if (input.includes(case1)) {
            this.RunNextBlock("swo1", cache);
            }
        else if (input.includes(case2)) {
            this.RunNextBlock("swo2", cache);
            }
        else if (input.includes(case3)) {
            this.RunNextBlock("swo3", cache);
            }
        else if (input.includes(case4)) {
            this.RunNextBlock("swo4", cache);
            }
        else if (input.includes(case5)) {
            this.RunNextBlock("swo5", cache);
            }
        else {
            this.RunNextBlock("swo6", cache);
            };
        };
    }
}