module.exports = {
    name: "Register Slash Commands (Input)",

    description: "Registers Slash Commands (by @XCraftTM and edited by @T-45)",

    category: "Slash Commands Builder",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "commands",
            "name": "Commands",
            "description": "Acceptable Types: List, Unspecified\n\nDescription: The commands list\n\nSlash commands can be made using the \"Create Slash Command (Advanced)\" block!.",
            "types": ["list", "unspecified"]
        }
    ],

    options: [],

    outputs: [],

    async code(cache) {
        const { REST, Routes, Client, GatewayIntentBits } = require('discord.js');
        const fs = require('fs');
        const token = fs.readFileSync('./data/token.txt').toString();
        const commands = this.GetInputValue("commands", cache);    
        const client = new Client({ intents: [] });
        await client.login(token);

        const rest = new REST({ version: '10' }).setToken(token);
        (async () => {
            try {
                this.console("INFO", `Started refreshing ${commands.length} application (/) commands.`);

                // The put method is used to fully refresh all commands in the guild with the current set
                const data = await rest.put(
                    Routes.applicationCommands(client.user.id),
                    { body: commands },
                );

                this.console("INFO", `Successfully reloaded ${data.length} application (/) commands.`);
            } catch (error) {
                // And of course, make sure you catch and log any errors!
                this.console("WARN", error);
            }
        })();
    }
}