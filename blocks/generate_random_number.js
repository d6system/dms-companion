module.exports = {
    name: "Generate Random Number",

    description: "Generates a random number.",

    category: "Extras",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "min_number",
            "name": "Minimum Number",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The minimum number possible to return. Default: \"0\". (OPTIONAL)",
            "types": ["number", "unspecified"]
        },
        {
            "id": "max_number",
            "name": "Maximum Number",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The maximum number possible to return. Default: \"1\". (OPTIONAL)",
            "types": ["number", "unspecified"]
        }
    ],

    options: [
        {
            "id": "number_form",
            "name": "Number Form",
            "description": "Description: Select the Number form",
            "type": "SELECT",
            "options": {
                1: "Integer",
                2: "Decimal",
            }
        },
        {
            id: "min_number",
            name: "Minimum Number",
            description: "Description: The value for the Min Value",
            type: "number"
        },
        {
            id: "max_number",
            name: "Maximum Number",
            description: "Description: The value for the Max Value",
            type: "number"
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
            "id": "number",
            "name": "Number",
            "description": "Type: Text\n\nDescription: The random number generated.",
            "types": ["number", "unspecified"]
        }
    ],

    code(cache) {
        let min_number = this.GetInputValue("min_number", cache);
        let max_number = this.GetInputValue("max_number", cache);
        let number_form = this.GetOptionValue("number_form", cache);

        if(min_number == undefined) {
            min_number = this.GetOptionValue("min_number", cache);
        }

        if(max_number == undefined) {
            max_number = this.GetOptionValue("max_number", cache);
        }
        
        if(max_number == undefined) {
        max_number = 1;
        }

        if(number_form == 1){
        this.StoreOutputValue(Math.floor(Math.random() * (Number(max_number) - Number(min_number) + 1)) + Number(min_number), "number", cache);
        }

        if(number_form == 2){
        this.StoreOutputValue(Math.random() * (Number(max_number) - Number(min_number) + 1) + Number(min_number), "number", cache);
        }

        this.RunNextBlock("action", cache);
    }
}