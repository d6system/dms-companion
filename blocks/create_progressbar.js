module.exports = {
    name: "Create Progressbar",

    description: "Creates a String Progressbar that can be used in Messages, supports Emojis!",

    category: "Extras",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "total",
            "name": "Total",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: Max Value for the Bar (Default: \"100\")",
            "types": ["number", "unspecified"]
        },
        {
            "id": "current",
            "name": "Current",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: How far the bar already is! (Default: \"5\")",
            "types": ["number", "unspecified"]
        },
        {
            "id": "length",
            "name": "Bar Length",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The Length of the Bar! (Default: \"16\")",
            "types": ["number", "unspecified"]
        },
        {
            "id": "line",
            "name": "Line",
            "description": "Acceptable Types: Text, Object, Unspecified\n\nDescription: The Line for the Bar. (Default: If Splitbar \"▬\", If Fillbar \"▒\")",
            "types": ["text", "object", "unspecified"]
        },
        {
            "id": "indicator",
            "name": "Indicator",
            "description": "Acceptable Types: Text, Object, Unspecified\n\nDescription: The Indicitator within the Line to tell how far the progress is (Default: If Splitbar \"🔘\", If Fillbar \"▓\")",
            "types": ["text", "object", "unspecified"]
        }
    ],

    options: [
        {
            "id": "bartype",
            "name": "Bar Type",
            "description": "Description: Bar Type",
            "type": "SELECT",
            "options": {
                "fillbar": "Filled bar",
                "splitbar": "Split Bar"
            }
        },
        {
            "id": "total",
            "name": "Total",
            "description": "Description: Max Value for the Bar (Default: \"100\")",
            "type": "NUMBER"
        },
        {
            "id": "current",
            "name": "Current",
            "description": "Description: How far the bar already is! (Default: \"5\")",
            "type": "NUMBER"
        },
        {
            "id": "length",
            "name": "Bar Length",
            "description": "Description: The Length of the Bar!(Default: \"16\")",
            "type": "NUMBER"
        },
        {
            "id": "line",
            "name": "Line",
            "description": "Description: The Line for the Bar. (Default: If Splitbar \"▬\", If Fillbar \"▒\")",
            "type": "TEXT"
        },
        {
            "id": "indicator",
            "name": "Indicator",
            "description": "Description: The Indicitator within the Line to tell how far the progress is (Default: If Splitbar \"🔘\", If Fillbar \"▓\")",
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
        await this.require("string-progressbar");
        const progressbar = require("string-progressbar");
        let total = this.GetInputValue("total", cache);
        let current = this.GetInputValue("current", cache);
        let length = this.GetInputValue("length", cache);
        let line = this.GetInputValue("line", cache);
        let indicator = this.GetInputValue("indicator", cache);

        if(!total) {
            total = this.GetOptionValue("total", cache) || 100;
        }

        if(!current) {
            current = this.GetOptionValue("current", cache) || 5;
        }

        if(!length) {
            length = this.GetOptionValue("length", cache) || 16;
        }

        let type = this.GetOptionValue("bartype", cache);

        if(!line) {
            line = this.GetOptionValue("line", cache);
            if(line == "") {
                if(type == "splitbar") {
                    line = "▬"
                } else {
                    line = "▒"
                }
            }
        }

        if(!indicator) {
            indicator = this.GetOptionValue("indicator", cache);
            if(indicator == "") {
                if(type == "splitbar") {
                    indicator = "🔘"
                } else {
                    indicator = "▓"
                }
            }
        }

        let bar;
        if (type == "splitbar") {
            bar = await progressbar.splitBar(parseInt(total), parseInt(current), parseInt(length), line, indicator)
        } else {
            bar = await progressbar.filledBar(parseInt(total), parseInt(current), parseInt(length), line, indicator)
        }

        this.StoreOutputValue(bar[0], "progressbar", cache);
        this.RunNextBlock("action", cache);
    }
}