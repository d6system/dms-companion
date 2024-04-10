module.exports = {
    name: "Loop",
    
    description: "Loops, must be connected with the \"End Loop\" block to end the loop.",
    
    category: "Flow Control",
    
    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nExecutes this block.",
            "types": ["action"]
        },
        {
            "id": "number_of_times",
            "name": "Number of Times",
            "description": "Acceptable Types: Number, Unspecified\n\nThe number of times to loop.\n\nKeep it empty to loop forever.",
            "types": ["number", "unspecified"]
        },
        {
            "id": "delay",
            "name": "Delay",
            "description": "Acceptable Types: Number, Unspecified\n\nTime between loops.\n\nDefault: 0",
            "types": ["number", "unspecified"]
        }
    ],
    options: [
        {
            "id": "number_of_times",
            "name": "Number of Times",
            "description": "The number of times to loop.\n\nKeep it empty to loop forever.",
            "type": "NUMBER"
        },
        {
            "id": "delay",
            "name": "Delay",
            "description": "Time between loops.\n\nDefault: 0",
            "type": "NUMBER"
        },
        {
            "id": "delay_type",
            "name": "Delay Type",
            "description": "Description: The type of delay to set..",
            "type": "SELECT",
            "options": {
                "milliseconds": "Milliseconds",
                "seconds": "Seconds",
                "minutes": "Minutes",
                "hours": "Hours",
                "days": "Days"
            }
        }
    ],
    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nExecutes the next block.",
            "types": ["action"]
        },
        {
            "id": "position_number",
            "name": "Position Number",
            "description": "Type: Number\n\nThe position number of the loop.",
            "types": ["number"]
        },
        {
            "id": "loop",
            "name": "Loop",
            "description": "Type: Object\n\nThe loop object.",
            "types": ["Object"]
        }
    ],
    
    code(cache) {
        const loops = parseFloat(this.GetInputValue("number_of_times", cache)) || parseFloat(this.GetOptionValue("number_of_times", cache));
        const delay_type = this.GetOptionValue("delay_type", cache)
        let delay = parseFloat(this.GetInputValue("delay", cache)) || parseFloat(this.GetOptionValue("delay", cache)) || 0;
        
        const loop = {
            position: 0,
            loopsAmount: loops
        }
        
        let ActualDelay = 0;
        
        switch(delay_type) {
            case "milliseconds":
            ActualDelay = delay;
            break;
            case "seconds":
            ActualDelay = delay * 1000;
            break;
            case "minutes":
            ActualDelay = delay * 60 * 1000;
            break;
            case "hours":
            ActualDelay = delay * 60 * 60 * 1000;
            break;
            case "days":
            ActualDelay = delay * 24 * 60 * 60 * 1000;
            break;
        }
        
        let counter = 0;
        const looper = setInterval(() => {
            if(loops) {
                counter++
                
                if(counter >= loops) clearInterval(looper);
            }
            loop.position += 1
            
            this.StoreOutputValue(loop.position, "position_number", cache)
            this.StoreOutputValue(loop, "loop", cache)
            this.RunNextBlock("action", cache);
        }, ActualDelay);
    }
}