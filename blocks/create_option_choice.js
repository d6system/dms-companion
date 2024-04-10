module.exports = {
    name: "Create Option Choice",

    description: "Creates a choice for an option and adds it to an options list of provided! (By @T-45)",

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
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: Name of the choice.\n\n(Required)",
            "types": ["text", "unspecified"],
        },
        {
            "id": "value",
            "name": "Value",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The value of the choice.\n\n(Required)",
            "types": ["unspecified"],
        },
        {
            "id": "choices",
            "name": "Choices",
            "description": "Acceptable Types: List, Unspecified\n\nDescription: The options list to add to this option if valid option type. (Optional)",
            "types": ["list", "unspecified"]
        },
    ],

    options: [
        {
            "id": "namee",
            "name": "Name",
            "description": "Description: Name of the choice.\n\n(Required)",
            "type": "TEXT",
        },
        {
            "id": "valuee",
            "name": "Value",
            "description": "Description: The value of the choice.\n\n(Required)",
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
            "id": "choices",
            "name": "Choice(s)",
            "description": "Type: List\n\nDescription: The updated choices list.\n\nCan be connected directly with the choices value in the \"Create Slash Command Option\" block or with another \"Create Option Choice\" block to create a list with multiple choices!",
            "types": ["list"]
        },

    ],

    code(cache) {
        let name = this.GetInputValue("name", cache) || this.GetOptionValue("namee", cache);
        const value = this.GetInputValue("value", cache) || this.GetOptionValue("valuee", cache);
        let choices = this.GetInputValue("choices", cache);

        let choice = {
            "name": name,
            "value": value
        }

        if (!choices) choices = [choice]; else choices.push(choice)

        this.StoreOutputValue(choices, "choices", cache)
        this.RunNextBlock("action", cache);
    }
}