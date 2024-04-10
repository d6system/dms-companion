module.exports = {
    name: "Read File",

    description: "Gets the file content.",

    category: "File Management",

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
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The path of the file (e.g. \"E:\\myFolder\\data.json\").",
            "types": ["text", "unspecified"]
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
        }
    ],

    outputs: [
        {
            "id": "action",
            "name": "File Found",
            "description": "Type: Action\n\nDescription: Executes the following blocks if the file is found.",
            "types": ["action"]
        },
        {
            "id": "action2",
            "name": "File Not Found",
            "description": "Type: Action\n\nDescription: Executes the following blocks if the file is not found",
            "types": ["action"]
        },
        {
            "id": "content",
            "name": "File Content",
            "description": "Type: Unspecified\n\nDescription: The file content.",
            "types": ["unspecified"]
        }
    ],

    code(cache) {
        const file_path = this.GetInputValue("file_path", cache) + "";
        const conversion_type = this.GetOptionValue("conversion_type", cache) + "";

        const fs = require("fs");

        if (fs.existsSync(file_path)) {
            let content = fs.readFileSync(file_path, "utf8");
            if(conversion_type == "json") content = JSON.parse(content);
            this.StoreOutputValue(content, "content", cache);
            this.RunNextBlock("action", cache);
        }else{
            this.RunNextBlock("action2", cache);
        }
        

    }
}