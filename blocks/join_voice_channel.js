module.exports = {
    name: "Join Voice Channel",

    description: "Joins the voice channel.",

    category: "Audio Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "voice_channel",
            "name": "Voice Channel",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The voice channel to join.",
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
            "id": "connection",
            "name": "Connection",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The voice channel to join.",
            "types": ["object", "unspecified"]
        }
    ],

    async code(cache) {

        const channel = this.GetInputValue("voice_channel", cache);

        const { joinVoiceChannel } = await this.require('@discordjs/voice');

        const connection = await joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
        });

        this.StoreOutputValue(connection, "connection", cache)
        this.RunNextBlock("action", cache);
    }
}