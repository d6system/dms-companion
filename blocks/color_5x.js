module.exports = {
    name: "Color 5x",

    description: "Creates a five colors to use it in your blocks.",

    category: "Inputs",

    auto_execute: true,

    inputs: [],

    options: [
        {
            "id": "color",
            "name": "Color 1",
            "description": "Description: The color to set.",
            "type": "COLOR"
        },
        {
            "id": "color1",
            "name": "Color 2",
            "description": "Description: The color to set.",
            "type": "COLOR"
        },
        {
            "id": "color2",
            "name": "Color 3",
            "description": "Description: The color to set.",
            "type": "COLOR"
        },
        {
            "id": "color3",
            "name": "Color 4",
            "description": "Description: The color to set.",
            "type": "COLOR"
        },
        {
            "id": "color4",
            "name": "Color 5",
            "description": "Description: The color to set.",
            "type": "COLOR"
        }
    ],

    outputs: [
        {
            "id": "color",
            "name": "Color 1",
            "description": "Type: Text\n\nDescription: The color.",
            "types": ["text"]
        },
        {
            "id": "color1",
            "name": "Color 2",
            "description": "Type: Text\n\nDescription: The color.",
            "types": ["text"]
        },
        {
            "id": "color2",
            "name": "Color 3",
            "description": "Type: Text\n\nDescription: The color.",
            "types": ["text"]
        },
        {
            "id": "color3",
            "name": "Color 4",
            "description": "Type: Text\n\nDescription: The color.",
            "types": ["text"]
        },
        {
            "id": "color4",
            "name": "Color 5",
            "description": "Type: Text\n\nDescription: The color.",
            "types": ["text"]
        }
    ],

    code(cache) {
        this.StoreOutputValue(this.GetOptionValue("color", cache), "color", cache, "inputBlock");
        this.StoreOutputValue(this.GetOptionValue("color1", cache), "color1", cache, "inputBlock");
        this.StoreOutputValue(this.GetOptionValue("color2", cache), "color2", cache, "inputBlock");
        this.StoreOutputValue(this.GetOptionValue("color3", cache), "color3", cache, "inputBlock");
        this.StoreOutputValue(this.GetOptionValue("color4", cache), "color4", cache, "inputBlock");
    }
}