module.exports = {
    name: "Switch Text (conditional)",

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
        },
        {
            "id": "texto0",
            "name": "Text1",
            "description": "Description: The source text to add the Text. Use the folowing codes to implement the Text: \"${text1}\", \"${text2}\", \"${text3}\".",
            "type": "text"
        },
        {
            "id": "texto1",
            "name": "Text2",
            "description": "Description: The source text to add the Text. Use the folowing codes to implement the Text: \"${text1}\", \"${text2}\", \"${text3}\".",
            "type": "text"
        },
        {
            "id": "texto2",
            "name": "Text3",
            "description": "Description: The source text to add the Text. Use the folowing codes to implement the Text: \"${text1}\", \"${text2}\", \"${text3}\".",
            "type": "text"
        },
        {
            "id": "texto3",
            "name": "Text4",
            "description": "Description: The source text to add the Text. Use the folowing codes to implement the Text: \"${text1}\", \"${text2}\", \"${text3}\".",
            "type": "text"
        },
        {
            "id": "texto4",
            "name": "Text5",
            "description": "Description: The source text to add the Text. Use the folowing codes to implement the Text: \"${text1}\", \"${text2}\", \"${text3}\".",
            "type": "text"
        },
        {
            "id": "texto5",
            "name": "Text6",
            "description": "Description: The source text to add the Text. Use the folowing codes to implement the Text: \"${text1}\", \"${text2}\", \"${text3}\".",
            "type": "text"
        },
        {
            "id": "texto6",
            "name": "Failure Text",
            "description": "Description: The source text to add the Text. Use the folowing codes to implement the Text: \"${text1}\", \"${text2}\", \"${text3}\".",
            "type": "text"
        }
    ],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Runs this action if the 'input' matches 'Value 2'.",
            "types": ["action"]
        },
        {
            "id": "text",
            "name": "Text",
            "description": "Type: Text\n\nDescription: The text merged.",
            "types": ["text"]
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
        let caseout0 = this.GetOptionValue("texto0", cache);
        let caseout1 = this.GetOptionValue("texto1", cache);
        let caseout2 = this.GetOptionValue("texto2", cache);
        let caseout3 = this.GetOptionValue("texto3", cache);
        let caseout4 = this.GetOptionValue("texto4", cache);
        let caseout5 = this.GetOptionValue("texto5", cache);
        let caseout6 = this.GetOptionValue("texto6", cache);
        const operation = this.GetOptionValue("operation", cache);

        let result;
        if (operation == "equal") {
        switch(input) {
            case case0:
                input = case0;
                result = caseout0;
                break;
            case case1:
                input = case1;
                result = caseout1;
                break;
            case case2:
                input = case2;
                result = caseout2;
                break;
            case case3:
                input = case3;
                result = caseout3;
                break;
            case case4:
                input = case4;
                result = caseout4;
                break;
            case case5:
                input = case5;
                result = caseout5;
                break;    
            default:
                result = caseout6;
                break;  
            }  
        };
        if (operation == "includes") {
        if (input.includes(case0)) {
           result = caseout0;
            }
        else if (input.includes(case1)) {
            result = caseout1;
            }
        else if (input.includes(case2)) {
            result = caseout2;
            }
        else if (input.includes(case3)) {
            result = caseout3;
            }
        else if (input.includes(case4)) {
            result = caseout4;
            }
        else if (input.includes(case5)) {
            result = caseout5;
            }
        else {
            result = caseout6;
            };
        };

        
        this.StoreOutputValue(result, "text", cache);
        this.RunNextBlock("action", cache);
    }
}