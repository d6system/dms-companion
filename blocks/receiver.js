module.exports = {
    name: "Receiver",

    description: "The receiver for any \"Emitter\" block with the same ID.",

    category: "Trigger Stuff",

    inputs: [
        {
            "id": "id",
            "name": "Receiver ID",
            "description": "Acceptable Types: Text, Number, Unspecified\n\nDescription: The ID of this Receiver. This must match with the ID of the desired \"Emitter\" block.",
            "types": ["text", "number", "unspecified"],
            "required": true
        }
    ],

    options: [],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block is trigger by any \"Emitter\" block with the same ID.",
            "types": ["action"]
        },
        {
            "id": "value1",
            "name": "Value 1",
            "description": "Type: Unspecified\n\nDescription: The value 1 received from the emitter if possible.",
            "types": ["unspecified", "text"]
        },
        {
            "id": "value2",
            "name": "Value 2",
            "description": "Type: Unspecified\n\nDescription: The value 2 received from the emitter if possible.",
            "types": ["unspecified", "text"]
        },
        {
            "id": "value3",
            "name": "Value 3",
            "description": "Type: Unspecified\n\nDescription: The value 3 received from the emitter if possible.",
            "types": ["unspecified", "text"]
        },
        {
            "id": "value4",
            "name": "Value 4",
            "description": "Type: Unspecified\n\nDescription: The value 4 received from the emitter if possible.",
            "types": ["unspecified", "text"]
        },
        {
            "id": "value5",
            "name": "Value 5",
            "description": "Type: Unspecified\n\nDescription: The value 5 received from the emitter if possible.",
            "types": ["unspecified", "text"]
        },
        {
            "id": "value6",
            "name": "Value 6",
            "description": "Type: Unspecified\n\nDescription: The value 6 received from the emitter if possible.",
            "types": ["unspecified", "text"]
        },
        {
            "id": "value7",
            "name": "Value 7",
            "description": "Type: Unspecified\n\nDescription: The value 7 received from the emitter if possible.",
            "types": ["unspecified", "text"]
        },
        {
            "id": "value8",
            "name": "Value 8",
            "description": "Type: Unspecified\n\nDescription: The value 8 received from the emitter if possible.",
            "types": ["unspecified", "text", "boolean"]
        }
    ],

    code(cache) {
        const values = cache._temp.__VALUES;
        this.StoreOutputValue(values[0], "value1", cache);
        this.StoreOutputValue(values[1], "value2", cache);
        this.StoreOutputValue(values[2], "value3", cache);
        this.StoreOutputValue(values[3], "value4", cache);
        this.StoreOutputValue(values[4], "value5", cache);
        this.StoreOutputValue(values[5], "value6", cache);
        this.StoreOutputValue(values[6], "value7", cache);
        this.StoreOutputValue(values[7], "value8", cache);

        
        this.RunNextBlock("action", cache);
    }
}