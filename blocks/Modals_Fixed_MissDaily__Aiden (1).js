module.exports = {
  
    name: "Modals block",

    description: "this block simply makes djs work with modals",

    category: "ytAidenstime",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
            "id": "custom id",
            "name": "Custom Id",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["text"]
        },
        {
            "id": "slash",
            "name": "slash command name",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["text"]
        },
        {
            "id": "setTitle",
            "name": "Set Title",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["text"]
        },
        {
            "id": "questionID",
            "name": "QuestionID",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["text"]
        },
        {
            "id": "questionText",
            "name": "Question Title",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["text"]
        },
        {
            "id": "style",
            "name": "Question Style",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["text"]
        }

    ],

    options: [],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        }
    ],

    async code(cache) {
        const slash = this.GetInputValue("slash", cache);
        const customID = this.GetInputValue("custom id", cache);
        const Title = this.GetInputValue("setTitle", cache);

        const questionId = this.GetInputValue("questionID", cache);
        const questionText = this.GetInputValue("questionText", cache);
        const style = this.GetInputValue("style", cache);


        const { ActionRowBuilder, Events, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

        this.events.on(Events.InteractionCreate, async interaction => {
            if (!interaction.isChatInputCommand()) return;
        
            if (interaction.commandName === slash) {
                // Create the modal
                const modal = new ModalBuilder()
                    .setCustomId(customID)
                    .setTitle(Title);
        
                const favoriteColorInput = new TextInputBuilder()
                    .setCustomId(questionId)
          
                    .setLabel(questionText)
                
                    .setStyle(style);

                const firstActionRow = new ActionRowBuilder().addComponents(favoriteColorInput);
        
              
                modal.addComponents(firstActionRow);
       
                await interaction.showModal(modal);
            }
        });
        this.RunNextBlock("action", cache);
    }
}