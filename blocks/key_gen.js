module.exports = {
	name: "Key Gen",

	description: "Generate keys using a custom format",

	category: "Extras",

	inputs: [
		{
			id: "action",
			name: "Action",
			description:
				"Acceptable Types: Action\n\nDescription: Executes this block.",
			types: ["action"],
		},
	],

	options: [
		{
			id: "format",
			name: "Format",
			description:
				'Description: This will be the format you\'re key is in (Letter "x" is the placeholder: ###-###-####)',
			type: "TEXT",
		},
		{
			id: "capitals",
			name: "Capital letters",
			description: "Description: Whether or not to include capital letters",
			type: "SELECT",
			options: {
				true: "True/Yes",
				false: "False/No",
			},
		},
		{
			id: "lowercase",
			name: "Lowercase letters",
			description: "Description: Whether or not to include lowercase letters",
			type: "SELECT",
			options: {
				true: "True/Yes",
				false: "False/No",
			},
		},
		{
			id: "numbers",
			name: "Numbers",
			description: "Description: Whether or not to include Numbers",
			type: "SELECT",
			options: {
				true: "True/Yes",
				false: "False/No",
			},
		},
        {
			id: "custom",
			name: "Custom Characters",
			description:
				'Description: Any other custom characters you want to be included in the key.',
			type: "TEXT",
		}
	],

	outputs: [
		{
			id: "action",
			name: "Action",
			description:
				"Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
			types: ["action"],
		},
		{
			id: "text",
			name: "Text",
			description: "Type: Text\n\nDescription: The generated key.",
			types: ["text"],
		},
	],

	code(cache) {
		const format = this.GetOptionValue("format", cache) + "";


        const customs = this.GetOptionValue("custom", cache) + "";
		const capitals = this.GetOptionValue("capitals", cache) + "";
		const lowercase = this.GetOptionValue("lowercase", cache) + "";
		const numbers = this.GetOptionValue("numbers", cache) + "";

		let characters = "";
		let output = "";

		if (capitals == "true") characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		if (lowercase == "true") characters += "abcdefghijklmnopqrstuvwxyz";
		if (numbers == "true") characters += "0123456789";
        if (customs.replace(/ +/g, '').length > 0) characters += customs.replace(/ +/g, '')

		if (characters.length > 0 && format.length > 0) {
			const split = format.split("");
			for (value of split) {
				if (value == "#") {
					const random = Math.floor(Math.random() * (characters.length));
                    output += `${characters.charAt(random)}`;
				} else {
					output += `${value}`;
				}
			}
		} else {
            output = 'undefined';
        }

		this.StoreOutputValue(output, "text", cache);
		this.RunNextBlock("action", cache);
	},
};
