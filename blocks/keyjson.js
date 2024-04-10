module.exports = {
    name: "Find Key In Json",

    description: "Searches for a key in a json, then outputs it.",

    category: "Utilities",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "json_content",
            "name": "Input",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The JSON to look in for.",
            "types": ["text", "unspecified"],
            "required": true
        },
        {
            "id": "keynoteinput",
            "name": "Key To Search",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The key to look in the JSON for.",
            "types": ["text"],
            "required": false
        }
    ],

    options: [
        {
            "id": "keynote",
            "name": "Key To Search",
            "description": "Description: The key to search.",
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
            "id": "OUT",
            "name": "Output",
            "description": "Type: Text\n\nDescription: The output.",
            "types": ["text"]
        }
    ],

    async code(cache) {
        if (this.GetOptionValue("keynote", cache) == undefined){
            tempJson = await this.GetInputValue("json_content", cache);
            ParsedJson = await JSON.stringify(tempJson)
            PParsed = await JSON.parse(ParsedJson)
            var key = this.GetInputValue("keynoteinput", cache);
            result = await PParsed[key];
            this.StoreOutputValue(result, "OUT", cache);
            this.RunNextBlock("action", cache);
        }else{
            tempJson = await this.GetInputValue("json_content", cache);
            ParsedJson = await JSON.stringify(tempJson)
            PParsed = await JSON.parse(ParsedJson)
            var key = this.GetOptionValue("keynote", cache);
            result = await PParsed[key];
            this.StoreOutputValue(result, "OUT", cache);
            this.RunNextBlock("action", cache);
        }
    }
}