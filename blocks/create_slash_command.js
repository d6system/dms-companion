module.exports = {
    name: "Create Slash Command",
    description: "Let's you create a slash command! Designed to work with \"Register Commands & Events\".\n\n(Made by @Wiz#777)",
    category: ".MOD",
    auto_execute: true,
    inputs: [],
    options: [
        {
            "id": "commandname",
            "name": "Command Name",
            "description": "Description: The name of the command.",
            "type": "TEXT"
        },
        {
            "id": "commanddescription",
            "name": "Command Description",
            "description": "Description: The description of the command.",
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
            
            "id": "command",
            "name": "Command",
            "description": "Type: Text\n\nDescription: The command name.",
            "types": ["text"]
        }
    ],
    async code(cache) {
        const name = this.GetOptionValue("commandname", cache);
        const description = this.GetOptionValue("commanddescription", cache);
        const command = `[{
            "name": "${name}",
            "description": "${description}",
            "options": []
          }],`
        this.StoreOutputValue(command, "command", cache)    
        this.RunNextBlock("action", cache)
    }
}