module.exports = {
    name: "Reply Express Request",

    description: "Replies to an Express Request",

    category: "Express",

    inputs: [
        {
            id: "action",
            name: "Action",
            description: "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            types: ["action"]
        },
        {
            id: "response",
            name: "Response",
            description: "Type: Object\n\nDescription: The RESPONSE Object from the Express Event Block!",
            types: ["object", "unspecified"],
            required: true
        },
        {
            id: "reply",
            name: "Reply",
            description: "Type: Text\n\nDescription: The Thing you want to reply, can be text, object, number or anything else. Default: Success (OPTIONAL)",
            types: ["unspecified", "text", "object", "number", "date", "boolean"]
        },
        {
            id: "rescode",
            name: "Response Code",
            description: "The Success/Error code you want to return. Default: 200 (OPTIONAL)",
            types: ["number", "unspecified"]
        }
    ],

    options: [
        {
            id: "reply",
            name: "Reply",
            description: "Your Reply you want to Send the API. Default: Success (OPTIONAL)",
            type: "TEXT"
        },
        {
            id: "rescode",
            name: "Response Code",
            description: "The Success/Error code you want to return. Default: 200 (OPTIONAL)",
            type: "NUMBER"
        }
    ],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        }
    ],

    async code(cache) {
        const response = this.GetInputValue("response", cache);
        const reply = this.GetInputValue("reply", cache) || (this.GetOptionValue("reply", cache) === "" ? "Success" : this.GetOptionValue("reply", cache));
        const rescode = parseInt(this.GetInputValue("rescode", cache)) || parseInt(this.GetOptionValue("rescode", cache)) || 200;

        await response.status(rescode).send(reply);

        this.RunNextBlock("action", cache);
    }
}