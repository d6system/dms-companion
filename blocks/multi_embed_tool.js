module.exports = {
    name: "Multi Embed Tool",

    description: "Is a Tool to make a Embed.",

    category: ".MOD",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
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
            "description": "Acceptable Types: Text, Undefined, Null, Object, Boolean, Date, Number, List, Unspecified\n\nDescription: The text 1 to merge with the source text. Supports everything (converts to text automatically). (OPTIONAL)",
            "types": ["text", "undefined", "null", "object", "boolean", "date", "number", "list", "unspecified"]
        },
        {
            "id": "text5",
            "name": "Text 5",
            "description": "Acceptable Types: Text, Undefined, Null, Object, Boolean, Date, Number, List, Unspecified\n\nDescription: The text 2 to merge with the source text. Supports everything (converts to text automatically). (OPTIONAL)",
            "types": ["text", "undefined", "null", "object", "boolean", "date", "number", "list", "unspecified"]
        },
        {
            "id": "text6",
            "name": "Text 6",
            "description": "Acceptable Types: Text, Undefined, Null, Object, Boolean, Date, Number, List, Unspecified\n\nDescription: The text 3 to merge with the source text. Supports everything (converts to text automatically). (OPTIONAL)",
            "types": ["text", "undefined", "null", "object", "boolean", "date", "number", "list", "unspecified"]
        },
    ],

    options: [
        {
            "id": "color",
            "name": "Color",
            "description": "Description: The color to set.",
            "type": "COLOR"
        },
        {
            "id": "mergedtext1",
            "name": "Thumbnail URL",
            "description": "Description: The source text to add the Text. Use the folowing codes to implement the Text: \"${text1}\", \"${text2}\", \"${text3}\", \"$text4}\", \"${text5}\", \"${text6}\",\".",
            "type": "TEXT"
        },
        {
            "id": "mergedtext2",
            "name": "Author Icon URL",
            "description": "Description: The source text to add the Text. Use the folowing codes to implement the Text: \"${text1}\", \"${text2}\", \"${text3}\", \"$text4}\", \"${text5}\", \"${text6}\",\".",
            "type": "TEXT"
        },
        {
            "id": "mergedtext3",
            "name": "Author Name",
            "description": "Description: The source text to add the Text. Use the folowing codes to implement the Text: \"${text1}\", \"${text2}\", \"${text3}\", \"$text4}\", \"${text5}\", \"${text6}\",\".",
            "type": "TEXT"
        },
        {
            "id": "mergedtext4",
            "name": "Author URL",
            "description": "Description: The source text to add the Text. Use the folowing codes to implement the Text: \"${text1}\", \"${text2}\", \"${text3}\", \"$text4}\", \"${text5}\", \"${text6}\",\".",
            "type": "TEXT"
        },
        {
            "id": "mergedtext5",
            "name": "Title",
            "description": "Description: The source text to add the Text. Use the folowing codes to implement the Text: \"${text1}\", \"${text2}\", \"${text3}\", \"$text4}\", \"${text5}\", \"${text6}\",\".",
            "type": "TEXT"
        },
        {
            "id": "mergedtext6",
            "name": "URL",
            "description": "Description: The source text to add the Text. Use the folowing codes to implement the Text: \"${text1}\", \"${text2}\", \"${text3}\", \"$text4}\", \"${text5}\", \"${text6}\",\".",
            "type": "TEXT"
        },
        {
            "id": "mergedtext7",
            "name": "Description",
            "description": "Description: The source text to add the Text. Use the folowing codes to implement the Text: \"${text1}\", \"${text2}\", \"${text3}\", \"$text4}\", \"${text5}\", \"${text6}\",\".",
            "type": "TEXT"
        },
        {
            "id": "mergedtext8",
            "name": "Image URL",
            "description": "Description: The source text to add the Text. Use the folowing codes to implement the Text: \"${text1}\", \"${text2}\", \"${text3}\", \"$text4}\", \"${text5}\", \"${text6}\",\".",
            "type": "TEXT"
        },
        {
            "id": "mergedtext9",
            "name": "Footer Icon URL",
            "description": "Description: The source text to add the Text. Use the folowing codes to implement the Text: \"${text1}\", \"${text2}\", \"${text3}\", \"$text4}\", \"${text5}\", \"${text6}\",\".",
            "type": "TEXT"
        },
        {
            "id": "mergedtext10",
            "name": "Footer Text",
            "description": "Description: The source text to add the Text. Use the folowing codes to implement the Text: \"${text1}\", \"${text2}\", \"${text3}\", \"$text4}\", \"${text5}\", \"${text6}\",\".",
            "type": "TEXT"
        },
        {
            "id": "boolean_type",
            "name": "Timestamp (Date)",
            "description": "Description: The type of boolean to set.",
            "type": "SELECT",
            "options": {
                "true": "True/Yes",
                "false": "False/No"
            }
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
            "id": "color",
            "name": "Color",
            "description": "Type: Text\n\nDescription: The color.",
            "types": ["text"]
        },
        {
            "id": "mergedtext1",
            "name": "Thumbnail URL",
            "description": "Type: Text\n\nDescription: The text.",
            "types": ["text"]
        },
        {
            "id": "mergedtext2",
            "name": "Author Icon URL",
            "description": "Type: Text\n\nDescription: The text.",
            "types": ["text"]
        },
        {
            "id": "mergedtext3",
            "name": "Author Name",
            "description": "Type: Text\n\nDescription: The text.",
            "types": ["text"]
        },
        {
            "id": "mergedtext4",
            "name": "Author URL",
            "description": "Type: Text\n\nDescription: The text.",
            "types": ["text"]
        },
        {
            "id": "mergedtext5",
            "name": "Title",
            "description": "Type: Text\n\nDescription: The text.",
            "types": ["text"]
        },
        {
            "id": "mergedtext6",
            "name": "URL",
            "description": "Type: Text\n\nDescription: The text.",
            "types": ["text"]
        },
        {
            "id": "mergedtext7",
            "name": "Description",
            "description": "Type: Text\n\nDescription: The text.",
            "types": ["text"]
        },
        {
            "id": "mergedtext8",
            "name": "Image URL",
            "description": "Type: Text\n\nDescription: The text.",
            "types": ["text"]
        },
        {
            "id": "mergedtext9",
            "name": "Footer Icon URL",
            "description": "Type: Text\n\nDescription: The text.",
            "types": ["text"]
        },
        {
            "id": "mergedtext10",
            "name": "Footer Text",
            "description": "Type: Text\n\nDescription: The text.",
            "types": ["text"]
        },
        {
            "id": "boolean",
            "name": "Timestamp (Date)",
            "description": "Type: Boolean\n\nDescription: The boolean.",
            "types": ["boolean"]
        }
    ],

    code(cache) {
        const text1 = this.GetInputValue("text1", cache) + "";
        const text2 = this.GetInputValue("text2", cache) + "";
        const text3 = this.GetInputValue("text3", cache) + "";
        const text4 = this.GetInputValue("text4", cache) + "";
        const text5 = this.GetInputValue("text5", cache) + "";
        const text6 = this.GetInputValue("text6", cache) + "";
        var color = this.GetOptionValue("color", cache);

        const __text1 = this.GetOptionValue("mergedtext1", cache) + "";
        const __text2 = this.GetOptionValue("mergedtext2", cache) + "";
        const __text3 = this.GetOptionValue("mergedtext3", cache) + "";
        const __text4 = this.GetOptionValue("mergedtext4", cache) + "";
        const __text5 = this.GetOptionValue("mergedtext5", cache) + "";
        const __text6 = this.GetOptionValue("mergedtext6", cache) + "";
        const __text7 = this.GetOptionValue("mergedtext7", cache) + "";
        const __text8 = this.GetOptionValue("mergedtext8", cache) + "";
        const __text9 = this.GetOptionValue("mergedtext9", cache) + "";
        const __text10 = this.GetOptionValue("mergedtext10", cache) + "";

        if(color == '') color = "#000000"
        this.StoreOutputValue(color, "color", cache);

        this.StoreOutputValue(eval("`" + __text1.replace(/`/g, "\\`") + "`"), "mergedtext1", cache);
        this.StoreOutputValue(eval("`" + __text2.replace(/`/g, "\\`") + "`"), "mergedtext2", cache);
        this.StoreOutputValue(eval("`" + __text3.replace(/`/g, "\\`") + "`"), "mergedtext3", cache);
        this.StoreOutputValue(eval("`" + __text4.replace(/`/g, "\\`") + "`"), "mergedtext4", cache);
        this.StoreOutputValue(eval("`" + __text5.replace(/`/g, "\\`") + "`"), "mergedtext5", cache);
        this.StoreOutputValue(eval("`" + __text6.replace(/`/g, "\\`") + "`"), "mergedtext6", cache);
        this.StoreOutputValue(eval("`" + __text7.replace(/`/g, "\\`") + "`"), "mergedtext7", cache);
        this.StoreOutputValue(eval("`" + __text8.replace(/`/g, "\\`") + "`"), "mergedtext8", cache);
        this.StoreOutputValue(eval("`" + __text9.replace(/`/g, "\\`") + "`"), "mergedtext9", cache);
        this.StoreOutputValue(eval("`" + __text10.replace(/`/g, "\\`") + "`"), "mergedtext10", cache);

        this.StoreOutputValue(this.GetOptionValue("boolean_type", cache) == "true", "boolean", cache, "inputBlock");
        

        this.RunNextBlock("action", cache);
    }
}