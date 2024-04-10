module.exports = {
    name: "Register Slash Commands",

    description: "Registers Slash Commands (by @XCraftTM)",

    category: "Interaction Stuff",

    auto_execute: true,

    inputs: [],

    options: [
        {
            "id": "text",
            "name": "Commands",
            "description": "Description: The Commands you want to register!\n\nExample: \n{\n  \"name\": \"ping\", \n  \"description\": \"Pong!\"\n  \"options\": []\n}\n\nYou can resize this block by dragging the bottom right corner.\nYou can put in more Commands into here by using , after the Commands to split them like a list!",
            "type": "TEXT"
        }
    ],

    outputs: [],

    init(DBB) {
        const {readFileSync} = require("fs");
        JSON.parse(readFileSync(DBB.File.paths.workspaces))
            .map((item, index) => {
                return item.blocks.filter((x, i) => {
                    x.index = i++;
                    x.workspace = item.info.title;
                    return (x.name === 'register_slash_commands')
                });
            })
            .filter(x => x[0]).flat()
            .map((x) => {
                try {
                    JSON.parse("[" + x.options.text + "]")
                } catch (e) {
                    DBB.Core.console("WARN", '\n______________________________________\n\n SLASH COMMAND JSON ERROR:\n\n Workspace: ' + x.workspace + '\n Block: ' + x.name + ' [#' + (parseInt(x.index) + 1) + ']' + '\n\n \u2193 The error will be displayed below \u2193\n\n______________________________________\n');
                    console.log(e)
                }
            })
        try {
            const commands = JSON.parse(readFileSync(DBB.File.paths.workspaces)).map((item, index, array) => {
                let blocks = item.blocks.filter((x, i, arr) => x.name === 'register_slash_commands');
                blocks.index = index;
                return blocks
            }).filter(x => x[0]).map(x => x.map(x => JSON.parse("[" + x.options.text + "]")).flat()).flat();
            if (JSON.parse(readFileSync(DBB.File.paths.workspaces)).map((item) => {
                return item.blocks.filter(x => x.name == 'register_slash_commands')
            }).filter(x => x[0]).length > 0) {
                DBB.DiscordJS.client.application.commands.set(commands)
                    .then(DBB.Core.console("INFO", "Successfully reloaded " + commands.length + " application (/) commands."))
            }
        } catch (e) {

        }

    },

    code(cache) {
    }
}