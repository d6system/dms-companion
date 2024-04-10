module.exports = {
    name: "Create Text Block",
    description: "Creates a text block on a canvas.\n\nBy: @T-45",
    
    category: "Canvas Stuff",
    
    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
            "id": "text",
            "name": "Text",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The text block text.",
            "types": ["text", "unspecified"],
            "required:": true
        },
        {
            "id": "canvas",
            "name": "Canvas",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The created canvas to add the text block to.\n\n(OPTIONAL)",
            "types": ["object", "unspecified"],
        },
        {
            "id": "xposition",
            "name": "X Position",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The x position of the canvas where the text block should start.\n\nDefault: 100",
            "types": ["number", "unspecified"],
        },
        {
            "id": "yposition",
            "name": "Y Position",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The y position of the canvas where the text block should start.\n\nDefault: 100",
            "types": ["number", "unspecified"],
        },
        {
            "id": "width",
            "name": "Width",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The width of the text block.\n\nDefault: 800",
            "types": ["number", "unspecified"],
        },
        {
            "id": "height",
            "name": "Height",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The height of the text block.\n\nDefault: 800",
            "types": ["number", "unspecified"],
        },
        {
            "id": "color",
            "name": "Color",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: Set the color of the text block.\n\nDefault: #fff",
            "types": ["text", "unspecified"],
        },
        {
            "id": "fontFamily",
            "name": "Font Family",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: Set the font family of the text block.\n\nDefault: arial",
            "types": ["text", "unspecified"],
        },
        {
            "id": "fontSize",
            "name": "Font Size",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: Set the font size in pixels.\n\nDefault: 16",
            "types": ["number", "unspecified"],
        },
        {
            "id": "lineHeight",
            "name": "Line Height",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: Set the text line height in pixels.\n\nDefault: 24",
            "types": ["number", "unspecified"],
        },
        {
            "id": "padding",
            "name": "Padding",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The padding around the text box in pixels.\n\nDefault: 0",
            "types": ["number", "unspecified"],
        },
        {
            "id": "backgroundColor",
            "name": "Background Color",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: Set a background color for the text block.\n\nDefault: Empty/Transparent\n\nKeep it empty if you want it to be transparent!",
            "types": ["text", "unspecified"],
        },
        {
            "id": "weight",
            "name": "Weight",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: Set the font weight.\n\nDefault: normal",
            "types": ["text", "unspecified"],
        },
        {
            "id": "overflow",
            "name": "Overflow",
            "description": "Acceptable Types: Boolean, Unspecified\n\nDescription: Should the package overflow lines that do not fit in the text block.\n\nDefault: True",
            "types": ["boolean", "unspecified"],
        },
        {
            "id": "ellipsis",
            "name": "Ellipsis",
            "description": "Acceptable Types: Boolean, Unspecified\n\nDescription: If overflow is off, should the last word of the text block have an ellipsis?\n\nDefault: False",
            "types": ["boolean", "unspecified"],
        },
    ],
    
    options: [
        {
            "id": "text",
            "name": "Text",
            "description": "Description: The text block text.",
            "type": "TEXT"
        },
        {
            "id": "xposition",
            "name": "X Position",
            "description": "Description: The x position of the canvas where the text block should start.\n\nDefault: 100",
            "type": "NUMBER",
        },
        {
            "id": "yposition",
            "name": "Y Position",
            "description": "Description: The y position of the canvas where the text block should start.\n\nDefault: 100",
            "type": "NUMBER",
        },
        {
            "id": "width",
            "name": "Width",
            "description": "Description: The width of the text block.\n\nDefault: 800",
            "type": "NUMBER",
        },
        {
            "id": "height",
            "name": "Height",
            "description": "Description: The height of the text block.\n\nDefault: 800",
            "type": "NUMBER",
        },
        {
            "id": "color",
            "name": "Color",
            "description": "Description: Set the color of the text block.",
            "type": "COLOR",
        },
        {
            "id": "fontFamily",
            "name": "Font Family",
            "description": "Description: Set the font family of the text block.",
            "type": "TEXT",
        },
        {
            "id": "fontSize",
            "name": "Font Size",
            "description": "Description: Set the font size in pixels.\n\nDefault: 16",
            "type": "NUMBER",
        },
        {
            "id": "lineHeight",
            "name": "Line Height",
            "description": "Description: Set the text line height in pixels.\n\nDefault: 24",
            "type": "NUMBER",
        },
        {
            "id": "padding",
            "name": "Padding",
            "description": "Description: The padding around the text box in pixels.\n\nDefault: 0",
            "type": "NUMBER",
        },
        {
            "id": "backgroundColor",
            "name": "Background Color",
            "description": "Description: Set a background color for the text block.\n\nDefault: Empty/Transparent\n\nKeep it empty if you want it to be transparent!",
            "type": "COLOR",
        },
        {
            "id": "weight",
            "name": "Weight",
            "description": "Description: Set the font weight.\n\nDefault: normal",
            "type": "TEXT",
        },
        {
            "id": "overflow",
            "name": "Overflow",
            "description": "Description: Should the package overflow lines that do not fit in the text block.\n\nDefault: True",
            "type": "SELECT",
            "options": {
                "true": "True",
                "false": "False"
            }
        },
        {
            "id": "ellipsis",
            "name": "Ellipsis",
            "description": "Description: If overflow is off, should the last word of the text block have an ellipsis?\n\nDefault: False",
            "type": "SELECT",
            "options": {
                "false": "False",
                "true": "True"
            }
        },
    ],
    
    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
            "id": "text-block",
            "name": "Attachment",
            "description": "Type: Object\n\nDescription: The text block.",
            "types": ["Object"]
        },
    ],
    
    async code(cache) {
        const CanvasTextBlock = require("canvas-text-block");
        const {AttachmentBuilder} = require("discord.js");
        const {createCanvas} = require('canvas')
        
        const canvas = this.GetInputValue("canvas", cache) || createCanvas(1000, 1000);

        const text = this.GetInputValue("text", cache) || this.GetOptionValue("text", cache); if (!text) throw("The text block's text cannot be empty!")

        const xposition = this.GetInputValue("xposition", cache) || this.GetOptionValue("xposition", cache) || 100;
        const yposition = this.GetInputValue("yposition", cache) || this.GetOptionValue("yposition", cache) || 100;
        const width = this.GetInputValue("width", cache) || this.GetOptionValue("width", cache) || 800;
        const height = this.GetInputValue("height", cache) || this.GetOptionValue("height", cache) || 800;

        const color = this.GetInputValue("color", cache) || this.GetOptionValue("color", cache) || "#fff";
        const fontFamily = this.GetInputValue("fontFamily", cache) || this.GetInputValue("fontFamily", cache) || "arial";
        const fontSize = this.GetInputValue("fontSize", cache) || this.GetOptionValue("fontSize", cache) || 16;
        const lineHeight = this.GetInputValue("lineHeight", cache) || this.GetOptionValue("lineHeight", cache) || 24;
        const padding = this.GetInputValue("padding", cache) || this.GetOptionValue("padding", cache) || 0;
        const backgroundColor = this.GetInputValue("backgroundColor", cache) || this.GetOptionValue("backgroundColor", cache) || "transparent";
        const weight = this.GetInputValue("weight", cache) || this.GetOptionValue("weight", cache) || "normal";
        const overflow = this.GetInputValue("overflow", cache) ? this.GetInputValue("overflow", cache) : this.GetOptionValue("overflow", cache) == "true" ? true : false;
        const ellipsis = this.GetInputValue("ellipsis", cache) ? this.GetInputValue("ellipsis", cache) : this.GetOptionValue("ellipsis", cache) == "false" ? false : true;


        const options = {
            color, 
            fontFamily,
            fontSize,
            lineHeight,
            padding,
            backgroundColor,
            weight,
            overflow,
            ellipsis,
        };
        
        const textBlock = new CanvasTextBlock(
            canvas, 
            xposition,
            yposition,
            width,
            height,
            options 
        );
        
        textBlock.setText(text);

        const finalCanvas = canvas.toBuffer()

        this.StoreOutputValue(new AttachmentBuilder(finalCanvas, {name: "text-block.png", description: "The created text block!"}), "text-block", cache);
        this.RunNextBlock("action", cache);
    }
}
        