module.exports = {
    name: "Member Join Voice Channel [Event]",

    description: "When a member joins voice channel this block executes",

    category: "Events",

    auto_execute: true,

    inputs: [],

    options: [],

    outputs: [
        {
            "id": "action",
            "name": "action",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
            "id": "vc",
            "name": "Voice Channel",
            "description": "The Voice channel member joined",
            "types": ["object"]
        },
        {
            "id": "server",
            "name": "Server",
            "description": "The Guild that the member is in.",
            "types": ["object"]
        },
        {
            "id": "user",
            "name": "User",
            "description": "The member but in user form.",
            "types": ["object"]
        },
        {
            "id": "memb",
            "name": "Member",
            "description": "The member yeah.",
            "types": ["object"]
        }
    ],

    code(cache) {
        this.events.on("voiceStateUpdate", (oldState, newState) => {
            if (!oldState.member || !newState.member || !newState || !oldState) return;
            if (oldState.channel !== newState.channel && newState.channel !== null) {
                this.StoreOutputValue(newState.member, "memb", cache);
                this.StoreOutputValue(newState.member.user, "user", cache);
                this.StoreOutputValue(newState.guild, "server", cache);
                this.StoreOutputValue(newState.channel, "vc", cache);
                this.RunNextBlock("action", cache);
            }
        });
    }
}