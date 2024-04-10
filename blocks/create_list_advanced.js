module.exports = {
    name: "Create List [Advanced]",

    description: "Creates a list to use it in your blocks.",

    category: "List Stuff",

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
            "description": "Acceptable Types: List, Unspecified\n\nDescription: The list to add new items. (Optional)",
            "types": ["list", "unspecified"],
        },
        {
            "id": "item1",
            "name": "Item 1",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Object, Boolean, Date, Number, Text, List\n\nDescription: The item to add to the list.",
            "types": ["unspecified", "undefined", "null", "object", "boolean", "date", "number", "text", "list"],
        },
        {
            "id": "item2",
            "name": "Item 2",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Object, Boolean, Date, Number, Text, List\n\nDescription: The item to add to the list.",
            "types": ["unspecified", "undefined", "null", "object", "boolean", "date", "number", "text", "list"],
        },
        {
            "id": "item3",
            "name": "Item 3",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Object, Boolean, Date, Number, Text, List\n\nDescription: The item to add to the list.",
            "types": ["unspecified", "undefined", "null", "object", "boolean", "date", "number", "text", "list"],
        },
        {
            "id": "item4",
            "name": "Item 4",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Object, Boolean, Date, Number, Text, List\n\nDescription: The item to add to the list.",
            "types": ["unspecified", "undefined", "null", "object", "boolean", "date", "number", "text", "list"],
        },
        {
            "id": "item5",
            "name": "Item 5",
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
            "description": "Type: List\n\nDescription: This list created.",
            "types": ["list"]
        }
    ],

    code(cache) {
        var list = this.GetInputValue("list", cache);               

        const item1 = parseInt(this.GetInputValue("item1", cache)) || this.GetInputValue("item1", cache);
        const item2 = parseInt(this.GetInputValue("item2", cache)) || this.GetInputValue("item2", cache);
        const item3 = parseInt(this.GetInputValue("item3", cache)) || this.GetInputValue("item3", cache);
        const item4 = parseInt(this.GetInputValue("item4", cache)) || this.GetInputValue("item4", cache);
        const item5 = parseInt(this.GetInputValue("item5", cache)) || this.GetInputValue("item5", cache);

        const position_type = this.GetOptionValue("position_type", cache);

        const custom_position_input = parseInt(this.GetInputValue("custom_position", cache));
        const custom_position_option = parseInt(this.GetOptionValue("custom_position", cache));

        var list_items = [item1, item2, item3, item4, item5];
        var items = list_items.filter(x => x !== undefined);

        if(list == undefined) {            
            list = items;
        } else{                        
            switch(position_type) {
                case "first":
                    var list_items = [item5, item4, item3, item2, item1];
                    var items = list_items.filter(x => x !== undefined);
                    items.forEach(item => {
                        list.unshift(item);})             
                    break;
                default:
                case "last":                    
                    items.forEach(item => {
                        list.push(item);})             
                    break;                    
                case "random":
                    items.forEach(item => {
                        list.splice(Math.round(Math.random() * list.length), 0, item);})                                 
                    break;
                case "custom":
                    var list_items = [item5, item4, item3, item2, item1];
                    var items = list_items.filter(x => x !== undefined);
                    items.forEach(item => {
                        let custom_position = isNaN(custom_position_input) ?  custom_position_option : custom_position_input 
                        list.splice(Math.max(0, custom_position - 1), 0, item);})                                 
                    break;                    
            }
        }        

        this.StoreOutputValue(list, "list", cache);
        this.RunNextBlock("action", cache);
    }
}