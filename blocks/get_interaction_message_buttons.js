module.exports = {
    name: "Get Message Buttons",

    description: "Gets the Buttons from an Interaction Message Object by @XCraftTM",

    category: ".MOD",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "message",
            "name": "Message",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The Message Object.",
            "types": ["object", "unspecified"],
            "required": true
        }
    ],

    options: [
        {
            "id": "action_row_number",
            "name": "Action Row Number",
            "description": "Description: The Action Row to get the Buttons from.",
            "type": "SELECT",
            "options": {
                0: "1st Action Row",
                1: "2nd Action Row",
                2: "3rd Action Row",
                3: "4th Action Row",
                4: "5th Action Row"
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
            "id": "buttons",
            "name": "Buttons",
            "description": "Type: List\n\nDescription: The Buttons obtained.",
            "types": ["list", "unspecified"]
        }
    ],

    code(cache) {
        const message = this.GetInputValue("message", cache);

        let buttons;

        buttons = message.components[this.GetOptionValue("action_row_number", cache)]['components'];

        this.StoreOutputValue(buttons, "buttons", cache);
        this.RunNextBlock("action", cache);
    }
}