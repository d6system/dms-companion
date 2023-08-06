module.exports = {
    name: "Run JavaScript Code",

    description: "Runs a JavaScript Code.",

    category: "Extras",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "value1",
            "name": "Value 1",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Object, Boolean, Date, Number, Text, List\n\nDescription: The value 1 to use inside the code. (OPTIONAL)",
            "types": ["unspecified", "undefined", "null", "object", "boolean", "date", "number", "text", "list"]
        },
        {
            "id": "value2",
            "name": "Value 2",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Object, Boolean, Date, Number, Text, List\n\nDescription: The value 2 to use inside the code. (OPTIONAL)",
            "types": ["unspecified", "undefined", "null", "object", "boolean", "date", "number", "text", "list"]
        },
        {
            "id": "value3",
            "name": "Value 3",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Object, Boolean, Date, Number, Text, List\n\nDescription: The value 3 to use inside the code. (OPTIONAL)",
            "types": ["unspecified", "undefined", "null", "object", "boolean", "date", "number", "text", "list"]
        }
    ],

    options: [
        {
            "id": "javascript_code",
            "name": "JavaScript Code",
            "description": `Description: The JavaScript code to run.

You have the following variables free to use:
value1, value2, value3 and client

You can utilize many different functions to interaction with the blocks.
Here are basic functions to use:
this.GetInputValue("value1", cache);
this.StoreOutputValue(output, "value2", cache);
this.RunNextBlock("action", cache);

You can import Packages using:
const { Client } = require("discord.js")

You can define Variables or Constants using:
const items = ["item1", "item2"...];
var amount = 3;

You can change a Variable using a =, but Constants can't be changed, only read:
amount = 5
or
amount++;
^ This adds one to the number

Also there are if Statements:
if(amount == 6) {
    this.console("INFO", "Number is 6!");
    ^ This function is the Log function of DBB, is very usefull for formated logging.
}`,
            "type": "TEXT"
        },
        {
            "id": "block_behavior",
            "name": "Block Behavior",
            "description": "Description: Whether the block must execute the next blocks automatically.",
            "type": "SELECT",
            "options": {
                "yes": "Execute Following Block(s) Automatically",
                "no": "Do Not Execute Following Block(s) Automatically"
            }
        }
    ],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks. If you selected the option \"Do Not Execute Following Block(s) Automatically\", this output will only work if you trigger manually.",
            "types": ["action"]
        },
        {
            "id": "return_value",
            "name": "Return Value",
            "description": "Type: Unspecified\n\nDescription: The value returned from the end of the code if possible.",
            "types": ["unspecified"]
        },
        {
            "id": "time_taken",
            "name": "Time Taken",
            "description": "Type: Number\n\nDescription: The time taken to execute all code in milliseconds.",
            "types": ["number"]
        },
        {
            "id": "value1",
            "name": "Value 1",
            "description": "Type: Unspecified\n\nDescription: The value 1 returned from the code if possible.",
            "types": ["unspecified"]
        },
        {
            "id": "value2",
            "name": "Value 2",
            "description": "Type: Unspecified\n\nDescription: The value 2 returned from the code if possible.",
            "types": ["unspecified"]
        },
        {
            "id": "value3",
            "name": "Value 3",
            "description": "Type: Unspecified\n\nDescription: The value 3 returned from the code if possible.",
            "types": ["unspecified"]
        },
        {
            "id": "error_message",
            "name": "Error Message",
            "description": "Acceptable Types: Text\n\nDescription: The error message if there is a problem with the code.",
            "types": ["text", "unspecified"]
        }
    ],

    code(cache) {
        const evaluation = (javascript_code) => {
            const value1 = this.GetInputValue("value1", cache);
            const value2 = this.GetInputValue("value2", cache);
            const value3 = this.GetInputValue("value3", cache);

            const client = this.client;

            try {
                return [false, eval(javascript_code)];
            } catch (err) {
                return [true, err.message];
            }
        }

        const javascript_code = this.GetOptionValue("javascript_code", cache) + "";

        const { performance } = require("perf_hooks");

        const t0 = performance.now();
        const res = evaluation(javascript_code);
        const t1 = performance.now();

        const block_behavior = this.GetOptionValue("block_behavior", cache) + "" == "yes";
        this.StoreOutputValue(res[1], res[0] ? "error_message" : "return_value", cache);
        this.StoreOutputValue((t1 - t0).toFixed(4), "time_taken", cache);
        if (res[0] || block_behavior) this.RunNextBlock("action", cache);
    }
}