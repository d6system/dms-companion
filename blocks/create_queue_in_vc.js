module.exports = {
    name: "Create Queue in Voice Channel",

    description: "This Block creates a queue and Joins a Voice Channel by @XCraftTM",

    category: ".Audio V2",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "voicechannel",
            "name": "Voice Channel",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The Voice Channel to join...",
            "types": ["object", "unspecified"],
            "required": true
        },
    ],

    options: [
        {
            "id": "leaveonempty",
            "name": "Leave on Empty Queue?",
            "description": "Description: Leave on Empty Queue?",
            "type": "SELECT",
            "options": {
                false: "False/No",
                true: "True/Yes"
            }
        },
        {
            "id": "autoselfdeaf",
            "name": "Deaf Bot?",
            "description": "Description: Deaf Bot? (More Privacy)",
            "type": "SELECT",
            "options": {
                true: "True/Yes",
                false: "False/No"
            }
        },
        {
            "id": "leaveonened",
            "name": "Leave on End?",
            "description": "Description: Leave on End?",
            "type": "SELECT",
            "options": {
                false: "False/No",
                true: "True/Yes"
            }
        },
        {
            "id": "initialvolume",
            "name": "Initial Volume",
            "description": "Description: The Volume the bot should have!",
            "type": "TEXT"
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
            "id": "queue",
            "name": "Queue",
            "description": "Type: Object, Unspecified\n\nDescription: The Queue Object!",
            "types": ["object", "unspecified"]
        }
    ],

    async code(cache) {
        const voicechannel = await this.GetInputValue("voicechannel", cache);
        var leaveonempty = this.GetOptionValue("leaveonempty", cache);
        var autoselfdeaf = this.GetOptionValue("autoselfdeaf", cache);
        var leaveonened = this.GetOptionValue("leaveonened", cache);
        var initialvolume = parseInt(this.GetOptionValue("initialvolume", cache)) || 50;

        if (leaveonempty == "true") {
            leaveonempty = true;
        } else {
            leaveonempty = false;
        }

        if (autoselfdeaf == "true") {
            autoselfdeaf = true;
        } else {
            autoselfdeaf = false;
        }

        if (leaveonened == "true") {
            leaveonened = true;
        } else {
            leaveonened = false;
        }

        const player = await this.getDependency("DiscordPlayer", cache).player;
        const queue = await player.nodes.create(voicechannel.guild, {
            leaveOnEmpty: leaveonempty, autoSelfDeaf: autoselfdeaf, leaveOnEnd: leaveonened, volume: initialvolume,
            metadata: {
                channel: voicechannel
            },
        });

        try {
            if (!queue.connection) await queue.connect(voicechannel);
        } catch (e) {
            queue.delete();
            console.log("Could not join the set Voice Channel...\nError: " + e);
        }

        this.StoreOutputValue(queue, "queue", cache);
        this.RunNextBlock("action", cache);
    }
}