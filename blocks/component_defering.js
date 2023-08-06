module.exports = {
    name: "Interaction Defering",

    description: "Is used to stop the 'This interaction failed' message after an Interaction (Only use if not replying to the interaction with the `Interaction Reply` block)",

    category: "Component Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "component",
            "name": "Interaction",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The component which should get the response.",
            "types": ["object", "unspecified"],
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
            "id": "error",
            "name": "Error",
            "description": "Type: Object, List\n\nDescription: Error messsage.",
            "types": ["text"]
        }
    ],

    async code(cache) {
        const component = this.GetInputValue("component", cache);

        await component.deferUpdate().catch(error => {
            this.StoreOutputValue(error.message, "error", cache);
            this.RunNextBlock("action", cache);
        });
        this.RunNextBlock("action", cache);
    }
}
