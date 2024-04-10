module.exports = {
    name: "Execute/Run Regex",
    description: "Executes a regex on a text to get the text that matches.",
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
            "description": "The Text to put through the Regex filter.",
            "types": ["text", "unspecified"],
            "required": true
        }
    ],

    options: [
        {
            "id": "regex",
            "name": "Regex",
            "description": "The Regex to use.",
            "type": "TEXT",
        }
    ],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Runs Next Block when Regex is found.",
            "types": ["action"]
        },
        {
            "id": "fetchedtext",
            "name": "Fetched Text",
            "description": "Type: Text\n\nDescription: Whether the button is clickable or not.",
            "types": ["text", "unspecified"]
        },
        {
            "id": "actionno",
            "name": "Action (Not Found)",
            "description": "Acceptable Types: Action\n\nDescription: Runs Next Block when Regex is not found.",
            "types": ["action"]
        },
        {
            "id": "found",
            "name": "Found?",
            "description": "Acceptable Types: Boolean\n\nDescription: Boolean for whether the Regex was found or not.",
            "types": ["boolean", "unspecified"]
        },
    ],

    async code(cache) {
        const regex = new RegExp(this.GetOptionValue("regex", cache));
        const text = this.GetInputValue("text", cache) + "";

        const match = regex.exec(text);
        if (match) {
            this.StoreOutputValue(match[0], "fetchedtext", cache);
            this.StoreOutputValue(Boolean(true), "found", cache);
            this.RunNextBlock("action", cache);
        } else {
            this.StoreOutputValue(Boolean(false), "found", cache);
            this.RunNextBlock("actionno", cache);
        }
    }
};    