module.exports = {
  name: "Draw Text On Canvas V5",

  description: "Draw text on canvas MOD",

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
      "description": "Image / GIF or canvas output of this block",
      "types": ["object", "text", "unspecified"],
      "required": true
    },
    {
      "id": "_text",
      "name": "Text",
      "description": "Text to draw on canvas",
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
      "name": "X Position",
      "description": "Position in X axis (start in 2 to know location)",
      "types": ["number", "unspecified"]
    },
    {
      "id": "y",
      "name": "Y Position",
      "description": "Position in Y axis (start in 2 to know location)",
      "types": ["number", "unspecified"]
    },
    {
      "id": "opacity",
      "name": "Opacity",
      "description": "Opacity of the text (DEFAULT = 1) (1 = 100%, 0.5 = Half transparent, 0 = Fully transparent) (OPTIONAL)",
      "types": ["number", "unspecified"]
    },


  ],

  options: [
    {
      "id": "align",
      "name": "Alignment",
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
        "stroke": "Stroke",
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

   code(cache) {
      const align = this.GetOptionValue('align', cache) + "";
      const type = this.GetOptionValue("text_type", cache) + "";
      const style = this.GetOptionValue("text_italic", cache) + "";
      const bold = this.GetOptionValue("text_bold", cache) + "";
      const opacity = this.GetInputValue("opacity", cache);
      const path =  this.GetInputValue("path", cache);
      const ctx = path.getContext(`2d`);
      
      const font = this.GetInputValue("font", cache);
      const _text = this.GetInputValue("_text", cache);
      const color2 = this.GetInputValue("color2", cache);
      const size = this.GetInputValue("size", cache);
      const x = this.GetInputValue("x", cache);
      const y = this.GetInputValue("y", cache);

      ctx.font = style + ` ${bold} ` + ` ${size}px ` + font;
      ctx.textAlign = align;
      ctx.globalAlpha = opacity;

      if (type == "fill") {
      ctx.fillStyle = color2;
      ctx.fillText( _text , path.width / x, path.height / y);
     }

      else {
     ctx.strokeStyle = color2;
     ctx.strokeText( _text , path.width / x, path.height / y);
      }
	    
      this.StoreOutputValue(path, "canvas", cache);
      this.RunNextBlock("action", cache);
  }
}