module.exports = {
    name: "Register Slash Commands + Events",
    description: "Registers Slash Commands and creates listeners for events.",
    category: ".MOD",
    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
            "id": "commands",
            "name": "Commands",
            "description": "Type: Text\n\nDescription: The command imported from 'Create Slash Command'.",
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
        },
        {
            "id": "name",
            "name": "Name/ID",
            "description": "Type: Text\n\nDescription: The name of the command",
            "types": ["text"]
        },
        {
            "id": "interaction",
            "name": "Interaction",
            "description": "Type: Object\n\nDescription: The interaction that started the event",
            "types": ["object"]
        },
        {
            "id": "server",
            "name": "Server",
            "description": "Type: Object\n\nDescription: The server that the interaction occured in",
            "types": ["object"]
        },
        {
            "id": "channel",
            "name": "Channel",
            "description": "Type: Object\n\nDescription: The channel that the interaction occured in",
            "types": ["object"]
        },
        {
            "id": "user",
            "name": "User",
            "description": "Type: Object\n\nDescription: The user who started the interaction event",
            "types": ["object"]
        },
        {
            "id": "member",
            "name": "Member",
            "description": "Type: Object\n\nDescription: The member who started the interaction event",
            "types": ["object"]
        },
        {
            "id": "args",
            "name": "Arguments",
            "description": "Type: List, Unspecified\n\nDescription: The command arguments",
            "types": ["list", "unspecified"]
        }
    ],
    async code(cache) {
        const {
            Client,
            InteractionType,
            REST, 
            Routes
        } = require('discord.js')
        const fs = require('fs')
        const token = fs.readFileSync('./data/token.txt').toString()
        const commandarray = this.GetInputValue("commands", cache)
        const commands = JSON.parse(commandarray)
        const client = new Client({ intents: [] })
        client.login(token)
        
        const rest = new REST({ version: '10' }).setToken(token)
            
                try {
                    const data = await rest.put(
                        Routes.applicationCommands(client.user.id),
                        { body: commands },
                    )
                } catch (e) {
                    console.error(`There was an error registering slash commands!\n`, + e)
                }

        this.events.on('interactionCreate', async interaction => {
            if (InteractionType.ApplicationCommand()) {
                this.StoreOutputValue(interaction.commandName, "name", cache)
                this.StoreOutputValue(interaction, "interaction", cache)
                this.StoreOutputValue(interaction.user, "user", cache)
                this.StoreOutputValue(interaction.guild, "server", cache)
                this.StoreOutputValue(interaction.channel, "channel", cache)
                this.StoreOutputValue(interaction.member, "member", cache)
                this.RunNextBlock("action", cache)
            } else if (InteractionType.MessageComponent) {
                this.StoreOutputValue(interaction.customId, "name", cache)
                this.StoreOutputValue(interaction, "interaction", cache)
                this.StoreOutputValue(interaction.guild, "server", cache)
                this.StoreOutputValue(interaction.channel, "channel", cache)
                this.StoreOutputValue(interaction.user, "user", cache)
                this.StoreOutputValue(interaction.member, "member", cache)
                this.RunNextBlock("action", cache)
            } else if (InteractionType.ModalSubmit) {
                this.StoreOutputValue(interaction.customId, "name", cache)
                this.StoreOutputValue(interaction, "interaction", cache)
                this.StoreOutputValue(interaction.guild, "server", cache)
                this.StoreOutputValue(interaction.channel, "channel", cache)
                this.StoreOutputValue(interaction.user, "user", cache)
                this.StoreOutputValue(interaction.member, "member", cache)
                this.StoreOutputValue(interaction.fields.fields, "args", cache)
                this.RunNextBlock("action", cache)
            }

        })

    }

}