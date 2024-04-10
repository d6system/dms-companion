module.exports = {
    name: "Convert Collection to List",

    description: "This Block converts a Discord.JS Collection into an Array/List",

    category: "Extras",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "collection",
            "name": "Collection",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The Collection you want to convert",
            "types": ["object", "unspecified"]
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
            "id": "list",
            "name": "List",
            "description": "Type: Object\n\nDescription: The List from the Collection.",
            "types": ["list", "unspecified"]
        }
    ],

    async code(cache) {
        const coll = this.GetInputValue("collection", cache);
        this.StoreOutputValue(await coll.toJSON(), "list", cache);
        this.RunNextBlock("action", cache);
    }
}