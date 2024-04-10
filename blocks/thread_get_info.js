
module.exports = {
    name: "Get Thread Channel Info",

    description: "Gets information from a thread/thread channel",

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
            "description": "The thread channel you wish to get information from",
            "types": ["object", "unspecified"],
            "required": true
        }
    ],

    options: [
        {
            "id": "thread_info",
            "name": "Thread Channel Info",
            "description": "Description: The thread information to get.",
            "type": "SELECT",
            "options": {
                1: "Type Of Thread [Text]",
                2: "Thread Guild [Server]",
                3: "Thread Creation Timestamp [Number]",
                4: "Is Thread Invitable [Boolean]",
                5: "Thread Auto Archive Duration [Number]",
                6: "Thread ID [Text]",
                7: "Thread Member Count [Number]",
                8: "Thread Message Count",
                9: "Thread Tags [List]",
                10: "Thread Owner Member ID [Text]",
                11: "Thread Name [Text]",
                12: "Is Thread Archived [Boolean]",
                13: "Is Thread Locked [Boolean]",
                14: "Last Message Id [Text]",
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
            "id": "result",
            "name": "Result",
            "description": "Info obtained from the thread",
            "types": ["unspecified"]
        }
    ],

    async code(cache) {
        const thread = this.GetInputValue("thread", cache);
        let threadinfo = parseInt(this.GetOptionValue("thread_info", cache));
        let result;

        switch(threadinfo) {
            case 1:
                if (thread.type === 12) {result = "privateThread"} else if (thread.type === 11) {result = "publicThread"};
                break;
            case 2:
                result = thread.guild;
                break;
            case 3:
                result = thread._createdTimestamp;
                break;
            case 4:
                result = thread.inviteable;
                break;
            case 5:
                result = thread.autoArchiveDutation;
                break;
            case 6:
                 result = thread.id;
                break;
            case 7:
                result = thread.memberCount;
                break;
            case 8:
                result = thread.messageCount;
                break;
            case 9:
                result = thread.appliedTags;
                break;
            case 10:
                result = thread.ownerId;
                break;
            case 11:
                result = thread.name;
                break;
            case 12:
                result = thread.archived;
                break;
            case 13:
                result = thread.locked;
                break;
            case 14:
                result = thread.lastMessageId;
                break;
            
        }

        this.StoreOutputValue(result, "result", cache);
        this.RunNextBlock("action", cache);
    }
}