module.exports = {
  
    name: "get modal argument v1",

    description: "gets modal argument",

    category: ".MOD",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
            "id": "interaction",
            "name": "interaction",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["object"]
        }
    ],

    options: [
        {
            "id": "id",
            "name": "question id",
            "description": "What the Question is gonna be.",
            "types": "TEXT"
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
            "id": "args",
            "name": "Value",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["unspecified"]
        }
    ],

    async code(cache) {
        const obj = this.GetInputValue("interaction", cache);
        const id = this.GetOptionValue("id", cache);

        const key = id;
        const value = obj.fields.fields.get(key)

        this.StoreOutputValue(value.value, "args", cache);
        this.RunNextBlock("action", cache);
    }
}