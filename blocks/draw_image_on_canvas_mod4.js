module.exports = {
  name: "Draw Image On Canvas",

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
      "id": "path",
      "name": "Canvas",
      "description": "The canvas output from other canvas MOD blocks",
      "types": ["object", "text", "unspecified"],
      "required": true
    },
    {
      "id": "image",
      "name": "Image",
      "description": "The image you want to put in",
      "types": ["text", "object", "unspecified"],
      "required": true
    },
    {
      "id": "x",
      "name": "X Position",
      "description": "Position in Y axis (in px)",
      "types": ["number", "unspecified"]
    },
    {
      "id": "y",
      "name": "Y Position",
      "description": "Position in Y axis (in px)",
      "types": ["number", "unspecified"]
    },
    {
      "id": "w",
      "name": "Width",
      "description": "Image witdh (in px)",
      "types": ["number", "unspecified"]
    },
    {
      "id": "h",
      "name": "Height",
      "description": "Image height (in px)",
      "types": ["number", "unspecified"]
    },
    {
      "id": "opacity",
      "name": "Opacity",
      "description": "Opacity of the Image (DEFAULT = 1) (1 = 100%, 0.5 = Half transparent, 0 = Fully transparent) (OPTIONAL)",
      "types": ["number", "unspecified"]
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
      "id": "canvas",
      "name": "Canvas",
      "description": "The created canvas",
      "types": ["object", "unspecified"]
   }
  ],

  async code(cache) {
      const Canvas = await this.require('canvas');
      const path = this.GetInputValue("path", cache);
      const opacity = this.GetInputValue("opacity", cache);
      const ctx = path.getContext(`2d`);

      const image = await Canvas.loadImage(this.GetInputValue("image",cache));
      const x = this.GetInputValue("x", cache);
      const y = this.GetInputValue("y", cache);
      const w = this.GetInputValue("w", cache);
      const h = this.GetInputValue("h", cache);
      
 
      ctx.globalAlpha = opacity;
      ctx.drawImage(image, x, y ,w ,h);

      this.StoreOutputValue(path, "canvas", cache);
      this.RunNextBlock("action", cache);
  }
}