module.exports = {

    name: "Interaction [Event]",

    description: "This block will trigger when an interaction occurs. Credits: @Beastly & @XCraftTM",

    category: "Interaction Stuff",

    auto_execute: true,

    inputs: [],

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
                "context": "Context Menu"
            }
        },
        {
            id: "id",
            name: "Name / Id",
            description: "Description: The Id of the Button, Modal or Select Menu, or the Command Name to filter for.",
            type: "text"
        },
        {
            id: "sub",
            name: "Subcommand Name",
            description: "Description: The Subcommand to filter for.",
            type: "text"
        },
        {
            id: "group",
            name: "Subcommand Group Name",
            description: "Description: The Subcommand Group to filter for.",
            type: "text"
        },
        {
            id: "value",
            name: "Menu Option Value",
            description: "Description: The value of the select menu option to filter for.",
            type: "text"
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
            types: ["object", "unspecified"]
        },
        {
            id: "member",
            name: "Member",
            description: "The member who started the interaction event",
            types: ["object", "unspecified"]
        },
        {
            id: "server",
            name: "Server",
            description: "The server that the interaction occured in",
            types: ["object", "unspecified"]
        },
        {
            id: "channel",
            name: "Channel",
            description: "The channel that the interaction occured in",
            types: ["object", "unspecified"]
        },
        {
            id: "message",
            name: "Message",
            description: "The message that the component was sent with",
            types: ["object", "unspecified"]
        },
        {
            id: "interaction",
            name: "Interaction",
            description: "The interaction that started the event",
            types: ["object", "unspecified"]
        },
        {
            id: "args",
            name: "Arguments",
            description: "The command arguments or the modal questions",
            types: ["list", "object", "unspecified"]
        },
        {
            id: "name",
            name: "Name / Id",
            description: "The name of the command or the id of the button / modal",
            types: ["text", "unspecified"]
        },
        {
            id: "menuvalues",
            name: "Menu Option",
            description: "Type: Action\n\nDescription: The ID of the selected option. (Only available for String Select Menus & Only if one option was selected)",
            types: ["text", "unspecified"]
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

        const id = this.GetOptionValue("id", cache) !== '' ? this.GetOptionValue("id", cache) : undefined;
        const value = this.GetOptionValue("value", cache) !== '' ? this.GetOptionValue("value", cache) : undefined;
        const sub = this.GetOptionValue("sub", cache) !== '' ? this.GetOptionValue("sub", cache) : undefined;
        const group = this.GetOptionValue("group", cache) !== '' ? this.GetOptionValue("group", cache) : undefined;

        this.events.on('interactionCreate', async interaction => {
                switch (type) {
                    case "slash":
                        if (interaction.isChatInputCommand()) {
                            if (interaction.commandName === id &&
                                (interaction.options.getSubcommand(false) === sub || sub === undefined) &&
                                (interaction.options.getSubcommandGroup(false) === group || group === undefined)) {
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
                            if (!id || interaction.customId === id) {
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
                            if (!id || interaction.customId === id) {
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
                            // Improve and add Select Menu Option Value to check
                            if (!id && !value ||
                                interaction.customId === id && !value ||
                                !id && interaction.values.includes(value) ||
                                interaction.customId === id && interaction.values.includes(value)) {
                                //String Select Menu
                                this.StoreOutputValue(interaction.customId, "name", cache)
                                this.StoreOutputValue(interaction.member, "member", cache)
                                this.StoreOutputValue(interaction.guild, "server", cache)
                                this.StoreOutputValue(interaction, "interaction", cache)
                                this.StoreOutputValue(interaction.user, "user", cache)
                                this.StoreOutputValue(interaction.channel, "channel", cache);
                                this.StoreOutputValue(interaction.message, "message", cache);
                                this.StoreOutputValue(interaction.values, "args", cache);
                                if (interaction.values.length === 1) this.StoreOutputValue(interaction.values[0], "menuvalues", cache);
                                this.RunNextBlock("action", cache);
                            }
                        }
                        break;
                    case "rolemenu":
                        if (interaction.isRoleSelectMenu()) {
                            if (!id || interaction.customId === id) {
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
                            if (!id || interaction.customId === id) {
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
                            if (!id || interaction.customId === id) {
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
                            if (!id || interaction.customId === id) {
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
                            if (!id || interaction.commandName === id) {
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
                }
            }
        )
    }
}