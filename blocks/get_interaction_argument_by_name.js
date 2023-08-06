module.exports = {
    name: "Get Interaction Argument by Name",

    description: "Gets the Argument by Name from an Interaction(e.g. Slash Command) by @XCraftTM",

    category: ".MOD",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "interaction",
            "name": "Interaction",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The Interaction to get the Argument from.",
            "types": ["object", "unspecified"],
            "required": true
        },
		{
            "id": "name",
            "name": "Name",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The Name of the Argument",
            "types": ["text", "unspecified"]
        }
    ],

    options: [
        {
            "id": "name",
            "name": "Argument Name",
            "description": "Description: The Name of the Argument you want to get",
            "type": "TEXT"
        },
        {
            "id": "get",
            "name": "Get Type",
            "description": "Description: What Type the Argument is...",
            "type": "SELECT",
            "options": {
                "string": "String/Text",
				"channel": "Channel [Object]",
                "user": "User [Object]",
                "member": "Member [Object]",
                "role": "Role [Object]",
				"number": "Number/Integer [Number]",
                "attachment": "Attachment [Object]",
                "mentionable": "Mentionable [Object]",
                "message": "Message [Message]",
                "anything": "Anything [Unspecified]"
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
            "id": "output",
            "name": "Output",
            "description": "Type: Object, Text, Number, Unspecified\n\nDescription: The Property Value Obtained.",
            "types": ["object", "text", "number", "unspecified"]
        }
    ],

    async code(cache) {
        const interaction = this.GetInputValue("interaction", cache);
        var get = this.GetOptionValue("get", cache);
        var name = this.GetInputValue("name", cache);

        if(name === undefined) {
            name = this.GetOptionValue("name", cache);
        }
		
		let output;
        switch(get) {
            case "string":
				output = await interaction.options.getString(name);
                break;
			case "channel":
                output = await interaction.options.getChannel(name);
                break;
            case "user":
                output = await interaction.options.getUser(name);
                break;
            case "member":
                output = await interaction.options.getMember(name);
                break;
            case "role":
                output = await interaction.options.getRole(name);
                break;
			case "number":
				output = await interaction.options.getNumber(name);
                if(output === undefined) {
                    output = await interaction.options.getInteger(name);
                }
                break;
            case "attachment":
                output = await interaction.options.getAttachment(name);
                break;
            case "mentionable":
                output = await interaction.options.getMentionable(name);
                break;
            case "message":
                output = await interaction.options.getMessage(name);
                break;
            case "anything":
                var json = await interaction.options.get(name);
                if(json.hasOwnProperty("value")) {
                    output = json.value;
                } else {
                    output = undefined;
                }
                break;
        }
		
		this.StoreOutputValue(output, "output", cache);
        this.RunNextBlock("action", cache);
    }
}