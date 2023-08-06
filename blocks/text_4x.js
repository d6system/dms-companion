module.exports = {
    name: "Text 4x",

    description: "Creates 4 texts to use it in your blocks.",

    category: "Inputs",

    auto_execute: true,

    inputs: [],

    options: [
        {
            "id": "text1",
            "name": "Text 1",
            "description": "Description: The text to set.",
            "type": "TEXT"
        },
        {
            "id": "text2",
            "name": "Text 2",
            "description": "Description: The text to set.",
            "type": "TEXT"
        },
        {
            "id": "text3",
            "name": "Text 3",
            "description": "Description: The text to set.",
            "type": "TEXT"
        },
        {
            "id": "text4",
            "name": "Text 4",
            "description": "Description: The text to set.",
            "type": "TEXT"
        }
    ],

    outputs: [
        {
            "id": "text1",
            "name": "Text 1",
            "description": "Type: Text\n\nDescription: The text.",
            "types": ["text"]
        },
        {
            "id": "text2",
            "name": "Text 2",
            "description": "Type: Text\n\nDescription: The text.",
            "types": ["text"]
        },
        {
            "id": "text3",
            "name": "Text 3",
            "description": "Type: Text\n\nDescription: The text.",
            "types": ["text"]
        },
        {
            "id": "text4",
            "name": "Text 4",
            "description": "Type: Text\n\nDescription: The text.",
            "types": ["text"]
        }
    ],

    code(cache) {
        this.StoreOutputValue(this.GetOptionValue("text1", cache), "text1", cache, "inputBlock");
        this.StoreOutputValue(this.GetOptionValue("text2", cache), "text2", cache, "inputBlock");
        this.StoreOutputValue(this.GetOptionValue("text3", cache), "text3", cache, "inputBlock");
        this.StoreOutputValue(this.GetOptionValue("text4", cache), "text4", cache, "inputBlock");
    }
}