module.exports = {
    name: "Create Button Row",

    description: "Creates a Button Row to send with a message.",

    category: "Buttons",

    inputs: [
        {
            id: "action",
            name: "Action",
            description: "Acceptable Types: Action\n\nDescription: Executes this block.",
            types: ["action"]
        },
        {
            id: "button1",
            name: "Button 1",
            description: "Description: To add Buttons to the Message.",
            types: ["object", "unspecified"],
            required: true
        },
        {
            id: "button2",
            name: "Button 2",
            description: "Description: To add 2 Buttons to the Message. (OPTIONAL)",
            types: ["object", "unspecified"]
        },
        {
            id: "button3",
            name: "Button 3",
            description: "Description: To add 3 Buttons to the Message. (OPTIONAL)",
            types: ["object", "unspecified"]
        },
        {
            id: "button4",
            name: "Button 4",
            description: "Description: To add 4 Buttons to the Message. (OPTIONAL)",
            types: ["object", "unspecified"]
        },
        {
            id: "button5",
            name: "Button 5",
            description: "Description: To add 5 Buttons to the Message. (OPTIONAL)",
            types: ["object", "unspecified"]
        }
    ],

    options: [],

    outputs: [
        {
            id: "action",
            name: "Action",
            description: "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            types: ["action"]
        },
        {
            id: "row",
            name: "Button Row",
            description: "Description: The Button Row Output.",
            types: ["list", "unspecified"]
        }
    ],

    code(cache) {
        
		const button1 = this.GetInputValue("button1", cache);
        const button2 = this.GetInputValue("button2", cache);
        const button3 = this.GetInputValue("button3", cache);
        const button4 = this.GetInputValue("button4", cache);
        const button5 = this.GetInputValue("button5", cache);
        let buttons;

        buttons = [button1, button2, button3, button4, button5]

        buttons = buttons.filter(button => button)

        this.StoreOutputValue(buttons, "row", cache);
        this.RunNextBlock("action", cache);
    }
}