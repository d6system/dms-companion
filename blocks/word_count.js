module.exports = {
    name: "Word Count",

    description: "Count how many times a word is in a text.",

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
            id: "word",
            name: "Word",
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
            id: "word",
            name: "Word",
            description: "Fixed value for your search.",
            type: "TEXT"
        }        
    ],

    outputs: [
        {
            id: "action",
            name: "Action",
            description: "Type: Action\n\nDescription: Executes blocks.",
            types: ["action"]
        },
        {
            id: "result",
            name: "Result",
            description: "Type: Action\n\nDescription: The ammount of times the word was repeted in your text.",
            types: ["number"]
        }
    ],

    code: function(cache) {

        var word = this.GetInputValue("word", cache);
        if(word == undefined) {
            word = this.GetOptionValue("word", cache);
        }     

        const string = this.GetInputValue("text", cache);
        const sensitive = this.GetOptionValue("sensitive", cache);

        switch(sensitive) {
            case "no":
                search = ("" + word).toLowerCase();
                text = ("" + string).toLowerCase();
                break;
            case "yes":          
                search = word;
                text = string;
                break;
        }
        
        let result = text.split(search).length -1;


        this.StoreOutputValue(result, "result", cache);
        this.RunNextBlock("action", cache);        
    }
};