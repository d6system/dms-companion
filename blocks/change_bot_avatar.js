module.exports = {
    name: "Change Bot Avatar",

    description: "Changes the bot prefix to be used in commands. Supports server prefix too.",

    category: "Bot Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "avatar_url",
            "name": "Avatar URL",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The new prefix to change.",
            "types": ["text", "unspecified"],
            "required": true
        }
    ],

    options: [],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        }
    ],

    code(cache) {
        const avatar = this.GetInputValue("avatar_url", cache);
        this.client.user.setAvatar(avatar)

        this.RunNextBlock("action", cache);
    }
}