module.exports = {
    name: "Convert Text to Color",

    description: "Dynamically converts a text to a color. It will try to get as close as possible to the color you want. Made by @XCraftTM",

    category: "Extras",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "text",
            "name": "Text (Color Name)",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: This has a pretty high range! You can use any color names, anything that sounds like a color and it will get as close as possible to the color you want.",
            "types": ["text", "unspecified"]
        }
    ],

    options: [],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
          "id": "erroraction",
          "name": "Action (Error)",
          "description": "Type: Action\n\nDescription: Executes the following blocks when an error occurs.",
          "types": ["action"]
        },
        {
            "id": "color",
            "name": "Color",
            "description": "Type: Text\n\nDescription: The Color that was generated!",
            "types": ["text", "unspecified"]
        },
        {
            "id": "errormsg",
            "name": "Error Message",
            "description": "Type: Text\n\nDescription: The error message if an error occurs.",
            "types": ["text", "unspecified"]
        }
    ],

    async code(cache) {
      const text = this.GetInputValue("text", cache);
      const stc = await this.require("string-to-color");
      try {
        const color = await stc(text);
        this.StoreOutputValue(color, "color", cache);
        this.RunNextBlock("action", cache);
      } catch (e) {
        console.error(e);
        this.StoreOutputValue(e.message, "errormsg", cache);
        this.RunNextBlock("erroraction", cache);
      }
    }
}