module.exports = {

    name: "Interaction [Event] (No Filter)",

    description: "This block will trigger when an interaction occurs.",

    category: ".MOD",

    auto_execute: true,

    inputs: [],

    options: [],

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
        this.events.on('interactionCreate', async interaction => {
            if (interaction.isChatInputCommand()) {
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
            } else if (interaction.isButton()) {
                //Button
                this.StoreOutputValue(interaction.customId, "name", cache)
                this.StoreOutputValue(interaction.member, "member", cache)
                this.StoreOutputValue(interaction.guild, "server", cache)
                this.StoreOutputValue(interaction, "interaction", cache)
                this.StoreOutputValue(interaction.user, "user", cache)
                this.StoreOutputValue(interaction.channel, "channel", cache);
                this.StoreOutputValue(interaction.message, "message", cache);
                this.RunNextBlock("action", cache);
            } else if (interaction.isModalSubmit()) {
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
            } else if(interaction.isStringSelectMenu()) {
                if(!value) {
                    throw new Error('NO VALUE ID WAS SPECIFIED!');;
                }
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
        })
    }
}