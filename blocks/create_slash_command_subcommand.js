module.exports = {
    name: "Create Subcommand",

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
            "id": "suboptions",
            "name": "Subcommand Options",
            "description": "Acceptable Types: List, Unspecified\n\nDescription: The options list to add to this subcommand/group!. (Optional)",
            "types": ["list", "unspecified"]
        },
        {
            "id": "options",
            "name": "Options",
            "description": "Acceptable Types: List, Unspecified\n\nDescription: The options list to add this option to. (Optional)",
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
                1: "Subcommand",
                2: "Subcommand Group",
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
        let type = this.GetOptionValue("type", cache) - 1;

        const types = [1,2];
        type = types[type];
        
        let option;

        option = {
            "type": type,
            "name": name.toLowerCase(),
            "description": desc,
            "options": suboptions
        };

        if (!options) options = [option]; else options.push(option);

        this.StoreOutputValue(options, "options", cache)
        this.RunNextBlock("action", cache);
    }
}