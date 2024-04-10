module.exports = {
    name: "Full Defer Interaction",

    description: "Fully Defers the Interaction (No Reply, No Thinking) For Devs, the Function is called .deferUpdate()",

    category: "Interaction Stuff",

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
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The Interaction to fully Defer.",
            "types": ["object", "unspecified"],
            "required": true
        }
    ],

    options: [],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks after the Block finishes its Task.",
            "types": ["action"]
        }
    ],

    async code(cache) {
        const interaction = this.GetInputValue("interaction", cache);
        if(interaction.isChatInputCommand() || interaction.isContextMenuCommand()) {
            await interaction.deferReply();
            await interaction.deleteReply();
        } else {
            await interaction.deferUpdate();
        }
        this.RunNextBlock("action", cache)
    }
}