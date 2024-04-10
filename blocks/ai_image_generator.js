module.exports = {
    name: "DALL-E 2 Image Generator",

    description: "Generates an image based on the given description. By Domin0221#0001",

    category: ".MOD",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "prompt",
            "name": "Prompt",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: Description of the image you want to be generated.",
            "types": ["text", "unspecified"],
            "required": true
        }
    ],

    options: [
        {
            "id": "key",
            "name": "API key",
            "description": "Description: Your OpenAI API key.",
            "type": "TEXT",
            "required": true
        },
        {
          "id": "imagesize",
          "name": "Image Size",
          "description": "Description: The size of a generated image.",
          "type": "SELECT",
          "options": 
          {
              "1024x1024": "1024x1024",
              "512x512": "512x512",
              "256x256": "256x256"
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
          "id": "erroraction",
          "name": "Action (Error)",
          "description": "Type: Action\n\nDescription: Executes the following blocks when an error occurs.",
          "types": ["action"]
        },
        {
            "id": "image",
            "name": "Image URL",
            "description": "Type: Text\n\nDescription: An URL to the generated image.",
            "types": ["text", "unspecified"]
        },
        {
          "id": "errormsg",
          "name": "Error Message",
          "description": "Type: Text\n\nDescription: The error message if an error occurs.",
          "types": ["text", "unspecified"]
        }
    ],

    code(cache) {
      const generateImage = async (prompt) => {
        const api_key = this.GetOptionValue("key", cache);
        const imagesize = this.GetOptionValue("imagesize", cache);
        const api_url = 'https://api.openai.com/v1/images/generations';
      
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${api_key}`,
        };
      
        const data = {
          model: 'image-alpha-001',
          prompt,
          size: `${imagesize}`,
          response_format: 'url',
        };
      
        const response = await fetch(api_url, {
          method: 'POST',
          headers,
          body: JSON.stringify(data),
        });
      
        const statusCode = response.status;
        const responseData = await response.json();
      
        if (statusCode !== 200) {
          throw new Error(`API Error: ${responseData.error.message}`);
        }
      
        return responseData.data[0].url;
      };
      
      const prompt = this.GetInputValue("prompt", cache);
      generateImage(prompt)
        .then((url) => {
          this.StoreOutputValue(url, "image", cache);
          this.RunNextBlock("action", cache);
        })
        .catch((error) => {
          console.log(error);
          this.StoreOutputValue(error.message, "errormsg", cache);
          this.RunNextBlock("erroraction", cache);
        });
      
    }
}