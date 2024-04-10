module.exports = {
    name: "Hash",

    description: "Hash the text",

    category: ".artemsnite",

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
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The text to hash.",
            "types": ["text", "unspecified"]
        }
    ],

    options: [
        {
            "id": "text",
            "name": "Text",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The text to hash.",
            "type": "text"
        },
        {
            "id": "hashmethod",
            "name": "Hash Method",
            "description": "Description: The hashing algoritm.",
            "type": "SELECT",
            "options": {
                1: "SHA256",
                2: "SHA512",
                3: "MD5"
            }
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
            "id": "hashed",
            "name": "Hashed",
            "description": "Type: Object\n\nDescription: The hash obtained.",
            "types": ["text"]
        }
    ],

    async code(cache) {
        const crypto = require('crypto');
        const text = this.GetInputValue("text", cache, false, undefined) || this.GetOptionValue("text", cache, false, undefined);
        const hashmethod = parseInt(this.GetOptionValue("hashmethod", cache));

        let hashoutput;
        switch(hashmethod) {
            case 1:
                hashoutput = 'sha256';
                break;
            case 2:
                hashoutput = 'sha512';
                break;
            case 3:
                hashoutput = 'md5';
                break;
        }
        function hashString(input) {
            const hash = crypto.createHash(hashoutput);
            hash.update(input);
            return hash.digest('hex');
        }

        const hashed = hashString(text);

	this.StoreOutputValue(hashed, "hashed", cache);
        this.RunNextBlock("action", cache);
    }
}