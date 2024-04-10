module.exports = {
  name: "Create Canvas V4",

  description: "Create canvas MOD",

  category: ".MOD",

  inputs: [
    {
      "id": "action",
      "name": "Action",
      "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
      "types": ["action"]
    },
    {
      "id": "path",
      "name": "Background",
      "description": "Image for the canvas background",
      "types": ["text", "object", "unspecified"],
      "required": true
    },
    {
      "id": "width",
      "name": "BG Width",
      "description": "Witdh of your canvas. (700 recommended)",
      "types": ["number", "unspecified"],
      "required": true
    },
    {
      "id": "height",
      "name": "BG Height",
      "description": "Height of your canvas. (250 recommended)",
      "types": ["number", "unspecified"],
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
      "id": "x2",
      "name": "Image X",
      "description": "Position in Y axis (in px)",
      "types": ["number", "unspecified"]
    },
    {
      "id": "y2",
      "name": "Image Y",
      "description": "Position in Y axis (in px)",
      "types": ["number", "unspecified"]
    },
    {
      "id": "w1",
      "name": "Image Width",
      "description": "Image witdh (in px)",
      "types": ["number", "unspecified"]
    },
    {
      "id": "h1",
      "name": "Image Height",
      "description": "Image height (in px)",
      "types": ["number", "unspecified"]
    },
    {
      "id": "opacity1",
      "name": "Opacity Image",
      "description": "Opacity of the Image (DEFAULT = 1) (1 = 100%, 0.5 = Half transparent, 0 = Fully transparent) (OPTIONAL)",
      "types": ["number", "unspecified"]
    },
    {
      "id": "_text",
      "name": "Text",
      "description": "above text idk",
      "types": ["text", "unspecified"]
    },
    {
      "id": "font",
      "name": "Font",
      "description": "Font for the text",
      "types": ["text", "unspecified"]
    },
    {
      "id": "color2",
      "name": "Text color",
      "description": "Text Color",
     "types": ["text", "number", "unspecified"]
    },
    {
      "id": "size",
      "name": "Font Size",
      "description": "Size of the font (in px)",
      "types": ["number", "unspecified"]
    },

    {
      "id": "x",
      "name": "Text X",
      "description": "Position in X axis (in px)",
      "types": ["number", "unspecified"]
    },
    {
      "id": "y",
      "name": "Text Y",
      "description": "Position in Y axis (in px)",
      "types": ["number", "unspecified"]
    },
    {
      "id": "opacity2",
      "name": "Opacity Text",
      "description": "Opacity of the text (DEFAULT = 1) (1 = 100%, 0.5 = Half transparent, 0 = Fully transparent) (OPTIONAL)",
      "types": ["number", "unspecified"]
    },


  ],

  options: [
    {
      "id": "align",
      "name": "Text Alignment",
      "description": "Alignment type for text",
      "type": "SELECT",
      "options": {
        "left": "Left",
        "right": "Right",
        "center": "Center",
        "end": "End",
        "start": "Start"
      }
    },
    {
      "id": "text_type",
      "name": "Text Type",
      "description": "The type of text",
      "type": "SELECT",
      "options": {
        "fill": "Fill",
        "stroke": "Stroke"
      }
    },
    {
      "id": "text_italic",
      "name": "Italic?",
      "description": "If font is italic",
      "type": "SELECT",
      "options": {
        "normal": "No",
        "italic": "Yes",
      }
    },
    {
      "id": "text_bold",
      "name": "Bold?",
      "description": "If font is bold",
      "type": "SELECT",
      "options": {
        "normal": "No",
        "bold": "Yes",
      }
    },
    {
      "id": "NOTES",
      "name": `NOTE`,
      "description": "Sometimes there is no italic/bold for a font which causes it to fallback to default font",
      "type": "SELECT",
      "options": {
        "butt": "HOVER MOUSE",
        
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
      "id": "canvas",
      "name": "Canvas",
      "description": "The created canvas",
      "types": ["object", "unspecified"]
   }
  ],

  async code(cache) {
      const Discord = require('discord.js')
      const Canvas = await this.require('canvas');

      const align = this.GetOptionValue('align', cache) + "";
      const type = this.GetOptionValue("text_type", cache) + "";
      const style = this.GetOptionValue("text_italic", cache) + "";
      const bold = this.GetOptionValue("text_bold", cache) + "";
      const opacity1 = this.GetInputValue("opacity1", cache);
      const opacity2 = this.GetInputValue("opacity2", cache);

      const path = this.GetInputValue("path", cache);
      const Width = this.GetInputValue("width", cache);
      const Height = this.GetInputValue("height", cache);
     
      const image = await Canvas.loadImage(this.GetInputValue("image",cache));
      const x2 = this.GetInputValue("x2", cache);
      const y2 = this.GetInputValue("y2", cache);
      const w1 = this.GetInputValue("w1", cache);
      const h1 = this.GetInputValue("h1", cache);

      const font = this.GetInputValue("font", cache);
      const _text = this.GetInputValue("_text", cache);
      const color2 = this.GetInputValue("color2", cache);
      const size = this.GetInputValue("size", cache);
      const x = this.GetInputValue("x", cache);
      const y = this.GetInputValue("y", cache);

      const canvas = Canvas.createCanvas(Width, Height);
      const ctx = canvas.getContext(`2d`);
      const background = await Canvas.loadImage(path);
      
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
      ctx.rect(0, 0, canvas.width, canvas.height);

      ctx.globalAlpha = opacity1;
      ctx.drawImage(image, x2, y2 ,w1 ,h1);

      ctx.font = style + ` ${bold} ` + ` ${size}px ` + font;
      console.log(ctx.font);
      ctx.textAlign = align;  
      opacity2 ? ctx.globalAlpha = opacity2 : ctx.globalAlpha = 1;
      
      if (type == "fill") {   
        ctx.fillStyle = color2;
        ctx.fillText( _text , canvas.width / x, canvas.height / y);
        }
  
      else {
        ctx.strokeStyle = color2;
        ctx.strokeText( _text , canvas.width / x, canvas.height / y);
      }

      this.StoreOutputValue(canvas, "canvas", cache);
      this.RunNextBlock("action", cache);
  }
}