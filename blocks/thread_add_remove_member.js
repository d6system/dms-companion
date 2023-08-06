module.exports = {
    name: "Add/Remove Member from thread",

    description: "Used to add/remove a member from a thread, if member is not in the bot will add him\nIf the member is in the bot will remove him",

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
            "id": "member",
            "name": "Member",
            "description": "A discord member",
            "types": ["object", "unspecified"],
            "required": true
        }
    ],

    options: [
        {
            "id": "addremove",
            "name": "Add/Remove Member",
            "description": "Add or Remove a member from a thread",
            "type": "SELECT",
            "options": {
                "add": "Add Member",
                "remove": "Remove Member",
            }
        }
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
        let thread = this.GetInputValue("thread", cache);
        let member = this.GetInputValue("member", cache);
        let addremove = this.GetOptionValue("addremove", cache);
        
        if (addremove === "add"){
            await thread.members.add(member.id);
        } else if (addremove === "remove") {
            await thread.members.remove(member.id);
        }

        this.RunNextBlock("action", cache);
        
    }
}