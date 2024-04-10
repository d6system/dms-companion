module.exports = {
    name: "YouTube Video Upload [Event]",

    description: "Triggers when a Channel Uploads a Video",

    auto_execute: true,

    category: "Internet Stuff",

    inputs: [],

    options: [
        {
            "id": "channel_id",
            "name": "Channel IDs",
            "description": "Acceptable Types: Text\n\nDescription: The IDs of the channel.(Can be multiple, split using \"\,\")",
            "type": "TEXT"
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
            "id": "title",
            "name": "Title",
            "description": "Type: Text, Undefined\n\nDescription: The Title of the Video.",
            "types": ["text", "undefined"]
        },
        {
            "id": "url",
            "name": "Video URL",
            "description": "Type: Text, Undefined\n\nDescription: The URL of the Video.",
            "types": ["text", "undefined"]
        },
        {
            "id": "id",
            "name": "Video ID",
            "description": "Type: Text, Undefined\n\nDescription: The ID of the Video.",
            "types": ["text", "undefined"]
        },
        {
            "id": "channelname",
            "name": "Channel Name",
            "description": "Type: Text, Undefined\n\nDescription: The Name of the channel.",
            "types": ["text", "undefined"]
        },
        {
            "id": "channelid",
            "name": "Channel ID",
            "description": "Type: Text, Undefined\n\nDescription: The ID of the channel.",
            "types": ["text", "undefined"]
        },
        {
            "id": "channelurl",
            "name": "Channel URL",
            "description": "Type: Text, Undefined\n\nDescription: The URL of the channel.",
            "types": ["text", "undefined"]
        },
        {
            "id": "thumb",
            "name": "Thumbnail URL",
            "description": "Type: Text, Undefined\n\nDescription: The Thumbnail URL of the Video that was uploaded.",
            "types": ["text", "undefined"]
        },
        {
            "id": "released",
            "name": "Release Date",
            "description": "Type: Date, Undefined\n\nDescription: The Date when the Video released.",
            "types": ["date", "undefined"]
        }
    ],

    async code(cache) {
        const id = this.GetOptionValue("channel_id", cache);
        const {PollingNotifier, JsonStorage} = await this.require("youtube-notifs");
        const notifier = new PollingNotifier({
            interval: 1,
            storage: new JsonStorage("youtube-notifs.json")
        });

        notifier.subscribe(id.split(",").map((id) => id.trim()))
        notifier.start();

        notifier.onNewVideos = (videos) => {
            videos.forEach(async (video) => {
                if (video) {
                    this.StoreOutputValue(video.title, "title", cache)
                    this.StoreOutputValue(video.url, "url", cache)
                    this.StoreOutputValue(video.id, "id", cache)
                    this.StoreOutputValue(video.channel.name, "channelname", cache)
                    this.StoreOutputValue(video.channel.id, "channelid", cache)
                    this.StoreOutputValue(video.channel.url, "channelurl", cache)
                    this.StoreOutputValue(video.thumb.url, "thumb", cache)
                    this.StoreOutputValue(video.created, "released", cache)
                    this.RunNextBlock("action", cache)
                }
            });
        }

        notifier.onError = (error) => {
            console.log(error)
        }
    }
}