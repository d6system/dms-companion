module.exports = {
    name: "Random Facts/Jokes",
    description: "Generates random facts or jokes with an optional limit input.",
    
    category: ".T45",
    
    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
            "id": "limit",
            "name": "Limit",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: How many you want.\n\nDefault: 1\n\n(OPTIONAL)",
            "types": ["number", "unspecified"],
        },
    ],
    
    options: [
        {
            "id": "choice",
            "name": "Type",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: Generate Facts or jokes?",
            "type": "SELECT",
            "options": {
                "facts": "Facts",
                "jokes": "Jokes"
            }
        },
        {
            "id": "apikey",
            "name": "API Key",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: Your API key obtained from registering in \"https://api-ninjas.com/\".\n\n(REQUIRED)",
            "type": "TEXT",
        },
    ],
    
    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
            "id": "result",
            "name": "Result",
            "description": "Type: List\n\nDescription: The result list.",
            "types": ["list"]
        },
    ],
    
    async code(cache) {
        const limit = this.GetInputValue("limit", cache) || 1;
        const choice = this.GetOptionValue("choice", cache);

        const axios = require('axios');
        const Gen = async () => {
            const response = await axios.get(`https://api.api-ninjas.com/v1/${choice}`, {
            headers: {
                'X-Api-Key': this.GetOptionValue("apikey", cache)
            },
            params: {
                limit
            },
        });
        return response.data
    }
    const result = await Gen();

    let actualList = [];
    
    switch (choice) {
        case "facts":
            result.forEach(object => {
                actualList.push(object.fact);
            });
            break;
        case "jokes":
            result.forEach(object => {
                actualList.push(object.joke);
            });
            break;
    }
    
    this.StoreOutputValue(actualList, "result", cache)
    this.RunNextBlock("action", cache);
}
}
