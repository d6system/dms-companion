module.exports = {
    name: "Create Modal Input Field",

    description: "Create an Input Field that will be used for creating a Modal (by @XCraftTM)",

    category: ".MOD",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
            "id": "style",
            "name": "Style",
            "description": "Type: Text\n\nDescription: The Style of the component(short or paragraph)",
            "types": ["text"]
        },
        {
            "id": "id",
            "name": "CustomID",
            "description": "Type: Text\n\nDescription: The ID of the component.",
            "types": ["text"]
        },
        {
            "id": "label",
            "name": "Label",
            "description": "Type: Text\n\nDescription: The Label of the component.",
            "types": ["text"]
        },
        {
            "id": "maxlength",
            "name": "Max Length",
            "description": "Type: Text\n\nDescription: The Max Length of the component.(OPTIONAL)",
            "types": ["text"]
        },
        {
            "id": "minlength",
            "name": "Min Length",
            "description": "Type: Text\n\nDescription: The Min Length of the component.(OPTIONAL)\nIf you set this, then if you use prefill \nthe Pre Value must be bigger then the number here.",
            "types": ["text"]
        },
        {
            "id": "placeholder",
            "name": "Placeholder",
            "description": "Type: Text\n\nDescription: The Placeholder of the component.(OPTIONAL)",
            "types": ["text"]
        },
        {
            "id": "prefill",
            "name": "Pre Value",
            "description": "Type: Text\n\nDescription: The Text to already fill into the Input(OPTIONAL)\nIf you set this, then if you use the Min Length \nthe Pre Value must be Bigger then Min Length",
            "types": ["text"]
        },
        {
            "id": "required",
            "name": "Required",
            "description": "Type: Boolean\n\nDescription: Is Field required?",
            "types": ["boolean"]
        }
    ],

    options: [
        {
            id: "style",
            name: "Style",
            description: "Type: Text\n\nDescription: The Style of the component",
            type: "SELECT",
            options: {
                "short": "Text - Short",
                "paragraph": "Text - Paragraph",
                "input": "Set Via Input"
            }
        },
        {
            id: "id",
            name: "CustomID",
            description: "Type: Text\n\nDescription: The ID of the component.",
            type: "TEXT"
        },
        {
            id: "label",
            name: "Label",
            description: "Type: Text\n\nDescription: The Label of the component.",
            type: "TEXT"
        },
        {
            id: "maxlength",
            name: "Max Length",
            description: "Type: Text\n\nDescription: The Max Length of the component.(OPTIONAL)",
            type: "TEXT"
        },
        {
            id: "minlength",
            name: "Min Length",
            description: "Type: Text\n\nDescription: The Min Length of the component.(OPTIONAL)",
            type: "TEXT"
        },
        {
            id: "placeholder",
            name: "Placeholder",
            description: "Type: Text\n\nDescription: The Placeholder of the component.(OPTIONAL)",
            type: "TEXT"
        },
        {
            id: "prefill",
            name: "Pre Value",
            description: "Type: Text\n\nDescription: The Text to already fill into the Input(OPTIONAL)",
            type: "TEXT"
        },
        {
            id: "required",
            name: "Required",
            description: "Type: Text\n\nDescription: Is Field required?",
            type: "SELECT",
            options: {
                true: "true",
                false: "false",
                "input": "Set Via Input"
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
            "id": "textfield",
            "name": "Input Field",
            "description": "The Text Input Field created",
            "types": ["object"]
        }
    ],

    code(cache) {
        const { TextInputBuilder, TextInputStyle } = require('discord.js');

        const label = this.GetOptionValue("label", cache) + "" || this.GetInputValue("label", cache) + "";
        const id = this.GetOptionValue("id", cache) + '' || this.GetInputValue("id", cache) + '';
        const maxlength = parseInt(this.GetOptionValue("maxlength", cache)) || parseInt(this.GetInputValue("maxlength", cache));
        const minlength = parseInt(this.GetOptionValue("minlength", cache)) || parseInt(this.GetInputValue("minlength", cache)) || 0;
        const placeholder = this.GetOptionValue("placeholder", cache) + "" || this.GetInputValue("placeholder", cache) + "" || "";
        const required = this.GetOptionValue("required", cache);
        const prefill = this.GetOptionValue("prefill", cache) || this.GetInputValue("prefill", cache) || "";

        //var requiredbool = (required === 'true') || (this.GetInputValue("required", cache) === 'true');
        if (required === "input") {
            var requiredbool = this.GetInputValue("required", cache);
        } else {
            var requiredbool = (required === 'true');
        }

        if (placeholder === 'undefined') {
            var doneplaceholder = "";
        } else {
            var doneplaceholder = placeholder;
        }

        if (this.GetOptionValue("style", cache) === "short" || this.GetInputValue("style", cache) === "short") {
            const rawinputfield = new TextInputBuilder()
                .setCustomId(id)
                // The label is the prompt the user sees for this input
                .setLabel(label)
            // set the maximum number of characters to allow
            if (maxlength > 0 === true) {
                rawinputfield.setMaxLength(maxlength)
            }
            // set the minimum number of characters required for submission
            if (minlength > 0 === true) {
                rawinputfield.setMinLength(minlength);
            }
            // set a placeholder string to prompt the user
            rawinputfield.setPlaceholder(doneplaceholder)
            // require a value in this input field
            rawinputfield.setRequired(requiredbool)
            // set a default value to pre-fill the input
            if(prefill) {
                if(minlength) {
                    if(prefill.length > minlength) {
                        rawinputfield.setValue(prefill);
                    } else {
                        console.error("\x1b[31m" + "[ERROR] The Pre Value is lower then the Min Length!");
                    }
                } else {
                    rawinputfield.setValue(prefill);
                }
            }
            rawinputfield.setStyle(TextInputStyle.Short);
            this.StoreOutputValue(rawinputfield, "textfield", cache);
            this.RunNextBlock("action", cache);
        }
        if (this.GetOptionValue("style", cache) === "paragraph" || this.GetInputValue("style", cache) === "paragraph") {
            const rawinputfield = new TextInputBuilder()
                .setCustomId(id)
                // The label is the prompt the user sees for this input
                .setLabel(label)
            // set the maximum number of characters to allow
            if (maxlength > 0 === true) {
                rawinputfield.setMaxLength(maxlength)
            }
            // set the minimum number of characters required for submission
            if (minlength > 0 === true) {
                rawinputfield.setMinLength(minlength);
            }
            // set a placeholder string to prompt the user
            rawinputfield.setPlaceholder(doneplaceholder)
            // require a value in this input field
            rawinputfield.setRequired(requiredbool)
            // set a default value to pre-fill the input
            //prefill ? rawinputfield.setValue(prefill) : "";
            if(prefill) {
                if(minlength) {
                    if(prefill.length > minlength) {
                        rawinputfield.setValue(prefill);
                    } else {
                        console.error("\x1b[31m" + "[ERROR] The Pre Value is lower then the Min Length!");
                    }
                } else {
                    rawinputfield.setValue(prefill);
                }
            }
            rawinputfield.setStyle(TextInputStyle.Paragraph);
            this.StoreOutputValue(rawinputfield, "textfield", cache);
            this.RunNextBlock("action", cache);
        }
    }
}