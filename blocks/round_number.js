module.exports = {
    name: "Round Number",

    description: "Rounds a number to the specified number of digits.",

    category: "Math",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Executes this block.",
            "types": ["action"]
        },
        {
            "id": "digits",
            "name": "Digits to Round",
            "description": "The number of digits to round the number to.",
            "types": ["number"]
        },
        {
            "id": "number",
            "name": "Number",
            "description": "The number to round.",
            "types": ["number"]
        }
    ],

    options: [
        {
            "id": "digits_option",
            "name": "Digits to Round",
            "description": "The number of digits to round the number to.",
            "type": "NUMBER"
        }
    ],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Executes the next block.",
            "types": ["action"]
        },
        {
            "id": "rounded_number",
            "name": "Rounded Number",
            "description": "The rounded number.",
            "types": ["number"]
        }
    ],

    code: function(cache) {
        const digitsInput = this.GetInputValue("digits", cache);
        const numberInput = this.GetInputValue("number", cache);
        const digitsOption = this.GetOptionValue("digits_option", cache);

        const digits = digitsInput !== undefined ? digitsInput : digitsOption;
        const roundedNumber = Number(numberInput.toFixed(digits));

        this.StoreOutputValue(roundedNumber, "rounded_number", cache);
        this.RunNextBlock("action", cache);
    }
};
