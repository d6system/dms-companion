module.exports = {
  name: "Crop Image To Circular",

  description: "Create canvas MOD",

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
      "id": "image",
      "name": "Source",
      "description": "The path or url of the image/gif",
      "types": ["text", "object", "unspecified"],
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
      "description": "The transformed image",
      "types": ["text", "object", "unspecified"]
   }
  ],

  async code(cache) {
      const Discord = require('discord.js')
      const Canvas = await this.require('canvas');
      const path = this.GetInputValue("image", cache);
 
      
      const canvas = Canvas.createCanvas(200, 200);
      const ctx = canvas.getContext(`2d`);
      const background = await Canvas.loadImage(path);
      
      ctx.beginPath();
	    ctx.arc(100, 100, 100, 0, Math.PI * 2, true);
	    ctx.closePath();
    	ctx.clip();

      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
      ctx.rect(0, 0, canvas.width, canvas.height);

      const buffer = canvas.toBuffer('image/png');

      this.StoreOutputValue(buffer, "image", cache);
      this.RunNextBlock("action", cache);
  }
}