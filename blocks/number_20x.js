module.exports = {
    name: "Number 20x",

    description: "Creates 20 numbers to use it in your blocks.",

    category: "Inputs",

    auto_execute: true,

    inputs: [],

    options: [
        {
            "id": "number1",
            "name": "Number 1",
            "description": "Description: The number to set.",
            "type": "NUMBER"
        },
        {
            "id": "number2",
            "name": "Number 2",
            "description": "Description: The number to set.",
            "type": "NUMBER"
        },
        {
            "id": "number3",
            "name": "Number 3",
            "description": "Description: The number to set.",
            "type": "NUMBER"
        },
        {
            "id": "number4",
            "name": "Number 4",
            "description": "Description: The number to set.",
            "type": "NUMBER"
        },
        {
            "id": "number5",
            "name": "Number 5",
            "description": "Description: The number to set.",
            "type": "NUMBER"
        },
        {
            "id": "number6",
            "name": "Number 6",
            "description": "Description: The number to set.",
            "type": "NUMBER"
        },
        {
            "id": "number7",
            "name": "Number 7",
            "description": "Description: The number to set.",
            "type": "NUMBER"
        },
        {
            "id": "number8",
            "name": "Number 8",
            "description": "Description: The number to set.",
            "type": "NUMBER"
        },
        {
            "id": "number9",
            "name": "Number 9",
            "description": "Description: The number to set.",
            "type": "NUMBER"
        },
        {
            "id": "number10",
            "name": "Number 10",
            "description": "Description: The number to set.",
            "type": "NUMBER"
        },
        {
            "id": "number11",
            "name": "Number 11",
            "description": "Description: The number to set.",
            "type": "NUMBER"
        },
        {
            "id": "number12",
            "name": "Number 12",
            "description": "Description: The number to set.",
            "type": "NUMBER"
        },        
        {
            "id": "number13",
            "name": "Number 13",
            "description": "Description: The number to set.",
            "type": "NUMBER"
        },
        {
            "id": "number14",
            "name": "Number 14",
            "description": "Description: The number to set.",
            "type": "NUMBER"
        },
        {
            "id": "number15",
            "name": "Number 15",
            "description": "Description: The number to set.",
            "type": "NUMBER"
        },
        {
            "id": "number16",
            "name": "Number 16",
            "description": "Description: The number to set.",
            "type": "NUMBER"
        },
        {
            "id": "number17",
            "name": "Number 17",
            "description": "Description: The number to set.",
            "type": "NUMBER"
        },
        {
            "id": "number18",
            "name": "Number 18",
            "description": "Description: The number to set.",
            "type": "NUMBER"
        },
        {
            "id": "number19",
            "name": "Number 19",
            "description": "Description: The number to set.",
            "type": "NUMBER"
        },
        {
            "id": "number20",
            "name": "Number 20",
            "description": "Description: The number to set.",
            "type": "NUMBER"
        }
    ],

    outputs: [
        {
            "id": "number1",
            "name": "Number 1",
            "description": "Type: Number\n\nDescription: The number.",
            "types": ["number"]
        },
        {
            "id": "number2",
            "name": "Number 2",
            "description": "Type: Number\n\nDescription: The number.",
            "types": ["number"]
        },
        {
            "id": "number3",
            "name": "Number 3",
            "description": "Type: Number\n\nDescription: The number.",
            "types": ["number"]
        },
        {
            "id": "number4",
            "name": "Number 4",
            "description": "Type: Number\n\nDescription: The number.",
            "types": ["number"]
        },
        {
            "id": "number5",
            "name": "Number 5",
            "description": "Type: Number\n\nDescription: The number.",
            "types": ["number"]
        },
        {
            "id": "number6",
            "name": "Number 6",
            "description": "Type: Number\n\nDescription: The number.",
            "types": ["number"]
        },
        {
            "id": "number7",
            "name": "Number 7",
            "description": "Type: Number\n\nDescription: The number.",
            "types": ["number"]
        },
        {
            "id": "number8",
            "name": "Number 8",
            "description": "Type: Number\n\nDescription: The number.",
            "types": ["number"]
        },
        {
            "id": "number9",
            "name": "Number 9",
            "description": "Type: Number\n\nDescription: The number.",
            "types": ["number"]
        },
        {
            "id": "number10",
            "name": "Number 10",
            "description": "Type: Number\n\nDescription: The number.",
            "types": ["number"]
        },
        {
            "id": "number11",
            "name": "Number 11",
            "description": "Type: Number\n\nDescription: The number.",
            "types": ["number"]
        },
        {
            "id": "number12",
            "name": "Number 12",
            "description": "Type: Number\n\nDescription: The number.",
            "types": ["number"]
        },
        {
            "id": "number13",
            "name": "Number 13",
            "description": "Type: Number\n\nDescription: The number.",
            "types": ["number"]
        },
        {
            "id": "number14",
            "name": "Number 14",
            "description": "Type: Number\n\nDescription: The number.",
            "types": ["number"]
        },
        {
            "id": "number15",
            "name": "Number 15",
            "description": "Type: Number\n\nDescription: The number.",
            "types": ["number"]
        },
        {
            "id": "number16",
            "name": "Number 16",
            "description": "Type: Number\n\nDescription: The number.",
            "types": ["number"]
        },
        {
            "id": "number17",
            "name": "Number 17",
            "description": "Type: Number\n\nDescription: The number.",
            "types": ["number"]
        },
        {
            "id": "number18",
            "name": "Number 18",
            "description": "Type: Number\n\nDescription: The number.",
            "types": ["number"]
        },
        {
            "id": "number19",
            "name": "Number 19",
            "description": "Type: Number\n\nDescription: The number.",
            "types": ["number"]
        },
        {
            "id": "number20",
            "name": "Number 20",
            "description": "Type: Number\n\nDescription: The number.",
            "types": ["number"]
        },
    ],

    code(cache) {
        this.StoreOutputValue(parseFloat(this.GetOptionValue("number1", cache)), "number1", cache, "inputBlock");
        this.StoreOutputValue(parseFloat(this.GetOptionValue("number2", cache)), "number2", cache, "inputBlock");
        this.StoreOutputValue(parseFloat(this.GetOptionValue("number3", cache)), "number3", cache, "inputBlock");
        this.StoreOutputValue(parseFloat(this.GetOptionValue("number4", cache)), "number4", cache, "inputBlock");
        this.StoreOutputValue(parseFloat(this.GetOptionValue("number5", cache)), "number5", cache, "inputBlock");
        this.StoreOutputValue(parseFloat(this.GetOptionValue("number6", cache)), "number6", cache, "inputBlock");
        this.StoreOutputValue(parseFloat(this.GetOptionValue("number7", cache)), "number7", cache, "inputBlock");
        this.StoreOutputValue(parseFloat(this.GetOptionValue("number8", cache)), "number8", cache, "inputBlock");
        this.StoreOutputValue(parseFloat(this.GetOptionValue("number9", cache)), "number9", cache, "inputBlock");
        this.StoreOutputValue(parseFloat(this.GetOptionValue("number10", cache)), "number10", cache, "inputBlock");
        this.StoreOutputValue(parseFloat(this.GetOptionValue("number11", cache)), "number11", cache, "inputBlock");
        this.StoreOutputValue(parseFloat(this.GetOptionValue("number12", cache)), "number12", cache, "inputBlock");
        this.StoreOutputValue(parseFloat(this.GetOptionValue("number13", cache)), "number13", cache, "inputBlock");
        this.StoreOutputValue(parseFloat(this.GetOptionValue("number14", cache)), "number14", cache, "inputBlock");
        this.StoreOutputValue(parseFloat(this.GetOptionValue("number15", cache)), "number15", cache, "inputBlock");
        this.StoreOutputValue(parseFloat(this.GetOptionValue("number16", cache)), "number16", cache, "inputBlock");
        this.StoreOutputValue(parseFloat(this.GetOptionValue("number17", cache)), "number17", cache, "inputBlock");
        this.StoreOutputValue(parseFloat(this.GetOptionValue("number18", cache)), "number18", cache, "inputBlock");
        this.StoreOutputValue(parseFloat(this.GetOptionValue("number19", cache)), "number19", cache, "inputBlock");
        this.StoreOutputValue(parseFloat(this.GetOptionValue("number20", cache)), "number20", cache, "inputBlock");
    }
}