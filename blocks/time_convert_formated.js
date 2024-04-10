module.exports = {
    name: "Convert Miliseconds to Formated Time",

    description: "Convert Miliseconds to Formated Time.",

    category: "Date",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "time",
            "name": "Miliseconds",
            "description": "Acceptable Types: Number, Text, Unespecified\n\nDescription: The number that will be converted.",
            "types": ["number", "unspecified"]
        }
    ],

    options: [
        {
            "id": "input",
            "name": "Convert Miliseconds to Formated Time:",
            "description": "Description: The type of the data. If not \"None\", you need to put a value in the \"Server/Member/User\" input depending on which option you selected here.",
            "type": "SELECT",
            "options": {
                "A": "short",
                "B": "verbose",
                "C": "colonNotation"
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
            "id": "result",
            "name": "Value",
            "description": "Type: Unspecified\n\nDescription: The value of the data.",
            "types": ["text"]
        }
    ],

   async code(cache) {
       const prettyMilliseconds = await this.require('pretty-ms@3.0.0');
        const time = this.GetInputValue("time", cache)
        const input = this.GetOptionValue("input", cache)

        let r
        switch(input){
            case "A":
                r = prettyMilliseconds(time)
                break;
            case "B":
                r = prettyMilliseconds(time, { verbose: true })
                break;
            case "C":
                r = prettyMilliseconds(time, { colonNotation: true })
                break;
 
        }

  
        this.StoreOutputValue(r, "result", cache);
        this.RunNextBlock("action", cache);
    }
}