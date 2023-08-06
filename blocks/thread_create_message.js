

module.exports = {
    name: "Create Message Thread",

    description: "Create a thread in either a channel or message",

    category: "Threads",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "message",
            "name": "Message",
            "description": "If option chosen is Message this will activate the input.\nThis creates a thread on a message. If message deleted the thread will get the 'orphaned' status",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "threadname",
            "name": "Thread Name",
            "description": "The name of the thread thats going to be created",
            "types": ["text", "unspecified"],
            "required": true
            
        },
        {
            "id": "reason",
            "name": "Reason",
            "description": "The reason of why the thread was created, Default: 'None'",
            "types": ["text", "unspecified"]  
        },
        {
            "id": "autoarchivetime",
            "name": "Auto Archive Time",
            "description": "Only works on specific times:\nOne hour: 60\nOne day: 1440\nThree days: 4320\nOne week: 10080\nDefault: One day",
            "types": ["number", "unspecified"]
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
        },
        {
            "id": "threadsave",
            "name": "Thread Channel",
            "description": "A discord thread object",
            "types": ["object"]
        },
    ],

    async code(cache) {
        const message = this.GetInputValue("message", cache);
        const threadname = this.GetInputValue("threadname", cache);
        let reason = this.GetInputValue("reason", cache);
        let autoarchivetime = this.GetInputValue("autoarchivetime", cache);

        if (!(autoarchivetime)) autoarchivetime = 1440;
        if (!(reason)) reason = "None";

        const thread = await message.startThread({
            name: threadname,
            autoArchiveDuration: autoarchivetime,
            reason: reason
        });

        this.StoreOutputValue(thread, "threadsave", cache);
        this.RunNextBlock("action", cache);
    }
}