module.exports = {
    name: "Keys Generator",
    
    description: "Generates key(s) with the chosen format.",
    
    category: ".T45",
    
    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "amount",
            "name": "Keys Amount",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: Number of keys to be generated.\n\nDefault: \"1\"\n\n(OPTIONAL)",
            "types": ["number", "unspecified"]
        },
    ],
    
    options: [
        {
            "id": "formats",
            "name": "Formats",
            "description": "Description: How you want your key(s) to look like.",
            "type": "SELECT",
            "options": {
                1: "xxxx-xxxx-xxxx",
                2: "xxxx-xxxx-xxxx-xxxx",
                3: "xxxxxx-xxxxxx-xxxxxx-xxxxxx",
                4: "xxxxx-xxxxx-xxxxx",
                5: "xxxxx-xxxxx-xxxxx-xxxxx",
            }
        },
    ],
    
    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
            "id": "keys",
            "name": "Key(s) List",
            "description": "Type: List\n\nDescription: The list containing the generated key(s).",
            "types": ["list"]
        },
    ],
    
    async code(cache) {
        let amount = this.GetInputValue("amount", cache);
        const formats = this.GetOptionValue("formats", cache);
        
        if (!amount) amount = 1;
        
        const types = ["xxxx-xxxx-xxxx", "xxxx-xxxx-xxxx-xxxx", "xxxxxx-xxxxxx-xxxxxx-xxxxxx", "xxxxx-xxxxx-xxxxx", "xxxxx-xxxxx-xxxxx-xxxxx"];
        const selected_type = types[formats - 1]
        
        function dasher(key, index) {
            index = index - 1
            return key.substring(0, index) + "-" + key.substring(index + 1)
        }
        function keyGen() {
            const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
            let key = "";
            
            for (counter = 0 ; counter < selected_type.length ; counter++) {
                key += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            
            return key
        }

        function amountGenerator(keysAmount) {
            let genkeys = [];

            for (keyCounter = 0 ; keyCounter < keysAmount ; keyCounter++) {
                if (formats == 1){
                    genkeys.push(dasher(dasher(keyGen(amount), 5),10));
                } else if (formats == 2) {
                    genkeys.push(dasher(dasher(dasher(keyGen(amount), 5),10),15));
                }  else if (formats == 3) {
                    genkeys.push(dasher(dasher(dasher(keyGen(amount),7),14),21));
                }  else if (formats == 4) {
                    genkeys.push(dasher(dasher(keyGen(amount),6),12));
                }  else {
                    genkeys.push(dasher(dasher(dasher(keyGen(amount),6),12),18));
                }
            }

            return genkeys;
        }
        
        this.StoreOutputValue(amountGenerator(amount), "keys", cache);
        this.RunNextBlock("action", cache);
    }
}