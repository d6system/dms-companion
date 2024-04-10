module.exports = {
    name: "Better Random Key Generator (Mask)",

    description: "Generates a random key in the specified format.",

    category: "Inputs",

    inputs: [
        {
            id: "action",
            name: "Action",
            description: "Executes this block.",
            types: ["action"]
        },
        {
            id: "keysAmount",
            name: "Keys Amount",
            description: "The number of keys to generate.",
            types: ["number"]
        }
    ],

    options: [
        {
            id: "key_format",
            name: "Key Format",
            description: "The format of the key to be generated. Use 'x' for a random alphanumeric character (lowercase), 'X' for a random alphanumeric character (uppercase), '0' for a random digit, and 'Y' for a random alphanumeric character (upper or lowercase). For example, 'XXXX-XXXX-XXXX' or 'YY0000YY'.",
            type: "TEXT"
        }
    ],

    outputs: [
        {
            id: "action",
            name: "Action",
            description: "Executes the next block.",
            types: ["action"]
        },
        {
            id: "keys",
            name: "Keys",
            description: "The generated keys.",
            types: ["list"]
        }
    ],

    code(cache) {
        const keyFormat = this.GetOptionValue("key_format", cache);
        const randomChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const keysAmount = this.GetInputValue("keysAmount", cache) || 1;

        const generateKey = () => {
            let key = "";

            for (let i = 0; i < keyFormat.length; i++) {
                if (keyFormat[i] === "x") {
                    key += randomChars.charAt(Math.floor(Math.random() * 26));
                } else if (keyFormat[i] === "X") {
                    key += randomChars.charAt(Math.floor(Math.random() * 26)).toUpperCase();
                } else if (keyFormat[i] === "0") {
                    key += Math.floor(Math.random() * 10);
                } else if (keyFormat[i] === "Y") {
                    key += randomChars.charAt(Math.floor(Math.random() * 36));
                } else {
                    key += keyFormat[i];
                }
            }

            return key;
        };

        const keys = [];
        for (let i = 0; i < keysAmount; i++) {
            keys.push(generateKey());
        }

        this.StoreOutputValue(keys, "keys", cache);
        this.RunNextBlock("action", cache);
    }
};