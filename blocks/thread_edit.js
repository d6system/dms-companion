module.exports = {
    name: "Edit Thread",

    description: "Used to edit any aspect of a thread. If no input is given it will leave it normal.",

    category: "Threads",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
            "id": "thread",
            "name": "Thread Channel",
            "description": "A discord thread object",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "name",
            "name": "Thread Name",
            "description": "Sets a new name",
            "types": ["text", "unspecified"]
        },
        {
            "id": "autoarchive",
            "name": "Auto Archive Time",
            "description": "Only works on specific times:\nOne hour: 60\nOne day: 1440\nThree days: 4320\nOne week: 10080",
            "types": ["number", "unspecified"]
        },
        {
            "id": "slowmode",
            "name": "Slow Mode",
            "description": "Slow mode in seconds (0-6hrs)",
            "types": ["number", "unspecified"]
        },
        {
            "id": "setlocked",
            "name": "Lock Thread?",
            "description": "Lock thread, true = yes",
            "types": ["boolean", "unspecified"]
        },
        {
            "id": "setarchive",
            "name": "Archive Thread?",
            "description": "Archive thread, true = yes",
            "types": ["boolean", "unspecified"]
        },
        {
            "id": "invitable",
            "name": "Invitable",
            "description": "Whether non-moderators can add other non-moderators to a thread",
            "types": ["boolean", "unspecified"]
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
            "id": "thread",
            "name": "Thread Channel",
            "description": "A discord thread object, the new one",
            "types": ["object"]
        }
    ],

    code(cache) {
        let thread = this.GetInputValue("thread", cache);
        let setlocked = this.GetInputValue("setlocked", cache);
        let setarchive = this.GetInputValue("setarchive", cache);
        let name = this.GetInputValue("name", cache);
        let autoarchive = this.GetInputValue("autoarchive", cache);
        let slowmode = this.GetInputValue("slowmode", cache);
        let invitable = this.GetInputValue("invitable", cache);

        if (setarchive === true) {thread.setArchived(true)} else if (setarchive === false) {thread.setArchived(false)}
        if (setlocked === true) {thread.setLocked(true)} else if (setlocked === false) {thread.setlocked(false)}
        if (name) thread.edit({name:name});
        if (autoarchive) thread.edit({autoArchiveDuration: autoarchive}); 
        if (slowmode) thread.edit({rateLimitPerUser: slowmode});
        if (invitable) thread.edit({invitable: invitable})

        this.StoreOutputValue(thread, "thread", cache);
        this.RunNextBlock("action", cache);
        
    }
}