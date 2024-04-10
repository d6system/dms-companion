module.exports = {
    name: "Captcha V3",
    description: "Makes a cool captcha thingy.",
    
    category: ".T45",
    
    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
            "id": "cstm_length",
            "name": "Captcha Text length",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: How many characters in the generated captcha text.\nOnly use this input if the \"Custom Text\" option is set to false!\n\nMax length: 6 characters, can be changed in the script\n\n(OPTIONAL)",
            "types": ["number", "unspecified"],
        },
        {
            "id": "cstm_text",
            "name": "Custom Text",
            "description": "Acceptable Types: Unspecified, Text\n\nDescription: The captcha custom text.\nOnly use this input if the \"Custom Text\" option is set to true!\n\n\n\nMax length: 6 characters, if the text exceeds 6 characters it will be sliced to 6 characters!\n\n(OPTIONAL)",
            "types": ["text", "unspecified"]
        },
    ],
    
    options: [
        {
            "id": "color",
            "name": "Captcha Text Color",
            "description": "Type: Color\n\nDescription: The text color of the captcha.",
            "type": "COLOR"
        },
        {
            "id": "linecol",
            "name": "Captcha Line Color",
            "description": "Type: Color\n\nDescription: The line color of the captcha.",
            "type": "COLOR"
        },
        {
            "id": "custom_length",
            "name": "Custom Length",
            "description": "Type: Boolean\n\nDescription: Add a custom length to the randomly generated captcha text?\n\nIf \"True\" you will have to use the \"Custom Length\" input, or if you chose \"false\" the length will be set to the max length automatically.\n\nDisable this if the \"Custom Text\" option is enabled!",
            "type": "SELECT",
            "options": {
                "false": "False",
                "true": "True"
            }
        },
        {
            "id": "custom_text",
            "name": "Custom Text",
            "description": "Type: Boolean\n\nDescription: Add a custom captcha text?\n\nIf \"True\" you will have to use the \"Custom Text\" input, or if you chose \"false\" a random text with the provided length will be generated.\n\nDisable this if the \"Custom Length\" option is enabled!",
            "type": "SELECT",
            "options": {
                "false": "False",
                "true": "True"
            }
        }
    ],
    
    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
            "id": "captcha",
            "name": "Captcha Attachment",
            "description": "Type: Object\n\nDescription: The created captcha attachment.",
            "types": ["object"]
        },
        {
            "id": "text",
            "name": "Captcha Text",
            "description": "Type: Text\n\nDescription: The text in the captcha.",
            "types": ["text"]
        },
        {
            "id": "error",
            "name": "Error(s)",
            "description": "Types: List\n\nDescription: Returns error(s) list if there's any.",
            "types": ["list"]
        }
    ],
    
    async code(cache) {
        let text = this.GetInputValue("cstm_text", cache);
        let textLength = this.GetInputValue("cstm_length", cache);
        const cusTextBool = this.GetOptionValue("custom_text", cache);
        const cusLengthBool = this.GetOptionValue("custom_length", cache);
        let color = this.GetOptionValue("color", cache);
        let linecol = this.GetOptionValue("linecol", cache);

        let errorMessage = [];

        const CustomProvidedLength = 6 // DONT CHANGE

        if (!color) {color = "#66FFD3"};
        if (!linecol) {linecol = "#F96262"}

        switch (cusLengthBool) {
            case "true":
                if (cusTextBool == "false") {
                    if (!textLength) {
                        errorMessage.push(`Error! You must provide a captcha length if the custom length option is set to false! The length was set to ${CustomProvidedLength} automatically.`)
                        textLength = CustomProvidedLength
                    } else if (textLength > CustomProvidedLength) {
                        errorMessage.push(`Error! The maximum length is ${CustomProvidedLength}! length was decreased to ${CustomProvidedLength} automatically.`)
                        textLength = CustomProvidedLength
                    }
                }
                break;
            case "false":
                textLength = CustomProvidedLength
        }

        switch (cusTextBool) {
            case "true":
                if (!text) {
                    errorMessage.push("Error! You must provide a captcha text if the custom text option is set to true! The text was generated automatically.")
                    function genText() {
                        let stuff = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                        let result = "";
    
                        for (let counter = 0; counter < textLength; counter++) {
                            result += stuff.charAt(Math.floor(Math.random() * stuff.length))
                        }
                        return result
                    }
                    text = genText()
                } else if (text.length > CustomProvidedLength) {
                    errorMessage.push(`Error! The text exceeded the characters limit which is ${CustomProvidedLength}! The text was reduced to ${CustomProvidedLength} letters.`)
                    text = text.slice(0,CustomProvidedLength)
                }
                break;
            case "false":
                function genText() {
                    let stuff = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                    let result = "";
    
                    for (let counter = 0; counter < textLength; counter++) {
                        result += stuff.charAt(Math.floor(Math.random() * stuff.length))
                    }
                    return result
                }
                text = genText()
                break;
        }
        
        const axios = require('axios');
        const capCreate = async () => {
            const response = await axios.get('https://apiv3.spapi.ga/image/captcha', {
            params: {
                text: text,
                color: color,
                linecol: linecol
            },
        });
        return response.request.res.responseUrl
    }

    const captchaUrl = await capCreate()
    
    this.StoreOutputValue(errorMessage, "error", cache);
    const {AttachmentBuilder} = require('discord.js');
    this.StoreOutputValue(new AttachmentBuilder(captchaUrl, {name: "captcha.png", description: "The captcha!"}), "captcha", cache);
    this.StoreOutputValue(text, "text", cache);
    this.RunNextBlock("action", cache);
}
}
