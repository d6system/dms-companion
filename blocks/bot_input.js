module.exports = {
    name: "Bot Console Input [Event]",

    description: "When your bot receives an input from console, this event will trigger.",

    category: "Events",

    auto_execute: true,

    inputs: [],

    options: [],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
            "id": "value",
            "name": "Value",
            "description": "Type: Unspecified\n\nDescription: The value of the input.",
            "types": ["unspecified"]
        }
    ],

    code(cache) {
		const readline = require('readline');
		const rl = readline.createInterface({
		    input: process.stdin,
		    output: process.stdout
		});
		rl.on('line', (inputvalue) => {
			this.StoreOutputValue(inputvalue, "value", cache);
            this.RunNextBlock("action", cache);
		});
    }
}