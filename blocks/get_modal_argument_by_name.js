module.exports = {
    name: "Get Modal Argument by Name",

    description: "Gets the Argument by Name from a Modal by @XCraftTM",

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
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The Interaction of the Modal Input Event",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "customid",
            "name": "CustomID",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The CustomID of the Input Field you want to get the Arguments from!",
            "types": ["text", "unspecified"]
        }
    ],

    options: [
        {
            "id": "customid",
            "name": "CustomID",
            "description": "Description: The CustomID of the Input Field you want to get the Arguments from!",
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
            "id": "value",
            "name": "Value",
            "description": "Type: unspecified\n\nDescription: The Property Value Obtained.",
            "types": ["unspecified"]
        }
    ],

    async code(cache) {
        const interaction = this.GetInputValue("interaction", cache);
        const fieldname = this.GetOptionValue("customid", cache) ? this.GetOptionValue("customid", cache) : this.GetInputValue("customid", cache);

        this.StoreOutputValue(await interaction.fields.getTextInputValue(fieldname), "value", cache);
        this.RunNextBlock("action", cache);
    }
}