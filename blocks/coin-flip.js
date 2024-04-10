module.exports = {
    name: "Coin Flip",

    description: "Flips a coin!",

    category: ".MOD",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        }
    ],

    options: [],

    outputs: [
        {
            "id": "actionHeads",
            "name": "Action (Heads)",
            "description": "Type: Action\n\nDescription: Executes the following blocks if heads.",
            "types": ["action"]
        },
        {
            "id": "actionTails",
            "name": "Action (Tails)",
            "description": "Type: Action\n\nDescription: Executes the following blocks if tails.",
            "types": ["action"]
        }
    ],

    code(cache) {
        this.RunNextBlock(Math.floor(Math.random() * 2) == 1 ? "actionHeads" : "actionTails", cache)
    }
}