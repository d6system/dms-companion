module.exports = {
    name: "List to Table",

    description: "Create a Table with Lists",

    category: ".MOD",

    inputs: [
        {
            id: "action",
            name: "Action",
            description: "Acceptable Types: Action\n\nDescription: Executes this block.",
            types: ["action"]
        },
        {
            id: "list",
            name: "List",
            description: "Acceptable Types: List\n\nDescription: The lists/objects you want to transform into a Table.",
            types: ["list", "unspecified"]
        },
        {
            id: "separator",
            name: "Separator",
            description: "Acceptable Types: Text\n\nDescription: The separations between items. (Optional)",
            types: ["text", "unspecified"]
        },
        {
            id: "align",
            name: "Right Aligment",
            description: "Acceptable Types: Boolean\n\nDescription: Set your text to the right.\nDefault: False.",
            types: ["boolean", "unspecified"]
        }
    ],

    options: [
        {
            id: "separator",
            name: "Separator",
            description: "Description: The separations between items. (Optional)",
            type: "TEXT"
        },
        {
            id: "align",
            name: "Right Aligment",
            description: "Description: Set your text to the right.\nDefault: False.",
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
            id: "table",
            name: "Table",
            description: "Type: Text, Unspecified\n\nDescription: The table made with your items.",
            types: ["text", "unspecified"]
        }

    ],

   async code(cache) {
    const asTable  = await this.require("as-table") 
    const list = this.GetInputValue("list", cache); 
    const separator = this.GetInputValue("separator", cache) || this.GetOptionValue("separator", cache);   
    const align = this.GetInputValue("align", cache) || this.GetOptionValue("align", cache);

    const table = asTable.configure ({ delimiter: " "+separator+" ", right: align }) (list);

    this.StoreOutputValue(table, "table", cache)        
    this.RunNextBlock("action", cache)
   }
}