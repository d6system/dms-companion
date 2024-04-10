module.exports = {
    name: "Get Member Activity Info",

    description: "Gets the member activity information.",

    category: "Member Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "presence",
            "name": "Activity",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The activity from member to get its information.",
            "types": ["object", "unspecified"],
            "required": true
        }
    ],

    options: [
        {
            "id": "presence_info",
            "name": "Activity Info",
            "description": "Description: The activity information to get.",
            "type": "SELECT",
            "options": {
                1: "Activity Name [Text]",
                2: "Activity Details [Text]",
                3: "Activity State/Custom Status [Text]",
                4: "Activity Party ID [Text]",
                5: "Current Activity Party Size [Number]",
                6: "Maximum Activity Party Size [Number]",
                7: "Activity Date Start [Date]",
                8: "Activity Date End [Date]",
                9: "Activity Large Image Text [Text]",
                10: "Activity Small Image Text [Text]",
                11: "Activity Large Image URL [Text]",
                12: "Activity Small Image URL [Text]",
                13: "Activity Large Image ID [Text]",
                14: "Activity Small Image ID [Text]",
                15: "Activity Stream URL [Text]",
                16: "Activity Type [Text]",
                17: "Activity Aplication ID [Text]",
                18: "Activity Created At [Date]",
                19: "Activity Emoji (Custom Status) [Text]"
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
            "description": "Type: Unspecified\n\nDescription: The information obtained from the activity.",
            "types": ["unspecified"]
        }
    ],

   async code(cache) {
        const activity = this.GetInputValue("presence", cache);
        const activity_info = parseInt(this.GetOptionValue("presence_info", cache));

        const {ActivityType} = require("discord.js");
        const simplify = txt => txt.replace(/([A-Z])/g, ' $1').trim();

        let result;
        switch(activity_info) {
            case 1:
                result = activity.name;
                break;
            case 2:
                result = activity.details;
                break;
            case 3:
                result = activity.state;
                break;
            case 4:
                result = activity.party && activity.party.id;
                break;
            case 5:
                result = activity.party && activity.party.size[0];
                break;
            case 6:
                result = activity.party && activity.party.size[1];
                break;
            case 7:
                result = activity.timestamps && activity.timestamps.start;
                break;
            case 8:
                result = activity.timestamps && activity.timestamps.end;
                break;
            case 9:
                result = activity.assets && activity.assets.largeText;
                break;
            case 10:
                result = activity.assets && activity.assets.smallText;
                break;
            case 11:
                result = activity.assets && activity.assets.largeImageURL({format: "png"});
                break;
            case 12:
                result = activity.assets && activity.assets.smallImageURL({format: "png"});
                break;
            case 13:
                result = activity.assets && activity.assets.largeImage;
                break;
            case 14:
                result = activity.assets && activity.assets.smallImage;
                break;
            case 15:
                result = activity.url;
                break;
            case 16:
                result = simplify(ActivityType[activity.type]);
                break;
            case 17:
                result = activity.applicationID;
                break;
            case 18:
                result = activity.createdAt;
                break;
            case 19:
                result = activity.emoji;
                break;
        }

        this.StoreOutputValue(result, "result", cache);
        this.RunNextBlock("action", cache);
    }
}