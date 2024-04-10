module.exports = {
    name: "Bard AI - Google Lens",

    description: "Use the Google Bard AI API to send the AI a Picture URL and it will send your a result what the image shows",

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
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The Prompt for the Image to ask...",
            "types": ["text", "unspecified"]
        },
        {
            "id": "image",
            "name": "Image",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The Image you want the AI to see. Supports URL and Path.",
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
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The Prompt for the Image to ask...",
            "type": "text"
        },
        {
            "id": "url",
            "name": "Image URL",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The Image you want the AI to see",
            "types": ["text", "unspecified"]
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
        function toArrayBuffer(buffer) {
            const arrayBuffer = new ArrayBuffer(buffer.length);
            const view = new Uint8Array(arrayBuffer);
            for (let i = 0; i < buffer.length; ++i) {
                view[i] = buffer[i];
            }
            return arrayBuffer;
        }
        import("bard-ai").then(async ({ default: Bard }) => {
            const fetch = require("node-fetch");
            const PSID = this.GetOptionValue("__Secure-1PSID", cache);
            const PSIDTS = this.GetOptionValue("__Secure-1PSIDTS", cache);
            const text = this.GetInputValue("text", cache) || this.GetOptionValue("text", cache);
            const image = this.GetInputValue("image", cache) || this.GetOptionValue("image", cache);
            let url = image;
            if (image.startsWith("http")) {
                const res = await fetch(image).then(res => res.buffer());
                url = toArrayBuffer(res);
            }

            if (PSID && PSID !== "" && PSIDTS && PSIDTS !== "" && text && text !== "") {
                let bard = new Bard({
                    "__Secure-1PSID": PSID,
                    "__Secure-1PSIDTS": PSIDTS
                })
                const response = await bard.ask(text, {
                    image: url
                });
                this.StoreOutputValue(response, "response", cache);
                this.RunNextBlock("action", cache);
            } else {
                throw "Missing Field: Either Cookie or Text is Undefined (Bard AI Block)";
            }
        })

    }
}