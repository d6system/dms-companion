module.exports = {
    name: "Create Object With Properties",

    description: "Create an object to use it in your blocks.",

    category: "Object Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "key1",
            "name": "Key 1",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The key for this object property.",
            "types": ["text", "unspecified"]
        },
        {
            "id": "value1",
            "name": "Value 1",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Object, Boolean, Date, Number, Text, List\n\nDescription: The value for this object property.",
            "types": ["unspecified", "undefined", "null", "object", "boolean", "date", "number", "text", "list"]
        },
        {
            "id": "key2",
            "name": "Key 2",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The key for this object property.",
            "types": ["text", "unspecified"]
        },
        {
            "id": "value2",
            "name": "Value 2",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Object, Boolean, Date, Number, Text, List\n\nDescription: The value for this object property.",
            "types": ["unspecified", "undefined", "null", "object", "boolean", "date", "number", "text", "list"]
        },
        {
            "id": "key3",
            "name": "Key 3",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The key for this object property.",
            "types": ["text", "unspecified"]
        },
        {
            "id": "value3",
            "name": "Value 3",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Object, Boolean, Date, Number, Text, List\n\nDescription: The value for this object property.",
            "types": ["unspecified", "undefined", "null", "object", "boolean", "date", "number", "text", "list"]
        },
        {
            "id": "key4",
            "name": "Key 4",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The key for this object property.",
            "types": ["text", "unspecified"]
        },
        {
            "id": "value4",
            "name": "Value 4",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Object, Boolean, Date, Number, Text, List\n\nDescription: The value for this object property.",
            "types": ["unspecified", "undefined", "null", "object", "boolean", "date", "number", "text", "list"]
        },
        {
            "id": "key5",
            "name": "Key 5",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The key for this object property.",
            "types": ["text", "unspecified"]
        },
        {
            "id": "value5",
            "name": "Value 5",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Object, Boolean, Date, Number, Text, List\n\nDescription: The value for this object property.",
            "types": ["unspecified", "undefined", "null", "object", "boolean", "date", "number", "text", "list"]
        },
        {
            "id": "key6",
            "name": "Key 6",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The key for this object property.",
            "types": ["text", "unspecified"]
        },
        {
            "id": "value6",
            "name": "Value 6",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Object, Boolean, Date, Number, Text, List\n\nDescription: The value for this object property.",
            "types": ["unspecified", "undefined", "null", "object", "boolean", "date", "number", "text", "list"]
        }
    ],

    options: [
        {
            "id": "key1",
            "name": "Key1",
            "description": "Description: The key for this object property.",
            "type": "TEXT"
        },		
        {
            "id": "value1",
            "name": "Value 1",
            "description": "Description: The value for this object property.",
            "type": "TEXT"
        },
        {
            "id": "key2",
            "name": "Key 2",
            "description": "Description: The key for this object property.",
            "type": "TEXT"
        },		
        {
            "id": "value2",
            "name": "Value 2",
            "description": "Description: The value for this object property.",
            "type": "TEXT"
        },
        {
            "id": "key3",
            "name": "Key 3",
            "description": "Description: The key for this object property.",
            "type": "TEXT"
        },		
        {
            "id": "value3",
            "name": "Value 3",
            "description": "Description: The value for this object property.",
            "type": "TEXT"
        },
        {
            "id": "key4",
            "name": "Key 4",
            "description": "Description: The key for this object property.",
            "type": "TEXT"
        },		
        {
            "id": "value4",
            "name": "Value 4",
            "description": "Description: The value for this object property.",
            "type": "TEXT"
        },
        {
            "id": "key5",
            "name": "Key 5",
            "description": "Description: The key for this object property.",
            "type": "TEXT"
        },		
        {
            "id": "value5",
            "name": "Value 5",
            "description": "Description: The value for this object property.",
            "type": "TEXT"
        },
        {
            "id": "key6",
            "name": "Key 6",
            "description": "Description: The key for this object property.",
            "type": "TEXT"
        },		
        {
            "id": "value6",
            "name": "Value 6",
            "description": "Description: The value for this object property.",
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
            "id": "object",
            "name": "Object",
            "description": "Type: List\n\nDescription: This empty object created.",
            "types": ["object"]
        }
    ],

    code(cache) {
        var key1 = this.GetInputValue("key1", cache) || this.GetOptionValue("key1", cache, undefined);
        var key2 = this.GetInputValue("key2", cache) || this.GetOptionValue("key2", cache, undefined);
        var key3 = this.GetInputValue("key3", cache) || this.GetOptionValue("key3", cache, undefined);
        var key4 = this.GetInputValue("key4", cache) || this.GetOptionValue("key4", cache, undefined);
        var key5 = this.GetInputValue("key5", cache) || this.GetOptionValue("key5", cache, undefined);
        var key6 = this.GetInputValue("key6", cache) || this.GetOptionValue("key6", cache, undefined);    

        var value1 = this.GetInputValue("value1", cache);
        if(value1 == undefined){
            value1 = this.GetOptionValue("value1", cache, undefined);
        }  

        var value2 = this.GetInputValue("value2", cache);
        if(value2 == undefined){
            value2 = this.GetOptionValue("value2", cache, undefined);
        }

        var value3 = this.GetInputValue("value3", cache);
        if(value3 == undefined){
            value3 = this.GetOptionValue("value3", cache, undefined);
        }

        var value4 = this.GetInputValue("value4", cache);
        if(value4 == undefined){
            value4 = this.GetOptionValue("value4", cache, undefined);
        }

        var value5 = this.GetInputValue("value5", cache);
        if(value5 == undefined){
            value5 = this.GetOptionValue("value5", cache, undefined);
        }

        var value6 = this.GetInputValue("value6", cache);
        if(value6 == undefined){
            value6 = this.GetOptionValue("value6", cache, undefined);
        }

        const object = {
            [key1]: value1,
            [key2]: value2,
            [key3]: value3,
            [key4]: value4,
            [key5]: value5,
            [key6]: value6
        }         

        for (const [key, value] of Object.entries(object)) {
            if(key == "" || key == undefined || key == "undefined"){
                delete object[key];
            }
        }

        this.StoreOutputValue(object, "object", cache);
        this.RunNextBlock("action", cache);
    }
}