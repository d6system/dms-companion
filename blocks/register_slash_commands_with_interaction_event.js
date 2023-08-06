module.exports = {
    name: "Register Slash Commands(with Interaction Event)",

    description: "Registers Slash Command and Event in One Block (by @XCraftTM)",

    category: ".MOD",

    auto_execute: true,

    inputs: [],

    options: [
        {
            "id": "text",
            "name": "Commands",
            "description": "Description: The Commands you want to register!.",
            "type": "TEXT"
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
            "description": "Type: Object\n\nDescription: The channel that the interaction occured in",
            "types": ["object"]
        },
        {
            "id": "name",
            "name": "Name / Id",
            "description": "Type: Text\n\nDescription: The name of the command",
            "types": ["text"]
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
            "id": "server",
            "name": "Server",
            "description": "Type: Object\n\nDescription: The server that the interaction occured in",
            "types": ["object"]
        },
        {
            "id": "args",
            "name": "Arguments",
            "description": "Type: List, Unspecified\n\nDescription: The command arguments",
            "types": ["list", "unspecified"]
        },
        {
            "id": "interaction",
            "name": "Interaction",
            "description": "Type: Object\n\nDescription: The interaction that started the event",
            "types": ["object"]
        },
        {
            "id": "message",
            "name": "Message",
            "description": "The message that the component was sent with",
            "types": ["object"]
        }
    ],

    async code(cache) {
        const { REST, Routes, Client, GatewayIntentBits } = require('discord.js');
        const fs = require('fs');
        const token = fs.readFileSync('./data/token.txt').toString();
        const text = this.GetOptionValue("text", cache);

        const commands = JSON.parse(text);
        const client = new Client({ intents: [] });
        await client.login(token);

        const rest = new REST({ version: '10' }).setToken(token);
        (async () => {
            try {
                console.log(`Started refreshing ${commands.length} application (/) commands.`);

                // The put method is used to fully refresh all commands in the guild with the current set
                const data = await rest.put(
                    Routes.applicationCommands(client.user.id),
                    { body: commands },
                );

                console.log(`Successfully reloaded ${data.length} application (/) commands.`);
            } catch (error) {
                // And of course, make sure you catch and log any errors!
                console.error(error);
            }
        })();

        // EVENT START
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
            }
        })
    }
}