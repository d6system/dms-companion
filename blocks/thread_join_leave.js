

module.exports = {
    name: "Join/Leave Thread",

    description: "Forces the bot to join or leave a thread, if already a part of the thread the bot will leave",

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
            "description": "The thread to join/leave",
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
        if(thread.joined) {
            await thread.members.remove(this.client.user.id);
        } else {
            await thread.members.add(this.client.user.id);
        }
        
        this.RunNextBlock("action", cache);
    }
}