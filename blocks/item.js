module.exports = {

    name: "Create Item List",
    description: "Creates a list of items with the specified properties.",
    category: "Inventory",
    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Executes this block.",
            "types": ["action"]
        },
        {
            "id": "name",
            "name": "Name",
            "description": "The name of the item(s) to create.",
            "types": ["text"],
        },
        {
            "id": "amount",
            "name": "Amount",
            "description": "The amount of the item(s) to create.",
            "types": ["number"],

        },
        {
            "id": "emoji",
            "name": "Emoji",
            "description": "The emoji to associate with the item(s).",
            "types": ["text"],
        },
        {
            "id": "image",
            "name": "Image",
            "description": "The image URL for the item(s).",
            "types": ["text"],
        },
        {
            "id": "rarities",
            "name": "Rarities",
            "description": "The rarity of the item(s).",
            "types": ["text"],
            "options": {
                "None": "None",
                "Common": "Common",
                "Uncommon": "Uncommon",
                "Rare": "Rare",
                "Epic": "Epic",
                "Legendary": "Legendary",
                "Ultimate": "Ultimate",
                "Mythic": "Mythic"
            },
        },
        {
            "id": "durability",
            "name": "Durability",
            "description": "The durability of the item(s). Use -1 for unlimited.",
            "types": ["number"],
        },
        {
            "id": "bound",
            "name": "Bound",
            "description": "Whether the item(s) are bound to the user who creates them.",
            "types": ["boolean"],
        },
        {
            "id": "other",
            "name": "Other",
            "description": "Whether the item(s) have other special properties.",
            "types": ["boolean"],
        },
        {
            "id": "extraone",
            "name": "Extra One",
            "description": "An extra property for the item(s).",
            "types": ["text"],
            "required": false
        },
        {
            "id": "extratwo",
            "name": "Extra Two",
            "description": "An extra property for the item(s).",
            "types": ["text"],
            "required": false
        },
        {
            "id": "items",
            "name": "Items",
            "description": "A list of items to add to the inventory.",
            "types": ["list"],
            "required": false
        }
    ],
    options: [
        {
            "id": "name",
            "name": "Name",
            "description": "The name of the item(s) to create.",
            "type": "TEXT"
        },
        {
            "id": "amount",
            "name": "Amount",
            "description": "The amount of the item(s) to create.",
            "type": "NUMBER"
        },
        {
        "id": "emoji",
        "name": "Emoji",
        "description": "Acceptable Types: Text\n\nDescription: The emoji to use for this item.",
        "types": ["text"],
        "required": true
    },
    {
        "id": "image",
        "name": "Image",
        "description": "Acceptable Types: Text\n\nDescription: The image to use for this item.",
        "types": ["text"],
        "required": true
    },
    {
        "id": "rarities",
        "name": "Rarities",
        "description": "Acceptable Types: Text\n\nDescription: The rarity of this item.",
        "types": ["text"],
        "options": {
            "None": "None",
            "Common": "Common",
            "Uncommon": "Uncommon",
            "Rare": "Rare",
            "Epic": "Epic",
            "Legendary": "Legendary",
            "Ultimate": "Ultimate",
            "Mythic": "Mythic"
        },
        "required": true
    },
    {
        "id": "durability",
        "name": "Durability",
        "description": "Acceptable Types: Number\n\nDescription: The durability of this item. Use \"-1\" for unlimited durability.",
        "types": ["number"],
        "required": true
    },
    {
        "id": "bound",
        "name": "Bound",
        "description": "Acceptable Types: Boolean\n\nDescription: Whether this item is bound to a user or not.",
        "types": ["boolean"],
        "required": true
    },
    {
        "id": "other",
        "name": "Other",
        "description": "Acceptable Types: Boolean\n\nDescription: Whether this item is an 'other' item or not.",
        "types": ["boolean"],
        "required": true
    },
    {
        "id": "extra_one",
        "name": "Extra One",
        "description": "Acceptable Types: Text\n\nDescription: An extra string field for this item.",
        "types": ["text"]
    },
    {
        "id": "extra_two",
        "name": "Extra Two",
        "description": "Acceptable Types: Text\n\nDescription: An extra string field for this item.",
        "types": ["text"]
    },
    {
        "id": "items",
        "name": "Items",
        "description": "Acceptable Types: List\n\nDescription: A list of items to modify.",
        "types": ["list"],
        "required": true
    }
],
"options": [
    {
        "id": "name",
        "name": "Name",
        "description": "Description: The name of this item.",
        "type": "TEXT"
    },
    {
        "id": "amount",
        "name": "Amount",
        "description": "Description: The amount of this item.",
        "type": "NUMBER"
    },
    {
        "id": "emoji",
        "name": "Emoji",
        "description": "Description: The emoji to use for this item.",
        "type": "TEXT"
    },
    {
        "id": "image",
        "name": "Image",
        "description": "Description: The image to use for this item.",
        "type": "TEXT"
    },
    {
        "id": "rarities",
        "name": "Rarities",
        "description": "Description: The rarity of this item.",
        "type": "SELECT",
        "options": {
            "None": "None",
            "Common": "Common",
            "Uncommon": "Uncommon",
            "Rare": "Rare",
            "Epic": "Epic",
            "Legendary": "Legendary",
            "Ultimate": "Ultimate",
            "Mythic": "Mythic"
            }
            },
            {
            "id": "durability",
            "name": "Durability",
            "description": "Acceptable Types: Number\n\nDescription: The durability of the item. Enter -1 for unlimited.",
            "types": ["number"],
            },
            {
            "id": "bound",
            "name": "Bound",
            "description": "Acceptable Types: Boolean\n\nDescription: Whether the item is bound or not.",
            "types": ["boolean"],
            },
            {
            "id": "other",
            "name": "Other",
            "description": "Acceptable Types: Boolean\n\nDescription: Whether the item has additional properties or not.",
            "types": ["boolean"],
            },
            {
            "id": "extra_one",
            "name": "Extra One",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The first additional property of the item.",
            "types": ["text", "unspecified"]
            },
            {
            "id": "extra_two",
            "name": "Extra Two",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The second additional property of the item.",
            "types": ["text", "unspecified"]
            },
            {
            "id": "items",
            "name": "Items",
            "description": "Acceptable Types: List, Unspecified\n\nDescription: The list of items.",
            "types": ["list", "unspecified"],
            }
            ],
            options: [
            {
            "id": "name",
            "name": "Name",
            "description": "Description: The name of the item.",
            "type": "TEXT"
            },
            {
            "id": "amount",
            "name": "Amount",
            "description": "Description: The amount of the item.",
            "type": "NUMBER"
            },
            {
            "id": "emoji",
            "name": "Emoji",
            "description": "Description: The emoji of the item.",
            "type": "TEXT"
            },
            {
            "id": "image",
            "name": "Image",
            "description": "Description: The image of the item.",
            "type": "TEXT"
            },
            {
            "id": "rarities",
            "name": "Rarities",
            "description": "Description: The rarity of the item.",
            "type": "SELECT",
            "options": {
            "None": "None",
            "Common": "Common",
            "Uncommon": "Uncommon",
            "Rare": "Rare",
            "Epic": "Epic",
            "Legendary": "Legendary",
            "Ultimate": "Ultimate",
            "Mythic": "Mythic"
            }
            },
            {
            "id": "durability",
            "name": "Durability",
            "description": "Description: The durability of the item. Enter -1 for unlimited.",
            "type": "NUMBER"
            },
            {
            "id": "bound",
            "name": "Bound",
            "description": "Description: Whether the item is bound or not.",
            "type": "SELECT",
            "options": {
            "false": "Unbound",
            "true": "Bound"
            }
            },
            {
            "id": "other",
            "name": "Other",
            "description": "Description: Whether the item has additional properties or not.",
            "type": "SELECT",
            "options": {
            "false": "No",
            "true": "Yes"
            }
            },
            {
            "id": "extra_one",
            "name": "Extra One",
            "description": "Description: The first additional property of the item.",
            "type": "TEXT"
            },
            {
            "id": "extra_two",
            "name": "Extra Two",
            "description": "Description: The second additional property of the item.",
            "type": "TEXT"
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
            "id": "items",
            "name": "Items",
            "description": "Type: List\n\nDescription: The list of items.",
            "types": ["list"]
            },
            {
            "id": "list_length",
            "name": "List Length",
            "description": "Type: Number\n\nDescription: The length of the list of items.",
            "types": ["number"]
            },
            {
            "id": "single_item",
            "name": "Single Item",
            "description": "Type: Object\n\nDescription: A single item object with the specified properties.",
            "types": ["object"]
            }
            ],
            code(cache) {
    const name = this.GetOptionValue("name", cache) || this.GetInputValue("name", cache);
    const amount = parseInt(this.GetOptionValue("amount", cache) || this.GetInputValue("amount", cache));
    const emoji = this.GetInputValue("emoji", cache);
    const image = this.GetInputValue("image", cache);
    const rarity = this.GetInputValue("rarities", cache);
    const durability = this.GetInputValue("durability", cache);
    const isBound = this.GetInputValue("bound", cache);
    const hasOther = this.GetInputValue("other", cache);
    const extraOne = this.GetInputValue("extra_one", cache);
    const extraTwo = this.GetInputValue("extra_two", cache);
    const items = this.GetInputValue("items", cache) || [];
    const newItem = {
        name,
        amount,
        emoji,
        image,
        rarity,
        durability,
        isBound,
        hasOther,
        extraOne,
        extraTwo
    };
    items.push(newItem);
    this.StoreOutputValue(items, "items", cache);
    this.StoreOutputValue(items.length, "list_length", cache);
    this.StoreOutputValue(newItem, "single_item", cache);
    this.RunNextBlock("action", cache);
}
    }
