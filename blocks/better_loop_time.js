module.exports = {
    name: "Better Loop Time",

    description: "When the interval of milliseconds you set ends, it will loop again until it reaches the limit, if any.",

    category: "Loop Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "delay",
            "name": "Delay",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The interval to loop.",
            "types": ["number", "unspecified"],
        },
        {
            "id": "limit",
            "name": "Max Loops",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The number of times to loop. Default: Infinite. (OPTIONAL)",
            "types": ["number", "unspecified"]
        }
    ],

    options: [
        {
            "id": "delay",
            "name": "Loop Delay",
            "description": "Description: How long to wait between each loop.\n\nIf no number is given here, the input delay will be used.",
            "type": "NUMBER"
        },
        {
            "id": "type",
            "name": "Time Unit",
            "description": "Description: Defines what time unit to use for the delay option.",
            "type": "SELECT",
            "options": {
                "ms": "Millisecond",
                "s": "Second",
                "m": "Minute",
                "h": "Hour",
                "d": "Day"
            }   
        }
    ],

    outputs: [
        {
            "id": "action",
            "name": "Action (Loop)",
            "description": "Type: Action\n\nDescription: Executes the following blocks in a loop type.",
            "types": ["action"]
        },
        {
            "id": "action2",
            "name": "Action (Finish)",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
            "id": "loop",
            "name": "Loop Count",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["number"]
        }
    ],

    code(cache) {
        const type = this.GetOptionValue("type", cache)
        const limit = parseInt(this.GetInputValue("limit", cache));

        const option_time = parseInt(this.GetOptionValue("delay", cache));
        const input_time = parseInt(this.GetInputValue("delay", cache)) || 0;
        let milliseconds = isNaN(option_time) ? input_time : option_time

        switch(type){
            case "ms":
                milliseconds = milliseconds
                break;
            case "s":
                milliseconds = milliseconds * 1000
                break;
            case "m":
                milliseconds = milliseconds * 1000 * 60
                break;
            case "h":
                milliseconds = milliseconds * 1000 * 60 * 60
                break;
            case "d":
                milliseconds = milliseconds * 1000 * 60 * 60 * 24
                break;
        }


        let counter = 0;

        const looper = setInterval(() => {
            counter++
            this.StoreOutputValue(counter, "loop", cache)
            this.RunNextBlock("action", cache);
            if(counter >= limit) clearInterval(looper), this.RunNextBlock("action2", cache);
        }, milliseconds)

    }
}