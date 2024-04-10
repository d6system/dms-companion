module.exports = {
    name: "Get Modal Argument Value",

    description: "Gets the Argument Value from a Modal by @XCraftTM",

    category: ".MOD",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "arguments",
            "name": "Arguments",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The Arguments List",
            "types": ["list", "unspecified"],
            "required": true
        },
        {
            "id": "customid",
            "name": "CustomID",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The CustomID of the Input Field you want to get the Arguments from!",
            "types": ["text", "unspecified"]
        }
    ],

    options: [
        {
            "id": "customid",
            "name": "CustomID",
            "description": "Description: The CustomID of the Input Field you want to get the Arguments from!",
            "type": "TEXT"
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
            "id": "customid",
            "name": "CustomID",
            "description": "Type: text\n\nDescription: The Property CustomID Obtained.",
            "types": ["text", "unspecified"]
        },
        {
            "id": "type",
            "name": "Type",
            "description": "Type: number\n\nDescription: The Property Type Obtained.",
            "types": ["number", "unspecified"]
        },
        {
            "id": "value",
            "name": "Value",
            "description": "Type: unspecified\n\nDescription: The Property Value Obtained.",
            "types": ["unspecified"]
        }
    ],

    code(cache) {
        const arguments = this.GetInputValue("arguments", cache);
        const fieldname = this.GetOptionValue("customid", cache) ? this.GetOptionValue("customid", cache) : this.GetInputValue("customid", cache);

        let value;

        value = arguments.get(fieldname);

        valuecustomid = value.customId || "";
        valuetype = value.type || "";
        valuevalue = value.value || "";

        this.StoreOutputValue(valuecustomid, "customid", cache);
        this.StoreOutputValue(valuetype, "type", cache);
        this.StoreOutputValue(valuevalue, "value", cache);
        this.RunNextBlock("action", cache);
    }
}