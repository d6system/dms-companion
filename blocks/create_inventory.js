module.exports = {
    name: "Create Inventory",
    
    description: "Creates an inventory with the given items list and an optional item display template!\n\nCredits: by @T-45",
    
    category: "Create Inventory",
    
    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "text",
            "name": "Item Template",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The display text template of the items. (OPTIONAL)\n\nUse:\n   {name} | For the item's name.\n   {amount} | For the item's quantity.\n   {emoji} | For the item's emoji.\n\nDefault: {emoji} {name} - {amount}",
            "types": ["text", "unspecified"]
        },
        {
            "id": "items",
            "name": "Items",
            "description": "Acceptable Types: List, Unspecified\n\nDescription: The items list; use the \"Create Item\" block to create an item and connect the list to this input.",
            "types": ["list", "unspecified"],
            "required": true
        },
    ],
    
    options: [
        {
            "id": "text",
            "name": "Item Template",
            "description": "Description: The display text template of the items. (OPTIONAL)\n\nUse in the text:\n   {name} | For the item's name.\n   {amount} | For the item's quantity.\n   {emoji} | For the item's emoji.\n\nDefault: {emoji} {name} - {amount}",
            "type": "TEXT"
        },
        {
            "id": "display",
            "name": "Display Empty Items",
            "description": "Description: If \"No\" then any item that has a quantity of 0 will not be displayed, if \"Yes\" it will be displayed.",
            "type": "SELECT",
            "options": {
                1: "No",
                2: "Yes"
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
            "id": "inv",
            "name": "Inventory",
            "description": "Type: Text\n\nDescription: The created inventory text.",
            "types": ["text"]
        }
    ],
    
    async code(cache) {
        const template = this.GetInputValue("text", cache) || this.GetOptionValue("text", cache) || "{emoji} {name} - {amount}";
        const items = this.GetInputValue("items", cache); if (!items) throw("You must provide an items list to create the inventory!");
        const display = this.GetOptionValue("display", cache);
        const style = this.GetOptionValue("style", cache)
        let inventory = [];

        for (const item of items) {
            if (item.amount > 0) {
                addInvItem(item);
            } else {
                if (display == 2) {
                    addInvItem(item);
                }
            }
        }

        function addInvItem(item) {
            inventory.push(template.replaceAll(/{name}|{amount}|{emoji}/gi, function (thing) {
                const things = {
                    "{name}": item.name,
                    "{amount}": item.amount,
                    "{emoji}": item.emoji !== undefined ? item.emoji : ""
                }
                return things[thing]
            }))
        }

        this.StoreOutputValue(inventory.join("\n\n"), "inv", cache);
        this.RunNextBlock("action", cache);
    }
};