module.exports = {
    name: "Member Voice State Update [Event]",

    description: "When a member changes its voice state in a voice channel, this event will trigger.",

    category: "Events",

    auto_execute: true,

    inputs: [],

    options: [],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
            "id": "old_member",
            "name": "Old Member",
            "description": "Type: Object\n\nDescription: The member before its voice state update.",
            "types": ["object", "unspecified"]
        },
        {
            "id": "new_member",
            "name": "New Member",
            "description": "Type: Object\n\nDescription: The member after its voice state update.",
            "types": ["object", "unspecified"]
        },
        {
            "id": "channel",
            "name": "Voice Channel",
            "description": "Type: Object\n\nDescription: The Server that the update happened in.",
            "types": ["object", "unspecified"]
        },
        {
            "id": "server",
            "name": "Server",
            "description": "Type: Object\n\nDescription: The Server that the update happened in.",
            "types": ["object", "unspecified"]
        }
    ],

    code(cache) {
        this.events.on("voiceStateUpdate", (oldState, newState) => {
            const member1 = oldState.member;
            this.StoreOutputValue(Object.defineProperty(Object.assign(Object.create(member1), member1), "voice", {value: oldState, writable: false}), "old_member", cache);
            this.StoreOutputValue(newState.member, "new_member", cache);
            this.StoreOutputValue(newState.guild, "server", cache);
            this.StoreOutputValue(newState.channel, "channel", cache);
            this.RunNextBlock("action", cache);
        });
    }
}