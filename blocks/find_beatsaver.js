module.exports = {
    name: "Find BeatSaver by Key",

    description: "A Block to find a song on BeatSaver for BeatSaber by Key",

    category: "BeatSaber",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "searchvalue",
            "name": "Search Value",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The Value you want to Search For",
            "types": ["text", "unspecified"],
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
            "id": "nomapfoundaction",
            "name": "No Maps Found Action",
            "description": "Type: Action\n\nDescription: Inacase the Block can't find any Maps it will run this Action.",
            "types": ["action"]
        },
        {
            "id": "levelname",
            "name": "Level Name",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: Level Name",
            "types": ["text", "unspecified"]
        },
        {
            "id": "createdAt",
            "name": "Created At",
            "description": "Acceptable Types: Date, Unspecified\n\nDescription: Created At",
            "types": ["date", "unspecified"]
        },
        {
            "id": "description",
            "name": "Description",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: Description",
            "types": ["text", "unspecified"]
        },
        {
            "id": "coverurl",
            "name": "Cover URL",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: Cover URL",
            "types": ["text", "unspecified"]
        },
        {
            "id": "downloadurl",
            "name": "Download URL",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: Map Download URL(zip file)",
            "types": ["text", "unspecified"]
        },
        {
            "id": "audiopreviewurl",
            "name": "Audio Preview URL",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The Audio preview for the Map (MP3, 10 seconds long probably)",
            "types": ["text", "unspecified"]
        },
        {
            "id": "id",
            "name": "Level ID",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: Level ID, like 'f3fm'",
            "types": ["text", "unspecified"]
        },
        {
            "id": "songName",
            "name": "Song Name",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: Song Name, e.g.: 'The Time of my Life'",
            "types": ["text", "unspecified"]
        },
        {
            "id": "bpm",
            "name": "BPM",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The BPM(Beats per Minute) count of the Map",
            "types": ["number", "unspecified"]
        },
        {
            "id": "levelauthorname",
            "name": "Level Author Name",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: Level Author Name",
            "types": ["text", "unspecified"]
        },
        {
            "id": "songauthorname",
            "name": "Song Author Name",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: Song Author Name",
            "types": ["text", "unspecified"]
        },
        {
            "id": "songsubname",
            "name": "Song Sub Name",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: Song Sub Name",
            "types": ["text", "unspecified"]
        },
        {
            "id": "uploadername",
            "name": "Uploader Name",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: Uploader Name",
            "types": ["text", "unspecified"]
        },
        {
            "id": "uploaderavatar",
            "name": "Uploader Avatar URL",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: Uploader Avatar URL",
            "types": ["text", "unspecified"]
        },
        {
            "id": "automapper",
            "name": "Automapper?",
            "description": "Acceptable Types: Boolean, Unspecified\n\nDescription: if the Map was made by a Bot",
            "types": ["boolean", "unspecified"]
        },
        {
            "id": "ranked",
            "name": "Ranked?",
            "description": "Acceptable Types: Boolean, Unspecified\n\nDescription: Ranked?",
            "types": ["boolean", "unspecified"]
        }
    ],

    async code(cache) {
        const { BeatSaver } = await this.require('yabsl');
        const searchvalue = this.GetInputValue("searchvalue", cache);

        BeatSaver.maps.id(searchvalue).then(map => {
            if(!map) {
                return this.RunNextBlock("nomapfoundaction", cache);
            }
            this.StoreOutputValue(map.name, "levelname", cache) // String
            this.StoreOutputValue(new Date(map.createdAt), "createdAt", cache) // Date?
            this.StoreOutputValue(map.description, "description", cache) // String
            this.StoreOutputValue(map.versions[0].coverURL, "coverurl", cache) // String
            this.StoreOutputValue(map.versions[0].downloadURL, "downloadurl", cache) // String
            this.StoreOutputValue(map.versions[0].previewURL, "audiopreviewurl", cache) // String
            this.StoreOutputValue(map.id, "id", cache) // String
            this.StoreOutputValue(map.metadata.songName, "songName", cache) // String
            this.StoreOutputValue(map.metadata.bpm, "bpm", cache) // Number
            this.StoreOutputValue(map.metadata.levelAuthorName, "levelauthorname", cache) // String
            this.StoreOutputValue(map.metadata.songAuthorName, "songauthorname", cache) // String
            this.StoreOutputValue(map.metadata.songSubName, "songsubname", cache) // String
            this.StoreOutputValue(map.uploader.name, "uploadername", cache) // String
            this.StoreOutputValue(map.uploader.avatar, "uploaderavatar", cache) // String
            this.StoreOutputValue(map.automapper, "automapper", cache) // Boolean
            this.StoreOutputValue(map.ranked, "ranked", cache) // Boolean
            this.RunNextBlock("action", cache);
        })
        .catch((e) => console.log(e))
    }
}