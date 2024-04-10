module.exports = {
    name: "Get Image Info",

    description: "Gets the image buffer information.",

    category: "Extras",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "buffer",
            "name": "Image",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The image buffer to get the information.",
            "types": ["object", "unspecified"],
            "required": true
        }
    ],

    options: [
        {
            "id": "buffer_info",
            "name": "Image Info",
            "description": "Description: The image buffer information to get.",
            "type": "SELECT",
            "options": {
                1: "Image Width [Number]",
                2: "Image Height [Number]",
                3: "Image Format [Text]",
                4: "Image Size (in bytes) [Number]"
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
            "id": "result",
            "name": "Result",
            "description": "Type: Unspecified\n\nDescription: The information obtained from the user.",
            "types": ["unspecified"]
        }
    ],

    async code(cache) {
		const sharp = require('sharp');
        const buffer = this.GetInputValue("buffer", cache);
        const buffer_info = parseInt(this.GetOptionValue("buffer_info", cache));
        const metadata = await sharp(buffer).metadata();
        let result;
        switch(buffer_info) {
            case 1:
                result = metadata.width;
                break;
            case 2:
                result = metadata.height;
                break;
            case 3:
                result = metadata.format;
                break;
            case 4:
                result = metadata.size;
                break;
        }
        this.StoreOutputValue(result, "result", cache);
        this.RunNextBlock("action", cache);
    }
}