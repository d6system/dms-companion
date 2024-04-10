module.exports = {
    name: "Get Item From List [Mod]",

    description: "Modded ver. of 'Get item from list'.",

    category: ".MOD",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "list",
            "name": "List",
            "description": "Acceptable Types: List, Unspecified\n\nDescription: The list to get the item.",
            "types": ["list", "unspecified"],
            "required": true
        },
        {
            "id": "custom_position",
            "name": "Custom Position",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The custom position to get the item from the list. Starts at \"1\". (Only use this input if you selected the option \"Custom Position\")",
            "types": ["number", "unspecified"]
        }
    ],

    options: [
        {
            "id": "position_type",
            "name": "Position Type",
            "description": "Description: The position to get the item from the list.",
            "type": "SELECT",
            "options": {
                "first": "First Position",
                "last": "Last Position",
                "random": "Random Position",
                "custom": "Custom Position"
            }
        },
        {
            "id": "custom_position",
            "name": "Custom Position",
            "description": "Description: The custom position to get the item from the list. Starts at \"1\". (Only use this input if you selected the option \"Custom Position\")",
            "type": "NUMBER"
        },
        {
            "id": "name",
            "name": "Item Name",
            "description": "The item you are pulling",
            "type": "text"
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
            "id": "value",
            "name": "Value",
            "description": "Type: Unspecified\n\nDescription: The item obtained from the list.",
            "types": ["unspecified"]
        },
        {
            "id": "name",
            "name": "Item Name",
            "description": "Type: Unspecified\n\nDescription: The name of the item.",
            "types": ["text"]
        }
    ],

    code(cache) {
        const list = this.GetInputValue("list", cache);
        const position_type = this.GetOptionValue("position_type", cache);       
        const custom_position_input = parseInt(this.GetInputValue("custom_position", cache));
        const custom_position_option = parseInt(this.GetOptionValue("custom_position", cache));
        
        let value;
        switch(position_type) {
            case "first":
                value = list[0];
                break;
            case "last":
                value = list[list.length - 1];
                break;
             case "random":
                value = list[Math.floor(Math.random() * (list.length - 1))];
                break;
            case "custom":
                let custom_position = isNaN(custom_position_input) ?  custom_position_option : custom_position_input 
                value = list[custom_position - 1];
                break;
        }

        this.StoreOutputValue(value, "value", cache);
        this.StoreOutputValue(this.GetOptionValue("name", cache), "name", cache, "inputBlock");
        this.RunNextBlock("action", cache);
    }
}