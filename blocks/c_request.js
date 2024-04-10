module.exports = {
    name: "POST Request JSON",

    description: "Makes an POST request.",

    category: "Utilities",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "url",
            "name": "API URL",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The URL of API.",
            "types": ["text", "unspecified"],
            "required": true
        },
        {
            "id": "body",
            "name": "JSON",
            "description": "Acceptable Types: Text, Object, Unspecified\n\nDescription: The body to send to API.",
            "types": ["text", "object", "unspecified"]
        }
    ],

    options: [],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
            "id": "return_value",
            "name": "Return",
            "description": "Type: Object\n\nDescription: The API data obtained if possible.",
            "types": ["text", "unspecified"]
        },
        {
            "id": "succ",
            "name": "Succes",
            "description": "Type: Boolean\n\nDescription: ",
            "types": ["boolean"]
        }
    ],

    async code(cache) {
        try {
            var parse = this.GetInputValue("body", cache);
            var parsed = JSON.parse(parse)
            var value2
            await fetch(this.GetInputValue("url", cache), {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(parsed)
            })  .then((response) => value2 = response.json())
            this.StoreOutputValue(value2, "return_value", cache);
            this.StoreOutputValue(true, "succ", cache);
            this.RunNextBlock("action", cache);
        } catch (error) {
            this.StoreOutputValue(false, "succ", cache);
            this.RunNextBlock("action", cache);
        }
    }
}