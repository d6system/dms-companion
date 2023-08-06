module.exports = {
    name: "Write File",

    description: "Writes a content to the file, replacing its content if exists. If the file does not exist, this will create it.",

    category: ".MOD",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "file_path",
            "name": "File Path",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The path of the file (e.g. \"E:\\myFolder\\config.txt\").",
            "types": ["text", "unspecified"],
            "required": true
        },
        {
            "id": "content",
            "name": "Content",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Object, Boolean, Date, Number, Text, List\n\nDescription: The content to write to the file. Default: Nothing. (OPTIONAL)",
            "types": ["unspecified", "undefined", "null", "object", "boolean", "date", "number", "text", "list"]
        }
    ],

    options: [
        {
            "id": "conversion_type",
            "name": "Conversion Type",
            "description": "Description: The type of conversion for the file.",
            "type": "SELECT",
            "options": {
                "text": "Text",
                "json": "JSON (Object or List)"
            }
        },
        {
            "id": "write_type",
            "name": "Write Type",
            "description": "Description: The type of conversion for the file.",
            "type": "SELECT",
            "options": {
                "ow": "Overwrite",
                "append": "Append"
            }
        }
    ],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        }
    ],

    code(cache) {
        const file_path = this.GetInputValue("file_path", cache) + "";
        let content = this.GetInputValue("content", cache, false, "") + "\n";
        const conversion_type = this.GetOptionValue("conversion_type", cache) + "";
        const type = this.GetOptionValue("write_type", cache);

        const fs = require("fs");
        const path = require("path");

        if(conversion_type == "json") content = JSON.stringify(content);

        if(type == "ow")
        {
            fs.mkdirSync(path.dirname(file_path), {recursive: true});
            fs.writeFileSync(file_path, content);
        }
        else if(type == "append")
        {
            fs.appendFile(file_path, content, {encoding:'utf8'}, function(err) { if(err) { console.log(err); }}); 
        }

        this.RunNextBlock("action", cache);
    }
}