module.exports = {

    name: "Get Forum Info",

    description: "This Blocks gets Infos about a Forum Channel",

    category: ".MOD",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
            "id": "forum",
            "name": "Forum Channel",
            "description": "The Forum Channel Object",
            "types": ["object", "unspecified"],
            "required": true
        }
    ],

    options: [
        {
            "id": "forum_info",
            "name": "Forum Info",
            "description": "Description: The Forum information to get.",
            "type": "SELECT",
            "options": {
                1: "Available Tags [List <Object>]",
                2: "Forum Created At [Date]",
                3: "Forum Default Auto Archive Duration [Number]",
                4: "Default Forum Layout [Number]",
                5: "Default Reaction Emoji [Object]",
                6: "Sort Order Type [Number]",
                7: "Default Thread Rate Limit Per User [Number]",
                8: "Deletable? [Boolean]",
                9: "Flags [List <ChannelFlagsBitField>]",
                10: "Manageable? [Boolean]",
                11: "Forum Members [List <Member>]",
                12: "Forum Server [Server]",
                13: "Forum ID [Text]",
                14: "Forum Name [Text]",
                15: "NSFW [Boolean]",
                16: "Parent [CategoryChannel]",
                17: "Parent Id [Text]",
                18: "Rate Limit Per User [Number]",
                19: "Threads [List <Object>]",
                20: "Forum Topic [Text]",
                21: "Channel URL [Text]"
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
            "id": "output",
            "name": "Output",
            "description": "The Info that was got.",
            "types": ["unspecified"]
        }
    ],

    async code(cache) {
        const forum = this.GetInputValue("forum", cache);
        const forum_info = parseInt(this.GetOptionValue("forum_info", cache));

        let result;
        switch (forum_info) {
            case 1:
                result = forum.availableTags;
                break;
            case 2:
                result = forum.createdAt;
                break;
            case 3:
                result = forum.defaultAutoArchiveDuration;
                break;
            case 4:
                result = forum.defaultForumLayout;
                break;
            case 5:
                result = forum.defaultReactionEmoji.name;
                break;
            case 6:
                result = forum.defaultSortOrder;
                break;
            case 7:
                result = forum.defaultThreadRateLimitPerUser;
                break;
            case 8:
                result = forum.deletable;
                break;
            case 9:
                result = forum.flags;
                break;
            case 10:
                result = forum.manageable;
                break;
            case 11:
                result = forum.members;
                break;
            case 12:
                result = forum.guild;
                break;
            case 13:
                result = forum.id;
                break;
            case 14:
                result = forum.name;
                break;
            case 15:
                result = forum.nsfw;
                break;
            case 16:
                result = forum.parent;
                break;
            case 17:
                result = forum.parentId;
                break;
            case 18:
                result = forum.rateLimitPerUser;
                break;
            case 19:
                result = forum.threads.fetch();
                break;
            case 20:
                result = forum.topic;
                break;
            case 21:
                result = forum.url;
                break;
        }

        this.StoreOutputValue(result, "result", cache);
        this.RunNextBlock("action", cache);
    }
}