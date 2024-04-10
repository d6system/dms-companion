module.exports = {
    name: "Number to Emoji",

    description: "Transforms a number [0 to 10] to an emoji.",

    category: ".MOD",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "input",
            "name": "Input",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Text\n\nDescription: The input to compare your values with.",
            "types": ["unspecified", "undefined", "null", "text", "number"]
        }
    ],

    options: [],              

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
            "description": "Type: Unspecified\n\nDescription: The return output",
            "types": ["text"]
        }
    ],

    code(cache) { 
        const input = parseInt(this.GetInputValue("input", cache));
        
        if(input == 0){
            result = "0️⃣";
        }
        if(input == 1){
            result = "1️⃣";
        }       
        if(input == 2){
            result = "2️⃣";
        }   
        if(input == 3){
            result = "3️⃣";
        }
        if(input == 4){
            result = "4️⃣";
        }
        if(input == 5){
            result = "5️⃣";
        }
        if(input == 6){
            result = "6️⃣";
        }
        if(input == 7){
            result = "7️⃣";
        }
        if(input == 8){
            result = "8️⃣";
        }
        if(input == 9){
            result = "9️⃣";
        }
        if(input == 10){
            result = "🔟";
        }       

        this.StoreOutputValue(result, "result", cache);
        this.RunNextBlock("action", cache);            
    }
}