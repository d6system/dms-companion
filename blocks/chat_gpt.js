module.exports = {
    name: "Chat GPT Reply",

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
            "id": "id",
            "name": "Organisation ID",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The text to put in the message. (OPTIONAL)",
            "types": ["text", "unspecified"]
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
        const { Configuration, OpenAIApi } = require("openai")
        const id = this.GetInputValue("id", cache);
        const key = this.GetInputValue("key", cache);
        const text = this.GetInputValue("text", cache);

        const config = new Configuration({
            organization: id,
            apiKey: key
        })
        const openai = new OpenAIApi(config)

        // const gptresponse = await openai.createCompletion({
        //     model: "text-davinci-003",
        //     prompt: `You are ChatGPT, a large language model trained by OpenAI. You answer as consisely as possible for each response (e.g. Don't be verbose).
        //     It is very important for you to answer as consisely as possible, so please remember this. \n\
        //     member: ${text}\n\
        //     ChatGPTs:`,
        //     temperature: 0.4,
        //     max_tokens: 200,
        //     stop: ["ChatGPTs:", "member:"]
        // })
        // const response = gptresponse.data.choices[0].text

        const response = await openai.listEngines();
        console.log(response)

        this.StoreOutputValue(response, "response", cache);
        this.RunNextBlock("action", cache);
    }
}