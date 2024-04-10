module.exports = {
    name: "Create Context Menu",

    description: "Creates a context menu and adds it to a slash commands list if provided! (By @T-45)",

    category: "Slash Commands Builder",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "name",
            "name": "Name",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: Name of the slash command.\n\nThis is how its going to look like in discord if you put \"help\": /help\n\n(Required)",
            "types": ["text", "unspecified"],
        },
        {
            "id": "commands",
            "name": "Slash Commands",
            "description": "Acceptable Types: List, Unspecified\n\nDescription: The slash commands list to update. (Optional)\n\nThis option is made to make it to you dont need to use the lists blocks, so instead of using them you can just use the slash commands input to add this slash command to the list.",
            "types": ["list", "unspecified"]
        }
    ],

    options: [
        {
            "id": "namee",
            "name": "Name",
            "description": "Description: Name of the slash command.\n\nThis is how its going to look like in discord if you put \"help\": /help\n\n(Required)",
            "type": "TEXT",
        },
        {
            "id": "type",
            "name": "Type",
            "description": "Description: The context menu type.",
            "type": "SELECT",
            "options": {
                1: "Message",
                2: "User"
            }
        },
    ],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
            "id": "slash_cmds",
            "name": "Slash Command(s)",
            "description": "Type: List\n\nDescription: The updated slash commands list.\n\nCan be connected directly with the \"Register Slash Commands (Input)\" block or with another \"Create Slash Command\" block to create a list with multiple slash commands!",
            "types": ["list"]
        },

    ],

    code(cache) {
        let name = this.GetInputValue("name", cache) || this.GetOptionValue("namee", cache);
        const type = this.GetOptionValue("type", cache);
        let slcslist = this.GetInputValue("commands", cache);

        const cmd = {
            "name": name,
            "type": type == 1 ? 3 : 2
        }

        if (!slcslist) slcslist = [cmd]; else slcslist.push(cmd)

        this.StoreOutputValue(slcslist, "slash_cmds", cache)
        this.RunNextBlock("action", cache);
    }
}