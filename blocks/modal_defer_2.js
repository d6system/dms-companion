module.exports = {
    name: "Modal Defer",

    description: "allows you to tell the modal to go away",

    category: ".MOD",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "interaction",
            "name": "Interaction",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["object"]
        }
    ],

    options: [],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks after waiting for the amount of time.",
            "types": ["action"]
        }
    ],

    code(cache) {
        const inter = this.GetInputValue("interaction", cache)

         inter.reply('Pong!');
        
         inter.deleteReply();
        this.RunNextBlock("action", cache)
    }
}