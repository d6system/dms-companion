module.exports = {
    name: "Switch Text 16x (conditional)",

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
        },
        {
            "id": "sw6",
            "name": "Value 7",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Object, Boolean, Date, Number, Text\n\nDescription: The 6th value to compare the 'Input' to.",
            "types": ["unspecified", "undefined", "null", "object", "boolean", "date", "number", "text"]
        },
        {
            "id": "sw7",
            "name": "Value 8",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Object, Boolean, Date, Number, Text\n\nDescription: The 6th value to compare the 'Input' to.",
            "types": ["unspecified", "undefined", "null", "object", "boolean", "date", "number", "text"]
        },
        {
            "id": "sw8",
            "name": "Value 9",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Object, Boolean, Date, Number, Text\n\nDescription: The 6th value to compare the 'Input' to.",
            "types": ["unspecified", "undefined", "null", "object", "boolean", "date", "number", "text"]
        },
        {
            "id": "sw9",
            "name": "Value 10",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Object, Boolean, Date, Number, Text\n\nDescription: The 6th value to compare the 'Input' to.",
            "types": ["unspecified", "undefined", "null", "object", "boolean", "date", "number", "text"]
        },
        {
            "id": "sw10",
            "name": "Value 11",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Object, Boolean, Date, Number, Text\n\nDescription: The 6th value to compare the 'Input' to.",
            "types": ["unspecified", "undefined", "null", "object", "boolean", "date", "number", "text"]
        },
        {
            "id": "sw11",
            "name": "Value 12",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Object, Boolean, Date, Number, Text\n\nDescription: The 6th value to compare the 'Input' to.",
            "types": ["unspecified", "undefined", "null", "object", "boolean", "date", "number", "text"]
        },
        {
            "id": "sw12",
            "name": "Value 13",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Object, Boolean, Date, Number, Text\n\nDescription: The 6th value to compare the 'Input' to.",
            "types": ["unspecified", "undefined", "null", "object", "boolean", "date", "number", "text"]
        },
        {
            "id": "sw13",
            "name": "Value 14",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Object, Boolean, Date, Number, Text\n\nDescription: The 6th value to compare the 'Input' to.",
            "types": ["unspecified", "undefined", "null", "object", "boolean", "date", "number", "text"]
        },
        {
            "id": "sw14",
            "name": "Value 15",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Object, Boolean, Date, Number, Text\n\nDescription: The 6th value to compare the 'Input' to.",
            "types": ["unspecified", "undefined", "null", "object", "boolean", "date", "number", "text"]
        },
        {
            "id": "sw15",
            "name": "Value 16",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Object, Boolean, Date, Number, Text\n\nDescription: The 6th value to compare the 'Input' to.",
            "types": ["unspecified", "undefined", "null", "object", "boolean", "date", "number", "text"]
        },
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
            "name": "Text7",
            "description": "Description: The source text to add the Text. Use the folowing codes to implement the Text: \"${text1}\", \"${text2}\", \"${text3}\".",
            "type": "text"
        },
        {
            "id": "texto7",
            "name": "Text8",
            "description": "Description: The source text to add the Text. Use the folowing codes to implement the Text: \"${text1}\", \"${text2}\", \"${text3}\".",
            "type": "text"
        },
        {
            "id": "texto8",
            "name": "Text9",
            "description": "Description: The source text to add the Text. Use the folowing codes to implement the Text: \"${text1}\", \"${text2}\", \"${text3}\".",
            "type": "text"
        },
        {
            "id": "texto9",
            "name": "Text10",
            "description": "Description: The source text to add the Text. Use the folowing codes to implement the Text: \"${text1}\", \"${text2}\", \"${text3}\".",
            "type": "text"

        },
        {
            "id": "texto10",
            "name": "Text11",
            "description": "Description: The source text to add the Text. Use the folowing codes to implement the Text: \"${text1}\", \"${text2}\", \"${text3}\".",
            "type": "text"

        },
        {
            "id": "texto11",
            "name": "Text12",
            "description": "Description: The source text to add the Text. Use the folowing codes to implement the Text: \"${text1}\", \"${text2}\", \"${text3}\".",
            "type": "text"

        },
        {
            "id": "texto12",
            "name": "Text13",
            "description": "Description: The source text to add the Text. Use the folowing codes to implement the Text: \"${text1}\", \"${text2}\", \"${text3}\".",
            "type": "text"

        },
        {
            "id": "texto13",
            "name": "Text14",
            "description": "Description: The source text to add the Text. Use the folowing codes to implement the Text: \"${text1}\", \"${text2}\", \"${text3}\".",
            "type": "text"

        },
        {
            "id": "texto14",
            "name": "Text15",
            "description": "Description: The source text to add the Text. Use the folowing codes to implement the Text: \"${text1}\", \"${text2}\", \"${text3}\".",
            "type": "text"

        },
        {
            "id": "texto15",
            "name": "Text16",
            "description": "Description: The source text to add the Text. Use the folowing codes to implement the Text: \"${text1}\", \"${text2}\", \"${text3}\".",
            "type": "text"

        },
        {
            "id": "textoFail",
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
        let case6 = this.GetInputValue("sw6", cache);
        let case7 = this.GetInputValue("sw7", cache);
        let case8 = this.GetInputValue("sw8", cache);
        let case9 = this.GetInputValue("sw9", cache);
        let case10 = this.GetInputValue("sw10", cache);
        let case11 = this.GetInputValue("sw11", cache);
        let case12 = this.GetInputValue("sw12", cache);
        let case13 = this.GetInputValue("sw13", cache);
        let case14 = this.GetInputValue("sw14", cache);
        let case15 = this.GetInputValue("sw15", cache);
        let caseout0 = this.GetOptionValue("texto0", cache);
        let caseout1 = this.GetOptionValue("texto1", cache);
        let caseout2 = this.GetOptionValue("texto2", cache);
        let caseout3 = this.GetOptionValue("texto3", cache);
        let caseout4 = this.GetOptionValue("texto4", cache);
        let caseout5 = this.GetOptionValue("texto5", cache);
        let caseout6 = this.GetOptionValue("texto6", cache);
        let caseout7 = this.GetOptionValue("texto7", cache);
        let caseout8 = this.GetOptionValue("texto8", cache);
        let caseout9 = this.GetOptionValue("texto9", cache);
        let caseout10 = this.GetOptionValue("texto10", cache);
        let caseout11 = this.GetOptionValue("texto11", cache);
        let caseout12 = this.GetOptionValue("texto12", cache);
        let caseout13 = this.GetOptionValue("texto13", cache);
        let caseout14 = this.GetOptionValue("texto14", cache);
        let caseout15 = this.GetOptionValue("texto15", cache);
        let textofailout = this.GetOptionValue("textoFail", cache);
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
            case case6:
                input = case6;
                result = caseout6;
                break;    
            case case7:
                input = case7;
                result = caseout7;
                break;    
            case case8:
                input = case8;
                result = caseout8;
                break;    
            case case9:
                input = case9;
                result = caseout9;
                break;    
            case case10:
                input = case10;
                result = caseout10;
                break;    
            case case11:
                input = case11;
                result = caseout11;
                break;    
            case case12:
                input = case12;
                result = caseout12;
                break;    
            case case13:
                input = case13;
                result = caseout13;
                break;    
            case case14:
                input = case14;
                result = caseout14;
                break;    
            case case15:
                input = case15;
                result = caseout15;
                break;    
            default:
                result = textofailout;
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
        else if (input.includes(case6)) {
            result = caseout6;
        }
        else if (input.includes(case7)) {
            result = caseout7;
        }
        else if (input.includes(case8)) {
            result = caseout8;
        }
        else if (input.includes(case9)) {
            result = caseout9;
        }
        else if (input.includes(case10)) {
            result = caseout10;
        }
        else if (input.includes(case11)) {
            result = caseout11;
        }
        else if (input.includes(case12)) {
            result = caseout12;
        }
        else if (input.includes(case13)) {
            result = caseout13;
        }
        else if (input.includes(case14)) {
            result = caseout14;
        }
        else if (input.includes(case15)) {
            result = caseout15;
        }
        else {
            result = textofailout;
            };
        };

        
        this.StoreOutputValue(result, "text", cache);
        this.RunNextBlock("action", cache);
    }
}