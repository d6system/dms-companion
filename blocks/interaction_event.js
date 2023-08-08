module.exports = {

    name: "Interaction [Event]",

    description: "This block will trigger when an interaction occurs. Credits: @Beastly & @XCraftTM",

    category: "Components",

    auto_execute: true,

    inputs: [
        {
            id: "id",
            name: "Name / Id",
            description: "Description: The Id of the Button, Modal or Select Menu, or the Command Name to filter for.",
            types: ["text", "unspecified"]
        },
        {
            id: "sub",
            name: "Subcommand Name",
            description: "Description: The Subcommand to filter for.",
            types: ["text", "unspecified"]
        },
        {
            id: "group",
            name: "Subcommand Group Name",
            description: "Description: The Subcommand Group to filter for.",
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
            id: "type",
            name: "The Type of the Interaction",
            description: "Description: This will decide which interaction type the block will react to",
            type: "SELECT",
            options: {
                "slash": "Slash Command",
                "button": "Button",
                "modal": "Modal",
                "stringmenu": "String Select Menu",
                "rolemenu": "Role Select Menu",
                "usermenu": "User Select Menu",
                "channelmenu": "Channel Select Menu",
                "mentionmenu": "Mentionable Select Menu",
                "context": "Context Menu",
                "any": "Any",
            }
        },
        {
            id: "id",
            name: "Name / Id",
            description: "Description: The Id of the Button, Modal or Select Menu, or the Command Name to filter for.",
            types: ["text"]
        },
        {
            id: "sub",
            name: "Subcommand Name",
            description: "Description: The Subcommand to filter for.",
            type: ["text"]
        },
        {
            id: "group",
            name: "Subcommand Group Name",
            description: "Description: The Subcommand Group to filter for.",
            type: ["text"]
        },
        {
            id: "value",
            name: "Menu Option Value",
            description: "Description: The value of the select menu option to filter for.",
            type: ["text"]
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
            id: "user",
            name: "User",
            description: "The user who started the interaction event",
            types: ["object"]
        },
        {
            id: "member",
            name: "Member",
            description: "The member who started the interaction event",
            types: ["object"]
        },
        {
            id: "server",
            name: "Server",
            description: "The server that the interaction occured in",
            types: ["object"]
        },
        {
            id: "channel",
            name: "Channel",
            description: "The channel that the interaction occured in",
            types: ["object"]
        },
        {
            id: "message",
            name: "Message",
            description: "The message that the component was sent with",
            types: ["object"]
        },
        {
            id: "interaction",
            name: "Interaction",
            description: "The interaction that started the event",
            types: ["object"]
        },
        {
            id: "args",
            name: "Arguments",
            description: "The command arguments or the modal questions",
            types: ["list", "unspecified"]
        },
        {
            id: "name",
            name: "Name / Id",
            description: "The name of the command or the id of the button / modal",
            types: ["text"]
        },
        {
            id: "menuvalues",
            name: "Menu Option",
            description: "Type: Action\n\nDescription: The ID of the selected option",
            types: ["text"]
        },
        {
            id: "subcommandname",
            name: "Subcommand Name",
            description: "Type: Action\n\nDescription: The name of the Subcommand",
            types: ["text", "unspecified"]
        },
        {
            id: "subcommandgroup",
            name: "Subcommand Group Name",
            description: "Type: Action\n\nDescription: The name of the Subcommand Group",
            types: ["text", "unspecified"]
        }
    ],

    async code(cache) {

        const type = this.GetOptionValue("type", cache);

        const id_input = this.GetInputValue("id", cache);
        const value_input = this.GetInputValue("value", cache);
        const sub_input = this.GetInputValue("sub", cache);
        const group_input = this.GetInputValue("group", cache);

        const id_option = this.GetOptionValue("id", cache) !== '' ? this.GetOptionValue("id", cache) : undefined;
        const value_option = this.GetOptionValue("value", cache) !== '' ? this.GetOptionValue("value", cache) : undefined;
        const sub_option = this.GetOptionValue("sub", cache) !== '' ? this.GetOptionValue("sub", cache) : undefined;
        const group_option = this.GetOptionValue("group", cache) !== '' ? this.GetOptionValue("group", cache) : undefined;

        const id = id_input !== undefined ? id_input : id_option;
        const value = value_input !== undefined ? value_input : value_option;
        const sub = sub_input !== undefined ? sub_input : sub_option;
        const group = group_input !== undefined ? group_input : group_option;

        this.events.on('interactionCreate', async interaction => {
            switch (type) {
                case "slash":
                    if (interaction.isChatInputCommand()) {
                        if (interaction.commandName == id && interaction.options.getSubcommand(false) == sub && interaction.options.getSubcommandGroup(false) == group ||
                            interaction.commandName == id && interaction.options.getSubcommand(false) == sub && interaction.options.getSubcommandGroup(false) == null ||
                            interaction.commandName == id && interaction.options.getSubcommand(false) == null && interaction.options.getSubcommandGroup(false) == group ||
                            interaction.commandName == id && sub == undefined && group == undefined) {
                            //Slash Command
                            this.StoreOutputValue(interaction.options._hoistedOptions, "args", cache)
                            this.StoreOutputValue(interaction.commandName, "name", cache)
                            this.StoreOutputValue(interaction.member, "member", cache)
                            this.StoreOutputValue(interaction.guild, "server", cache)
                            this.StoreOutputValue(interaction, "interaction", cache)
                            this.StoreOutputValue(interaction.user, "user", cache)
                            this.StoreOutputValue(interaction.channel, "channel", cache);
                            this.StoreOutputValue(interaction.message, "message", cache);
                            this.StoreOutputValue(interaction.options.getSubcommand(false), "subcommandname", cache);
                            this.StoreOutputValue(interaction.options.getSubcommandGroup(false), "subcommandgroup", cache);
                            this.RunNextBlock("action", cache);
                            break;
                        }
                    }
                    break;

                case "button":
                    if (interaction.isButton()) {
                        if (typeof id === "undefined" || interaction.customId == undefined || interaction.customId == id) {
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
                    }
                    break;
                case "modal":
                    if (interaction.isModalSubmit()) {
                        if (typeof id === "undefined" || interaction.customId == id) {
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
                    }
                    break;
                case "stringmenu":
                    if (interaction.isStringSelectMenu()) {
                        if (typeof id === "undefined" || interaction.customId == undefined || interaction.customId == id) {
                            //String Select Menu
                            this.StoreOutputValue(interaction.customId, "name", cache)
                            this.StoreOutputValue(interaction.member, "member", cache)
                            this.StoreOutputValue(interaction.guild, "server", cache)
                            this.StoreOutputValue(interaction, "interaction", cache)
                            this.StoreOutputValue(interaction.user, "user", cache)
                            this.StoreOutputValue(interaction.channel, "channel", cache);
                            this.StoreOutputValue(interaction.message, "message", cache);
                            this.StoreOutputValue(interaction.values, "args", cache);
                            this.RunNextBlock("action", cache);
                        }
                    }
                    break;
                case "rolemenu":
                    if (interaction.isRoleSelectMenu()) {
                        if (typeof id === "undefined" || interaction.customId == undefined || interaction.customId == id) {
                            this.StoreOutputValue(interaction.customId, "name", cache)
                            this.StoreOutputValue(interaction.member, "member", cache)
                            this.StoreOutputValue(interaction.guild, "server", cache)
                            this.StoreOutputValue(interaction, "interaction", cache)
                            this.StoreOutputValue(interaction.user, "user", cache)
                            this.StoreOutputValue(interaction.channel, "channel", cache);
                            this.StoreOutputValue(interaction.message, "message", cache);
                            this.StoreOutputValue(interaction.roles.toJSON(), "args", cache);
                            this.RunNextBlock("action", cache);
                        }
                    }
                    break;
                case "usermenu":
                    if (interaction.isUserSelectMenu()) {
                        if (typeof id === "undefined" || interaction.customId == undefined || interaction.customId == id) {
                            this.StoreOutputValue(interaction.customId, "name", cache)
                            this.StoreOutputValue(interaction.member, "member", cache)
                            this.StoreOutputValue(interaction.guild, "server", cache)
                            this.StoreOutputValue(interaction, "interaction", cache)
                            this.StoreOutputValue(interaction.user, "user", cache)
                            this.StoreOutputValue(interaction.channel, "channel", cache);
                            this.StoreOutputValue(interaction.message, "message", cache)
                            this.StoreOutputValue(interaction.users.toJSON(), "args", cache);
                            this.RunNextBlock("action", cache);
                        }
                    }
                    break;
                case "channelmenu":
                    if (interaction.isChannelSelectMenu()) {
                        if (typeof id === "undefined" || interaction.customId == undefined || interaction.customId == id) {
                            this.StoreOutputValue(interaction.customId, "name", cache)
                            this.StoreOutputValue(interaction.member, "member", cache)
                            this.StoreOutputValue(interaction.guild, "server", cache)
                            this.StoreOutputValue(interaction, "interaction", cache)
                            this.StoreOutputValue(interaction.user, "user", cache)
                            this.StoreOutputValue(interaction.channel, "channel", cache);
                            this.StoreOutputValue(interaction.message, "message", cache)
                            this.StoreOutputValue(interaction.channels.toJSON(), "args", cache);
                            this.RunNextBlock("action", cache);
                        }
                    }
                    break;
                case "mentionmenu":
                    if (interaction.isMentionableSelectMenu()) {
                        if (typeof id === "undefined" || interaction.customId == undefined || interaction.customId == id) {
                            this.StoreOutputValue(interaction.customId, "name", cache)
                            this.StoreOutputValue(interaction.member, "member", cache)
                            this.StoreOutputValue(interaction.guild, "server", cache)
                            this.StoreOutputValue(interaction, "interaction", cache)
                            this.StoreOutputValue(interaction.user, "user", cache)
                            this.StoreOutputValue(interaction.channel, "channel", cache);
                            this.StoreOutputValue(interaction.message, "message", cache)
                            this.StoreOutputValue({
                                users: interaction.users.toJSON(),
                                members: interaction.members.toJSON(),
                                roles: interaction.roles.toJSON()
                            }, "args", cache);
                            this.RunNextBlock("action", cache);
                        }
                    }
                    break;
                case "context":
                    if (interaction.isContextMenuCommand()) {
                        if (typeof id === "undefined" || interaction.commandName == undefined || interaction.commandName == id) {
                            this.StoreOutputValue(interaction.commandName, "name", cache)
                            this.StoreOutputValue(interaction.member, "member", cache)
                            this.StoreOutputValue(interaction.guild, "server", cache)
                            this.StoreOutputValue(interaction, "interaction", cache)
                            this.StoreOutputValue(interaction.user, "user", cache)
                            this.StoreOutputValue(interaction.channel, "channel", cache);
                            this.StoreOutputValue(interaction.targetMessage, "message", cache)
                            this.RunNextBlock("action", cache);
                        }
                    }
                    break;
                case "any":
                    if (interaction.isChatInputCommand()) {
                        if (interaction.commandName == id && interaction.options.getSubcommand(false) == sub && interaction.options.getSubcommandGroup(false) == group ||
                            interaction.commandName == id && interaction.options.getSubcommand(false) == sub && interaction.options.getSubcommandGroup(false) == null ||
                            interaction.commandName == id && interaction.options.getSubcommand(false) == null && interaction.options.getSubcommandGroup(false) == group ||
                            interaction.commandName == id && sub == undefined && group == undefined) {
                            //Slash Command
                            this.StoreOutputValue(interaction.options._hoistedOptions, "args", cache)
                            this.StoreOutputValue(interaction.commandName, "name", cache)
                            this.StoreOutputValue(interaction.member, "member", cache)
                            this.StoreOutputValue(interaction.guild, "server", cache)
                            this.StoreOutputValue(interaction, "interaction", cache)
                            this.StoreOutputValue(interaction.user, "user", cache)
                            this.StoreOutputValue(interaction.channel, "channel", cache);
                            this.StoreOutputValue(interaction.message, "message", cache);
                            this.StoreOutputValue(interaction.options.getSubcommand(false), "subcommandname", cache);
                            this.StoreOutputValue(interaction.options.getSubcommandGroup(false), "subcommandgroup", cache);
                            this.RunNextBlock("action", cache);
                            break;
                        }
                    } else if (interaction.isButton()) {
                        if (typeof id === "undefined" || interaction.customId == undefined || interaction.customId == id) {
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
                        if (typeof id === "undefined" || interaction.customId == id) {
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
                    } else if (interaction.isStringSelectMenu()) {
                        if (typeof id === "undefined" && typeof value === "undefined" || interaction.customId == id && typeof value === "undefined" || typeof id === "undefined" && interaction.values[0] == value || interaction.customId == id && interaction.values[0] == value) {
                            OptionID = "" + interaction.values;
                            this.StoreOutputValue(interaction.customId, "name", cache)
                            this.StoreOutputValue(interaction.member, "member", cache)
                            this.StoreOutputValue(interaction.guild, "server", cache)
                            this.StoreOutputValue(interaction, "interaction", cache)
                            this.StoreOutputValue(interaction.user, "user", cache)
                            this.StoreOutputValue(interaction.channel, "channel", cache);
                            this.StoreOutputValue(interaction, "interaction", cache)
                            this.StoreOutputValue(interaction.message, "message", cache)
                            this.StoreOutputValue(OptionID, "menuvalues", cache)
                            this.RunNextBlock("action", cache);
                        }
                    }
            }
        }
        )
    }
}