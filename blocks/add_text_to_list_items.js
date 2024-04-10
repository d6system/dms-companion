module.exports = {
    name: "Add Text to List Items",

    description: "Adds custom text to every item in a list.",

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
            "description": "Acceptable Types: List, Unspecified\n\nDescription: The list to get your items.",
            "types": ["list", "unspecified"],
            "required": true
        },
        {
            "id": "before",
            "name": "Before Text",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: Text before every item.",
            "types": ["text", "number", "unspecified"]
        },
        {
            "id": "after",
            "name": "After Text",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: Text after every item.",
            "types": ["text", "number", "unspecified"]
        }
    ],

    options: [        
        {
            "id": "before",
            "name": "Before Text",
            "description": "Description: Text before every item.",
            "type": "text"
        },
        {
            "id": "after",
            "name": "After Text",
            "description": "Description: Text after every item.",
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
            "id": "list",
            "name": "List",
            "description": "Type: List\n\nDescription: The list with the new items.",
            "types": ["list", "unspecified"]
        }
    ],

    code(cache) {
        const append = this.GetInputValue("list", cache);
        const before = this.GetInputValue("before", cache) || this.GetOptionValue("before", cache);
        const after = this.GetInputValue("after", cache) || this.GetOptionValue("after", cache);

        var list = [];

        for (const [index, value] of Object.entries(append)) {
            item = before+value+after;
            list.push(item);
         }

        this.StoreOutputValue(list, "list", cache);
        this.RunNextBlock("action", cache);        
    }
}