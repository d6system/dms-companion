module.exports = {
    name: "Control Member Audio",

    description: "Controls a member's bot audio (i.e. mute, deafen, disconnect).",

    category: "Audio Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "member",
            "name": "Member",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The member to control.",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "voice_channel",
            "name": "Voice Channel",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The voice channel to move the to.",
            "types": ["object", "unspecified"]
        },
        {
            "id": "boolean",
            "name": "True/False",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The True/False aspect (Takes priority over the option).",
            "types": ["boolean", "unspecified"]
        },

    ],

    options: [
        {
            "id": "audio_action_type",
            "name": "Audio Action Type",
            "description": "Description: The type of action to be performed on the current audio. (In order to move a member, they must first be in a vc)",
            "type": "SELECT",
            "options": {
                "mute": "Mute",
                "deafen": "Deafen",
                "disconnect": "Disconnect",
                "join": "Move VC",
            }
        },
        {
            "id": "bool",
            "name": "True/False",
            "description": "Description: The type of action to be performed on the current audio.",
            "type": "SELECT",
            "options": {   
                "true": "True",
                "false": "False",
            }
    }

    ],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        }
    ],

    code(cache) {
        const audio_action_type = this.GetOptionValue("audio_action_type", cache) + "";
        let boolean = this.GetInputValue("boolean", cache);

        if(boolean == undefined) {
            boolean = this.GetOptionValue("bool", cache) + "";
        }
        

        const member = this.GetInputValue("member", cache);
        const channel = this.GetInputValue("voice_channel", cache);        

        switch (audio_action_type) {
            case "mute":
                member.voice.setMute(boolean);
                break;
            case "deafen":
                member.voice.setDeaf(boolean);
                break;
            case "disconnect":
                member.voice.disconnect();
                break;
            case "join":
                member.voice.setChannel(channel);
                break;
        };

        this.RunNextBlock("action", cache);
    }
}