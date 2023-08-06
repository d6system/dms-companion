module.exports = {
    name: "Button / Slash [Event]",

    description: "When a Button is activated or a slash command is used, this event will trigger.",

    category: "Component Stuff",

    auto_execute: true,

    inputs: [],

    options: [
        {
        id: "id",
        name: "Command / Button Id",
        description: "Type: Text\n\nDescription: The Label of the Button or Command.",
        type: "TEXT"
    },
    {
        id: "eventtype",
        name: "Event Type",
        description: "Type: Text\n\nDescription: The Style of the Button. [blurple], [grey], [green], [red], [url]",
        type: "SELECT",
        options: {                
            "slash": "slash command",
            "buttons": "buttons"
        }
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
            "id": "user",
            "name": "User",
            "description": "Type: Object\n\nDescription: The button clicker [User].",
            "types": ["object"]
        },
        {
            "id": "member",
            "name": "Member",
            "description": "Type: Object\n\nDescription: The button clicker [Member].",
            "types": ["object"]
        },
        {
            "id": "server",
            "name": "Server",
            "description": "Type: Object\n\nDescription: The server.",
            "types": ["object"]
        },
        {
            "id": "channel",
            "name": "Channel",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The text channel or DM channel to send this message.",
            "types": ["object"]
        },
        {
            "id": "message",
            "name": "Message",
            "description": "Type: Action\n\nDescription: The button message [Message].",
            "types": ["object"]
        },
        {
            "id": "button",
            "name": "Button",
            "description": "Type: Action\n\nDescription: The button message [Message].",
            "types": ["object"]
        },
        {
            "id": "buttonid",
            "name": "Id of button",
            "description": "Type: Action\n\nDescription: The button id [Text].",
            "types": ["text"]
        }
    ],

    code(cache) {

        const { Events } = require('discord.js');

        const id = this.GetOptionValue("id", cache);
        const options = this.GetOptionValue("eventtype", cache);

            if(interaction.type == 2 && id == interaction.commandName) {
                console.log("slash")
                this.events.on(Events.InteractionCreate, async interaction => {
                    this.StoreOutputValue(interaction.options, "args", cache)
                    this.StoreOutputValue(interaction.commandName, "name", cache)
                    this.StoreOutputValue(interaction.member, "member", cache)
                    this.StoreOutputValue(interaction.guild, "server", cache)
                    this.StoreOutputValue(interaction, "interaction", cache)
                    this.StoreOutputValue(interaction.user, "user", cache)
                    this.StoreOutputValue(interaction.channel, "channel", cache);
                    this.RunNextBlock("action", cache);
                })
            }else if (interaction.type == 3 && id == interaction.customId) {
                this.events.on(Events.InteractionCreate, async interaction => {
                interaction.deferUpdate()
                    .then(this.StoreOutputValue(interaction.user, "user", cache));
                    this.StoreOutputValue(interaction.member, "member", cache);
                    this.StoreOutputValue(interaction.message, "message", cache);
                    this.StoreOutputValue(interaction.guild, "server", cache);
                    this.StoreOutputValue(interaction.channel, "channel", cache);
                    this.StoreOutputValue(interaction, "button", cache);
                    this.StoreOutputValue(interaction.customId, "buttonid", cache);
                    this.RunNextBlock("action", cache);
                }
            )
        };
    }
}
