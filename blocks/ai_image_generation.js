module.exports = {
    name: "Ai Image Generation V1",

    description: "this will generate a image based on my prompt you give it some examples are\ncity cyberpunk cartoon themed bright viberant lights coming from signs",

    category: ".MOD",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "prompt",
            "name": "Prompt",
            "description": "Acceptable Types: Action\n\nDescription: the prompt to give the ai so it knows what you want",
            "types": ["text", "unspecified"]
        }
    ],

    options: [
        {
            "id": "key",
            "name": "API key",
            "description": "Description: type your api key here",
            "type": "TEXT",
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
            "id": "text",
            "name": "Image Url",
            "description": "Type: Text\n\nDescription: The text merged.",
            "types": ["text", "unspecified"]
        }
    ],

    code(cache) {
        const prompt = this.GetInputValue("prompt", cache);
        const apikey = this.GetOptionValue("key", cache);

        const fetch = require('node-fetch');

        fetch('https://api.openai.com/v1/images/generations', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apikey}`
            },
            body: JSON.stringify({
                prompt: prompt,
                model: "image-alpha-001"
              })
            })
            .then(response => response.json())
            .then((data) => {
                this.StoreOutputValue(data.data[0].url, "text", cache)
                this.RunNextBlock("action", cache)
            })
    }
}