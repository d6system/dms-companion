module.exports = {
    name: "Loop End",

    description: "Executes the next blocks when the loops is done.",

    category: "Flow Control",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Executes this block.",
            "types": ["action"]
        },
        {
            "id": "loop",
            "name": "Loop",
            "description": "Acceptable Types: Object, Unspecified\n\nThe loop object.",
            "types": ["object", "unspecified"],
            "required": true
        }
    ],

    options: [],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nExecutes the next block.",
            "types": ["action"]
        }
    ],

    code(cache) {
        const loop = this.GetInputValue("loop", cache); if (!loop) throw("You must provide the loop object!")
        
        if (loop.position == loop.loopsAmount) {
            this.RunNextBlock("action", cache);
        }
    }
}