module.exports = {
    name: "Register Slash Commands for Guild",

    description: "Registers Slash Commands for one specific Guild... Will override old Commands on that specific Guild. (by @XCraftTM)",

    category: ".MOD",

    inputs: [
        {
            id: "action",
            name: "Action",
            description: "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            types: ["action"]
        },
        {
            id: "guild",
            name: "Server",
            description: "Type: Object, Text, unspecified\n\nDescription: The Server you want to register the Commands in",
            types: ["object", "text", "unspecified"],
            required: true
        }
    ],

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
            "id": "amount",
            "name": "Amount",
            "description": "Type: Object, Unspecified\n\nDescription: The Amount of Commands that were registered!",
            "types": ["number", "unspecified"]
        }
    ],

    async code(cache) {
        const text = JSON.parse("[" + this.GetOptionValue("text", cache) + "]");
        let guild = this.GetInputValue("guild", cache);

        if(typeof guild != "object") {
            guild = await this.client.guilds.fetch(guild);
        }

        await guild.commands.set(text, guild)
            .then((c) => {
                this.StoreOutputValue(c.size, "amount", cache);
                this.RunNextBlock("action", cache);
            })
            .catch(this.end);
    }
}