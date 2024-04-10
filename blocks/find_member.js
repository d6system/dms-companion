module.exports = {
    name: "Find Member",

    description: "Finds a member.",

    category: "Member Stuff",

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
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The server to find the member. If possible, use this input to avoid finding the member on an unintended server. (OPTIONAL)",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "search_value",
            "name": "Search Value",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The value according to your choice in the \"Find Member By\" option.",
            "types": ["text", "unspecified"]
        }
    ],

    options: [
        {
            "id": "find_member_by",
            "name": "Find Member By",
            "description": "Description: The type of search for the member.",
            "type": "SELECT",
            "options": {
                "id": "Member ID",
                "username": "Member Username",
                "display_name": "Member Display Name",
                "tag": "Member Tag",
                "color_hex": "Member Color (Hex)",
                "color_base10": "Member Color (Base 10)"
            }
        },
        {
            id: "search_value",
            name: "Search Value",
            description: "Description: The value for the search Value",
            type: "TEXT"
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
            "id": "member",
            "name": "Member",
            "description": "Type: Object\n\nDescription: The member found if possible.",
            "types": ["object"]
        }
    ],

    code(cache) {
        const server = this.GetInputValue("server", cache);
        var search_value = this.GetInputValue("search_value", cache);
        const find_member_by = this.GetOptionValue("find_member_by", cache);

        if (search_value == undefined) {
            search_value = this.GetOptionValue("search_value", cache);
        }

        const members = server ? server.members.cache : this.client.guilds.cache.map(srv => Array.from(srv.members.cache.values())).flat();

        let result;
        switch(find_member_by) {
            case "id":
                result = members.find(c => c.id == search_value);
                break;
            case "username":
                result = members.find(c => c.user.username == search_value);
                break;
            case "display_name":
                result = members.find(c => c.displayName === search_value);
                break;
            case "tag":
                result = members.find(c => c.user.tag == search_value);
                break;
            case "color_hex":
                result = members.find(c => c.displayHexColor === search_value);
                break;
            case "color_base10":
                result = members.find(c => c.displayColor == search_value);
                break;
        }

        this.StoreOutputValue(result, "member", cache);
        this.RunNextBlock("action", cache);
    }
}