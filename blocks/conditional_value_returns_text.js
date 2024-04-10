module.exports = {
    name: "Conditional value returns text",

    description: "Compares the input to different values; returns fixed texts if matched.",

    category: "Extras",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "input",
            "name": "Input",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Text\n\nDescription: The input to compare your values with.",
            "types": ["unspecified", "undefined", "null", "text"]
        },
        {
            "id": "text1",
            "name": "Text 1",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Text\n\nDescription: If matched with this value returns Output 1",
            "types": ["unspecified", "undefined", "null", "text"]
        },
        {
            "id": "output1",
            "name": "Output 1",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Text\n\nDescription: Output from Text 1",
            "types": ["unspecified", "undefined", "null", "text"]
        },
        {
            "id": "text2",
            "name": "Text 2",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Text\n\nDescription: If matched with this value returns Output 2",
            "types": ["unspecified", "undefined", "null", "text"]
        },
        {
            "id": "output2",
            "name": "Output 2",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Text\n\nDescription: Output from Text 2",
            "types": ["unspecified", "undefined", "null", "text"]
        },
        {
            "id": "text3",
            "name": "Text 3",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Text\n\nDescription: If matched with this value returns Output 3",
            "types": ["unspecified", "undefined", "null", "text"]
        },
        {
            "id": "output3",
            "name": "Output 3",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Text\n\nDescription: Output from Text 3",
            "types": ["unspecified", "undefined", "null", "text"]
        },
        {
            "id": "text4",
            "name": "Text 4",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Text\n\nDescription: If matched with this value returns Output 4",
            "types": ["unspecified", "undefined", "null", "text"]
        },
        {
            "id": "output4",
            "name": "Output 4",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Text\n\nDescription: Output from Text 4",
            "types": ["unspecified", "undefined", "null", "text"]
        },
        {
            "id": "text5",
            "name": "Text 5",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Text\n\nDescription: If matched with this value returns Output 5",
            "types": ["unspecified", "undefined", "null", "text"]
        },
        {
            "id": "output5",
            "name": "Output 5",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Text\n\nDescription: Output from Text 5",
            "types": ["unspecified", "undefined", "null", "text"]
        },
        {
            "id": "text6",
            "name": "Text 6",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Text\n\nDescription: If matched with this value returns Output 6",
            "types": ["unspecified", "undefined", "null", "text"]
        },
        {
            "id": "output6",
            "name": "Output 6",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Text\n\nDescription: Output from Text 6",
            "types": ["unspecified", "undefined", "null", "text"]
        }
    ],

    options: [
            {
                "id": "operation",
                "name": "Comparison Type",
                "description": "Description: The type of comparison between the values.",
                "type": "SELECT",
                "options": {
                    "equal": "Equals",
                    "exactly": "Equals exactly (Case sensitive)",
                    "includes": "Includes",
                    "iexactly": "Includes exactly (Case sensitive)",
                }
            },
            {
                "id": "text1",
                "name": "Text 1",
                "description": "Description: If matched with this value returns Output 1",
                "type": "TEXT"
            },
            {
                "id": "output1",
                "name": "Output 1",
                "description": "Description: Output from Text 1",
                "type": "TEXT"
            },
            {
                "id": "text2",
                "name": "Text 2",
                "description": "Description: If matched with this value returns Output 2",
                "type": "TEXT"
            },
            {
                "id": "output2",
                "name": "Output 2",
                "description": "Description: Output from Text 2",
                "type": "TEXT"
            },
            {
                "id": "text3",
                "name": "Text 3",
                "description": "Description: If matched with this value returns Output 3",
                "type": "TEXT"
            },
            {
                "id": "output3",
                "name": "Output 3",
                "description": "Description: Output from Text 3",
                "type": "TEXT"
            },
            {
                "id": "text4",
                "name": "Text 4",
                "description": "Description: If matched with this value returns Output 4",
                "type": "TEXT"
            },
            {
                "id": "output4",
                "name": "Output 4",
                "description": "Description: Output from Text 4",
                "type": "TEXT"
            },
            {
                "id": "text5",
                "name": "Text 5",
                "description": "Description: If matched with this value returns Output 5",
                "type": "TEXT"
            },
            {
                "id": "output5",
                "name": "Output 5",
                "description": "Description: Output from Text 5",
                "type": "TEXT"
            },
            {
                "id": "text6",
                "name": "Text 6",
                "description": "Description: If matched with this value returns Output 6",
                "type": "TEXT"
            },
            {
                "id": "output6",
                "name": "Output 6",
                "description": "Description: Output from Text 6",
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
            "id": "result",
            "name": "Result",
            "description": "Type: Unspecified\n\nDescription: The return output",
            "types": ["text"]
        }
    ],

    code(cache) { 
        var input = this.GetInputValue("input", cache);
        var text1 = this.GetInputValue("text1", cache) || this.GetOptionValue("text1", cache);
        var text2 = this.GetInputValue("text2", cache) || this.GetOptionValue("text2", cache);
        var text3 = this.GetInputValue("text3", cache) || this.GetOptionValue("text3", cache);
        var text4 = this.GetInputValue("text4", cache) || this.GetOptionValue("text4", cache);
        var text5 = this.GetInputValue("text5", cache) || this.GetOptionValue("text5", cache);
        var text6 = this.GetInputValue("text6", cache) || this.GetOptionValue("text6", cache);

        const output1 = this.GetInputValue("output1", cache) || this.GetOptionValue("output1", cache);
        const output2 = this.GetInputValue("output2", cache) || this.GetOptionValue("output2", cache);
        const output3 = this.GetInputValue("output3", cache) || this.GetOptionValue("output3", cache);
        const output4 = this.GetInputValue("output4", cache) || this.GetOptionValue("output4", cache);
        const output5 = this.GetInputValue("output5", cache) || this.GetOptionValue("output5", cache);
        const output6 = this.GetInputValue("output6", cache) || this.GetOptionValue("output6", cache);        

        const operation = this.GetOptionValue("operation", cache);       
        
        let result;
        switch(operation) {
            case "equal":
                var input = ("" + (this.GetInputValue("input", cache))).toLowerCase();
                var text1 = ("" + (this.GetInputValue("text1", cache) || this.GetOptionValue("text1", cache))).toLowerCase();
                var text2 = ("" + (this.GetInputValue("text2", cache) || this.GetOptionValue("text2", cache))).toLowerCase();
                var text3 = ("" + (this.GetInputValue("text3", cache) || this.GetOptionValue("text3", cache))).toLowerCase();
                var text4 = ("" + (this.GetInputValue("text4", cache) || this.GetOptionValue("text4", cache))).toLowerCase();
                var text5 = ("" + (this.GetInputValue("text5", cache) || this.GetOptionValue("text5", cache))).toLowerCase();
                var text6 = ("" + (this.GetInputValue("text6", cache) || this.GetOptionValue("text6", cache))).toLowerCase();
                if(input == text1){
                    result = output1
                }else if(input == text2){
                    result = output2
                }else if(input == text3){
                    result = output3
                }else if(input == text4){
                    result = output4
                }else if(input == text5){
                    result = output5
                }else if(input == text6){
                    result = output6
                }else{
                    result = undefined
                };
            break;
            case "exactly":                
                if(input == text1){
                    result = output1
                }else if(input == text2){
                    result = output2
                }else if(input == text3){
                    result = output3
                }else if(input == text4){
                    result = output4
                }else if(input == text5){
                    result = output5
                }else if(input == text6){
                    result = output6
                }else{
                    result = undefined
                };
            break;
            case "includes":
                var input = ("" + (this.GetInputValue("input", cache))).toLowerCase();
                var text1 = ("" + (this.GetInputValue("text1", cache) || this.GetOptionValue("text1", cache))).toLowerCase();
                var text2 = ("" + (this.GetInputValue("text2", cache) || this.GetOptionValue("text2", cache))).toLowerCase();
                var text3 = ("" + (this.GetInputValue("text3", cache) || this.GetOptionValue("text3", cache))).toLowerCase();
                var text4 = ("" + (this.GetInputValue("text4", cache) || this.GetOptionValue("text4", cache))).toLowerCase();
                var text5 = ("" + (this.GetInputValue("text5", cache) || this.GetOptionValue("text5", cache))).toLowerCase();
                var text6 = ("" + (this.GetInputValue("text6", cache) || this.GetOptionValue("text6", cache))).toLowerCase();
                if(input.includes(text1)){
                    result = output1
                }else if(input.includes(text2)){
                    result = output2
                }else if(input.includes(text3)){
                    result = output3
                }else if(input.includes(text4)){
                    result = output4
                }else if(input.includes(text5)){
                    result = output5
                }else if(input.includes(text6)){
                    result = output6
                }else{
                    result == undefined
                };
            break;
            case "iexactly":                
                if(input.includes(text1)){
                    result = output1
                }else if(input.includes(text2)){
                    result = output2
                }else if(input.includes(text3)){
                    result = output3
                }else if(input.includes(text4)){
                    result = output4
                }else if(input.includes(text5)){
                    result = output5
                }else if(input.includes(text6)){
                    result = output6
                }else{
                    result == undefined
                };
            break;
        }          

        this.StoreOutputValue(result, "result", cache);
        this.RunNextBlock("action", cache);            
    }
}