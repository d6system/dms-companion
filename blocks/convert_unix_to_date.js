module.exports = {
    name: "Convert Unix to Date",

    description: "Converts Unix Time into a Date, by @XCraftTM",

    category: ".MOD",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Description: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "unix",
            "name": "Unix",
            "description": "Type: Number, Text, Unspecified\n\nDescription: Your Unix Time that your want to convert!",
            "types": ["text", "number", "unspecified"],
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
		const unix = parseInt(this.GetInputValue("unix", cache)) || 0;
		
		var date = new Date(unix);
		
        this.StoreOutputValue(date, "date", cache);
        this.RunNextBlock("action", cache);
    }
}