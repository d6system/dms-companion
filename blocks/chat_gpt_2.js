module.exports = {
    name: "Chat GPT 2 Reply",

    description: "",

    category: "Message Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "key",
            "name": "API Key",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The text to put in the message. (OPTIONAL)",
            "types": ["text", "unspecified"]
        },
        {
            "id": "text",
            "name": "Text",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The text to put in the message. (OPTIONAL)",
            "types": ["text", "unspecified"]
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
            "id": "response",
            "name": "Response",
            "description": "Type: Object\n\nDescription: The message obtained.",
            "types": ["text"]
        }
    ],

    async code(cache) {
        const { chatGPT } = require('chatgpt-api-wrapper')
        const key = this.GetInputValue("key", cache);
        const text = this.GetInputValue("text", cache);
        chatGPT = new ChatGPT(key);    

        const response = await chatGPT.ask(text);
        console.log(response);

        this.StoreOutputValue(response, "response", cache);
        this.RunNextBlock("action", cache);
    }
}