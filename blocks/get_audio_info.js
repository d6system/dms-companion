module.exports = {
    name: "Get Audio Info",

    description: "Gets the audio information.",

    category: "Audio Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "audio",
            "name": "Audio",
            "description": "Acceptable Types: Object\n\nDescription: The audio to get its information.",
            "types": ["object", "unspecified"],
            "required": true
        }
    ],

    options: [
        {
            "id": "audio_info",
            "name": "Audio Info",
            "description": "Description: The audio information to get.",
            "type": "SELECT",
            "options": {
                1: "Audio Author [Text]",
                2: "Audio Title [Text]",
                3: "Audio Description [Text]",
                4: "Audio Duration (Formatted) [Text]",
                5: "Audio Duration (Milliseconds) [Number]",
                6: "Audio Source [Text]",
                7: "Is Audio Live? [Boolean]",
                8: "Audio ID [Text]",
                9: "Audio Playlist [Playlist]",
                10: "Audio Requested By [User]",
                11: "Audio Thumbnail URL [Text]",
                12: "Audio URL [Text]",
                13: "Audio Views [Number]",
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
            "name": "Result",
            "description": "Type: Unspecified\n\nDescription: The information obtained from the audio.",
            "types": ["unspecified"]
        }
    ],

    async code(cache) {
        const audio = this.GetInputValue("audio", cache);
        const audio_info = parseInt(this.GetOptionValue("audio_info", cache));

        let result;
        switch(audio_info) {
            case 1:
                result = audio.author;
                break;
            case 2:
                result = audio.title;
                break;
            case 3:
                result = audio.description;
                break;
            case 4:
                result = audio.duration;
                break;
            case 5:
                result = audio.durationMS;
                break;
            case 6:
                switch(audio.source) {
                    case "youtube":
                        result = "YouTube";
                        break;
                    case "spotify":
                        result = "Spotify";
                        break;
                    case "soundcloud":
                        result = "SoundCloud";
                        break;
                    case "arbitrary":
                        result = "Arbitrary";
                        break;
                    default:
                        result = "Unknown";
                        break;
                }
                break;
            case 7:
                result = audio.live || (audio.raw && audio.raw.videoDetails && audio.raw.videoDetails.isLive) || false;
                break;
            case 8:
                result = audio.id;
                break;
            case 9:
                result = audio.playlist;
                break;
            case 10:
                result = audio.requestedBy;
                break;
            case 11:
                result = audio.thumbnail;
                break;
            case 12:
                result = audio.url;
                break;
            case 13:
                result = audio.views;
                break;
        }

        this.StoreOutputValue(result, "result", cache);
        this.RunNextBlock("action", cache);
    }
}