module.exports = {
    name: "Register Slash Commands",

    description: "Registers Slash Commands (by @XCraftTM)",

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

    outputs: [],

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
    }
}