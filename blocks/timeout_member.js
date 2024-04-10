module.exports = {
    name: "Timeout Member v1.0",

    description: "times out a member of that guild",

    category: ".MOD",

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
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: Member to timeout",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "time",
            "name": "Time",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: the amount of time to timeout the member for",
            "types": ["number", "unspecified"],
            "required": true
        },
        {
            "id": "reason",
            "name": "Reason",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: the reason for the timeout (leave blank for nothing!)",
            "types": ["text", "unspecified"],
            "required": false
        }
        
    ],

    options: [
        {
            "id": "number",
            "name": "unit of time",
            "description": "Description: the time to use for timing out users",
            "type": "SELECT",
            "options": {
                "minute": "Minutes",
                "hour": "Hours",
                "miliseconds": "Miliseconds",
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
            "name": "Html Code",
            "description": "Type: Action\n\nDescription: this is where the websites html code is listed!",
            "types": ["unspecified"]
        }
    ],

    async code(cache) {
        const member = this.GetInputValue("member", cache);
        const time = this.GetInputValue("time", cache);
        const reason = this.GetInputValue("reason", cache)
        
        const option = this.GetOptionValue("number", cache);
        
        if(option == "miliseconds") {
            member.timeout(time, reason);
            this.RunNextBlock("action", cache)
        } else if (option == "minute") {
            let minutes = time * 60000;
            member.timeout(minutes, reason);
            this.RunNextBlock("action", cache)
        } else if (option == "hour") {
            let hours = time * 3600000;
            member.timeout(hours, reason);
            this.RunNextBlock("action", cache)
        }
    }
}