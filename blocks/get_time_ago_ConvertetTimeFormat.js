module.exports = {
    name: "MOD Get Time Ago ConvertTimeFormat",

    description: "Gets the time ago, by comparing two times, Converted in milliseconds, seconds, minutes, hour, days",

    category: ".MOD",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "time1",
            "name": "Time 1",
            "description": "Acceptable Types: Date, Number, Unspecified\n\nDescription: The date 1 to compare to the date 2.",
            "types": ["date", "number", "unspecified"],
            "required": true
        },
        {
            "id": "time2",
            "name": "Time 2",
            "description": "Acceptable Types: Date, Number, Unspecified\n\nDescription: The date 2 to compare to the date 1. If no value is inputted here, the current system time will be used.",
            "types": ["date", "number", "unspecified"]
        }
    ],

    options: [
        {
            "id": "type",
            "name": "RAW Formated Time (Millisecond, seconds, minutes, hour, days)",
            "description": "Description: Weather you want the output to be the number of milliseconds between the two date/times (i.e. 63191717176) or you want a pretty time output (i.e. 2y 1d 9h 13m 46.6s).",
            "type": "SELECT",
            "options": {
                1 : "Milliseconds",
                2 : "Seconds",
                3 : "Minutes",
                4 : "Hour",
                5 : "Day"                
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
            "id": "time_ago",
            "name": "Time Ago",
            "description": "Type: Text\n\nDescription: The time ago obtained.",
            "types": ["text"]
        }
    ],

    async code(cache) {
        const time1 = new Date(this.GetInputValue("time1", cache));
        const time2 = new Date(this.GetInputValue("time2", cache, false, Date.now()));
        const type = parseInt(this.GetOptionValue("type", cache));
        let time1formatted;
        let time2formatted;

        if(/1[6-8][0-9]{11}/.test(this.GetInputValue("time1", cache))) { time1formatted = this.GetInputValue("time1", cache); }
        	else { time1formatted = time1.getTime(); }

        if(/1[6-8][0-9]{11}/.test(this.GetInputValue("time2", cache, false, Date.now()))) { time2formatted = ("time2", cache, false, Date.now()); }
        	else { time2formatted = time2.getTime(); }

        let result = time2formatted - time1formatted;

        let ConvertedTime;

        switch (type) {
            case 1:
                ConvertedTime = result;
                break;
            case 2:
                ConvertedTime = result / 1000;
                break;
            case 3:
                ConvertedTime = result / 60000;
                break;
            case 4:
                ConvertedTime = (result / 60000) / 60;
                break;
            case 5:
                ResultOne = (result / 60000) / 60;
                ConvertedTime = ResultOne / 24;
                break;
        }


        this.StoreOutputValue(ConvertedTime.toFixed(0), "time_ago", cache);
        this.RunNextBlock("action", cache);
    }
}