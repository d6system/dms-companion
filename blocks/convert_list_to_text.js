module.exports = {
    name: "Convert List to Text",

    description: "Converts the list to text.",

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
            "description": "Acceptable Types: List, Unspecified\n\nDescription: The list to convert to text.",
            "types": ["list", "unspecified"],
            "required": true
        },
        {
            "id": "separator",
            "name": "Separator",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The text to insert between the items from the list. Default: \", \". (OPTIONAL)",
            "types": ["text", "unspecified"]
        }
    ],

    options: [{
        "id": "separator",
        "name": "Separator",
        "description": "Description: The text to insert between the items from the list. Default: \", \". (OPTIONAL)",
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
            "id": "text",
            "name": "Text",
            "description": "Type: Text\n\nDescription: The text generated from the conversion of the list.",
            "types": ["text"]
        }
    ],

    code(cache) {
        const list = this.GetInputValue("list", cache);

        var separator = this.GetInputValue("separator", cache, false, undefined) + "";
        if(separator == "undefined") {
            separator = this.GetOptionValue("separator", cache) + "";
        }

        if(separator == "") {
            separator = ", ";
        }


        this.StoreOutputValue(list.join(separator), "text", cache);
        this.RunNextBlock("action", cache);
    }
}