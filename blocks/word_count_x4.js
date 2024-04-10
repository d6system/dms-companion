module.exports = {
    name: "Word Count x4",

    description: "Count how many times 4 words are in a text.",

    category: ".MOD",

    inputs: [
        {
            id: "action",
            name: "Action",
            description: "Acceptable Types: Action\n\nDescription: Executes this block.",
            types: ["action"]
        },
        {
            id: "text",
            name: "Text",
            description: "Acceptable Types: Text \n\nDescription: The text you are counting your words.",
            types: ["unspecified", "text"],
            required: true
        },
        {
            id: "word1",
            name: "Word 1",
            description: "Acceptable Types: Text, List\n\nDescription: The word you are counting",
            types: ["unspecified", "undefined", "text"]
        },
        {
            id: "word2",
            name: "Word 2",
            description: "Acceptable Types: Text, List\n\nDescription: The word you are counting",
            types: ["unspecified", "undefined", "text"]
        },
        {
            id: "word3",
            name: "Word 3",
            description: "Acceptable Types: Text, List\n\nDescription: The word you are counting",
            types: ["unspecified", "undefined", "text"]
        },
        {
            id: "word4",
            name: "Word 4",
            description: "Acceptable Types: Text, List\n\nDescription: The word you are counting",
            types: ["unspecified", "undefined", "text"]
        }
    ],

    options: [
        {
            id: "sensitive",
            name: "Case Sensitive",
            description: "Should the search be case sensitive? (Default: No)",
            type: "SELECT",
            options:  {
              "no": "No",
              "yes": "Yes"
            }
          },
        {
            id: "word1",
            name: "Word 1",
            description: "Fixed value for your search.",
            type: "TEXT"
        },
        {
            id: "word2",
            name: "Word 2",
            description: "Fixed value for your search.",
            type: "TEXT"
        },
        {
            id: "word3",
            name: "Word 3",
            description: "Fixed value for your search.",
            type: "TEXT"
        },
        {
            id: "word4",
            name: "Word 4",
            description: "Fixed value for your search.",
            type: "TEXT"
        },
    ],

    outputs: [
        {
            id: "action",
            name: "Action",
            description: "Type: Action\n\nDescription: Executes blocks.",
            types: ["action"]
        },
        {
            id: "result1",
            name: "Result 1",
            description: "Type: Action\n\nDescription: The ammount of times the word was repeted in your text.",
            types: ["number"]
        },
        {
            id: "result2",
            name: "Result 2",
            description: "Type: Action\n\nDescription: The ammount of times the word was repeted in your text.",
            types: ["number"]
        },
        {
            id: "result3",
            name: "Result 3",
            description: "Type: Action\n\nDescription: The ammount of times the word was repeted in your text.",
            types: ["number"]
        },
        {
            id: "result4",
            name: "Result 4",
            description: "Type: Action\n\nDescription: The ammount of times the word was repeted in your text.",
            types: ["number"]
        }
    ],

    code: function(cache) {

        const sensitive = this.GetOptionValue("sensitive", cache);
        const string = this.GetInputValue("text", cache);
        
        var word1 = this.GetInputValue("word1", cache);
        if(word1 == undefined) {
            word1 = this.GetOptionValue("word1", cache);
        } 
        
        var word2 = this.GetInputValue("word2", cache);
        if(word2 == undefined) {
            word2 = this.GetOptionValue("word2", cache);
        }

        var word3 = this.GetInputValue("word3", cache);
        if(word3 == undefined) {
            word3 = this.GetOptionValue("word3", cache);
        }

        var word4 = this.GetInputValue("word4", cache);
        if(word4 == undefined) {
            word4 = this.GetOptionValue("word4", cache);
        }

        switch(sensitive) {
            case "no":
                search1 = ("" + word1).toLowerCase();
                search2 = ("" + word2).toLowerCase();
                search3 = ("" + word3).toLowerCase();
                search4 = ("" + word4).toLowerCase();
                text = ("" + string).toLowerCase();
                break;
            case "yes":          
                search1 = word1;
                search2 = word2;
                search3 = word3;
                search4 = word4;
                text = string;
                break;
        }

        let result1 = text.split(search1).length -1;
        let result2 = text.split(search2).length -1;
        let result3 = text.split(search3).length -1;
        let result4 = text.split(search4).length -1;
        
        this.StoreOutputValue(result1, "result1", cache);
        this.StoreOutputValue(result2, "result2", cache);
        this.StoreOutputValue(result3, "result3", cache);
        this.StoreOutputValue(result4, "result4", cache);
        this.RunNextBlock("action", cache);        
    }
};