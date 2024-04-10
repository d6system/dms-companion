module.exports = {
    name: "Bard AI Reply",

    description: "Use the Google Bard AI API to ask questions and return useful answers",

    category: "BardAI",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "text",
            "name": "Text",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The text to put in the message.",
            "types": ["text", "unspecified"]
        }
    ],

    options: [
        {
            "id": "__Secure-1PSID",
            "name": "__Secure-1PSID",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The Cookie Secret of the Bard AI. \nYou can find more Info on how to get the Cookie Secret at: \nhttps://bard-ai.js.org/prerequisites/authentication/",
            "type": "TEXT"
        },
        {
            "id": "__Secure-1PSIDTS",
            "name": "__Secure-1PSIDTS",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The Cookie Secret of the Bard AI. \nYou can find more Info on how to get the Cookie Secret at: \nhttps://bard-ai.js.org/prerequisites/authentication/",
            "type": "TEXT"
        },
        {
            "id": "text",
            "name": "Text",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The text to put in the message.",
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
            "id": "response",
            "name": "Response",
            "description": "Type: Object\n\nDescription: The message obtained.",
            "types": ["text"]
        }
    ],

    async code(cache) {
        //await this.require("bard-ai", true, false)
        import("bard-ai").then(async ({ default: Bard }) => {
            const PSID = this.GetOptionValue("__Secure-1PSID", cache);
            const PSIDTS = this.GetOptionValue("__Secure-1PSIDTS", cache);
            const text = this.GetInputValue("text", cache) || this.GetOptionValue("text", cache);

            if (PSID && PSID !== "" && PSIDTS && PSIDTS !== "" && text && text !== "") {
                let bard = new Bard({
                    "__Secure-1PSID": PSID,
                    "__Secure-1PSIDTS": PSIDTS
                })
                const response = await bard.ask(text);
                this.StoreOutputValue(response, "response", cache);
                this.RunNextBlock("action", cache);
            } else {
                throw "Missing Field: Either Cookie or Text is Undefined (Bard AI Block)";
            }
        })

    }
}