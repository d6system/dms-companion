module.exports = {
    name: "Modal Create X1 WIP",
    
    description: "Create a Modal window.",

    category: ".Daily's",

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
            "description": "The Title of Your Application",
            "types": ["object"]
        },
        {
            "id": "customid",
            "name": "Modal ID",
            "description": "The ID of the Application.",
            "types": ["text", "unspecified"],
            "required": true
        },
        {
            "id": "title",
            "name": "Title",
            "description": "The Title of Your Application",
            "types": ["text", "unspecified"]
        },   
    ],

    options: [
        {
            "id": "id",
            "name": "Question ID",
            "description": "The ID of the Application.",
            "types": "TEXT"
        },
        {
            "id": "label",
            "name": "Question Text",
            "description": "What the Question is gonna be.",
            "types": "TEXT"
        },
        {
            "id": "style",
            "name": "Style",
            "description": "The Title of Your Application",
            "type": "SELECT",
            "options": {
                "1": "short",
                "2": "paragraph",
            }
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
        const { ModalBuilder, TextInputBuilder, ActionRowBuilder, Events } = require("discord.js");
        const custom_id = this.GetInputValue("customid", cache);
        const title = this.GetInputValue("title", cache);
        const id = this.GetOptionValue("id", cache);
        const label = this.GetOptionValue("label", cache);
        const style = this.GetOptionValue("style", cache);
        const interaction = this.GetInputValue("interaction", cache);
    this.events.on(Events.InteractionCreate, async _interaction => {})

        

        const modal = new ModalBuilder ()
            .setCustomId(custom_id)
            .setTitle(title);
            
        const question1 = new TextInputBuilder()
            .setCustomId(id)
            .setLabel(label)
            .setStyle(style);
        
        const firstActionRow = new ActionRowBuilder().addComponents(question1);

        modal.addComponents(firstActionRow);

       await interaction.showModal(modal);

        this.RunNextBlock("action", cache)

    }
}