module.exports = {
    name: "Copy File",

    description: "Copy File to a Directory",

    category: "File Management",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "oldPath",
            "name": "oldPath",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The number of the specific workspace. Starts at \"1\". Only use this input if you selected the option \"Specific Workspace\" in \"Variable Restriction Type\". (OPTIONAL)",
            "types": ["text","unspecified"]
        },
        {
            "id": "newPath",
            "name": "newPath",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The number of the specific workspace. Starts at \"1\". Only use this input if you selected the option \"Specific Workspace\" in \"Variable Restriction Type\". (OPTIONAL)",
            "types": ["text", "unspecified"]
        },
    ],

    options: [
        {
            "id": "oldPath",
            "name": "oldPath ",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The number of the specific workspace. Starts at \"1\". Only use this input if you selected the option \"Specific Workspace\" in \"Variable Restriction Type\". (OPTIONAL)",
            "type": "TEXT"
        },
        {
            "id": "newPath",
            "name": "newPath",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The number of the specific workspace. Starts at \"1\". Only use this input if you selected the option \"Specific Workspace\" in \"Variable Restriction Type\". (OPTIONAL)",
            "type": "TEXT"
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
            "id": "action_error",
            "name": "action_error",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
            "id": "error",
            "name": "error",
            "description": "Type: Text, unspecified\n\nDescription: The Output of the Shell.",
            "types": ["text", "unspecified"]
        }
    ],

    async code(cache) {
        const fs = require("fs");
        let oldPath = this.GetInputValue("oldPath", cache)
        let newPath = this.GetInputValue("newPath", cache)

        if (!oldPath) {
            oldPath = this.GetOptionValue("oldPath", cache)
        }
        if (!newPath) {
            newPath = this.GetOptionValue("newPath", cache)
        }
        
        try {
            fs.copyFileSync(oldPath, newPath);
            this.RunNextBlock("action", cache);
        } catch (e) {
            this.StoreOutputValue(e, "error", cache);
            this.RunNextBlock("action_error", cache);
        }
    }
}