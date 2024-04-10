module.exports = {
    name: "Text 4x and boolean",

    description: "Creates 4x texts to use it in your blocks, and a boolean output",

    category: ".BatMan",

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
            "id": "boolean_type",
            "name": "Boolean Type",
            "description": "Description: The type of boolean to set.",
            "type": "SELECT",
            "options": {
                "true": "True/Yes",
                "false": "False/No"
            }
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
            "id": "boolean",
            "name": "Boolean",
            "description": "Type: Boolean\n\nDescription: The boolean.",
            "types": ["boolean"]
        }
    ],

    code(cache) {
        this.StoreOutputValue(this.GetOptionValue("text1", cache), "text1", cache, "inputBlock");
        this.StoreOutputValue(this.GetOptionValue("text2", cache), "text2", cache, "inputBlock");
        this.StoreOutputValue(this.GetOptionValue("text3", cache), "text3", cache, "inputBlock");
        this.StoreOutputValue(this.GetOptionValue("text4", cache), "text4", cache, "inputBlock");
        this.StoreOutputValue(this.GetOptionValue("boolean_type", cache) == "true", "boolean", cache, "inputBlock");
    }
}