module.exports = {
    name: "Filter List (Advanced)",

    description: "Filters the list by comparing the list items to a value. If the list item does not match, it will be deleted.",

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
            "description": "Acceptable Types: List, Unspecified\n\nDescription: The list to filter.",
            "types": ["list", "unspecified"],
            "required": true
        },
        {
            "id": "property",
            "name": "Property",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The Object Property you want to filter for.",
            "types": ["text", "unspecified"]
        },
        {
            "id": "value",
            "name": "Value",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The Value the object property should have.",
            "types": ["text", "unspecified"]
        }
    ],

    options: [
        {
            "id": "method",
            "name": "Method",
            "description": "Description: The Method how it should find the Object",
            "type": "SELECT",
            "options": {
                "includes": "Includes",
                "equals": "Equals"
            }
        },
        {
            "id": "property",
            "name": "Property",
            "description": "Description: The Object Property you want to filter for.",
            "type": "text"
        },
        {
            "id": "value",
            "name": "Value",
            "description": "Description: The Value the object property should have.",
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
            "description": "Type: List\n\nDescription: The list filtered.",
            "types": ["list"]
        }
    ],

    code(cache) {
        const list = this.GetInputValue("list", cache);
        const property = this.GetInputValue("property", cache) || this.GetOptionValue("property", cache);
        const value = this.GetInputValue("value", cache) || this.GetOptionValue("value", cache);
        const method = this.GetOptionValue("method", cache);

        if (value || value !== "") {
            if (property || property !== "") {
                if(method == "includes") {
                    object = list.filter(x => eval(`x?.${property}?.includes(value)`))
                } else {
                    object = list.filter(x => eval(`x?.${property} == value`))
                }
            }
        }

        this.StoreOutputValue(object, "list", cache);
        this.RunNextBlock("action", cache);
    }
}