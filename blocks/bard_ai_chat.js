module.exports = {
    name: "Bard AI Chat",

    description: "Use the Google Bard AI API to ask questions and return useful answers in a Chat Version",

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
        },
        {
            "id": "srv_usr_mem",
            "name": "Server/User/Member",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The Server/User/Member who owns the Chat...",
            "types": ["object", "unspecified"],
            "required": true
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
            "id": "initprompt",
            "name": "Initial Prompt",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The first Thing to tell Bard AI, for example some markdown settings or Language or Other Stuff. (Optional)\n\nNot sure if it actually works or if it changes anything...",
            "type": "TEXT"
        },
        {
            "id": "text",
            "name": "Text",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The text to put in the message.",
            "type": "TEXT"
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
        import("bard-ai").then(async ({ default: Bard }) => {
            const initprompt = this.GetInputValue("initprompt", cache);
            const obj = this.GetInputValue("srv_usr_mem", cache);
            const PSID = this.GetOptionValue("__Secure-1PSID", cache);
            const PSIDTS = this.GetOptionValue("__Secure-1PSIDTS", cache);
            const text = this.GetInputValue("text", cache, false, undefined) || this.GetOptionValue("text", cache, false, undefined);

            if (PSID && PSID !== "" && PSIDTS && PSIDTS !== "" && text && text !== "") {
                let bard = new Bard({
                    "__Secure-1PSID": PSID,
                    "__Secure-1PSIDTS": PSIDTS
                }, {context: initprompt})
                if (!this.getDBB().Data.data.custom[obj.id]) {
                    let conv = bard.createChat()
                    const response = await conv.ask(text);
                    this.getDBB().Data.data.custom[obj.id] = conv.export();
                    this.saveData()
                    this.StoreOutputValue(response, "response", cache);
                    this.RunNextBlock("action", cache);
                } else {
                    let chat = this.getDBB().Data.data.custom[obj.id];
                    let conv = bard.createChat(chat)
                    const response = await conv.ask(text);
                    this.getDBB().Data.data.custom[obj.id] = conv.export();
                    this.saveData()
                    this.StoreOutputValue(response, "response", cache);
                    this.RunNextBlock("action", cache);
                }
            } else {
                throw "Missing Field: Either Cookie or Text is Undefined (Bard AI Block)";
            }
        });

    }
}