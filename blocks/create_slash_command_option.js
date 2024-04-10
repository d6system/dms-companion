module.exports = {
    name: "Create Option",

    description: "Creates a slash command option and adds it to an options list if provided! (By @T-45)",

    category: "Slash Commands Builder",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "name",
            "name": "Name",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: Name of the option.\n\n(Required)",
            "types": ["text", "unspecified"],
        },
        {
            "id": "desc",
            "name": "Description",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The description of the option.\n\n(Required)",
            "types": ["text", "unspecified"],
        },
        {
            "id": "options",
            "name": "Options",
            "description": "Acceptable Types: List, Unspecified\n\nDescription: The options list to add this option to. (Optional)",
            "types": ["list", "unspecified"]
        },
        {
            "id": "choices",
            "name": "Choices",
            "description": "Acceptable Types: List, Unspecified\n\nDescription: The choices list to add this choice to it if valid option type.\n\nValid types: String, Integer, Number, Attachment\n\n(Optional)",
            "types": ["list", "unspecified"]
        },
    ],

    options: [
        {
            "id": "type",
            "name": "Option type",
            "description": "Description: The type of the option.",
            "type": "SELECT",
            "options": {
                3: "String",
                4: "Integer",
                5: "Boolean",
                6: "User",
                7: "Channel",
                8: "Role",
                9: "Mentionable",
                10: "Number",
                11: "Attachment",
            }
        },
        {
            "id": "namee",
            "name": "Name",
            "description": "Description: Name of the option.\n\n(Required)",
            "type": "TEXT",
        },
        {
            "id": "descc",
            "name": "Description",
            "description": "Description: The description of the option.\n\n(Required)",
            "type": "TEXT",
        },
        {
            "id": "required",
            "name": "Required",
            "description": "Description: Is this option required or not?",
            "type": "SELECT",
            "options": {
                "false": "No",
                "true": "Yes"
            }
        },
        {
            "id": "autocomplete",
            "name": "Autocomplete",
            "description": "Description: Is this option autocomplete or not?",
            "type": "SELECT",
            "options": {
                "false": "No",
                "true": "Yes"
            }
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
            "id": "options",
            "name": "Option(s)",
            "description": "Type: List\n\nDescription: The updated options list.\n\nCan be connected directly with the option value in the \"Create Slash Command (Advanced)\" block or with another \"Create Slash Command Option\" block to create a list with multiple options!",
            "types": ["list"]
        },

    ],

    code(cache) {
        let name = this.GetInputValue("name", cache) || this.GetOptionValue("namee", cache);
        const desc = this.GetInputValue("desc", cache) || this.GetOptionValue("descc", cache);
        let suboptions = this.GetInputValue("suboptions", cache);
        let options = this.GetInputValue("options", cache);
        let choices = this.GetInputValue("choices", cache);
        let type = this.GetOptionValue("type", cache) - 3;
        let required = this.GetOptionValue("required", cache);
        let autocomplete = this.GetOptionValue("autocomplete", cache);

        switch (required) {
            case "true":
                required = true;
                break;
            case "false":
                required = false;
                break;
        }

        switch (autocomplete) {
            case "true":
                autocomplete = true;
                break;
            case "false":
                autocomplete = false;
                break;
        }

        const types = [3,4,5,6,7,8,9,10,11];
        type = types[type];
        
        let option;

        switch (type) {
            case 5 || 6 || 7 || 8 || 9:
                option = {
                    "type": type,
                    "name": name.toLowerCase(),
                    "description": desc,
                    "required": required,
                    "autocomplete": autocomplete
                };
                break;
            default:
                if (!choices) {
                    option = {
                        "type": type,
                        "name": name.toLowerCase(),
                        "description": desc,
                        "required": required,
                        "autocomplete": autocomplete
                    };
                } else {
                    option = {
                        "type": type,
                        "name": name.toLowerCase(),
                        "description": desc,
                        "choices": choices,
                        "required": required,
                        "autocomplete": autocomplete
                    };
                }
                break;
        }

        if (!options) options = [option]; else options.push(option);

        this.StoreOutputValue(options, "options", cache)
        this.RunNextBlock("action", cache);
    }
}