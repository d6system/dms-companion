module.exports = {
    name: "Get Minecraft Server Info",

    description: "Gets server's MOTD, online players, etc.",

    category: ".artemsnite",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "ip",
            "name": "IP",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The IP of the server.",
            "types": ["text", "unspecified"]
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
            "id": "motd",
            "name": "MOTD",
            "description": "Type: List, Text\n\nDescription: The Message Of The Day obtained.",
            "types": ["list", "text"]
        },
        {
            "id": "playercount",
            "name": "Players Count",
            "description": "Type: Text\n\nDescription: The Players count that are on a server.",
            "types": ["number", "text"]
        },
        {
            "id": "maxplayers",
            "name": "Max Players",
            "description": "Type: Text\n\nDescription: The Max count of players available on a server.",
            "types": ["number", "text"]
        },
        {
            "id": "icon",
            "name": "Icon",
            "description": "Type: Text\n\nDescription: Returns a server icon in Base64.",
            "types": ["text"]
        },
        {
            "id": "isserveronline",
            "name": "Is Server Online",
            "description": "Type: Boolean\n\nDescription: Returns true if the server is online.",
            "types": ["boolean"]
        }
    ],

    code(cache) {
        const pingip = "https://api.mcsrvstat.us/3/" + this.GetInputValue("ip", cache);
        const fetch = require("node-fetch");
        async function fetchData(ipa) {
            try {
                const response = await fetch(ipa);
                const data = await response.json();
                return data;
            } catch (error) {
                console.error('Server info fetch failed:', error.message);
                return null; // or throw error if you want to propagate the error to the caller
            }
        }
        let info;
        fetchData(pingip).then(data => {
            if (data) {
                this.StoreOutputValue(data.motd.clean, "motd", cache);
                this.StoreOutputValue(data.players.online, "playercount", cache);
                this.StoreOutputValue(data.players.max, "maxplayers", cache);
                this.StoreOutputValue(data.icon, "icon", cache);
                this.StoreOutputValue(data.online, "isserveronline", cache);

                this.RunNextBlock("action", cache);
            }
        });
    }
}