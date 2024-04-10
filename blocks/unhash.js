module.exports = {
    name: "Unhash",

    description: "Unhash the text",

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
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The text to unhash.",
            "types": ["text", "unspecified"]
        }
    ],

    options: [
        {
            "id": "text",
            "name": "Text",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The text to unhash.",
            "type": "text"
        },
        {
            "id": "unhashmethod",
            "name": "Unhash Method",
            "description": "Description: The unhashing algoritm.",
            "type": "SELECT",
            "options": {
                1: "Base64"
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
            "id": "unhashed",
            "name": "Unhashed",
            "description": "Type: Object\n\nDescription: The unhash obtained.",
            "types": ["text"]
        }
    ],

    async code(cache) {
        const text = this.GetInputValue("text", cache, false, undefined) || this.GetOptionValue("text", cache, false, undefined);
        const unhashmethod = parseInt(this.GetOptionValue("unhashmethod", cache));

        let unhashoutput;
        switch(unhashmethod) {
            case 1:
                unhashoutput = 'base64';
                break;
        }
        
        const unhashed = Buffer.from(text, unhashoutput).toString('utf8');
        
	this.StoreOutputValue(unhashed, "unhashed", cache);
        this.RunNextBlock("action", cache);
    }
}