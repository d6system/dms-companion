module.exports = {
    name: "Scan QR Code",

    description: "Scans a QR Code from URL. Credits: @artemsnite",

    category: "Extras",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "url",
            "name": "QR URL",
            "description": "Acceptable Types: Text\n\nDescription: The QR Code URL to scan.",
            "types": ["text"]
        }
    ],

    options: [
        {
            "id": "url",
            "name": "QR URL",
            "description": "Acceptable Types: Text\n\nDescription: The QR Code URL to scan.",
            "type": "text"
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
            "id": "content",
            "name": "QR Code Content",
            "description": "Type: Text\n\nDescription: The QR Code Content obtained.",
            "types": ["text"]
        }
    ],

    async code(cache) {
        const axios = await this.require('axios');
        const jsQR = await this.require('jsqr');
        const url = this.GetInputValue("url", cache, false, undefined) || this.GetOptionValue("url", cache, false, undefined);
        axios.get(url, { responseType: 'arraybuffer' })
          .then((response) => {
            const qr = jsQR(new Uint8ClampedArray(response.data), response.data.width, response.data.height);
            this.StoreOutputValue(qr.data, "content", cache);
            this.RunNextBlock("action", cache);
          });
    }
}
