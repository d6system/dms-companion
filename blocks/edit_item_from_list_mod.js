module.exports = {
    name: "Edit Item From List [Mod]",

    description: "Modded ver. of 'Edit item from the list'.",

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
            "description": "Acceptable Types: List, Unspecified\n\nDescription: The list to edit the item.",
            "types": ["list", "unspecified"],
            "required": true
        },
        {
            "id": "value",
            "name": "Value",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Object, Boolean, Date, Number, Text, List\n\nDescription: The new value for the list item.",
            "types": ["unspecified", "undefined", "null", "object", "boolean", "date", "number", "text", "list"]
        },
        {
            "id": "custom_position",
            "name": "Custom Position",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The custom position to remove the item from the list. Starts at \"1\". (Only use this input if you selected the option \"Custom Position\")",
            "types": ["number", "unspecified"]
        }
    ],

    options: [
        {
            "id": "position_type",
            "name": "Position Type",
            "description": "Description: Select the position of the list item to edit.",
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
            "id": "value",
            "name": "Value",
            "description": "Description: The new value for the list item.",
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
            "id": "list",
            "name": "List",
            "description": "Type: List\n\nDescription: The list with the item edited.",
            "types": ["list"]
        }
    ],

    code(cache) {
        const list = this.GetInputValue("list", cache);
        var value = this.GetInputValue("value", cache);

        if(value == undefined) {
            value = this.GetOptionValue("value", cache);
        }

        const position_type = this.GetOptionValue("position_type", cache);
        const custom_position_input = parseInt(this.GetInputValue("custom_position", cache));
        const custom_position_option = parseInt(this.GetOptionValue("custom_position", cache));

        switch(position_type) {
            case "first":
                list[0] = value;
                break;
            case "last":
                list[list.length - 1] = value;
                break;
            case "random":
                list[Math.floor(Math.random() * (list.length - 1))] = value;
                break;
            case "custom":
                let custom_position = isNaN(custom_position_input) ?  custom_position_option : custom_position_input
                list[custom_position - 1] = value;
                break;
        }

        this.StoreOutputValue(list, "list", cache);
        this.RunNextBlock("action", cache);
    }
}