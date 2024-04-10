module.exports = {
    name: "Convert Text Date to Date",

    description: "Converts Text Date into a useable Date, by @XCraftTM",

    category: ".MOD",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Description: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "text",
            "name": "text",
            "description": "Type: Text, Unspecified\n\nDescription: Your Date Text that your want to convert! IMPORTANT: Should look like this: '2024-04-01T13:23:18.342Z'",
            "types": ["text", "unspecified"],
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
            "id": "date",
            "name": "Date",
            "description": "Type: Date\n\nDescription: The Converted Date",
            "types": ["date"]
        }
    ],

    code(cache) {
		const text = this.GetInputValue("text", cache);

        if(!text) {
            this.RunNextBlock("action", cache);
            return;
        }
		
        this.StoreOutputValue(new Date(text), "date", cache);
        this.RunNextBlock("action", cache);
    }
}