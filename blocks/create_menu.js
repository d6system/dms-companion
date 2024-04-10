module.exports = {
    name: "Create Selection Menu",
    description: "Create a selection menu.",
    category: "Menu",
    inputs: [
        {
            id: "action",
            name: "Action",
            description: "Type: Action\n\nDescription: Executes this block.",
            types: ["action"]
        },
        {
            id: "options",
            name: "Options",
            description: "Type: List\n\nDescription: The Menu component(s) to add.",
            types: ["list", "unspecified"],
            required: true
        },
        {
            id: "label",
            name: "Placeholder Label",
            description: "Description: The Label of the Menu that is seen before a selection occurs.",
            types: ["text", "unspecified"]
        },
		{
            id: "id",
            name: "ID of the Menu",
            description: "Description: The ID of the Menu.",
            types: ["text", "unspecified"]
        },
		{
            id: "maxvalues",
            name: "Max Possible Selects",
            description: "Description: The Amount of Selects possible. Default: 1",
            types: ["number", "unspecified"]
        },
		{
            id: "minvalues",
            name: "Min Required Selects",
            description: "Description: The Amount of Selects Needed. Default: 1",
            types: ["number", "unspecified"]
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

        const { StringSelectMenuBuilder, ActionRowBuilder } = require('discord.js');

        var id = this.GetInputValue("id", cache);
        var label = this.GetInputValue("label", cache);
        const maxvalues = parseInt(this.GetInputValue("maxvalues", cache)) || 1;
        const minvalues = parseInt(this.GetInputValue("minvalues", cache)) || 1;

        if(id == undefined) {
            id = this.GetOptionValue("id", cache);
        }

        if(label == undefined) {
            label = this.GetOptionValue("label", cache);
        }

        var options = this.GetInputValue("options", cache);

        menu = new StringSelectMenuBuilder()
            .setCustomId(id)
            .setPlaceholder(label)
            .addOptions()
            .setMaxValues(maxvalues)
            .setMinValues(minvalues)

        options.forEach(option => {
             if(typeof option !== 'undefined' || option !== null) {
                const regex = /"/i;
                var optiond = JSON.parse(JSON.stringify(option).replace('[', '').replace(']' ,''));
                menu.addOptions(optiond);
              }
        });

        this.StoreOutputValue(menu, "menu", cache);
        this.RunNextBlock("action", cache);                
    }
}

