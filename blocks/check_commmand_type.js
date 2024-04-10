module.exports = {
    name: "Check Command Type",

    description: "Checks if the command is Text or Slash",

    category: ".MOD",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "value1",
            "name": "Command Type",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Object, Boolean, Date, Number, Text, List\n\nDescription: The value 1 to compare with the value 2.",
            "types": ["text"],
            "required": true
        }
    ],

    options: [
    ],

    outputs: [
        {
            "id": "action1",
            "name": "Action (If Text)",
            "description": "Type: Action\n\nDescription: Executes the following blocks if true.",
            "types": ["action"]
        },
        {
            "id": "action2",
            "name": "Action (If Slash)",
            "description": "Type: Action\n\nDescription: Executes the following blocks if false.",
            "types": ["action"]
        }
    ],

    code(cache) {
        const value1 = this.GetInputValue("value1", cache);
        
        if (value1 == "Text"){
            this.RunNextBlock("action1", cache);
        }else if (value1 == "Slash"){
            this.RunNextBlock("action2", cache);
        }        
    }
}