module.exports = {
    name: "Wrap Text",

    description: "Wrap words to a specified length.",

    category: ".MOD",

    inputs: [
        {
            id: "action",
            name: "Action",
            description: "Acceptable Types: Action\n\nDescription: Executes this block.",
            types: ["action"]
        },
        {
            id: "text",
            name: "Text",
            description: "Acceptable Types: Text\n\nDescription: The Text you want to Wrap.",
            types: ["text", "unspecified"]
        },
        {
            id: "width",
            name: "Width",
            description: "Acceptable Types: Number\n\nDescription: The width of the text before wrapping to a new line..",
            types: ["Number", "unspecified"]
        },
        {
            id: "indent",
            name: "Indent",
            description: "Acceptable Types: Text\n\nDescription: The string to use at the beginning of each line. Default: Two Spaces",
            types: ["text", "unspecified"]
        },
        {
            id: "newline",
            name: "New Line",
            description: "Acceptable Types: Text\n\nDescription: The string to use at the end of each line.",
            types: ["text", "unspecified"]
        },
        {
            id: "cut",
            name: "Cut Words",
            description: "Acceptable Types: Boolean\n\nDescription: Break a word between any two letters when the word is longer than the specified width.",
            types: ["boolean", "unspecified"]
        }
    ],

    options: [
        {
        id: "text",
        name: "Text",
        description: "Acceptable Types: Text\n\nDescription: The Text you want to Wrap.",
        type: "TEXT"
        },
        {
            id: "width",
            name: "Width",
            description: "Acceptable Types: Number\n\nDescription: The width of the text before wrapping to a new line.",
            type: "NUMBER"
        },
        {
            id: "indent",
            name: "Indent",
            description: "Acceptable Types: Text\n\nDescription: The string to use at the beginning of each line.",
            type: "TEXT"
        },
        {
            id: "newline",
            name: "New Line",
            description: "Acceptable Types: Text\n\nDescription: The string to use at the end of each line.",
            type: "TEXT"
        },
        {
            id: "cut",
            name: "Cut Words",
            description: "Description: Break a word between any two letters when the word is longer than the specified width.",
            type: "checkbox",
            defaultValue: false
        }
    ],

    outputs: [
        {
            id: "action",
            name: "Action",
            description: "Type: Action\n\nDescription: Executes the following block.",
            types: ["action"]
        },
        {
            id: "wrap",
            name: "New Text",
            description: "Type: List, Unspecified\n\nDescription: Wrapped Text.",
            types: ["text", "unspecified"]
        }

    ],

   async code(cache) {
    const wrap = await this.require("word-wrap")    
    const text = this.GetInputValue("text", cache) || this.GetOptionValue("text", cache);
    const cut = this.GetInputValue("cut", cache) || this.GetOptionValue("cut", cache);
    var width = parseInt(this.GetInputValue("width", cache)) || this.GetOptionValue("width", cache);
    var indent = this.GetInputValue("indent", cache) + "";
    if(indent == "undefined"){
        indent = this.GetOptionValue("indent", cache) + "" || '';
    }    
    var newline = this.GetInputValue("newline", cache) + "\n";
    if(newline == "undefined\n"){
        newline = this.GetOptionValue("newline", cache) + "\n";
    }
    
    if(isNaN(width) || width == 0){
        width = 50;
    }

    result = wrap(text, {
        width: width,
        indent: indent,
        newline: newline+indent,
        cut: cut
    });

    this.StoreOutputValue(result, "wrap", cache)        
    this.RunNextBlock("action", cache)
   }
}