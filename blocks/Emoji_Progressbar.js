module.exports = {
    name: "Emoji Progressbar",

    description: "Make a Emoji Progressbar",

    category: "Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "fullStart",
            "name": "fullStart (optional)",
            "description": "Start Complete(filled) Emoji",
            "types": ["text"]
        },
        {
            "id": "fullBar",
            "name": "fullBar",
            "description": "Completed(filled) Emoji",
            "types": ["text"],
            "required": true
        },
        {
            "id": "fullEnd",
            "name": "fullEnd (optional)",
            "description": "End Completed(filled) Emoji",
            "types": ["text"]
        },
        {
            "id": "emptyStart",
            "name": "emptyStart (optional)",
            "description": "Start not Completed(empty) Emoji",
            "types": ["text"]
        },
        {
            "id": "emptyBar",
            "name": "emptyBar",
            "description": "not Completed(empty) Emoji",
            "types": ["text"],
            "required": true
        },
        {
            "id": "emptyEnd",
            "name": "emptyEnd (optional)",
            "description": "end not Completed(empty) Emoji",
            "types": ["text"]
        },
        {
            "id": "value",
            "name": "value",
            "description": "Actually Value",
            "types": ["text"]
        },
        {
            "id": "maxValue",
            "name": "maxValue",
            "description": "Max Value",
            "types": ["text"]
        },
        {
            "id": "size",
            "name": "size",
            "description": "Number of characters",
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
            "id": "result",
            "name": "Result",
            "description": "Type: Unspecified\n\nDescription: The information obtained from the object.",
            "types": ["unspecified"]
        }
    ],

    async code(cache) {

        var maxValue = 100;
        var value = 50;
        var size = 10;

        const emojibar = await this.require("emoji-progressbar");
        var fullStart = this.GetInputValue("fullStart", cache);
        var fullBar = this.GetInputValue("fullBar", cache);
        var fullEnd = this.GetInputValue("fullEnd", cache);
        var emptyStart = this.GetInputValue("emptyStart", cache);
        var emptyBar = this.GetInputValue("emptyBar", cache);
        var emptyEnd = this.GetInputValue("emptyEnd", cache);
        value = this.GetInputValue("value", cache);
        maxValue = this.GetInputValue("maxValue", cache);
        size = this.GetInputValue("size", cache);

        if (fullStart == undefined) {
            fullStart = fullBar;
        }
        if (fullEnd == undefined) {
            fullEnd = fullBar;
        }
        if (emptyStart == undefined) {
            emptyStart = emptyBar;
        }
        if (emptyEnd == undefined) {
            emptyEnd = emptyBar;
        }



        var result = emojibar(fullStart, fullBar, fullEnd, emptyStart, emptyBar, emptyEnd, value, maxValue, size);

        this.StoreOutputValue(result, "result", cache);
        this.RunNextBlock("action", cache);
    }
}