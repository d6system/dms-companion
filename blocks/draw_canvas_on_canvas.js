module.exports = {
    name: "Draw Canvas On Canvas",

    description: "Draws a canvas on another canvas.",

    category: "Canvas Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Description: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "canvas1",
            "name": "Canvas 1",
            "description": "Description: The canvas on which to draw another canvas.",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "canvas2",
            "name": "Canvas 2",
            "description": "Description: The canvas to be drawn on canvas 1.",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "x",
            "name": "Position X",
            "description": "Description: The horizontal position for canvas 2. Supports percentage (i.e. \"50%\"). Default: \"0\". (OPTIONAL)",
            "types": ["number", "text", "unspecified"]
        },
        {
            "id": "y",
            "name": "Position Y",
            "description": "Description: The vertical position for canvas 2. Supports percentage (i.e. \"50%\"). Default: \"0\". (OPTIONAL)",
            "types": ["number", "text", "unspecified"]
        },
        {
            "id": "width",
            "name": "Custom Width",
            "description": "Description: The custom width for canvas 2. Supports percentage (i.e. \"50%\"). Default: Current canvas 2 width. (OPTIONAL)",
            "types": ["number", "text", "unspecified"]
        },
        {
            "id": "height",
            "name": "Custom Height",
            "description": "Description: The custom height for canvas 2. Supports percentage (i.e. \"50%\"). Default: Current canvas 2 height. (OPTIONAL)",
            "types": ["number", "text", "unspecified"]
        },
        {
            "id": "opacity",
            "name": "Opacity",
            "description": "Description: The opacity (0-1) for canvas 2. Default: \"1\". (OPTIONAL)",
            "types": ["number", "unspecified"]
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
            "id": "canvas",
            "name": "Canvas",
            "description": "Type: Object\n\nDescription: The canvas with the drawing.",
            "types": ["object"]
        }
    ],

    async code(cache) {
        const canvas1 = this.GetInputValue("canvas1", cache);
        const canvas2 = this.GetInputValue("canvas2", cache);
        const x = parseFloat(this.GetInputValue("x", cache)) || 0;
        const y = parseFloat(this.GetInputValue("y", cache)) || 0;
        const width = parseFloat(this.GetInputValue("width", cache)) || canvas2.width;
        const height = parseFloat(this.GetInputValue("height", cache)) || canvas2.height;
        const opacity = parseFloat(this.GetInputValue("opacity", cache)) || 1;

        const context1 = canvas1.getContext('2d');
        const context2 = canvas2.getContext('2d');
        
        context1.globalAlpha = opacity;
        context1.drawImage(canvas2, x, y, width, height);
        
        this.StoreOutputValue(canvas1, "canvas", cache);
        this.RunNextBlock("action", cache);
    }
};
