module.exports = {
    name: "Top.gg Vote [Event]",

    description: "Triggers when a user votes for the bot or server on top.gg.",

    category: "Internet Stuff",

    auto_execute: true,

    inputs: [],

    options: [],

    outputs: [
        {
            "id": "action",
            "name": "True",
            "description": "Type: Action\n\nDescription: Executes the following blocks when the event is triggered.",
            "types": ["action"]
        },
        {
            "id": "text1",
            "name": "Member ID",
            "description": "Description: The text to set.",
            "type": "TEXT"
        },
    ],

    async code(cache) {

        const { VoteClient } = await this.require("topgg-votes")

        const votesClient = new VoteClient()
            .setToken("")

        votesClient.on("botVote", ({ userId }) => {
            console.log(`${userId} has voted!`)
        })
        
        this.RunNextBlock("action", cache);
    }
}