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
            "id": "inputs",
            "name": "Inputs",
            "description": "Type: List\n\nDescription: The input fields to add",
            "types": ["list"]
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

    code: async function(cache) {
        const { ModalBuilder, ActionRowBuilder } = require("discord.js");
        var custom_id = this.GetInputValue("customid", cache) || this.GetOptionValue("customid", cache);
        var title = this.GetInputValue("title", cache) || this.GetOptionValue("title", cache);
        const interaction = this.GetInputValue("interaction", cache);
        var options = this.GetInputValue("inputs", cache);

        if(custom_id == undefined) {
            custom_id = this.GetOptionValue("customid", cache);
        }

         if(title == undefined) {
             title = this.GetOptionValue("title", cache);
         }
        
        const modal = new ModalBuilder ()
            .setCustomId(custom_id)
            .setTitle(title)

        options.forEach(option => {
            if(typeof option !== 'undefined' || option !== null) {
                const row = new ActionRowBuilder().addComponents(option);
                modal.addComponents([row]);
                }
        });

        interaction.showModal(modal);

        this.RunNextBlock("action", cache)

    }
}