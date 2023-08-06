module.exports = {
    name: "Get Bot Audio Info",

    description: "Gets the bot audio information from the server.\n\nNOTE: Your bot needs to be on a voice channel and playing any audio for this block to work well.",

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
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The server to get the bot audio information.",
            "types": ["object", "unspecified"],
            "required": true
        }
    ],

    options: [
        {
            "id": "audio_info",
            "name": "Audio Info",
            "description": "Description: The bot audio information to get from the server.",
            "type": "SELECT",
            "options": {
                1: "Audio Queue URLs List [List <Text>]",
                2: "Audio Queue Size [Number]",
                3: "Next Audio URL [Text]",
                4: "Audio Volume [Number]",
                5: "Audio Volume (Decibels) [Number]",
                6: "Audio Volume (Logarithmic Scale) [Number]",
                15: "Current Audio Playing [Audio]",
                16: "Next Audio [Audio]",
                17: "Previous Audio [Audio]",
                18: "Audio Queue [List <Audio>]",
                19: "Previous Audio List [List <Audio>]",
                8: "Current Audio Created At [Date]",
                9: "Current Audio Played At [Date]",
                10: "Current Audio Seek Position (Seconds) [Number]",
                11: "Current Audio Source [Text]",
                12: "Current Audio Playlist URL [Text]",
                13: "Is Audio Paused? [Boolean]",
                14: "Is There Any Audio? [Boolean]",
                20: "Audio [Boolean]"
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
            "description": "Type: Unspecified\n\nDescription: The information obtained from the bot audio.",
            "types": ["unspecified"]
        }
    ],

    async code(cache, DBB) {
        const DiscordPlayer = this.getDependency("DiscordPlayer", cache.name)

        const server = this.GetInputValue("server", cache);
        const audio_info = parseInt(this.GetOptionValue("audio_info", cache));

        const queue = DiscordPlayer.player.getQueue(server);

        let result;

        if (queue) {
            switch(audio_info) {
                case 1:
                    result = queue.tracks.map(item => item.url);
                    break;
                case 2:
                    result = queue.tracks.length;
                    break;
                case 3:
                    result = queue.tracks[0] && queue.tracks[0].url;
                    break;
                case 4:
                    result = queue.options.initialVolume;
                    break;
                case 5:
                    result = Math.log10(queue.options.initialVolume) * 20;
                    break;
                case 6:
                    result = Math.pow(queue.options.initialVolume, 1 / 1.660964);
                    break;
                case 15:
                    result = queue.nowPlaying()
                    break;
                case 16:
                    result = queue.tracks[0]
                    break;
                case 17:
                    result = queue.previousTracks[0]
                    break;
                case 18:
                    result = queue.tracks
                    break;
                case 19:
                    result = queue.previousTracks
                    break;
                case 8: {
                    const currentTrack = queue.nowPlaying()
                    result = currentTrack && DBB.DiscordJS.module.SnowflakeUtil.timestampFrom(currentTrack.id);
                    break;
                }
                case 9:
                    result = queue.streamTime && new Date(Date.now() - queue.streamTime);
                    break;
                case 10:
                    result = queue.streamTime;
                    break;
                case 11: {
                    const current = queue.nowPlaying()

                    switch(current && current.raw.source) {
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
                }
                case 12: {
                    const current = queue.nowPlaying()

                    result = current && current.playlist && current.playlist.url;
                    break;
                }
                case 13:
                    result = (queue.connection && queue.connection.paused) || false;
                    break;
                case 14:
                    result = !queue.tracks.length && !queue.nowPlaying();
                    break;
                case 20:
                    switch(queue.repeatMode) {
                        case 0:
                            result = "Off";
                            break;
                        case 1:
                            result = "Audio";
                            break;
                        case 2:
                            result = "Queue";
                            break;
                        case 3:
                            result = "Autoplay";
                            break;
                        default:
                            result = "Unknown";
                            break;
                    }
                    break;
            }
        }

        this.StoreOutputValue(result, "result", cache);
        this.RunNextBlock("action", cache);
    }
}