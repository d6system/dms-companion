module.exports = {
    name: "Create HTML Transcript",

    description: "Creates a HTML Transcript with the Messages of a Channel.",

    category: "Channel Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "text_channel",
            "name": "Text Channel",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The text channel to Transcript",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "filename",
            "name": "Filename",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The Filename(WITHOUT .html)",
            "types": ["text", "unspecified"],
        },
        {
            id: "saveimg",
            name: "Save Images?",
            description: "Description: Whether the Transcript should save the Images (Increases File Size)",
            types: ["boolean"],
        },
        {
            id: "credits",
            name: "Credits?",
            description: "Description: Whether to include the \"Powered by discord-html-transcripts\" footer",
            types: ["boolean"],
        }
    ],

    options: [
        {
            "id": "filename",
            "name": "Filename (Without .html)",
            "description": "Description: The Filename(WITHOUT .html)\n\nOnly Required for Attachment!",
            "type": "TEXT"
        },
        {
            "id": "returntype",
            "name": "Return Type",
            "description": "Description: The Type to return.",
            "type": "SELECT",
            "options": {
                "attachment": "Attachment",
                "string": "String (Raw HTML Code)",
                "buffer": "Buffer"
            }
        },
        {
            "id": "saveimg",
            "name": "Save Images? (Increases File Size)",
            "description": "Description: The Type to return.",
            "type": "SELECT",
            "options": {
                true: "True/Yes",
                false: "False/No"
            }
        },
        {
            "id": "credits",
            "name": "Credits?",
            "description": "Description: Whether to include the \"Powered by discord-html-transcripts\" footer",
            "type": "SELECT",
            "options": {
                true: "True/Yes",
                false: "False/No"
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
            "description": "Type: Unspecified\n\nDescription: The Transcript in the Type you Selected...",
            "types": ["unspecified"]
        }
    ],

    async code(cache) {
        const discordTranscripts = await this.require('discord-html-transcripts');
        const channel = this.GetInputValue("text_channel", cache);
        var filename = this.GetInputValue("filename", cache);
        const returntype = this.GetOptionValue("returntype", cache);
        var saveimg = this.GetInputValue("saveimg", cache);
        var credits = this.GetInputValue("credits", cache);
        const messages = await channel.messages.fetch();

        if(filename == undefined) {
            filename = this.GetOptionValue("filename", cache);
            if (filename == "") {
                filename = "transcript"
            }
        }

        if(saveimg == undefined) {
            saveimg = this.GetOptionValue("saveimg", cache);
            if(saveimg == "true") { saveimg = true } else { saveimg = false }
        }

        if(credits == undefined) {
            credits = this.GetOptionValue("credits", cache);
            if(credits == "true") { credits = true } else { credits = false }
        }

        transcript = await discordTranscripts.createTranscript(channel, {
            limit: -1, // Number of messages to fetch. -1 for all messages
            returnType: returntype, // Valid options: 'buffer' | 'string' | 'attachment' Default: 'attachment' OR use the enum ExportReturnType
            filename: filename + '.html', // Only valid with returnType is 'attachment'. Name of attachment.
            saveImages: saveimg, // Download all images and include the image data in the HTML (allows viewing the image even after it has been deleted) (! WILL INCREASE FILE SIZE !)
            poweredBy: credits // Whether to include the "Powered by discord-html-transcripts" footer
        });
        this.StoreOutputValue(transcript, "result", cache);
        this.RunNextBlock("action", cache);
    }
}