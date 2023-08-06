

module.exports = {
    name: "Create Channel Thread",

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
            "id": "channel",
            "name": "Channel",
            "description": "This creates a thread on a channel. If the channel deleted the thread will get the 'orphaned' status",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "member",
            "name": "Private Member",
            "description": "If option thread type is set to private this input will activate. The member put into this input will be pulled into the private channel.\nThey can then invite more people",
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
        },
        {
            "id": "slowmode",
            "name": "Slowmode",
            "description": "Channel slowmode in seconds",
            "types": ["number", "unspecified"]
        }
    ],

    options: [
        {
            "id": "threadtype",
            "name": "Thread Type",
            "description": "Type of thread, public or private",
            "type": "SELECT",
            "options": {
                "public": "Public Thread",
                "private": "Private Thread",
            }
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
        const member = this.GetInputValue("member", cache);
        let reason = this.GetInputValue("reason", cache);
        let autoarchivetime = this.GetInputValue("autoarchivetime", cache);
        let threadtype = this.GetOptionValue("threadtype", cache);
        let type;

        if (!(autoarchivetime)) autoarchivetime = 1440;
        if (!(reason)) reason = "None";
        if (threadtype === "channel") {type = ChannelType.PublicThread} else if (threadtype === "private") {type = ChannelType.PrivateThread};


        const thread = await channel.threads.create({
            name: threadname,
            autoArchiveDuration: autoarchivetime,
            type: type,
            reason: reason
        });
        if (threadtype === 12 && (member)) {thread.members.add(member.id)} 


        this.StoreOutputValue(thread, "threadsave", cache);
        this.RunNextBlock("action", cache);
    }
}