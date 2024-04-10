module.exports = {
    name: "Get Queue Info",

    description: "Gets Informations about a Queue",

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
            "description": "Acceptable Types: Object\n\nDescription: The Queue of which you want to get Infos from.\nONLY USE QUEUE OR SERVER, NOT BOTH!!!",
            "types": ["object", "unspecified"]
        },
        {
            "id": "guild",
            "name": "Server",
            "description": "Acceptable Types: Object\n\nDescription: The Server of which you want to get Infos from.\nONLY USE QUEUE OR SERVER, NOT BOTH!!!",
            "types": ["object", "unspecified"]
        }
    ],

    options: [
        {
            "id": "queue_info",
            "name": "Queue Info",
            "description": "Description: The Queue Information to get",
            "type": "SELECT",
            "options": {
                1: "Tracks [List <Track>]",
                2: "Playing? [Boolean]",
                3: "Paused? [Boolean]",
                4: "Empty? [Boolean]",
                5: "Server [Object <Guild>]",
                6: "Previous Track [Object <Track>]",
                7: "Repeat Mode [Text]",
                8: "Currently Playing Song [Object <Track>]",
                9: "Voice Channel [Object <Channel>]",
                10: "Tracks in Queue [Number]",
                11: "Playback Time [Number]",
                12: "Eta Playback Time [Number]",
                13: "Volume [Number]",
                14: "Timestamp [Object]",
                15: "Queue Exists? [Boolean]"
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
            "id": "actionerr",
            "name": "Action (NoQueue)",
            "description": "Type: Action\n\nDescription: This will run if the Queue Doesn't exist or an error occured.",
            "types": ["action"]
        },
        {
            "id": "result",
            "name": "Result",
            "description": "Type: Unspecified\n\nDescription: The information obtained from the bot.",
            "types": ["unspecified", "object", "number", "list", "text", "boolean"]
        }
    ],

    async code(cache) {
        const queue_info = parseInt(this.GetOptionValue("queue_info", cache));
        const guild = this.GetInputValue("guild", cache);
        const temp = this.GetInputValue("queue", cache);
        let queue;
        if (guild) {
            const { useQueue } = require("discord-player");
            queue = useQueue(guild.id);
        } else if (temp) {
            queue = temp;
        } else {
            return this.RunNextBlock("actionerr", cache) && this.StoreOutputValue("No Server or Queue Specified! Contact the Bot Administrator", "result", cache);
        }

        if(!queue) return this.RunNextBlock("actionerr", cache) && this.StoreOutputValue("Queue Doesn't Exist!", "result", cache);


        const { QueueRepeatMode } = require("discord-player");

        let result;
        switch (queue_info) {
            case 1:
                result = queue.tracks ? Array.isArray(queue.tracks) ? queue.tracks : [queue.tracks] : [];
                break;
            case 2:
                result = queue.node.isPlaying();
                break;
            case 3:
                result = queue.node.isPaused();
                break;
            case 4:
                result = queue.isEmpty();
                break;
            case 5:
                result = queue.guild;
                break;
            case 6:
                result = queue.history.previousTrack;
                break;
            case 7:
                if (queue.repeatMode === QueueRepeatMode.OFF) {
                    result = "Off";
                } else if (queue.repeatMode === QueueRepeatMode.QUEUE) {
                    result = "Queue";
                } else if (queue.repeatMode === QueueRepeatMode.TRACK) {
                    result = "Track";
                } else if (queue.repeatMode === QueueRepeatMode.AUTOPLAY) {
                    result = "Autoplay";
                } else {
                    result = queue.repeatMode;
                }
                break;
            case 8:
                result = queue.currentTrack;
                break;
            case 9:
                result = queue.connection.channel;
                break;
            case 10:
                result = queue.getSize();
                break;
            case 11:
                result = queue.node.playbackTime;
                break;
            case 12:
                result = queue.node.estimatedPlaybackTime;
                break;
            case 13:
                result = queue.node.volume;
                break;
            case 14:
                result = await queue.node.getTimestamp();
                break;
            case 15:
                result = queue ? true : false;
                break;
        }

        this.StoreOutputValue(result, "result", cache);
        this.RunNextBlock("action", cache);
    }
}