module.exports = {
    name: "Get Interaction Argument Value",

    description: "Gets the Argument Value from an Interaction(e.g. Slash Command) by @XCraftTM",

    category: ".MOD",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "arguments",
            "name": "Arguments",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The Arguments List",
            "types": ["list", "unspecified"],
            "required": true
        },
		{
            "id": "customnumber",
            "name": "Custom Number",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The Arguments List",
            "types": ["number", "unspecified"]
        }
    ],

    options: [
        {
            "id": "number",
            "name": "Argument Number",
            "description": "Description: The position to get the item from the list.",
            "type": "SELECT",
            "options": {
                "1": "1",
				"2": "2",
                "3": "3",
                "4": "4",
                "5": "5",
				"custom": "custom"
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
            "id": "name",
            "name": "Name",
            "description": "Type: text\n\nDescription: The Property Name Obtained.",
            "types": ["text", "unspecified"]
        },
		{
            "id": "type",
            "name": "Type",
            "description": "Type: number\n\nDescription: The Property Type Obtained.",
            "types": ["number", "unspecified"]
        },
        {
            "id": "value",
            "name": "Value",
            "description": "Type: unspecified\n\nDescription: The Property Value Obtained.",
            "types": ["unspecified"]
        }
    ],

    code(cache) {
        const arguments = this.GetInputValue("arguments", cache);
        const number = this.GetOptionValue("number", cache);
		
		let value;
        switch(number) {
            case "1":
				if(arguments.length >= 1) {
                value = arguments[0];
                break;
				} else value = []
			case "2":
                if(arguments.length >= 2) {
                value = arguments[1];
                break;
				} else value = []
            case "3":
                if(arguments.length >= 3) {
                value = arguments[2];
                break;
				} else value = []
            case "4":
                if(arguments.length >= 4) {
                value = arguments[3];
                break;
				} else value = []
            case "5":
                if(arguments.length >= 5) {
                value = arguments[4];
                break;
				} else value = []
			case "custom":
				customnumber = this.GetInputValue("customnumber", cache);
				if(arguments.length >= customnumber) {
                value = arguments[customnumber-1];
                break;
				} else value = []
        }
		
		valuename = value["name"] || "";
		valuetype = value["type"] || "";
		valuevalue = value["value"] || "";
		
        this.StoreOutputValue(valuename, "name", cache);
		this.StoreOutputValue(valuetype, "type", cache);
		this.StoreOutputValue(valuevalue, "value", cache);
        this.RunNextBlock("action", cache);
    }
}