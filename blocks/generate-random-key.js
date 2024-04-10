module.exports = {
    
    name: "Generate Random Api Key",

    description: "Generates a random key depending on your settings.",

    category: "Daily's",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
            "id": "batch",
            "name": "Batches",
            "description": "How many Key's it will make. (Default: 1)",
            "types": ["number", "unspecified"],
        },
    ],

    options: [
        {
            "id": "dash",
            "name": "Dashes",
            "description": "If there should be Dashes or not. E.x (4568-4665-8927)",
            "type": "SELECT",
            "options": {
                "true": "Yes (Default)",
                "false": "No",
            }
        },
        {
          "id": "method",
          "name": "Method",
          "description": "What Method the key should be in.",
          "type": "SELECT",
          "options": {
            "string": "String",
            "bytes": "Bytes",
            "base32": "Base32",
            "base62": "Base62",
            "uuidv4": "uuidv4",
            "uuidv5": "uuidv5",
          },
        },
    ],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
            "id": "reslist",
            "name": "Key List",
            "description": "The list containing the result of the key's",
            "types": ["list"]
        }
    ],

    async code(cache) {
        
        const { generateApiKey } = require('generate-api-key');

        let batch = this.GetInputValue("batch", cache);
        const dashes = this.GetOptionValue("dash", cache);
        const method = this.GetOptionValue("method", cache);

        if (!batch) {batch = 1}

        let keys = [];

        switch(method) {
            case "string":
                keys = generateApiKey({ method, dashes, batch }, cache);
                break;
            case "bytes":
                keys = generateApiKey({ method, dashes, batch }, cache);
                break;
            case "base32":
                keys = generateApiKey({ method, dashes, batch }, cache);
                break;
            case "base62":
                keys = generateApiKey({ method, dashes, batch }, cache);
                break;
            case "uuidv4":
                keys = generateApiKey({ method, dashes, batch }, cache);
                break;
            case "uuidv5":
                keys = generateApiKey({ method, dashes, batch, name: "uuidv5 key(s)" }, cache);
                break;
        }

        this.StoreOutputValue(keys, "reslist", cache);
        this.RunNextBlock("action", cache);
    
    }
}