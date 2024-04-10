module.exports = {
    name: "Create Queue Progressbar",

    description: "This Block creates a Progressbar with Discord-Player Audio Blocks by @XCraftTM",

    category: ".Audio V2",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "guild",
            "name": "Server",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The Server Object",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "line",
            "name": "Line",
            "description": "Acceptable Types: Object, Text, Unspecified\n\nDescription: The Line for the Bar. (Default: \"●\")",
            "types": ["object", "text", "unspecified"]
        },
        {
            "id": "length",
            "name": "Bar Length",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The Length of the Bar! (Default: \"16\")",
            "types": ["number", "unspecified"]
        },
        {
            "id": "indicator",
            "name": "Indicator",
            "description": "Acceptable Types: Object, Text, Unspecified\n\nDescription: The Indicitator within the Line to tell how far the song is playing (Default: \"―\")",
            "types": ["object", "text", "unspecified"]
        }
    ],

    options: [
        {
            "id": "queue",
            "name": "Queue?",
            "description": "Description: Queue?",
            "type": "SELECT",
            "options": {
                false: "False/No",
				true: "True/Yes"
            }
        },
        {
            "id": "timecodes",
            "name": "Timecodes?",
            "description": "Description: Timecodes?",
            "type": "SELECT",
            "options": {
                true: "True/Yes",
                false: "False/No"
            }
        },
        {
            "id": "line",
            "name": "Line",
            "description": "Description: The Line for the Bar. (Default: \"●\")",
            "type": "TEXT"
        },
        {
            "id": "length",
            "name": "Bar Length",
            "description": "Description: The Length of the Bar!(Default: \"16\")",
            "type": "TEXT"
        },
        {
            "id": "indicator",
            "name": "Indicator",
            "description": "Description: The Indicitator within the Line to tell how far the song is playing (Default: \"―\")",
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
            "id": "progressbar",
            "name": "Progressbar",
            "description": "Type: Text, Unspecified\n\nDescription: The Created Progressbar",
            "types": ["text", "unspecified"]
        }
    ],

    async code(cache) {
        const guild = this.GetInputValue("guild", cache);
        const { useQueue } = require("discord-player");
        const queue = useQueue(guild.id);
        var qqueue = this.GetOptionValue("queue", cache);
        var timecodes = this.GetOptionValue("timecodes", cache);
        var length = this.GetInputValue("length", cache);
        var line = this.GetInputValue("line", cache);
        var indicator = this.GetInputValue("indicator", cache);

        if(length == null) {
            length = parseInt(this.GetOptionValue("length", cache)) || 16;
        } else if (length) {
            length = parseInt(length);
        }

        if(line == null) {
            line = this.GetOptionValue("line", cache) || "―";
        }

        if(indicator == null) {
            indicator = this.GetOptionValue("indicator", cache) || "●";
        }

        if(qqueue == "true") {
            qqueue = true;
        } else {
            qqueue = false;
        }

        if(timecodes == "true") {
            timecodes = true;
        } else {
            timecodes = false;
        }
        
        let progressbar = await queue.node.createProgressBar({
            indicator: indicator,
            length: length,
            line: line,
            queue: qqueue,
            timecodes: timecodes
        })
		
		this.StoreOutputValue(progressbar, "progressbar", cache);
        this.RunNextBlock("action", cache);
    }
}