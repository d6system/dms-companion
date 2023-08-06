module.exports = {
    name: "Get Category Info",

    description: "Gets the category information.",

    category: "Channel Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "category",
            "name": "Category",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The category to get the information.",
            "types": ["object", "unspecified"],
            "required": true
        }
    ],

    options: [
        {
            "id": "category_info",
            "name": "Category Info",
            "description": "Description: The category information to get.",
            "type": "SELECT",
            "options": {
                1: "Category Channel List [List <Channel>]",
                2: "Category Created At [Date]",
                3: "Is Category Deletable By The Bot? [Boolean]",
                4: "Has Category Been Deleted? [Boolean]",
                5: "Category Server [Server]",
                6: "Category ID [Text]",
                7: "Is Category Manageable By The Bot? [Boolean]",
                8: "Category Member List [List <Member>]",
                9: "Category Name [Text]",
                10: "Category Category [Category]",
                11: "Category Category ID [Text]",
                12: "Is Category Permissions Synced With Category? [Boolean]",
                13: "Category Position [Number]",
                14: "Category Raw Position (API) [Number]",
                15: "Category Type [Text]",
                16: "Is Bot Able To Access The Category? [Boolean]",
                18: "Category Mention [Text]"
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
            "id": "result",
            "name": "Result",
            "description": "Type: Unspecified\n\nDescription: The information obtained from the category.",
            "types": ["unspecified"]
        }
    ],

    async code(cache) {
        const category = this.GetInputValue("category", cache);
        const category_info = parseInt(this.GetOptionValue("category_info", cache));

        const {ChannelType} = require("discord.js");
        const simplify = txt => txt.replace(/([A-Z])/g, ' $1').trim();

        let result;
        switch(category_info) {
            case 1:
                result = Array.from(category.children.cache.values());
                break;
            case 2:
                result = category.createdAt;
                break;
            case 3:
                result = category.deletable;
                break;
            case 4:
                result = category.deleted;
                break;
            case 5:
                result = category.guild;
                break;
            case 6:
                result = category.id;
                break;
            case 7:
                result = category.manageable;
                break;
            case 8:
                result = Array.from(category.members.value());
                break;
            case 9:
                result = category.name;
                break;
            case 10:
                result = category.parent;
                break;
            case 11:
                result = category.parentID;
                break;
            case 12:
                result = category.permissionsLocked || false;
                break;
            case 13:
                result = category.position;
                break;
            case 14:
                result = category.rawPosition;
                break;
            case 15:
                result = simplify(ChannelType[category.type]);
                break;
            case 16:
                result = category.viewable;
                break;
            case 18:
                result = category.toString();
                break;
        }

        this.StoreOutputValue(result, "result", cache);
        this.RunNextBlock("action", cache);
    }
}