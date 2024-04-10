module.exports = {

    name: "Get Forum Thread Info",

    description: "This Blocks gets Infos about a Thread of a Forum Channel",

    category: ".MOD",

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
            "description": "The Thread Channel Object",
            "types": ["object", "unspecified"],
            "required": true
        }
    ],

    options: [
        {
            "id": "thread_info",
            "name": "Thread Info",
            "description": "Description: The Thread information to get.",
            "type": "SELECT",
            "options": {
                1: "Applied Tags [List <Snowflake>]",
                2: "Archived at [Date]",
                3: "Auto Archive Duration [Number]",
                4: "Created At [Date]",
                5: "Editable? [Boolean]",
                6: "Inviteable? [Boolean]",
                7: "Joinable? [Boolean]",
                8: "Joined? [Boolean]",
                9: "Flags [List <ChannelFlagsBitField>]",
                10: "Last Message [Message]",
                11: "Last Message Id [Text]",
                12: "Locked? [Boolean]",
                13: "Message Count? [Number]",
                14: "Thread Members [List <Member>]",
                15: "Thread Server [Server]",
                16: "Thread ID [Text]",
                17: "Thread Name [Text]",
                18: "Archived [Boolean]",
                19: "Parent [CategoryChannel]",
                20: "Parent Id [Text]",
                21: "Rate Limit Per User [Number]",
                22: "Messages [List <Message>]",
                23: "Owner ID [Text]",
                24: "Channel URL [Text]"
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
        const thread = this.GetInputValue("thread", cache);
        const thread_info = parseInt(this.GetOptionValue("thread_info", cache));

        let result;
        switch (thread_info) {
            case 1:
                result = thread.appliedTags;
                break;
            case 2:
                result = thread.archivedAt;
                break;
            case 3:
                result = thread.autoArchiveDuration;
                break;
            case 4:
                result = thread.createdAt;
                break;
            case 5:
                result = thread.editable;
                break;
            case 6:
                result = thread.inviteable;
                break;
            case 7:
                result = thread.joinable;
                break;
            case 8:
                result = thread.joined;
                break;
            case 9:
                result = thread.flags;
                break;
            case 10:
                result = thread.lastMessage;
                break;
            case 11:
                result = thread.lastMessageId;
                break;
            case 12:
                result = thread.locked;
                break;
            case 13:
                result = thread.messageCount;
                break;
            case 14:
                result = thread.members;
                break;
            case 15:
                result = thread.guild;
                break;
            case 16:
                result = thread.id;
                break;
            case 17:
                result = thread.parentId;
                break;
            case 18:
                result = thread.archived;
                break;
            case 19:
                result = thread.parent;
                break;
            case 20:
                result = thread.parentId;
                break;
            case 21:
                result = thread.rateLimitPerUser;
                break;
            case 22:
                result = thread.messages;
                break;
            case 23:
                result = thread.ownerId;
                break;
            case 24:
                result = thread.url;
                break;
        }

        this.StoreOutputValue(result, "output", cache);
        this.RunNextBlock("action", cache);
    }
}