module.exports = {
    name: "Play Audio",

    description: "Plays audio (e.g. YouTube, Spotify, SoundCloud, ...) on the voice channel.",

    category: "Audio Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "server",
            "name": "Server",
            "description": "Acceptable Types: Object, Text, Unspecified\n\nDescription: The server to play the audio. Supports server ID.",
            "types": ["object", "text", "unspecified"],
            "required": true
        },
        {
            "id": "audio_query",
            "name": "Audio Query",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The name, URL or ssomething to find the audio to play.",
            "types": ["text", "unspecified"],
            "required": true
        },
        {
            "id": "requested_by",
            "name": "User Requesting",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The user who requested the audio.",
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
        }
    ],

    async code(cache) {
        const DiscordPlayer = this.getDependency("DiscordPlayer", cache.name)

        const server = this.GetInputValue("server", cache);
        const audio_query = this.GetInputValue("audio_query", cache);
        const requestedBy = this.GetInputValue("requested_by", cache);

        const searchResult = await DiscordPlayer.player.search(audio_query, { requestedBy });
        const queue = DiscordPlayer.player.createQueue(server);

        if (searchResult.playlist)
            queue.addTracks(searchResult.tracks);
        else
            queue.addTrack(searchResult.tracks[0]);

        if (!queue.playing && queue.tracks.length)
            queue.play()

        this.RunNextBlock("action", cache);
    }
}