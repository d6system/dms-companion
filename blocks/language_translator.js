 module.exports = {
    name: "Language Translator",

    description: "Translate any language to any language",

    category: "extra",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "types": ["action"]           
        },
        {
            "id": "text",
            "name": "Text to translate",
	        "description": "The text to translate",
            "types": ["text", "unspecified"],
            "required": true
        },
        {
            "id": "custom",
            "name": "Custom language",
	        "description": "Custom language (Example: de, en, nl, it, ru)",
            "types": ["text", "unspecified"]
        }
    ],

    options: [
	        {
            "id": "type",
            "name": "Translation language (to)",
            "description": "The language to translate to",
            "type": "SELECT",
            "options": {
                1: "English",
                2: "German",
                3: "France",
                4: "Spain",
                5: "Russia",
                99: "Custom",
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
            "id": "output",
            "name": "Translated output",
            "description": "The translated output",
            "types": ["text", "unspecified"]
        }		
    ],

    async code(cache) {
        const { translate } = await this.require("@vitalets/google-translate-api");
        const translateable = this.GetInputValue("text", cache);
        const custom = this.GetInputValue("custom", cache);
        const type = parseInt(this.GetOptionValue("type", cache));
		
		let result;

		    switch(type) {
        case 1:
            result = "en";
            break;
        case 2:
            result = "de";
            break;
        case 3:
            result = "fr";
            break;
        case 4:
            result = "es";
            break;
        case 5:
            result = "ru";
            break;
        case 99:
            result = custom;
            break;
			}
			
		if (!isNaN(result)) { 
		   result = "en";
		}
		
        const res = await translate(translateable, {to: result})
		const output = res.text.replaceAll('"',"");
		
		this.StoreOutputValue(output ,"output", cache);
        this.RunNextBlock('action', cache);
    }
};