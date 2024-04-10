module.exports = {
    name: "Merge Actions & Objects 10x",

    description: "Merge Multiple Objects and Actions together to One!",

    category: ".MOD",

    inputs: [
        {
            "id": "action1",
            "name": "Action 1",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "object1",
            "name": "Object 1",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Object, Boolean, Number, Text, List\n\nDescription: A Object to merge.",
            "types": ["object", "unspecified", "undefined", "null", "boolean", "number", "text", "list"]
        },
        {
            "id": "action2",
            "name": "Action 2",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "object2",
            "name": "Object 2",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Object, Boolean, Number, Text, List\n\nDescription: A Object to merge.",
            "types": ["object", "unspecified", "undefined", "null", "boolean", "number", "text", "list"]
        },
        {
            "id": "action3",
            "name": "Action 3",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "object3",
            "name": "Object 3",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Object, Boolean, Number, Text, List\n\nDescription: A Object to merge.",
            "types": ["object", "unspecified", "undefined", "null", "boolean", "number", "text", "list"]
        },
        {
            "id": "action4",
            "name": "Action 4",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "object4",
            "name": "Object 4",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Object, Boolean, Number, Text, List\n\nDescription: A Object to merge.",
            "types": ["object", "unspecified", "undefined", "null", "boolean", "number", "text", "list"]
        },
        {
            "id": "action5",
            "name": "Action 5",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "object5",
            "name": "Object 5",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Object, Boolean, Number, Text, List\n\nDescription: A Object to merge.",
            "types": ["object", "unspecified", "undefined", "null", "boolean", "number", "text", "list"]
        },
        {
            "id": "action6",
            "name": "Action 6",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "object6",
            "name": "Object 6",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Object, Boolean, Number, Text, List\n\nDescription: A Object to merge.",
            "types": ["object", "unspecified", "undefined", "null", "boolean", "number", "text", "list"]
        },
        {
            "id": "action7",
            "name": "Action 7",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "object7",
            "name": "Object 7",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Object, Boolean, Number, Text, List\n\nDescription: A Object to merge.",
            "types": ["object", "unspecified", "undefined", "null", "boolean", "number", "text", "list"]
        },
        {
            "id": "action8",
            "name": "Action 8",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "object8",
            "name": "Object 8",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Object, Boolean, Number, Text, List\n\nDescription: A Object to merge.",
            "types": ["object", "unspecified", "undefined", "null", "boolean", "number", "text", "list"]
        },
        {
            "id": "action9",
            "name": "Action 9",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "object9",
            "name": "Object 9",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Object, Boolean, Number, Text, List\n\nDescription: A Object to merge.",
            "types": ["object", "unspecified", "undefined", "null", "boolean", "number", "text", "list"]
        },
        {
            "id": "action10",
            "name": "Action 10",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "object10",
            "name": "Object 10",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Object, Boolean, Number, Text, List\n\nDescription: A Object to merge.",
            "types": ["object", "unspecified", "undefined", "null", "boolean", "number", "text", "list"]
        },
    ],

    options: [],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks.",
            "types": ["action"]
        },
        {
            "id": "object",
            "name": "Object",
            "description": "Acceptable Types: Action\n\nDescription: The Object that was merged.",
            "types": ["object", "unspecified"]
        },
    ],

    code: function(cache, DBB) {
        const object1 = this.GetInputValue("object1", cache);
        const object2 = this.GetInputValue("object2", cache);
        const object3 = this.GetInputValue("object3", cache);
        const object4 = this.GetInputValue("object4", cache);
        const object5 = this.GetInputValue("object5", cache);
        const object6 = this.GetInputValue("object6", cache);
        const object7 = this.GetInputValue("object7", cache);
        const object8 = this.GetInputValue("object8", cache);
        const object9 = this.GetInputValue("object9", cache);
        const object10 = this.GetInputValue("object10", cache);
        const arr = [object1, object2, object3, object4, object5, object6, object7, object8, object9, object10]
        this.StoreOutputValue(arr.find((item) => item !== undefined), "object", cache)
        this.RunNextBlock("action", cache);
        Object.entries(cache.inputs).flat().forEach((item) => {
            if(item.includes("action") || item.includes("object")) return;
            if(Object.entries(DBB.Blocks.inputs).flat().find(item2 => typeof item2 == "object" ? item2[item] : false)) delete Object.entries(DBB.Blocks.inputs).flat().find(item2 => typeof item2 == "object" ? item2[item] : false)[item];
        });
    }
}