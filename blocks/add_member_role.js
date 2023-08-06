module.exports = {
    name: "Add Member Role",

    description: "Adds a role to the member.",

    category: "Member Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "member",
            "name": "Member",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The member to add the role.",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "role",
            "name": "Role",
            "description": "Acceptable Types: Object, List, Unspecified\n\nDescription: The role to add to the member. Supports List containing the roles.",
            "types": ["object", "list", "unspecified"],
            "required": true
        },
        {
            "id": "time",
            "name": "Time (Milliseconds)",
            "description": "Acceptable Types: Number, Date, Unspecified\n\nDescription: The time to wait to remove the role from the user/member. Supports Date. Default: \"0\" (no temporary role). (OPTIONAL)",
            "types": ["number", "date", "unspecified"]
        },
        {
            "id": "reason1",
            "name": "Reason (Adding Role)",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The reason for adding the role to the member. This will appear in Audit Log of the server. (OPTIONAL)",
            "types": ["text", "unspecified"]
        },
        {
            "id": "reason2",
            "name": "Reason (Removing Role)",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The reason for removing the role from the member. This will appear in Audit Log of the server only if this is a temporary role. (OPTIONAL)",
            "types": ["text", "unspecified"]
        }
    ],

    options: [],

    outputs: [
        {
            "id": "action",
            "name": "Action (Added)",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
            "id": "action1",
            "name": "Action (Removed)",
            "description": "Type: Action\n\nDescription: Executes the following blocks. Will only be triggered when it removes a timed role",
            "types": ["action"]
        }
    ],

    code(cache) {
        const member = this.GetInputValue("member", cache);
        const role = this.GetInputValue("role", cache);
        let time = this.GetInputValue("time", cache);
        const reason1 = this.GetInputValue("reason1", cache) + "";
        const reason2 = this.GetInputValue("reason2", cache) + "";

        member.roles.add(role, reason1).then(() => {
            if(time) {
                setTimeout(() => {
                    member.roles.remove(role, reason2).then(() => {
                        this.RunNextBlock("action1", cache)
                    })
                }, time);
            }

            this.RunNextBlock("action", cache);
        });
    }
}