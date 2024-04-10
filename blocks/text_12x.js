module.exports = {
    name: "Text 12x",

    description: "Creates 12 texts to use it in your blocks.",

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
        },
        {
            "id": "text5",
            "name": "Text 5",
            "description": "Description: The text to set.",
            "type": "TEXT"
        },
        {
            "id": "text6",
            "name": "Text 6",
            "description": "Description: The text to set.",
            "type": "TEXT"
        },
        {
            "id": "text7",
            "name": "Text 7",
            "description": "Description: The text to set.",
            "type": "TEXT"
        },
        {
            "id": "text8",
            "name": "Text 8",
            "description": "Description: The text to set.",
            "type": "TEXT"
        },

        {
            "id": "text9",
            "name": "Text 9",
            "description": "Description: The text to set.",
            "type": "TEXT"
        },
        {
            "id": "text10",
            "name": "Text 10",
            "description": "Description: The text to set.",
            "type": "TEXT"
        },
        {
            "id": "text11",
            "name": "Text 11",
            "description": "Description: The text to set.",
            "type": "TEXT"
        },
        {
            "id": "text12",
            "name": "Text 12",
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
        },
        {
            "id": "text5",
            "name": "Text 5",
            "description": "Type: Text\n\nDescription: The text.",
            "types": ["text"]
        },
        {
            "id": "text6",
            "name": "Text 6",
            "description": "Type: Text\n\nDescription: The text.",
            "types": ["text"]
        },
        {
            "id": "text7",
            "name": "Text 7",
            "description": "Type: Text\n\nDescription: The text.",
            "types": ["text"]
        },
        {
            "id": "text8",
            "name": "Text 8",
            "description": "Type: Text\n\nDescription: The text.",
            "types": ["text"]
        },
        {
            "id": "text9",
            "name": "Text 9",
            "description": "Type: Text\n\nDescription: The text.",
            "types": ["text"]
        },
        {
            "id": "text10",
            "name": "Text 10",
            "description": "Type: Text\n\nDescription: The text.",
            "types": ["text"]
        },
        {
            "id": "text11",
            "name": "Text 11",
            "description": "Type: Text\n\nDescription: The text.",
            "types": ["text"]
        },
        {
            "id": "text12",
            "name": "Text 12",
            "description": "Type: Text\n\nDescription: The text.",
            "types": ["text"]
        },
    ],

    code(cache) {
        this.StoreOutputValue(this.GetOptionValue("text1", cache), "text1", cache, "inputBlock");
        this.StoreOutputValue(this.GetOptionValue("text2", cache), "text2", cache, "inputBlock");
        this.StoreOutputValue(this.GetOptionValue("text3", cache), "text3", cache, "inputBlock");
        this.StoreOutputValue(this.GetOptionValue("text4", cache), "text4", cache, "inputBlock");
        this.StoreOutputValue(this.GetOptionValue("text5", cache), "text5", cache, "inputBlock");
        this.StoreOutputValue(this.GetOptionValue("text6", cache), "text6", cache, "inputBlock");
        this.StoreOutputValue(this.GetOptionValue("text7", cache), "text7", cache, "inputBlock");
        this.StoreOutputValue(this.GetOptionValue("text8", cache), "text8", cache, "inputBlock");
        this.StoreOutputValue(this.GetOptionValue("text9", cache), "text9", cache, "inputBlock");
        this.StoreOutputValue(this.GetOptionValue("text10", cache), "text10", cache, "inputBlock");
        this.StoreOutputValue(this.GetOptionValue("text11", cache), "text11", cache, "inputBlock");
        this.StoreOutputValue(this.GetOptionValue("text12", cache), "text12", cache, "inputBlock");
    }
}