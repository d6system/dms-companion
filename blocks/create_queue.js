module.exports = {
    name: "Create Queue",

    description: "Merge the two \"action\"'s into a single one.",

    category: "Audio Stuff",

    inputs: [
        {
            "id": "action1",
            "name": "Action 1",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        }
    ],

    options: [],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks.",
            "types": ["action"]
        }
    ],

    code: function(cache) {

        const DiscordPlayer = this.getDependency("DiscordPlayer", cache.name)

        const client = this.client;
        const servers = Array.from(client.guilds.cache.values())

        servers.forEach(server => {
            DiscordPlayer.player.createQueue(server, {
                leaveOnEmpty: false,
                leaveOnEnd: false,
                leaveOnStop: true,
                deafenOnJoin: false,
                initialVolume: 30,
                async onBeforeCreateStream(track, source, _queue) {
                    console.log(source)
                    // only trap youtube source
                    if (source === "youtube") {
                        // track here would be youtube track
                        return (await playdl.stream(track.url, { discordPlayerCompatibility : true })).stream;
                        // we must return readable stream or void (returning void means telling discord-player to look for default extractor)
                    }
                }
            });
        })

        this.RunNextBlock("action", cache);
    }
}