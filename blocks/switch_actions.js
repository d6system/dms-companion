module.exports = {
    name: "Switch Actions",

    description: "Switches between Actions, if the boolean is \"OFF\", then the first \"Action\" will run, but if it is \"ON\", then the second \"Action\" will run.",

    category: "Extras",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "switch",
            "name": "Switch",
            "description": "Acceptable Types: Boolean, Unspecified\n\nDescription: If \"OFF\", the first \"Action\" line will be ran, and if it was \"ON\", then the second \"Action\" will be ran.",
            "types": ["boolean", "unspecified"],
        },
    ],

    options: [
        {
            "id": "switch",
            "name": "Switch",
            "description": "Description: If \"OFF\", the first \"Action\" line will be ran, and if it was \"ON\", then the second \"Action\" will be ran.",
            "type": "SELECT",
            "options": {
                "false": "OFF",
                "true": "ON"
            }
        }
    ],

    outputs: [
        {
            "id": "action1",
            "name": "Action (OFF)",
            "description": "Type: Action\n\nDescription: Executes the following blocks if the switch is \"OFF\".",
            "types": ["action"]
        },
        {
            "id": "action2",
            "name": "Action (ON)",
            "description": "Type: Action\n\nDescription: Executes the following blocks if the switch is \"ON\".",
            "types": ["action"]
        },
    ],

    code(cache) {
        let Switch;

        if (this.GetInputValue("switch",  cache)) Switch = this.GetInputValue("switch",  cache); 
        else switch (this.GetOptionValue("switch", cache)) {
            case "false": {
                Switch = false;
                break;
            }
            case "true": {
                Switch = true;
                break;
            }
        }

        switch (Switch) {
            case true: {
                this.RunNextBlock("action2", cache);
                break;
            }
            case false: {
                this.RunNextBlock("action1", cache);
                break;
            }
        }
    }
}