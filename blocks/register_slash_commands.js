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
        const text = JSON.parse("[" + this.GetOptionValue("text", cache) + "]");

        this.client.application.commands.set(text)
            .then(console.log("Successfully reloaded "+ text.length + " application (/) commands."))
            .catch(console.error);
    }
}