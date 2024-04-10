module.exports = {
    name: "Find Forum Tag",

    description: "Finds a Forum Tag from a Forum Channel",

    category: "Message Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "forum",
            "name": "Forum Channel",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The Forum Channel to find the Tag from.",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "search_value",
            "name": "Search Value",
            "description": "Acceptable Types: Unspecified, Text\n\nDescription: The value according to your choice in the \"Find Tag By\" option.",
            "types": ["unspecified", "text", "object"],
            "required": true
        }
    ],

    options: [
        {
            "id": "find_tag_by",
            "name": "Find Tag By",
            "description": "Description: The search type for the Tag.",
            "type": "SELECT",
            "options": {
                "id": "Tag ID [Text]",
                "name": "Tag Name [Text]",
                "emoji": "Tag Emoji [Text]"
            }
        }
    ],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes block.",
            "types": ["action"]
        },
        {
            "id": "tag",
            "name": "Forum Tag",
            "description": "Type: Object\n\nDescription: The Forum Tag found if exists.",
            "types": ["object"]
        }
    ],

    async code(cache) {
        const forum = this.GetInputValue("forum", cache);
        const search_value = this.GetInputValue("search_value", cache);
        const find_tag_by = this.GetOptionValue("find_tag_by", cache);

        let result;
        switch (find_tag_by) {
            case "id":
                forum.availableTags.forEach(element => {
                    if(element.id == search_value) {
                        result = element;
                        this.StoreOutputValue(result, "tag", cache);
                        this.RunNextBlock("action", cache);
                    }
                });
                break;
            case "name":
                forum.availableTags.forEach(element => {
                    if(element.name.includes(search_value)) {
                        result = element;
                        this.StoreOutputValue(result, "tag", cache);
                        this.RunNextBlock("action", cache);
                    }
                });
                break;
            case "emoji":
                forum.availableTags.forEach(element => {
                    if(element.emoji.name == search_value) {
                        result = element;
                        this.StoreOutputValue(result, "tag", cache);
                        this.RunNextBlock("action", cache);
                    }
                });
                break;
        }
    }
}