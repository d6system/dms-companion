module.exports = {
    name: "Create Role Selection Menu",
    description: "Create a Role selection menu.",
    category: "Menu",
    inputs: [
        {
            id: "action",
            name: "Action",
            description: "Type: Action\n\nDescription: Executes this block.",
            types: ["action"]
        },
        {
            id: "label",
            name: "Placeholder Label",
            description: "Description: The Label of the Menu that is seen before a selection occurs.",
            types: ["text"]
        },
		{
            id: "id",
            name: "ID of the Menu",
            description: "Description: The ID of the Menu.",
            types: ["text"]
        }
    ],
    options: [
        {
            id: "label",
            name: "Placeholder Label",
            description: "Description: The Label of the Menu that is seen before a selection occurs.",
            type: "TEXT"
        },
		{
            id: "id",
            name: "ID of the Menu",
            description: "Description: The ID of the Menu.",
            type: "TEXT"
        },
		{
            id: "max",
            name: "Max Select Amount",
            description: "Description: The Max amount of Selections the User is allowed to make!",
            type: "NUMBER"
        },
		{
            id: "min",
            name: "Min Select Amount",
            description: "Description: The Min amount of Selections the user is forced to make!",
            type: "NUMBER"
        }
    ],
    outputs: [
        {
            id: "action",
            name: "Action",
            description: "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            types: ["action"]
        },
        {
            id: "menu",
            name: "Menu",
            description: "Description: The Menu Object.",
            types: ["object"]
        },
    ],
    async code(cache) {

        const { StringSelectMenuBuilder, ActionRowBuilder, UserSelectMenuBuilder, ChannelSelectMenuBuilder, MentionableSelectMenuBuilder, RoleSelectMenuBuilder } = require('discord.js');

        var id = this.GetInputValue("id", cache);
        var label = this.GetInputValue("label", cache);
        const max = parseInt(this.GetOptionValue("max", cache)) || 1;
        const min = parseInt(this.GetOptionValue("min", cache)) || 1;

        if(id == undefined) {
            id = this.GetOptionValue("id", cache);
        }

        if(label == undefined) {
            label = this.GetOptionValue("label", cache);
        }

        menu = new RoleSelectMenuBuilder()
            .setCustomId(id)
            .setPlaceholder(label)
            .setMaxValues(max)
            .setMinValues(min)

        this.StoreOutputValue(menu, "menu", cache);
        this.RunNextBlock("action", cache);                
    }
}

