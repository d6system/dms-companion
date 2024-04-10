module.exports = {
    name: "15 Switch Conditional",

    description: "compares the input to the values, and only runs the output of the matching case.",

    category: ".Mods",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
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
        },
		        {
            "id": "sw6",
            "name": "Value 7",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Object, Boolean, Date, Number, Text\n\nDescription: The 7th value to compare the 'Input' to.",
            "types": ["unspecified", "undefined", "null", "object", "boolean", "date", "number", "text"]
        },
        {
            "id": "sw7",
            "name": "Value 8",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Object, Boolean, Date, Number, Text\n\nDescription: The 8th value to compare the 'Input' to.",
            "types": ["unspecified", "undefined", "null", "object", "boolean", "date", "number", "text"]
        },
        {
            "id": "sw8",
            "name": "Value 9",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Object, Boolean, Date, Number, Text\n\nDescription: The 9th value to compare the 'Input' to.",
            "types": ["unspecified", "undefined", "null", "object", "boolean", "date", "number", "text"]
        },
        {
            "id": "sw9",
            "name": "Value 10",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Object, Boolean, Date, Number, Text\n\nDescription: The 10th value to compare the 'Input' to.",
            "types": ["unspecified", "undefined", "null", "object", "boolean", "date", "number", "text"]
        },
        {
            "id": "sw10",
            "name": "Value 11",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Object, Boolean, Date, Number, Text\n\nDescription: The 11th value to compare the 'Input' to.",
            "types": ["unspecified", "undefined", "null", "object", "boolean", "date", "number", "text"]
        },
        {
            "id": "sw11",
            "name": "Value 12",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Object, Boolean, Date, Number, Text\n\nDescription: The 12th value to compare the 'Input' to.",
            "types": ["unspecified", "undefined", "null", "object", "boolean", "date", "number", "text"]
        },
		        {
            "id": "sw12",
            "name": "Value 13",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Object, Boolean, Date, Number, Text\n\nDescription: The 13th value to compare the 'Input' to.",
            "types": ["unspecified", "undefined", "null", "object", "boolean", "date", "number", "text"]
        },
        {
            "id": "sw13",
            "name": "Value 14",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Object, Boolean, Date, Number, Text\n\nDescription: The 14th value to compare the 'Input' to.",
            "types": ["unspecified", "undefined", "null", "object", "boolean", "date", "number", "text"]
        },
        {
            "id": "sw14",
            "name": "Value 15",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Object, Boolean, Date, Number, Text\n\nDescription: The 15th value to compare the 'Input' to.",
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
            "name": "Value 7 Action",
            "description": "Type: Action\n\nDescription: Runs this action if the 'input' matches 'Value 6'.",
            "types": ["action"]
        },
        {
            "id": "swo7",
            "name": "Value 8 Action",
            "description": "Type: Action\n\nDescription: Runs this action if the 'input' matches 'Value 6'.",
            "types": ["action"]
        },
        {
            "id": "swo8",
            "name": "Value 9 Action",
            "description": "Type: Action\n\nDescription: Runs this action if the 'input' matches 'Value 6'.",
            "types": ["action"]
        },
        {
            "id": "swo9",
            "name": "Value 10 Action",
            "description": "Type: Action\n\nDescription: Runs this action if the 'input' matches 'Value 6'.",
            "types": ["action"]
        },
		        {
            "id": "swo10",
            "name": "Value 11 Action",
            "description": "Type: Action\n\nDescription: Runs this action if the 'input' matches 'Value 5'.",
            "types": ["action"]
        },
        {
            "id": "swo11",
            "name": "Value 12 Action",
            "description": "Type: Action\n\nDescription: Runs this action if the 'input' matches 'Value 6'.",
            "types": ["action"]
        },
        {
            "id": "swo12",
            "name": "Value 13 Action",
            "description": "Type: Action\n\nDescription: Runs this action if the 'input' matches 'Value 6'.",
            "types": ["action"]
        },
        {
            "id": "swo13",
            "name": "Value 14 Action",
            "description": "Type: Action\n\nDescription: Runs this action if the 'input' matches 'Value 6'.",
            "types": ["action"]
        },
        {
            "id": "swo14",
            "name": "Value 15 Action",
            "description": "Type: Action\n\nDescription: Runs this action if the 'input' matches 'Value 6'.",
            "types": ["action"]
        },
        {
            "id": "swo15",
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
        let case6 = this.GetInputValue("sw6", cache);
        let case7 = this.GetInputValue("sw7", cache);
        let case8 = this.GetInputValue("sw8", cache);
        let case9 = this.GetInputValue("sw9", cache);
        let case10 = this.GetInputValue("sw10", cache);
        let case11 = this.GetInputValue("sw11", cache);
        let case12 = this.GetInputValue("sw12", cache);
        let case13 = this.GetInputValue("sw13", cache);
        let case14 = this.GetInputValue("sw14", cache);
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
		            case case6:
                input = case6;
        this.RunNextBlock("swo6", cache);
                break;
            case case7:
                input = case7;
        this.RunNextBlock("swo7", cache);
                break;
            case case8:
                input = case8;
        this.RunNextBlock("swo8", cache);
                break;
            case case9:
                input = case9;
        this.RunNextBlock("swo9", cache);
                break;
            case case10:
                input = case10;
        this.RunNextBlock("swo10", cache);
                break;
            case case11:
                input = case11;
        this.RunNextBlock("swo11", cache);
                break; 
            case case12:
                input = case12;
        this.RunNextBlock("swo12", cache);
                break; 
            case case13:
                input = case13;
        this.RunNextBlock("swo13", cache);
                break; 
            case case14:
                input = case14;
        this.RunNextBlock("swo14", cache);
                break; 
            default:
        this.RunNextBlock("swo15", cache);
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
        else if (input.includes(case6)) {
            this.RunNextBlock("swo6", cache);
            }
        else if (input.includes(case7)) {
            this.RunNextBlock("swo7", cache);
            }
        else if (input.includes(case8)) {
            this.RunNextBlock("swo8", cache);
            }
        else if (input.includes(case9)) {
            this.RunNextBlock("swo9", cache);
            }
        else if (input.includes(case10)) {
            this.RunNextBlock("swo10", cache);
            }
        else if (input.includes(case11)) {
            this.RunNextBlock("swo11", cache);
            }
        else if (input.includes(case12)) {
            this.RunNextBlock("swo12", cache);
            }			
        else if (input.includes(case13)) {
            this.RunNextBlock("swo13", cache);
            }		
        else if (input.includes(case14)) {
            this.RunNextBlock("swo14", cache);
            }		
        else {
            this.RunNextBlock("swo15", cache);
            };
        };
    }
}