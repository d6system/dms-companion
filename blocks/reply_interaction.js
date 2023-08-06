module.exports = {
    name: "Reply to Interaction",

    description: "Replies to an Interaction(by @XCraftTM)",

    category: ".MOD",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
            "id": "interaction",
            "name": "Interaction",
            "description": "Type: Object\n\nDescription: The Title of Your Application",
            "types": ["object"]
        },
        {
            "id": "input",
            "name": "Input",
            "description": "Type: Text, Unspecified\n\nDescription: The Input for the Action Selected",
            "types": ["text", "unspecified"]
        }
    ],

    options: [
        {
            id: "response",
            name: "Response",
            description: "Type: Text\n\nDescription: What response do you want to give?",
            type: "SELECT",
            options: {
                "reply": "Reply with Message",
                "edit": "Edit Reply Message",
                "defer": "Defer Reply",
                "fetch": "Fetch Reply",
                "delete": "Delete Reply",
                "follow": "Follow Up Reply"
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
            "description": "Type: Text, Unspecified\n\nDescription: The Output of the Action",
            "types": ["text", "unspecified"]
        }
    ],

    code: async function (cache) {
        const response = this.GetOptionValue("response", cache);
        const interaction = this.GetInputValue("interaction", cache);
        const input = this.GetInputValue("input", cache) || "";

        switch (response) {
            case "reply":
                interaction.reply({content: input, ephemeral: true});
                break;
            case "edit":
                interaction.editReply({content: input, ephemeral: true});
                break;
            case "defer":
                interaction.deferReply({ephemeral: true});
                break;
            case "fetch":
                var output = interaction.fetchReply();
                break;
            case "delete":
                interaction.deleteReply();
                break;
            case "follow":
                interaction.followUp({content: input, ephemeral: true});
                break;
        }


        this.StoreOutputValue(output, "output", cache) || "";
        this.RunNextBlock("action", cache)
    }
}