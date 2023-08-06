module.exports = {
    name: "Get Property From Object with option",

    description: "Gets the property from the object.",

    category: "Object Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "object",
            "name": "Object",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The object to get the property.",
            "types": ["object", "unspecified"],
            "required": true
        }
    ],

    options: [
        {
            "id": "key",
            "name": "key",
            "description": "who cares",
            "types": ["text", "unspecified"],
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
            "id": "value",
            "name": "Value",
            "description": "Type: unspecified\n\nDescription: The property value obtained.",
            "types": ["unspecified"]
        }
    ],

    code(cache) {
        const object = this.GetInputValue("object", cache);
        const key = this.GetOptionValue("key", cache);

        this.StoreOutputValue(object[key], "value", cache);
        this.RunNextBlock("action", cache);
    }
}