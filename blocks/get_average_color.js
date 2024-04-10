module.exports = {
    name: "Get Average Color From Image",

    description: "Extracts the average color from an image. By Domin0221#0001",

    category: ".MOD",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "imageurl",
            "name": "Image URL",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: An URL to the image.",
            "types": ["text", "unspecified"],
            "required": true
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
            "id": "averagecolor",
            "name": "Average Color",
            "description": "Type: Text\n\nDescription: The average color extracted from an image.",
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
        await this.require("sharp");
      async function getAverageColorFromImage(imageUrl) {
        const { default: got } = await import('got');
        const sharp = require('sharp');
      
        const response = await got(imageUrl, { responseType: 'buffer' });
        const image = sharp(response.body);
      
        const metadata = await image.metadata();
        const width = metadata.width;
        const height = metadata.height;
      
        const buffer = await image.raw().toBuffer();
      
        let totalRed = 0;
        let totalGreen = 0;
        let totalBlue = 0;
        let totalPixels = 0;
      
        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            const offset = (y * width + x) * 3;
            const red = buffer[offset];
            const green = buffer[offset + 1];
            const blue = buffer[offset + 2];
      
            totalRed += red;
            totalGreen += green;
            totalBlue += blue;
            totalPixels++;
          }
        }
      
        const averageRed = Math.round(totalRed / totalPixels);
        const averageGreen = Math.round(totalGreen / totalPixels);
        const averageBlue = Math.round(totalBlue / totalPixels);
      
        const hexColor = rgbToHex(averageRed, averageGreen, averageBlue);
        return hexColor;
      }
      
      function rgbToHex(red, green, blue) {
        const hexRed = red.toString(16).padStart(2, '0');
        const hexGreen = green.toString(16).padStart(2, '0');
        const hexBlue = blue.toString(16).padStart(2, '0');
        return `#${hexRed}${hexGreen}${hexBlue}`;
      }
      
      const imageUrl = this.GetInputValue("imageurl", cache);
      getAverageColorFromImage(imageUrl)
        .then(hexColor => {
          this.StoreOutputValue(hexColor, "averagecolor", cache);
          this.RunNextBlock("action", cache);
        })
        .catch(error => {
          console.log(error);
          this.StoreOutputValue(error.message, "errormsg", cache);
          this.RunNextBlock("erroraction", cache);
        });
      
    }
}