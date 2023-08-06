

module.exports = {
    name: "Convert Thread Member to Member",

    description: "Converts a thread member to a normal guild member",

    category: "Threads",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "threadmember",
            "name": "Thread Member",
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
        },
        {
            "id": "member",
            "name": "Member",
            "description": "The guild member",
            "types": ["object"]
        }
    ],

    code(cache) {
        const threadmember = this.GetInputValue("threadmember", cache);

        const result = threadmember.guildMember;

        this.StoreOutputValue(result, "member", cache);
        this.RunNextBlock("action", cache);
    }
}