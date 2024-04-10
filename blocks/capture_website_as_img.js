module.exports = {
    name: "Capture Website as Image",

    description: "Captures a Website as an Image.",

    category: "Internet Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "input",
            "name": "URL/Buffer/HTML",
            "description": "Acceptable Types: Text, Object, Unspecified\n\nDescription: The URL of the Website or the HTML Code(as Buffer)/File you want to capture.",
            "types": ["text", "object", "unspecified"],
            "required": true
        },
        {
            "id": "filename",
            "name": "Filename",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: A Filename if you want a custom one... WITHOUT .png",
            "types": ["text", "unspecified"],
        }
    ],

    options: [
        {
            "id": "filename",
            "name": "Filename",
            "description": "Description: A Filename if you want a custom one... WITHOUT .png",
            "type": "TEXT",
        },
        {
            "id": "fullpage",
            "name": "Full Page?",
            "description": "Description: Do you want to screenshot the Entire Page? WILL DISABLE HEIGHT AND WIDTH!",
            "type": "SELECT",
            "options": {
                "": "False/No",
                "true": "True/Yes"

            }
        },
        {
            "id": "blockads",
            "name": "Block Ads?",
            "description": "Description: Do you want to Block Ads?",
            "type": "SELECT",
            "options": {
                "true": "True/Yes",
                "": "False/No"
            }
        },
        {
            "id": "darkmode",
            "name": "Dark Mode?",
            "description": "Description: Should the Website use DarkMode if possible?",
            "type": "SELECT",
            "options": {
                "true": "True/Yes",
                "": "False/No"
            }
        },
        {
            "id": "removeElements",
            "name": "Remove HTML Elements",
            "description": "Description: You have the choice of hiding specific HTML Elements. (OPTIONAL)\n\nIf you have multiple things to hide use a ',' to split(NO SPACE)\n\nExample: #onetrust-consent-sdk,.header.wrap",
            "type": "TEXT"
        },
        {
            "id": "height",
            "name": "Image Height",
            "description": "Description: The Image Height. Default: 1080",
            "type": "NUMBER",
        },
        {
            "id": "width",
            "name": "Image Width",
            "description": "Description: The Image Width. Default: 1920",
            "type": "NUMBER",
        },
        {
            "id": "havingerrors",
            "name": "Did you get an Error?",
            "description": "Description: If you have an error, please Toggle this to True!",
            "type": "SELECT",
            "options": {
                "": "False/No",
                "true": "True/Yes"

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
            "name": "Attachment",
            "description": "Type: Object, Unspecified\n\nDescription: The Image Attachment of the Website.",
            "types": ["object", "unspecified"]
        }
    ],

    async code(cache) {
        const captureWebsite = await import("capture-website");
        let input = this.GetInputValue("input", cache);
        const filename = this.GetInputValue("filename", cache) || this.GetOptionValue("filename", cache) === "" ? "website" : this.GetOptionValue("filename", cache);

        const darkMode = Boolean(this.GetOptionValue("darkmode", cache))
        const blockAds = Boolean(this.GetOptionValue("blockads", cache))
        const fullPage = Boolean(this.GetOptionValue("fullpage", cache))
        let height = parseInt(this.GetOptionValue("height", cache))
        let width = parseInt(this.GetOptionValue("width", cache))

        if (height === undefined || isNaN(height) || height === 0) height = 1080;
        if (width === undefined || isNaN(width) || width === 0) height = 1920;

        const options = {
            inputType: Buffer.isBuffer(input) ? "html" : input.startsWith("<") ? "html" : "url",
            darkMode: darkMode,
            blockAds: blockAds,
            fullPage: fullPage,
            removeElements: (this.GetOptionValue("removeElements", cache) || "").split(","),
            launchOptions: {
                headless: "new"
            }
        }

        if(this.GetOptionValue("havingerrors", cache) === "true") {
            options.launchOptions.args = [
                '--no-sandbox',
                '--disable-setuid-sandbox'
            ]
        }
        if (!fullPage) {
            options.height = height;
            options.width = width;
        }

        const result = await captureWebsite.default.buffer(Buffer.isBuffer(input) ? input.toString() : input, options);
        //Create a Discord Attachment
        const {AttachmentBuilder} = require('discord.js');
        const attachment = new AttachmentBuilder(Buffer.from(result), filename + ".png");
        this.StoreOutputValue(attachment, "result", cache);
        this.RunNextBlock("action", cache);
    }
}