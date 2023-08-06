module.exports = {
    name: "Get Track Info",

    description: "Get Infos about a specific Track",

    category: ".Audio V2",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "track",
            "name": "Track",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The Track Object",
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
            "id": "title",
            "name": "Title",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The Title of the Track",
            "types": ["text", "unspecified"]
        },
        {
            "id": "author",
            "name": "Author",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The Title of the Track",
            "types": ["text", "unspecified"]
        },
        {
            "id": "url",
            "name": "URL",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The Title of the Track",
            "types": ["text", "unspecified"]
        },
        {
            "id": "thumbnail",
            "name": "Thumbnail",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The Title of the Track",
            "types": ["text", "unspecified"]
        },
        {
            "id": "duration",
            "name": "Duration",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The Title of the Track",
            "types": ["text", "unspecified"]
        }
    ],

    async code(cache) {
        const track = this.GetInputValue("track", cache);

        if (track) {
            if (track.hasOwnProperty("title")) {
                this.StoreOutputValue(track.title, "title", cache)
                this.StoreOutputValue(track.author, "author", cache)
                this.StoreOutputValue(track.url, "url", cache)
                this.StoreOutputValue(track.thumbnail, "thumbnail", cache)
                this.StoreOutputValue(track.duration, "duration", cache)

                this.RunNextBlock("action", cache);
            } else {
                throw new Error("Input is not a Track")
            }
        } else {
            throw new Error("Input is not a Track")
        }

    }
}