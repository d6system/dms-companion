module.exports = {
  name: "Convert Canvas To Image",

  description: "Converts Canvas To Image Which You Can Send As An Attachment",

  category: ".MOD",

  inputs: [
    {
      "id": "action",
      "name": "Action",
      "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
      "types": ["action"],
      "required": true
    },
    {
      "id": "path",
      "name": "Canvas",
      "description": "The canvas output from other canvas MOD blocks",
      "types": ["object", "text", "unspecified"],
      "required": true
    },
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
    "id": "image",
    "name": "Image",
    "description": "The converted canvas",
    "types": ["object", "unspecified"]
   }
  ],

  code(cache) {
      const Image =  this.GetInputValue("path", cache).toBuffer();
    
      this.StoreOutputValue(Image, "image", cache);
      this.RunNextBlock("action", cache);
  }
}