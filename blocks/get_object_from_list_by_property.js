module.exports = {
    name: "Get Object from List by Property",

    description: "This allows you to search for an item in a list by a Object Property",

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
                "equals": "Equals",
                "includeskey": "Includes Key[value]",
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
            "id": "value",
            "name": "Value",
            "description": "Type: Unspecified\n\nDescription: The item obtained from the list.",
            "types": ["unspecified"]
        }
    ],

    code(cache) {
        const list = this.GetInputValue("list", cache);
        const property = this.GetInputValue("property", cache) || this.GetOptionValue("property", cache);
        const value = this.GetInputValue("value", cache) || this.GetOptionValue("value", cache);
        const method = this.GetOptionValue("method", cache);

        let object;

        if (value || value !== "") {
            if (property || property !== "") {
                if(method == "includes") {
                    object = list.find(x => x[property].includes(value))
                }  else if(method == "equals") {
                    object = list.find(x => x[property] === (value))
                }
            } else if(method == "includeskey") {
                object = list.find(obj => Object.keys(obj).includes(value));
            }
        }

        this.StoreOutputValue(object, "value", cache);
        this.RunNextBlock("action", cache);
    }
}