module.exports = {
    name: "Color 2x",

    description: "Creates a two colors to use it in your blocks.",

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
        }
    ],

    code(cache) {
        this.StoreOutputValue(this.GetOptionValue("color", cache), "color", cache, "inputBlock");
        this.StoreOutputValue(this.GetOptionValue("color1", cache), "color1", cache, "inputBlock");
    }
}