module.exports = {

    name: "Get Forum Tag Info",

    description: "This Block gives out Infos about a Forum Tag",

    category: ".MOD",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
            "id": "tag",
            "name": "Forum Tag",
            "description": "The Forum Tag Object",
            "types": ["object", "unspecified"],
            "required": true
        }
    ],

    options: [],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
            "id": "id",
            "name": "ID",
            "description": "The ID of the Tag",
            "types": ["text", "unspecified"]
        },
        {
            "id": "name",
            "name": "Name",
            "description": "The name of the tag",
            "types": ["text", "unspecified"]
        },
        {
            "id": "moderated",
            "name": "Moderated",
            "description": "Whether this tag can only be added to or removed from threads by a member with the ManageThreads permission",
            "types": ["boolean", "unspecified"]
        },
        {
            "id": "emoji",
            "name": "Emoji",
            "description": "The emoji of this tag",
            "types": ["text", "unspecified"]
        }
    ],

    async code(cache) {
        const tag = this.GetInputValue("tag", cache);

        this.StoreOutputValue(tag.id, "thread", cache)
        this.StoreOutputValue(tag.name, "thread", cache)
        this.StoreOutputValue(tag.moderated, "thread", cache)
        this.StoreOutputValue(tag.emoji.name, "thread", cache)
        this.RunNextBlock("action", cache);
    }
}