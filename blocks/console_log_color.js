module.exports = {
    name: "Console Log (Colored)",

    description: "Sends a Colorfull value to your console.",

    category: "Extras",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "value",
            "name": "Value",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Object, Boolean, Date, Number, Text, List\n\nDescription: The value to send to your console.",
            "types": ["unspecified", "undefined", "null", "object", "boolean", "date", "number", "text", "list"]
        }
 ],

    options: [
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
            id: "value",
            name: "Value",
            description: "Description: The value of the Console Log",
            type: "TEXT"
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
        var content = this.GetInputValue("value", cache);
        const Color = parseInt(this.GetOptionValue("color", cache));
        const BgColor = parseInt(this.GetOptionValue("bgcolor", cache));

        if (content == undefined) {
            content = this.GetOptionValue("value", cache);
        }


        let bgresult

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

        
        console.log(result);

        this.RunNextBlock("action", cache);
    }
}