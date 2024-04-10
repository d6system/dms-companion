module.exports = {
    name: "Get Property From Object x6",

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
        },
        {
            "id": "key1",
            "name": "Key 1",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The key of the property to get.",
            "types": ["text", "unspecified"],
        },
        {
            "id": "key2",
            "name": "Key 2",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The key of the property to get.",
            "types": ["text", "unspecified"],
        },
        {
            "id": "key3",
            "name": "Key 3",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The key of the property to get.",
            "types": ["text", "unspecified"],
        },
        {
            "id": "key4",
            "name": "Key 4",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The key of the property to get.",
            "types": ["text", "unspecified"],
        },
        {
            "id": "key5",
            "name": "Key 5",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The key of the property to get.",
            "types": ["text", "unspecified"],
        },
        {
            "id": "key6",
            "name": "Key 6",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The key of the property to get.",
            "types": ["text", "unspecified"],
        },
    ],

    options: [
        {
            "id": "option",
            "name": "Object Option",
            "description": "Description: Select the Option",
            "type": "SELECT",
            "options": {
                1: "Object",
                2: "Raw Value"
            }
        },
        {
            "id": "key1",
            "name": "Key 1 ",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The number of the specific workspace. Starts at \"1\". Only use this input if you selected the option \"Specific Workspace\" in \"Variable Restriction Type\". (OPTIONAL)",
            "type": "TEXT"
        },
        {
            "id": "key2",
            "name": "Key 2",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The number of the specific workspace. Starts at \"1\". Only use this input if you selected the option \"Specific Workspace\" in \"Variable Restriction Type\". (OPTIONAL)",
            "type": "TEXT"
        },
        {
            "id": "key3",
            "name": "Key 3 ",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The number of the specific workspace. Starts at \"1\". Only use this input if you selected the option \"Specific Workspace\" in \"Variable Restriction Type\". (OPTIONAL)",
            "type": "TEXT"
        },
        {
            "id": "key4",
            "name": "Key 4 ",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The number of the specific workspace. Starts at \"1\". Only use this input if you selected the option \"Specific Workspace\" in \"Variable Restriction Type\". (OPTIONAL)",
            "type": "TEXT"
        },
        {
            "id": "key5",
            "name": "Key 5 ",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The number of the specific workspace. Starts at \"1\". Only use this input if you selected the option \"Specific Workspace\" in \"Variable Restriction Type\". (OPTIONAL)",
            "type": "TEXT"
        },
        {
            "id": "key6",
            "name": "Key 6 ",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The number of the specific workspace. Starts at \"1\". Only use this input if you selected the option \"Specific Workspace\" in \"Variable Restriction Type\". (OPTIONAL)",
            "type": "TEXT"
        },

    ],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
            "id": "value1",
            "name": "Value 1",
            "description": "Type: Object\n\nDescription: The property value obtained.",
            "types": ["object", "unspecified", "text"]
        },
        {
            "id": "value2",
            "name": "Value 2",
            "description": "Type: Object\n\nDescription: The property value obtained.",
            "types": ["object", "unspecified", "text"]
        },
        {
            "id": "value3",
            "name": "Value 3",
            "description": "Type: Object\n\nDescription: The property value obtained.",
            "types": ["object", "unspecified", "text"]
        },
        {
            "id": "value4",
            "name": "Value 4",
            "description": "Type: Object\n\nDescription: The property value obtained.",
            "types": ["object", "unspecified", "text"]
        },
        {
            "id": "value5",
            "name": "Value 5",
            "description": "Type: Object\n\nDescription: The property value obtained.",
            "types": ["object", "unspecified", "text"]
        },
        {
            "id": "value6",
            "name": "Value 6",
            "description": "Type: Object\n\nDescription: The property value obtained.",
            "types": ["object", "unspecified", "text"]
        },

    ],

    code(cache) {
        const object = this.GetInputValue("object", cache);
        let key1 = this.GetInputValue("key1", cache);
        let key2 = this.GetInputValue("key2", cache);
        let key3 = this.GetInputValue("key3", cache);
        let key4 = this.GetInputValue("key4", cache);
        let key5 = this.GetInputValue("key5", cache);
        let key6 = this.GetInputValue("key6", cache);
        let option = this.GetOptionValue("option", cache);

    if (key1 == undefined)
    {
        key1 = this.GetOptionValue("key1", cache)
    }
    if (key2 == undefined)
    {
        key2 = this.GetOptionValue("key2", cache)
    }
    if (key3 == undefined)
    {
        key3 = this.GetOptionValue("key3", cache)
    }
    if (key4 == undefined)
    {
        key4 = this.GetOptionValue("key4", cache)
    }
    if (key5 == undefined)
    {
        key5 = this.GetOptionValue("key5", cache)
    }
    if (key6 == undefined)
    {
        key6 = this.GetOptionValue("key6", cache)
    }

if (option == 1) {

    if ((object[key1]) != undefined)
    {
        this.StoreOutputValue(object[key1], "value1", cache);
    }
    if ((object[key2]) != undefined)
    {
        this.StoreOutputValue(object[key2], "value2", cache);
    }
    if ((object[key3]) != undefined)
    {
        this.StoreOutputValue(object[key3], "value3", cache);
    }
    if ((object[key4]) != undefined)
    {
        this.StoreOutputValue(object[key4], "value4", cache);
    }
    if ((object[key5]) != undefined)
    {
        this.StoreOutputValue(object[key5], "value5", cache);
    }
    if ((object[key6]) != undefined)
    {
        this.StoreOutputValue(object[key6], "value6", cache);
    }

} else if (option == 2)
        {
            let ObjectConvertToString;

            if ((object[key1]) != undefined)
            {
                ObjectConvertToString = (object[key1]);
                raw = JSON.stringify(ObjectConvertToString);
                raw2 = raw.replace('"', '');
                result = raw2.replace('"', '');
                this.StoreOutputValue(result, "value1", cache);
            }
            if ((object[key2]) != undefined)
            {
                ObjectConvertToString = (object[key2]);
                raw = JSON.stringify(ObjectConvertToString);
                raw2 = raw.replace('"', '');
                result = raw2.replace('"', '');
                this.StoreOutputValue(result, "value2", cache);
            }
            if ((object[key3]) != undefined)
            {
                ObjectConvertToString = (object[key3]);
                raw = JSON.stringify(ObjectConvertToString);
                raw2 = raw.replace('"', '');
                result = raw2.replace('"', '');
                this.StoreOutputValue(result, "value3", cache);
            }
            if ((object[key4]) != undefined)
            {
                ObjectConvertToString = (object[key4]);
                raw = JSON.stringify(ObjectConvertToString);
                raw2 = raw.replace('"', '');
                result = raw2.replace('"', '');
                this.StoreOutputValue(result, "value4", cache);
            }
            if ((object[key5]) != undefined)
            {
                ObjectConvertToString = (object[key5]);
                raw = JSON.stringify(ObjectConvertToString);
                raw2 = raw.replace('"', '');
                result = raw2.replace('"', '');
                this.StoreOutputValue(result, "value5", cache);
            }
            if ((object[key6]) != undefined)
            {
                ObjectConvertToString = (object[key6]);
                raw = JSON.stringify(ObjectConvertToString);
                raw2 = raw.replace('"', '');
                result = raw2.replace('"', '');
                this.StoreOutputValue(result, "value6", cache);
            }
        }

        this.RunNextBlock("action", cache);
    }
}