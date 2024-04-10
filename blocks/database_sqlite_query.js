module.exports = {
    name: "Database SQLite Query",

    description: "",

    category: "Database Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "file",
            "name": "File",
            "description": "Type: Number\n\nDescription: Port where the server gets Deployed!\nDefaults to '3000'. Ports under 1000 are reserved for root (Linux) thats not recommend!\nWill default to 3000!",
            "types": ["text"]
        },
        {
            "id": "query",
            "name": "SQL-Query",
            "description": "Type: Number\n\nDescription: Port where the server gets Deployed!\nDefaults to '3000'. Ports under 1000 are reserved for root (Linux) thats not recommend!\nWill default to 3000!",
            "types": ["text"]
        },
        {
            "id": "text1",
            "name": "Text 1",
            "description": "Acceptable Types: Text, Undefined, Null, Object, Boolean, Date, Number, List, Unspecified\n\nDescription: The text 1 to merge with the source text. Supports everything (converts to text automatically). (OPTIONAL)",
            "types": ["text", "undefined", "null", "object", "boolean", "date", "number", "list", "unspecified"]
        },
        {
            "id": "text2",
            "name": "Text 2",
            "description": "Acceptable Types: Text, Undefined, Null, Object, Boolean, Date, Number, List, Unspecified\n\nDescription: The text 2 to merge with the source text. Supports everything (converts to text automatically). (OPTIONAL)",
            "types": ["text", "undefined", "null", "object", "boolean", "date", "number", "list", "unspecified"]
        },
        {
            "id": "text3",
            "name": "Text 3",
            "description": "Acceptable Types: Text, Undefined, Null, Object, Boolean, Date, Number, List, Unspecified\n\nDescription: The text 3 to merge with the source text. Supports everything (converts to text automatically). (OPTIONAL)",
            "types": ["text", "undefined", "null", "object", "boolean", "date", "number", "list", "unspecified"]
        },
        {
            "id": "text4",
            "name": "Text 4",
            "description": "Acceptable Types: Text, Undefined, Null, Object, Boolean, Date, Number, List, Unspecified\n\nDescription: The text 4 to merge with the source text. Supports everything (converts to text automatically). (OPTIONAL)",
            "types": ["text", "undefined", "null", "object", "boolean", "date", "number", "list", "unspecified"]
        },
        {
            "id": "text5",
            "name": "Text 5",
            "description": "Acceptable Types: Text, Undefined, Null, Object, Boolean, Date, Number, List, Unspecified\n\nDescription: The text 5 to merge with the source text. Supports everything (converts to text automatically). (OPTIONAL)",
            "types": ["text", "undefined", "null", "object", "boolean", "date", "number", "list", "unspecified"]
        }	
    ],

    options: [
        {
            "id": "file",
            "name": "File",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The number of the specific workspace. Starts at \"1\". Only use this input if you selected the option \"Specific Workspace\" in \"Variable Restriction Type\". (OPTIONAL)",
            "type": "TEXT"
        },
        {
            "id": "query",
            "name": "SQL-Query",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The number of the specific workspace. Starts at \"1\". Only use this input if you selected the option \"Specific Workspace\" in \"Variable Restriction Type\". (OPTIONAL)",
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
            "id": "result",
            "name": "Result",
            "description": "Type: Unspecified\n\nDescription: The information obtained from the bot.",
            "types": ["unspecified"]
        }
    ],

async code(cache) {
    const sqlite3 = await this.require('sqlite3');
	const { open } = await this.require('sqlite');

    const text1 = this.GetInputValue("text1", cache) + "";
    const text2 = this.GetInputValue("text2", cache) + "";
    const text3 = this.GetInputValue("text3", cache) + "";
    const text4 = this.GetInputValue("text4", cache) + "";
    const text5 = this.GetInputValue("text5", cache) + "";

    let file = this.GetInputValue("file", cache);
    var query = this.GetInputValue("query", cache);

    if (!file) {
        file = this.GetOptionValue("file", cache);
    }

    if (!query) {
        query = this.GetOptionValue("query", cache);
    }

    const querysend = await eval("`" + query.replace(/`/g, "\\`") + "`");


let result;

          const db = await open({
                filename: file,
                driver: sqlite3.Database,
                mode: sqlite3.OPEN_READWRITE,
            }).then(async (db) => {
                result = await db.all(querysend)
                await db.close();
            })
            

        this.StoreOutputValue(result, "result", cache);
        this.RunNextBlock("action", cache);       
    }
}