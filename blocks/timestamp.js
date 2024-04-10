module.exports = {
    name: "Timestamp",

    description: "Converts a Number or Date into a Discord Timestamp",

    category: "Extras",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "date",
            "name": "Date",
            "description": "Acceptable Types: Date, Number, Unspecified\n\nDescription: The Cookie Secret of the Bard AI. \nYou can find more Info on how to get the Cookie Secret at: https://bit.ly/bardai",
            "types": ["date", "number", "unspecified"],
            "required": true
        },
        {
            "id": "style",
            "name": "Style",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The Format of the Timestamp\n\n't' Short time format, consisting of hours and minutes, e.g. 16:20.\n'T' Long time format, consisting of hours, minutes, and seconds, e.g. 16:20:30.\n'd' Short date format, consisting of day, month, and year, e.g. 20/04/2021.\n'D' Long date format, consisting of day, month, and year, e.g. 20 April 2021.\n'f' Short date-time format, consisting of short date and short time formats, e.g. 20 April 2021 16:20.\n'F' Long date-time format, consisting of long date and short time formats, e.g. Tuesday, 20 April 2021 16:20.\n'R' Relative time format, consisting of a relative duration format, e.g. 2 months ago.",
            "types": ["text", "unspecified"]
        }
    ],

    options: [
        {
            "id": "style",
            "name": "Style",
            "description": "Acceptable Types: Text\n\nDescription: The Format of the Timestamp",
            "type": "SELECT",
            "options": {
                "t": "Short time, e.g. 16:20",
                "T": "Long time, e.g. 16:20:30",
                "d": "Short date, e.g. 20/04/2021",
                "D": "Long date, e.g. 20 April 2021",
                "f": "Short date-time, e.g. 20 April 2021 16:20",
                "F": "Long date-time, e.g. Tuesday, 20 April 2021 16:20",
                "R": "Relative time, e.g. 2 months ago"
            }
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
            "id": "timestamp",
            "name": "Timestamp",
            "description": "Type: Text, Unspecified\n\nDescription: The Timestamp String/Text",
            "types": ["text", "unspecified"]
        }
    ],

    async code(cache) {
        const { time } = require("discord.js");
        const date = this.GetInputValue("date", cache, false, new Date()) || new Date();
        const style = this.GetInputValue("style", cache, false, undefined) || this.GetOptionValue("style", cache, false, "R") || "R";

        const timestamp = time(date, style);

        this.StoreOutputValue(timestamp, "timestamp", cache);
        this.RunNextBlock("action", cache)
    }
}