module.exports = {
    name: "Convert Time",
    description: "Converting Time",

    category: ".MOD",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "number1",
            "name": "Time",
            "description": "Acceptable Types: Number, Undefined, Unspecified\n\nDescription: Time to convert from",
            "types": ["number", "undefined", "unspecified"]
        }
    ],

    options: [
        {
            id: "input",
            name: "Input time type",
            description: "Type of time you're inputting",
            type: "SELECT",
            options: {
                "ms": "Milliseconds",
                "s": "Seconds",
                "m": "Minutes",
                "h": "Hours",
                "d": "Days",
                "M": "Months",
                "y": "Years"
            }
        },
        {
            id: "output",
            name: "Output Time Type",
            description: "Type of converted time",
            type: "SELECT",
            options: {
                "ms": "Milliseconds",
                "s": "Seconds",
                "m": "Minutes",
                "h": "Hours",
                "d": "Days",
                "M": "Months",
                "y": "Years"
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
            "id": "convertedtime",
            "name": "Converted Time",
            "description": "Type: Number\n\nDescription: The text merged.",
            "types": ["number"]
        }
    ],

    code(cache) {
        let inp = this.GetOptionValue("input", cache);
        let outp = this.GetOptionValue("output", cache);
        const num = this.GetInputValue("number1", cache);

        let res;
        switch (inp)
        {
            case "ms":
                switch (outp)
                {
                    case "ms":
                        res = num;

                        this.StoreOutputValue(res, "convertedtime", cache);
                        this.RunNextBlock("action", cache);
                        break;
                    case "s":
                        res = num / 100;

                        this.StoreOutputValue(res, "convertedtime", cache);
                        this.RunNextBlock("action", cache);
                        break;
                    case "m":
                        res = (num / 100) / 60;

                        this.StoreOutputValue(res, "convertedtime", cache);
                        this.RunNextBlock("action", cache);
                        break;
                    case "h":
                        res = ((num / 100) / 60) / 60;

                        this.StoreOutputValue(res, "convertedtime", cache);
                        this.RunNextBlock("action", cache);
                        break;
                    case "d":
                        res = (((num / 100) / 60) / 60) / 24;

                        this.StoreOutputValue(res, "convertedtime", cache);
                        this.RunNextBlock("action", cache);
                        break;
                    case "M":
                        res = ((((num / 100) / 60) / 60) / 24) / 30;

                        this.StoreOutputValue(res, "convertedtime", cache);
                        this.RunNextBlock("action", cache);
                        break;
                    case "y":
                        res = (((((num / 100) / 60) / 60) / 24) / 30) / 365;

                        this.StoreOutputValue(res, "convertedtime", cache);
                        this.RunNextBlock("action", cache);
                        break;
                }
                break;
            case "s":
                switch (outp)
                {
                    case "ms":
                        res = num * 100;

                        this.StoreOutputValue(res, "convertedtime", cache);
                        this.RunNextBlock("action", cache);
                        break;
                    case "s":
                        res = num;

                        this.StoreOutputValue(res, "convertedtime", cache);
                        this.RunNextBlock("action", cache);
                        break;
                    case "m":
                        res = num / 60;

                        this.StoreOutputValue(res, "convertedtime", cache);
                        this.RunNextBlock("action", cache);
                        break;
                    case "h":
                        res = (num / 60) / 60;

                        this.StoreOutputValue(res, "convertedtime", cache);
                        this.RunNextBlock("action", cache);
                        break;
                    case "d":
                        res = ((num / 60) / 60) / 24;

                        this.StoreOutputValue(res, "convertedtime", cache);
                        this.RunNextBlock("action", cache);
                        break;
                    case "M":
                        res = (((num / 60) / 60) / 24) / 30;

                        this.StoreOutputValue(res, "convertedtime", cache);
                        this.RunNextBlock("action", cache);
                        break;
                    case "y":
                        res = ((((num / 60) / 60) / 24) / 30) / 365;

                        this.StoreOutputValue(res, "convertedtime", cache);
                        this.RunNextBlock("action", cache);
                        break;
                }
                break;
            case "m":
                switch (outp)
                {
                    case "ms":
                        res = num * 100 * 60;

                        this.StoreOutputValue(res, "convertedtime", cache);
                        this.RunNextBlock("action", cache);
                        break;
                    case "s":
                        res = num * 60;

                        this.StoreOutputValue(res, "convertedtime", cache);
                        this.RunNextBlock("action", cache);
                        break;
                    case "m":
                        res = num;

                        this.StoreOutputValue(res, "convertedtime", cache);
                        this.RunNextBlock("action", cache);
                        break;
                    case "h":
                        res = num / 60;

                        this.StoreOutputValue(res, "convertedtime", cache);
                        this.RunNextBlock("action", cache);
                        break;
                    case "d":
                        res = (num / 60) / 24;

                        this.StoreOutputValue(res, "convertedtime", cache);
                        this.RunNextBlock("action", cache);
                        break;
                    case "M":
                        res = ((num / 60) / 24) / 30;

                        this.StoreOutputValue(res, "convertedtime", cache);
                        this.RunNextBlock("action", cache);
                        break;
                    case "y":
                        res = (((num / 60) / 24) / 30) / 365;

                        this.StoreOutputValue(res, "convertedtime", cache);
                        this.RunNextBlock("action", cache);
                        break;
                }
                break;
            case "h":
                switch (outp)
                {
                    case "ms":
                        res = num * 100 * 60 * 60;

                        this.StoreOutputValue(res, "convertedtime", cache);
                        this.RunNextBlock("action", cache);
                        break;
                    case "s":
                        res = num * 60 * 60;

                        this.StoreOutputValue(res, "convertedtime", cache);
                        this.RunNextBlock("action", cache);
                        break;
                    case "m":
                        res = num * 60;

                        this.StoreOutputValue(res, "convertedtime", cache);
                        this.RunNextBlock("action", cache);
                        break;
                    case "h":
                        res = num;

                        this.StoreOutputValue(res, "convertedtime", cache);
                        this.RunNextBlock("action", cache);
                        break;
                    case "d":
                        res = num / 24;

                        this.StoreOutputValue(res, "convertedtime", cache);
                        this.RunNextBlock("action", cache);
                        break;
                    case "M":
                        res = (num / 24) / 30;

                        this.StoreOutputValue(res, "convertedtime", cache);
                        this.RunNextBlock("action", cache);
                        break;
                    case "y":
                        res = ((num / 24) / 30) / 365;

                        this.StoreOutputValue(res, "convertedtime", cache);
                        this.RunNextBlock("action", cache);
                        break;
                }
                break;
            case "d":
                switch (outp)
                {
                    case "ms":
                        res = num * 100 * 60 * 60 * 24;

                        this.StoreOutputValue(res, "convertedtime", cache);
                        this.RunNextBlock("action", cache);
                        break;
                    case "s":
                        res = num * 60 * 60 * 24;

                        this.StoreOutputValue(res, "convertedtime", cache);
                        this.RunNextBlock("action", cache);
                        break;
                    case "m":
                        res = num * 60 * 24;

                        this.StoreOutputValue(res, "convertedtime", cache);
                        this.RunNextBlock("action", cache);
                        break;
                    case "h":
                        res = num * 24;

                        this.StoreOutputValue(res, "convertedtime", cache);
                        this.RunNextBlock("action", cache);
                        break;
                    case "d":
                        res = num;

                        this.StoreOutputValue(res, "convertedtime", cache);
                        this.RunNextBlock("action", cache);
                        break;
                    case "M":
                        res = num / 30;

                        this.StoreOutputValue(res, "convertedtime", cache);
                        this.RunNextBlock("action", cache);
                        break;
                    case "y":
                        res = (num / 30) / 365;

                        this.StoreOutputValue(res, "convertedtime", cache);
                        this.RunNextBlock("action", cache);
                        break;
                }
                break;
            case "M":
                switch (outp)
                {
                    case "ms":
                        res = num * 100 * 60 * 60 * 24 * 30;

                        this.StoreOutputValue(res, "convertedtime", cache);
                        this.RunNextBlock("action", cache);
                        break;
                    case "s":
                        res = num * 60 * 60 * 24 * 30;

                        this.StoreOutputValue(res, "convertedtime", cache);
                        this.RunNextBlock("action", cache);
                        break;
                    case "m":
                        res = num * 60 * 24 * 30;

                        this.StoreOutputValue(res, "convertedtime", cache);
                        this.RunNextBlock("action", cache);
                        break;
                    case "h":
                        res = num * 24 * 30;

                        this.StoreOutputValue(res, "convertedtime", cache);
                        this.RunNextBlock("action", cache);
                        break;
                    case "d":
                        res = num * 30;

                        this.StoreOutputValue(res, "convertedtime", cache);
                        this.RunNextBlock("action", cache);
                        break;
                    case "M":
                        res = num;

                        this.StoreOutputValue(res, "convertedtime", cache);
                        this.RunNextBlock("action", cache);
                        break;
                    case "y":
                        res = num / 360;

                        this.StoreOutputValue(res, "convertedtime", cache);
                        this.RunNextBlock("action", cache);
                        break;
                }
                break;
            case "y":
                switch (outp)
                {
                    case "ms":
                        res = num * 100 * 360 * 24 * 60 * 60;

                        this.StoreOutputValue(res, "convertedtime", cache);
                        this.RunNextBlock("action", cache);
                        break;
                    case "s":
                        res = num * 360 * 24 * 60 * 60;

                        this.StoreOutputValue(res, "convertedtime", cache);
                        this.RunNextBlock("action", cache);
                        break;
                    case "m":
                        res = num * 24 * 60 * 360;

                        this.StoreOutputValue(res, "convertedtime", cache);
                        this.RunNextBlock("action", cache);
                        break;
                    case "h":
                        res = num * 360 * 24;

                        this.StoreOutputValue(res, "convertedtime", cache);
                        this.RunNextBlock("action", cache);
                        break;
                    case "d":
                        res = num * 360;

                        this.StoreOutputValue(res, "convertedtime", cache);
                        this.RunNextBlock("action", cache);
                        break;
                    case "M":
                        res = num * 12;

                        this.StoreOutputValue(res, "convertedtime", cache);
                        this.RunNextBlock("action", cache);
                        break;
                    case "y":
                        res = num;

                        this.StoreOutputValue(res, "convertedtime", cache);
                        this.RunNextBlock("action", cache);
                        break;
                }
                break;
        }
    }
}
