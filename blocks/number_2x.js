module.exports = {
    name: "Number 2x",

    description: "Creates 2 Numbers to use it in your blocks.",

    category: "Inputs",

    auto_execute: true,

    inputs: [],

    options: [
        {
            "id": "number1",
            "name": "Number 1",
            "description": "Description: The Number to set.",
            "type": "NUMBER"
        },
        {
            "id": "number2",
            "name": "Number 2",
            "description": "Description: The Number to set.",
            "type": "NUMBER"
        }
    ],

    outputs: [
        {
            "id": "number1",
            "name": "Number 1",
            "description": "Description: The Number to set.",
            "types": ["NUMBER"]
        },
        {
            "id": "number2",
            "name": "Number 2",
            "description": "Description: The Number to set.",
            "types": ["NUMBER"]
        }
    ],

    code(cache) {
        this.StoreOutputValue(this.GetOptionValue("number1", cache), "number1", cache, "inputBlock");
        this.StoreOutputValue(this.GetOptionValue("number2", cache), "number2", cache, "inputBlock");
    }
}