module.exports = {
    name: "Create Channel Selection Menu",
    description: "Create a Channel selection menu.",
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
        },
        {
            id: "channel",
            name: "Channel Types",
            description: "Description: In this Field you are able to set which channel Types will be shown to select!\nYou use Numbers to specify which channel Types you want\nHere are some examples:\n\nGuildText: 0\nGuildVoice: 2\n\nSo if you want both you set here \"0,2\" to set both!\n\nYou can find all ChannelType Numbers here: \nhttps://discord-api-types.dev/api/discord-api-types-v10/enum/ChannelType\n\nThis is Optional! Default: All",
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

        const { StringSelectMenuBuilder, ActionRowBuilder, UserSelectMenuBuilder, ChannelSelectMenuBuilder, MentionableSelectMenuBuilder } = require('discord.js');

        var id = this.GetInputValue("id", cache);
        var label = this.GetInputValue("label", cache);
        const max = parseInt(this.GetOptionValue("max", cache)) || 1;
        const min = parseInt(this.GetOptionValue("min", cache)) || 1;
        const channel = this.GetOptionValue("channel", cache);

        const split = channel.split(",");

        if(id == undefined) {
            id = this.GetOptionValue("id", cache);
        }

        if(label == undefined) {
            label = this.GetOptionValue("label", cache);
        }

        menu = new ChannelSelectMenuBuilder()
            .setCustomId(id)
            .setPlaceholder(label)
            .setMaxValues(max)
            .setMinValues(min)

        if(channel !== "") menu.setChannelTypes(split)

        this.StoreOutputValue(menu, "menu", cache);
        this.RunNextBlock("action", cache);                
    }
}

