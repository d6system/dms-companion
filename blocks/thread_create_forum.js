

module.exports = {
    name: "Create Forum Thread",

    description: "Create a thread in a forum",

    category: "Threads",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "channel",
            "name": "Forum Channel",
            "description": "You can use a the new find channel block to find the forum you wish to post in",
            "types": ["object", "unspecified"]
        },
        {
            "id": "threadname",
            "name": "Thread Name",
            "description": "The name of the thread thats going to be created",
            "types": ["text", "unspecified"],
            "required": true
            
        },
        {
            "id": "threaddesc",
            "name": "Thread Description",
            "description": "The description of the thread",
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
        const { ChannelType } = require('discord.js');
        const channel = this.GetInputValue("channel", cache);
        const threadname = this.GetInputValue("threadname", cache);
        const threaddesc = this.GetInputValue("threaddesc", cache);
        let reason = this.GetInputValue("reason", cache);
        let autoarchivetime = this.GetInputValue("autoarchivetime", cache);
        const threadtype = this.GetOptionValue("threadtype", cache);

        if (!(autoarchivetime)) autoarchivetime = 1440;
        if (!(reason)) reason = "None";

        
        const thread = await channel.threads.create({
            name: threadname,
            autoArchiveDuration: autoarchivetime,
            type: ChannelType.PublicThread,
            message: {
                content: threaddesc
            },
            reason: reason
        });
        this.StoreOutputValue(thread, "threadsave", cache);
        
        
        

        this.RunNextBlock("action", cache);
    }
}