module.exports = {
    name: "Generate QR Code",

    description: "Generates a QR Code URL. Credits: @artemsnite",

    category: "Extras",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "content",
            "name": "Content",
            "description": "Acceptable Types: Text\n\nDescription: The QR Code Content.",
            "types": ["text"]
        },
        {
            "id": "size",
            "name": "Size",
            "description": "Acceptable Types: Number\n\nDescription: The Size of The QR Code (in pixels). Default is 200.",
            "types": ["number"]
        }
    ],

    options: [
        {
            "id": "content",
            "name": "Content",
            "description": "Acceptable Types: Text\n\nDescription: The QR Code Content.",
            "type": "text"
        },
        {
            "id": "size",
            "name": "Size",
            "description": "Acceptable Types: Number\n\nDescription: The Size of The QR Code (in pixels). Default is 200.",
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
            "id": "url",
            "name": "QR Code URL",
            "description": "Type: Text\n\nDescription: The QR Code URL obtained.",
            "types": ["text"]
        }
    ],

    async code(cache) {
        const input = encodeURIComponent(this.GetInputValue("content", cache, false, undefined) || this.GetOptionValue("content", cache, false, undefined));
        const size = this.GetInputValue("size", cache, false, undefined) || this.GetOptionValue("size", cache, false, undefined);
        const getqr = "https://api.qrserver.com/v1/create-qr-code/?data=" + input + "&size=" + size + "x" + size;
        this.StoreOutputValue(getqr, "url", cache);
        this.RunNextBlock("action", cache);
    }
}