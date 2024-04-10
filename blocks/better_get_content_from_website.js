module.exports = {
    name: "Better Get Content From Website",

    description: "Gets the content from a website.\nBetter Block can return Text or JSON (Object or List)",

    category: ".artemsnite",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "url",
            "name": "URL",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The URL of the website to get its content.",
            "types": ["text", "unspecified"],
            "required": true
        }
    ],

    options: [
        {
            "id": "conversion_type",
            "name": "Conversion Type",
            "description": "Description: The type of conversion for the content received.",
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
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
            "id": "content",
            "name": "Content",
            "description": "Type: Text\n\nDescription: The content obtained.",
            "types": ["text", "list", "object"]
        }
    ],

    async code(cache) {
        const url = this.GetInputValue("url", cache) + "";
        const conversion_type = this.GetOptionValue("conversion_type", cache) + "";

        const fetch = await this.require("node-fetch");
        let content = await fetch(url).then(res => res.text());
        if(conversion_type == "json") content = JSON.parse(content);

        this.StoreOutputValue(content, "content", cache);
        this.RunNextBlock("action", cache);
    }
}