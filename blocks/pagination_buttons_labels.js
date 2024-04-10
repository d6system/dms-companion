module.exports = {
    name: "Pagination Buttons Labels",
    
    description: "Change the labels of the pagination buttons!\n\nCredits: by @T-45",
    
    category: "Embed Pagination",
    
    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "first",
            "name": "First Button Label",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The label of the first button.\n\nDefault: ⏪",
            "types": ["text", "unspecified"]
        },
        {
            "id": "back",
            "name": "Back Button label",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The label of the second button.\n\nDefault: ◀",
            "types": ["text", "unspecified"],
        },
        {
            "id": "next",
            "name": "Next Button Label",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The label of the third button.\n\nDefault: ▶",
            "types": ["text", "unspecified"]
        },
        {
            "id": "last",
            "name": "last Button Label",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The label of the forth button.\n\nDefault: ⏩",
            "types": ["text", "unspecified"]
        },
    ],
    
    options: [
        {
            "id": "first",
            "name": "First Button Label",
            "description": "Description: The label of the first button.\n\nDefault: ⏪",
            "type": "TEXT"
        },
        {
            "id": "back",
            "name": "Back Button label",
            "description": "Description: The label of the second button.\n\nDefault: ◀",
            "type": "TEXT"
        },
        {
            "id": "next",
            "name": "Next Button Label",
            "description": "Description: The label of the third button.\n\nDefault: ▶",
            "type": "TEXT"
        },
        {
            "id": "last",
            "name": "Last Button Label",
            "description": "Description: The label of the forth button.\n\nDefault: ⏩",
            "type": "TEXT"
        },
    ],
    
    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
            "id": "labels",
            "name": "Labels",
            "description": "Type: Object\n\nDescription: The buttons labels object.",
            "types": ["object"]
        }
    ],
    
    async code(cache) {
        this.StoreOutputValue({
            first: this.GetInputValue("first",cache) || this.GetOptionValue("first",cache),
            back: this.GetInputValue("back",cache) || this.GetOptionValue("back",cache),
            next: this.GetInputValue("next",cache) || this.GetOptionValue("next",cache),
            last: this.GetInputValue("last",cache) || this.GetOptionValue("last",cache)
        }, "labels", cache);
        this.RunNextBlock("action", cache);
    }
};