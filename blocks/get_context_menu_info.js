module.exports = {
    name: "Get Context Menu Info",

    description: "Gets information of a context menu\n\nCredits: By @T-45",

    category: "Components",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "interaction",
            "name": "Interaction",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The interaciton to get information from.\n\n(Required)",
            "types": ["Object", "unspecified"],
            "required": true
        },
    ],

    options: [
        {
            "id": "type",
            "name": "Information",
            "description": "Description: The information you want.",
            "type": "SELECT",
            "options": {
                "tm": "Target Message",
                "tmem": "Target Member",
                "tu": "Target User"
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
            "id": "result",
            "name": "Result",
            "description": "Type: Object\n\nDescription: The result.",
            "types": ["object"]
        },

    ],

    async code(cache) {
        const interaciton = this.GetInputValue("interaction", cache);
        const type = this.GetOptionValue("type", cache);

        let result;

        switch (type) {
            case "tm":
                result = interaciton.targetMessage;
                break;
            case "tmem":
                result = interaciton.targetMember;
                break;
            case "tu":
                result = interaciton.targetUser;
                break;
        }

        this.StoreOutputValue(result, "result", cache);
        this.RunNextBlock("action", cache);
    }
}