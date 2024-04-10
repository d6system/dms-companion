module.exports = {
    name: "Create and Show Modal",

    description: "Creates and Shows a Modal on an Interaction(by @XCraftTM)",

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
            "id": "customid",
            "name": "CustomID",
            "description": "Type: Text\n\nDescription: The ID of the Application.",
            "types": ["text", "unspecified"],
        },
        {
            "id": "title",
            "name": "Title",
            "description": "Type: Text\n\nDescription:The Title of Your Application",
            "types": ["text", "unspecified"]
        },
        {
            "id": "textfield1",
            "name": "Input Field 1",
            "description": "The Text Input Field created",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "textfield2",
            "name": "Input Field 2",
            "description": "The Text Input Field created",
            "types": ["object", "unspecified"]
        },
        {
            "id": "textfield3",
            "name": "Input Field 3",
            "description": "The Text Input Field created",
            "types": ["object", "unspecified"]
        },
        {
            "id": "textfield4",
            "name": "Input Field 4",
            "description": "The Text Input Field created",
            "types": ["object", "unspecified"]
        },
        {
            "id": "textfield5",
            "name": "Input Field 5",
            "description": "The Text Input Field created",
            "types": ["object", "unspecified"]
        }
    ],

    options: [
        {
            "id": "customid",
            "name": "CustomID",
            "description": "Description: The ID of the Application.",
            "type": "TEXT"
        },
        {
            "id": "title",
            "name": "Title",
            "description": "Description: The Title of Your Application",
            "type": "TEXT"
        }
    ],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        }
    ],

    code(cache) {
        const {ModalBuilder, ActionRowBuilder} = require("discord.js");
        var custom_id = this.GetInputValue("customid", cache) || this.GetOptionValue("customid", cache);
        var title = this.GetInputValue("title", cache) || this.GetOptionValue("title", cache);
        const interaction = this.GetInputValue("interaction", cache);
        const textfield1 = this.GetInputValue("textfield1", cache);
        const textfield2 = this.GetInputValue("textfield2", cache);
        const textfield3 = this.GetInputValue("textfield3", cache);
        const textfield4 = this.GetInputValue("textfield4", cache);
        const textfield5 = this.GetInputValue("textfield5", cache);
        const options = [textfield1, textfield2, textfield3, textfield4, textfield5];

        const modal = new ModalBuilder()
            .setCustomId(custom_id)
            .setTitle(title)

        options.forEach(option => {
            if (option) {
                const row = new ActionRowBuilder().addComponents(option);
                modal.addComponents(row);
            }
        });

        interaction.showModal(modal);

        this.RunNextBlock("action", cache)

    }
}