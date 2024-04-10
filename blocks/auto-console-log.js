module.exports = {
    name: "Auto Console Log",

    description: "Console logs a text automatically without the need to connect it to any action",

    category: "Extras",

    auto_execute: true,

    inputs: [
    ],

    options: [
        {
            "id": "text",
            "name": "Text",
            "description": "Description: The text you want to log!.",
            "type": "TEXT"
        },
        {
            "id": "color",
            "name": "Color",
            "description": "Description: Select Your Font Color",
            "type": "SELECT",
            "options": {
                "1": "Black",
                "2": "Red",
                "3": "Green",
                "4": "Yellow",
                "5": "Blue",
                "6": "Magenta",
                "7": "Cyan",
                "8": "White",
            }
        },
        {
            "id": "bgcolor",
            "name": "Background Color",
            "description": "Description: Select Your Font Color",
            "type": "SELECT",
            "options": {
                "1": "None",
                "2": "Background Black",
                "3": "Background Red",
                "4": "Background Green",
                "5": "Background Magenta",
                "6": "Background Cyan",
                "7": "Background Yellow",
            }
        },
        {
            "id": "delay",
            "name": "Delay",
            "description": "Description: Delay length.",
            "type": "NUMBER"
        },
        {
            "id": "delay_type",
            "name": "Delay Type",
            "description": "Description: The type of delay to set. \"Time\".",
            "type": "SELECT",
            "options": {
                "milliseconds": "Milliseconds",
                "seconds": "Seconds",
                "minutes": "Minutes",
                "hours": "Hours",
                "days": "Days"
            }
        },
        {
            "id": "repeatBool",
            "name": "Repeat?",
            "description": "Description: Activate repeats boolean. \"Time\".",
            "type": "SELECT",
            "options": {
                "false": "No",
                "true": "Yes"
            }
        },
        {
            "id": "amount",
            "name": "Amount of repeats",
            "description": "Amount of times to loop the console log.\n\nOnly use this if you turned on repeats.\n\nNote: you must add a delay otherwise its going to send repeats instantly!",
            "types": "NUMBER",
        },
    ],

    outputs: [],

    async code(cache) {
        const content = this.GetOptionValue("text", cache);
        const Color = parseInt(this.GetOptionValue("color", cache));
        const BgColor = parseInt(this.GetOptionValue("bgcolor", cache));
        const time = this.GetOptionValue("delay", cache);
        const time_type = this.GetOptionValue("delay_type", cache);
        const repeatBool = this.GetOptionValue("repeatBool", cache);

        const amount = this.GetOptionValue("amount", cache);
        let i = 0;

        let _time = 0;

        let bgresult

        if(typeof time == "object") {
            _time = time.getTime();
        } else {
            switch(time_type) {
                case "milliseconds":
                    _time = time;
                    break;
                case "seconds":
                    _time = time * 1000;
                    break;
                case "minutes":
                    _time = time * 60 * 1000;
                    break;
                case "hours":
                    _time = time * 60 * 60 * 1000;
                    break;
                case "days":
                    _time = time * 24 * 60 * 60 * 1000;
                    break;
            }
        }

        switch (BgColor) {
            case 1:
                bgresult = ("\x1b[0m")
                break;
            case 2:
                bgresult = ("\x1b[40m")
                break;
            case 3:
               bgresult = ("\x1b[41m")
                break;
            case 4:
                bgresult = ("\x1b[42m")
                break;
            case 5:
                bgresult = ("\x1b[45m")
                break;
            case 6:
                bgresult = ("\x1b[45m")
                break;
            case 7:
                bgresult = ("\x1b[43m")
                break;

        }



        let result
        switch (Color) {
            case 1:
                result = (bgresult + "\x1b[30m" + content + "\x1b[0m")
                break;
            case 2:
                result = (bgresult + "\x1b[31m" + content + "\x1b[0m")
                break;
            case 3:
                result = (bgresult + "\x1b[32m" + content + "\x1b[0m")
                break;
            case 4:
                result = (bgresult + "\x1b[33m" + content + "\x1b[0m")
                break;
            case 5:
                result = (bgresult + "\x1b[34m" + content + "\x1b[0m")
                break;
            case 6:
                result = (bgresult + "\x1b[35m" + content + "\x1b[0m")
                break;
            case 7:
                result = (bgresult + "\x1b[36m" + content + "\x1b[0m")
                break;
            case 8:
                result = (bgresult + "\x1b[37m" + content + "\x1b[0m")
                break;
        }
 
        switch(repeatBool) {
            case "true":
                var interval = setInterval(() => {
                    if (i==amount){
                        clearInterval(interval);
                        return;
                    } else {
                        i++;
                        console.log(result);
                    }
                }, _time);
                break;
            case "false":
                setTimeout(() => {
                    console.log(result);
                }, _time);
                break;
        }
    }
}