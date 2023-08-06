module.exports = {
    name: "Find Invite",

    description: "Finds an invite.",

    category: "Invite Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "server",
            "name": "Server",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The server to find the invite. If possible, use this input to get a better result. (OPTIONAL)",
            "types": ["object", "unspecified"]
        },
        {
            "id": "search_value",
            "name": "Search Value",
            "description": "Acceptable Types: Unspecified, Text, Number, Object\n\nDescription: The value according to your choice in the \"Find Invite By\" option.",
            "types": ["unspecified", "text", "number", "object"],
            "required": true
        }
    ],

    options: [
        {
            "id": "find_invite_by",
            "name": "Find Invite By",
            "description": "Description: The type of search for the invite.",
            "type": "SELECT",
            "options": {
                "code": "Invite Code/URL (Single Invite Returned)",
                "channel": "Invite Channel (REQUIRES SERVER)",
                "inviter": "Invite Inviter [User] (REQUIRES SERVER)",
                "uses": "Invite Uses (REQUIRES SERVER)"
            }
        }
    ],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
            "id": "invite",
            "name": "Invite(s)",
            "description": "Type: Object, List\n\nDescription: The invite(s) found if possible.",
            "types": ["object", "list"]
        }
    ],

    async code(cache) {
        const server = this.GetInputValue("server", cache);
        const search_value = this.GetInputValue("search_value", cache);
        const find_invite_by = this.GetOptionValue("find_invite_by", cache);

        let result;

        try {
            if(server) {
                switch(find_invite_by) {
                    case "code":
                        result = await server.invites.fetch({ code: search_value })
                        break;
                    case "channel":
                        result = await server.invites.fetch({ channelId: search_value })
                        break;
                    case "inviter":
                        result = (await server.invites.fetch()).find(c => c.inviter == search_value);
                        break;
                    case "uses":
                        result = (await server.invites.fetch()).find(c => c.uses == search_value);
                        break;
                }
            } else
                result = await this.client.fetchInvite(search_value);
        } catch (e) {
            // ignore
        }

        this.StoreOutputValue((result && result.values) ? Array.from(result.values()) : result, "invite", cache);
        this.RunNextBlock("action", cache);
    }
}