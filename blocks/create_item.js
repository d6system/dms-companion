module.exports = {
    name: "Create Item",
    
    description: "Creates an item for the \"Create Inventory\" block!\n\nCredits: by @T-45",
    
    category: "Create Inventory",
    
    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "name",
            "name": "Name",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The item name.",
            "types": ["text", "unspecified"]
        },
        {
            "id": "amount",
            "name": "Amount",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The item amount.",
            "types": ["number", "unspecified"]
        },
        {
            "id": "emoji",
            "name": "Emoji",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The item emoji. (OPTIONAL)",
            "types": ["text", "unspecified"]
        },
        {
            "id": "items",
            "name": "Items",
            "description": "Acceptable Types: List, Unspecified\n\nDescription: The items list to update. (OPTIONAL)",
            "types": ["list", "unspecified"]
        },
    ],
    
    options: [
        {
            "id": "name",
            "name": "Name",
            "description": "Description: The item name.",
            "type": "TEXT"
        },
        {
            "id": "amount",
            "name": "Amount",
            "description": "Description: The item amount.",
            "type": "NUMBER"
        },
        {
            "id": "emoji",
            "name": "Emoji",
            "description": "Description: The item emoji. (OPTIONAL)",
            "type": "TEXT"
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
            "id": "items",
            "name": "Items",
            "description": "Type: List\n\nDescription: The updated items list.",
            "types": ["list"]
        }
    ],
    
    async code(cache) {
        const name = this.GetInputValue("name", cache) || this.GetOptionValue("name", cache); if (!name) throw("You must provide a name for the item!")
        const amount = this.GetInputValue("amount", cache) || this.GetOptionValue("amount", cache); if (!amount) throw("You must provide the amount of the item!")
        const emoji = this.GetInputValue("emoji", cache) || this.GetOptionValue("emoji", cache);
        let items = this.GetInputValue("items", cache)

        if(!items) items = []; items.push({
            name: name,
            amount: amount,
            emoji: emoji
        })
        
        this.StoreOutputValue(items, "items", cache);
        this.RunNextBlock("action", cache);
    }
};