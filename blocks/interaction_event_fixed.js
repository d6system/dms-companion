module.exports = {

    name: "Interaction [Event] (Fixed)",

    description: "This block will trigger when an interaction occurs.",

    category: ".MOD",

    auto_execute: true,

    inputs: [
        {
            id: "id",
            name: "Name / Id",
            description: "Description: The Id of the Button, Modal or Select Menu, or the Command Name to filter for.",
            types: ["text", "unspecified"]
        },
        {
            id: "value",
            name: "Menu Option Value",
            description: "Description: The value of the select menu option to filter for.",
            types: ["text", "unspecified"]
        }
    ],

    options: [
        {
            id: "id",
            name: "Name / Id",
            description: "Description: The Id of the Button, Modal or Select Menu, or the Command Name to filter for.",
            types: ["text", "unspecified"]
        },
        {
            id: "value",
            name: "Menu Option Value",
            description: "Description: The value of the select menu option to filter for.",
            type: ["text", "unspecified"]
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
            "id": "channel",
            "name": "Channel",
            "description": "The channel that the interaction occured in",
            "types": ["object", "unspecified"]
        },
        {
            "id": "name",
            "name": "Name / Id",
            "description": "The name of the command or the id of the button / modal",
            "types": ["text", "unspecified"]
        },
        {
            "id": "user",
            "name": "User",
            "description": "The user who started the interaction event",
            "types": ["object", "unspecified"]
        },
        {
            "id": "member",
            "name": "Member",
            "description": "The member who started the interaction event",
            "types": ["object", "unspecified"]
        },
        {
            "id": "server",
            "name": "Server",
            "description": "The server that the interaction occured in",
            "types": ["object", "unspecified"]
        },
        {
            "id": "args",
            "name": "Arguments",
            "description": "The command arguments or the modal questions",
            "types": ["list", "unspecified"]
        },
        {
            "id": "interaction",
            "name": "Interaction",
            "description": "The interaction that started the event",
            "types": ["object", "unspecified"]
        },
        {
            "id": "message",
            "name": "Message",
            "description": "The message that the component was sent with",
            "types": ["object", "unspecified"]
        }
    ],

    async code(cache) {
        var id = this.GetInputValue("id", cache);
        var value = this.GetInputValue("value", cache);

        if(id == undefined){
            id = this.GetOptionValue("id", cache);
            if(!id) {
                throw new Error('NO CUSTOM ID WAS SPECIFIED!');;
            }
        }

        if(value == undefined){
            value = this.GetOptionValue("value", cache);
        }

        this.events.on('interactionCreate', async interaction => {
            if (interaction.isChatInputCommand()) {
                if (interaction.commandName == id) {
                //Slash Command
                this.StoreOutputValue(interaction.options._hoistedOptions, "args", cache)
                this.StoreOutputValue(interaction.commandName, "name", cache)
                this.StoreOutputValue(interaction.member, "member", cache)
                this.StoreOutputValue(interaction.guild, "server", cache)
                this.StoreOutputValue(interaction, "interaction", cache)
                this.StoreOutputValue(interaction.user, "user", cache)
                this.StoreOutputValue(interaction.channel, "channel", cache);
                this.StoreOutputValue(interaction.message, "message", cache)
                this.RunNextBlock("action", cache);
                }
            } else if (interaction.isButton()) {
                if (interaction.customId == id) {
                //Button
                this.StoreOutputValue(interaction.customId, "name", cache)
                this.StoreOutputValue(interaction.member, "member", cache)
                this.StoreOutputValue(interaction.guild, "server", cache)
                this.StoreOutputValue(interaction, "interaction", cache)
                this.StoreOutputValue(interaction.user, "user", cache)
                this.StoreOutputValue(interaction.channel, "channel", cache);
                this.StoreOutputValue(interaction.message, "message", cache);
                this.RunNextBlock("action", cache);
                }
            } else if (interaction.isModalSubmit()) {
                if (interaction.customId == id) {
                //Modal
                this.StoreOutputValue(interaction.member, "member", cache)
                this.StoreOutputValue(interaction.guild, "server", cache)
                this.StoreOutputValue(interaction.customId, "name", cache)
                this.StoreOutputValue(interaction, "interaction", cache)
                this.StoreOutputValue(interaction.user, "user", cache)
                this.StoreOutputValue(interaction.channel, "channel", cache);
                this.StoreOutputValue(interaction.fields.fields, "args", cache)
                this.StoreOutputValue(interaction.message, "message", cache)
                this.RunNextBlock("action", cache);
                }
            } else if(interaction.isStringSelectMenu()) {
                if(!value) {
                    throw new Error('NO VALUE ID WAS SPECIFIED!');;
                }
                if(interaction.customId == id && interaction.values[0] == value) {
                    this.StoreOutputValue(interaction.customId, "name", cache)
                    this.StoreOutputValue(interaction.member, "member", cache)
                    this.StoreOutputValue(interaction.guild, "server", cache)
                    this.StoreOutputValue(interaction, "interaction", cache)
                    this.StoreOutputValue(interaction.user, "user", cache)
                    this.StoreOutputValue(interaction.channel, "channel", cache);
                    this.StoreOutputValue(interaction, "interaction", cache)
                    this.StoreOutputValue(interaction.message, "message", cache)
                    this.RunNextBlock("action", cache);
                }
            }
        })
    }
}