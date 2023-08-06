module.exports = {
    name: "Play Song in Queue",

    description: "Plays audio (e.g. YouTube, Spotify, SoundCloud, ...) in a Queue.",

    category: ".Audio V2",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "queue",
            "name": "Queue",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The Queue Object!",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "song",
            "name": "Song Name/URL",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The Song URL/Name you want to Play.",
            "types": ["text", "unspecified"],
            "required": true
        }
    ],

    options: [
        {
            "id": "action",
            "name": "Action",
            "description": "Description: What to do with the Track(s)",
            "type": "SELECT",
            "options": {
                "playnow": "Play Now",
                "add": "Add to Queue"
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
            "id": "track",
            "name": "Track",
            "description": "Type: Object, Unspecified\n\nDescription: The Track Object",
            "types": ["object", "list", "unspecified"]
        }
    ],

    async code(cache) {
        const song = this.GetInputValue("song", cache);
        const queue = this.GetInputValue("queue", cache);
        const action = this.GetOptionValue("action", cache);

        const player = await this.getDependency("DiscordPlayer", cache).player;
        var track = await player.search(song, {
            requestedBy: undefined
        });

        if (track.playlist) {
            await queue.addTrack(track.tracks);
            this.StoreOutputValue(track.tracks[0], "track", cache);
        } else {
            await queue.addTrack(track.tracks[0]);
            this.StoreOutputValue(track.tracks[0], "track", cache);
        }

        if (action === "playnow") {
            await queue.node.play();
        } else if (!queue.isPlaying()) {
            await queue.node.play();
        }
        const delay = ms => new Promise(res => setTimeout(res, ms));
        await delay(100);
        this.RunNextBlock("action", cache);
    }
}