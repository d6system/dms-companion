module.exports = {
    name: "Switch (conditional for numbers)",

    description: "Compares the input to the values, only runs the action if the input is higher.",

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
            "description": "Acceptable Types: Unspecified, Undefined, Null, Number\n\nDescription: the input for the value switch.",
            "types": ["unspecified", "undefined", "null", "number"]
        },
        {
            "id": "value1",
            "name": "Number 1",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Number\n\nDescription: The 1st value to compare the 'Input' to.",
            "types": ["unspecified", "undefined", "null", "number"]
        },
        {
            "id": "value2",
            "name": "Number 2",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Number\n\nDescription: The 2nd value to compare the 'Input' to.",
            "types": ["unspecified", "undefined", "null", "number"]
        },
        {
            "id": "value3",
            "name": "Number 3",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Number\n\nDescription: The 3rd value to compare the 'Input' to.",
            "types": ["unspecified", "undefined", "null", "number"]
        },
        {
            "id": "value4",
            "name": "Number 4",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Number\n\nDescription: The 4th value to compare the 'Input' to.",
            "types": ["unspecified", "undefined", "null", "number"]
        },
        {
            "id": "value5",
            "name": "Number 5",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Number\n\nDescription: The 5th value to compare the 'Input' to.",
            "types": ["unspecified", "undefined", "null", "number"]
        }
    ],

    options: [
            {
                "id": "value1",
                "name": "Number 1",
                "description": "Description: The 1st value to compare the 'Input' to.",
                "type": "NUMBER"
            },
            {
                "id": "value2",
                "name": "Number 2",
                "description": "Description: The 2nd value to compare the 'Input' to.",
                "type": "NUMBER"
            },
            {
                "id": "value3",
                "name": "Number 3",
                "description": "Description: The 3rd value to compare the 'Input' to.",
                "type": "NUMBER"
            },
            {
                "id": "value4",
                "name": "Number 4",
                "description": "Description: The 4th value to compare the 'Input' to.",
                "type": "NUMBER"
            },
            {
                "id": "value5",
                "name": "Number 5",
                "description": "Description: The 5th value to compare the 'Input' to.",
                "type": "NUMBER"
            }
        ],              

    outputs: [
        {
            "id": "action1",
            "name": "< Value 1",
            "description": "Type: Action\n\nDescription: Runs this action if the 'input' is equal/higher than 0 and equal/lower than the 1st value.",
            "types": ["action"]
        },
        {
            "id": "action2",
            "name": "> Value 1",
            "description": "Type: Action\n\nDescription: Runs this action if the 'input' is higher than the 1st value and equal/lower than the 2nd value.",
            "types": ["action"]
        },
        {
            "id": "action3",
            "name": "> Value 2",
            "description": "Type: Action\n\nDescription: Runs this action if the 'input' is higher than the 2nd value and equal/lower than the 3rd value.",
            "types": ["action"]
        },
        {
            "id": "action4",
            "name": "> Value 3",
            "description": "Type: Action\n\nDescription: Runs this action if the 'input' is higher than the 3rd value and equal/lower than the 4th value.",
            "types": ["action"]
        },
        {
            "id": "action5",
            "name": "> Value 4",
            "description": "Type: Action\n\nDescription: Runs this action if the 'input' is higher than the 4th value and equal/lower than the 5th value.",
            "types": ["action"]
        },
        {
            "id": "action6",
            "name": "> Value 5",
            "description": "Type: Action\n\nDescription: Runs this action if the 'input' is higher than the 5th value.",
            "types": ["action"]
        },
        {
            "id": "actionerror",
            "name": "Failure Action",
            "description": "Type: Action\n\nDescription: Runs this action if there's an error with the values.",
            "types": ["action"]
        }
    ],

    code(cache) { 
        var input = parseFloat(this.GetInputValue("input", cache));
        let value1 = parseInt(this.GetInputValue("value1", cache)) || parseInt(this.GetOptionValue("value1", cache));
        let value2 = parseInt(this.GetInputValue("value2", cache)) || parseInt(this.GetOptionValue("value2", cache));
        let value3 = parseInt(this.GetInputValue("value3", cache)) || parseInt(this.GetOptionValue("value3", cache));
        let value4 = parseInt(this.GetInputValue("value4", cache)) || parseInt(this.GetOptionValue("value4", cache));
        let value5 = parseInt(this.GetInputValue("value5", cache)) || parseInt(this.GetOptionValue("value5", cache));       
 
        if(input >= 0 && input <= value1){
            this.RunNextBlock("action1", cache);
        }else if(input > value1 && input <= value2){
            this.RunNextBlock("action2", cache);
        }else if(input > value2 && input <= value3){
            this.RunNextBlock("action3", cache);
        }else if(input > value3 && input <= value4){
            this.RunNextBlock("action4", cache);
        }else if(input > value4 && input <= value5){
            this.RunNextBlock("action5", cache);
        }else if(input > value5){
            this.RunNextBlock("action6", cache);
        }else{
            this.RunNextBlock("actionerror", cache);
        }              
       
    }
}