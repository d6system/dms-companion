
module.exports = {
    name: "Delete Thread",

    description: "Deletes a thread",

    category: "Threads",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "thread",
            "name": "Thread Channel",
            "description": "This creates a thread on a channel. If the channel deleted the thread will get the 'orphaned' status",
            "types": ["object", "unspecified"],
            "required": true
        }
    ],

    options: [
    ],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        }
    ],

    async code(cache) {
        const thread = this.GetInputValue("thread", cache);

        await thread.delete();
        this.RunNextBlock("action", cache);
    }
}