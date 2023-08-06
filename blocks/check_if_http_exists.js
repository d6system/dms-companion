module.exports = {
    name: "Check If Web Page Exists",

    description: "Checks to see if a web page exits.",

    category: "Internet Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "text1",
            "name": "Text 1",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The text 1 to merge with the text 2.",
            "types": ["text", "unspecified"],
            "required": true
        }
    ],

    options: [],

    outputs: [
        {
            "id": "action1",
            "name": "True",
            "description": "Type: Action\n\nDescription: Executes the following blocks if the web page exists.",
            "types": ["action"]
        },
        {
            "id": "action2",
            "name": "False",
            "description": "Type: Action\n\nDescription: Executes the following blocks if the web page does not exist.",
            "types": ["action"]
        }
    ],

    async code(cache) {
        const text1 = this.GetInputValue("text1", cache);

        var action;

        await fetch(text1).then(function(response) {
            return response;
        }).then(function(data) {
            if(data.status !== 404 || data.statusText !== 'Not Found') {
                action = "action1";
            } else {
                action = "action2";
            }
        })
        
        this.RunNextBlock(action, cache);
    }
}