module.exports = {
    name: "Text To Emoji",

    description: "Convert text into emojis.",

    category: "Extras",

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
            "description": "Acceptable Types: Unspecified, Text\n\nDescription: The text to convert to emojis (A-Z and 0-9).",
            "types": ["unspecified", "text"],
            "required": true
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
            "id": "result",
            "name": "Result",
            "description": "Type: Unspecified\n\nDescription: The value transformed.",
            "types": ["text"]
        }
    ],

    code(cache) {
        const text = this.GetInputValue("text", cache);
        let res = "";

        const emojis = {
            '0': 'zero',
            '1': 'one',
            '2': 'two',
            '3': 'three',
            '4': 'four',
            '5': 'five',
            '6': 'six',
            '7': 'seven',
            '8': 'eight',
            '9': 'nine',
        }

        for (char of String(text).split("")) {
            if (/[A-Za-z]/.test(char)) {
                res += `:regional_indicator_${char.toLowerCase()}: `
            } 

            else if (/[0-9]/.test(char)) {
                res += `:${emojis[char]}: `
            }

            else {
                res += `${char} `
            }
        }

        this.StoreOutputValue(res, "result", cache);
        this.RunNextBlock("action", cache);
    }
}