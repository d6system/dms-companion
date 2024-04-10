module.exports = {
    name: "Member Leave Voice Channel [Event]",

    description: "When a member leaves voice channel this block executes",

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
            if(newState.channel === null || newState.channel !== oldState.channel && oldState.channel !== null) {
                this.StoreOutputValue(newState.member, "memb", cache);
                this.StoreOutputValue(newState.member.user, "user", cache);
                this.StoreOutputValue(newState.guild, "server", cache);
                this.StoreOutputValue(oldState.channel, "vc", cache);
                this.RunNextBlock("action", cache);

            }
        });
    }
}