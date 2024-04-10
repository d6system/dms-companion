module.exports = {
    name: "Add Item to List [Mod]",

    description: "Modded ver. of 'Add item to list'.",

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
            "description": "Acceptable Types: List, Unspecified\n\nDescription: The list to add the item.",
            "types": ["list", "unspecified"],
            "required": true
        },
        {
            "id": "item",
            "name": "Item",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Object, Boolean, Date, Number, Text, List\n\nDescription: The item to add to the list.",
            "types": ["unspecified", "undefined", "null", "object", "boolean", "date", "number", "text", "list"],
        },
        {
            "id": "custom_position",
            "name": "Custom Position",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The custom position to add the item to the list. Starts at \"1\". (Only use this input if you selected the option \"Custom Position\")",
            "types": ["number", "unspecified"]
        }
    ],

    options: [
        {
            "id": "position_type",
            "name": "Position Type",
            "description": "Description: The position to add the item to the list.",
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
            "id": "item",
            "name": "Item",
            "description": "Description: The item to add to the list.",
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
            "description": "Type: List\n\nDescription: The list with the item added.",
            "types": ["list"]
        }
    ],

    code(cache) {
        const list = this.GetInputValue("list", cache);
        var item = this.GetInputValue("item", cache);

        if(item == undefined) {
            item = this.GetOptionValue("item", cache);
        }

        const position_type = this.GetOptionValue("position_type", cache);

        const custom_position_input = parseInt(this.GetInputValue("custom_position", cache));
        const custom_position_option = parseInt(this.GetOptionValue("custom_position", cache));

        switch(position_type) {
            case "first":
                list.unshift(item);
                break;
            default:
            case "last":
                list.push(item);
                break;
            case "random":
                list.splice(Math.round(Math.random() * list.length), 0, item);
                break;
            case "custom":
                let custom_position = isNaN(custom_position_input) ?  custom_position_option : custom_position_input 
                list.splice(Math.max(0, custom_position - 1), 0, item);
                break;
        }

        this.StoreOutputValue(list, "list", cache);
        this.RunNextBlock("action", cache);
    }
}