module.exports = {
    name: "Get Minecraft Server Info With Option",

    description: "Gets server's MOTD, online players, etc. (with option)",

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

    options: [
        {
            "id": "option",
            "name": "Server Info",
            "description": "Description: The server information to get.",
            "type": "SELECT",
            "options": {
                1: "MOTD [List]",
                2: "Player Count [Number]",
                3: "Max players [Number]",
                4: "Icon URL [Text]",
                5: "Is Server Online? [Boolean]"
            }
        },
        {
            "id": "ip",
            "name": "IP",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The IP of the server.",
            "type": "text"
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
            "id": "output",
            "name": "Output",
            "description": "Type: Unspecified, List, Number, Text, Boolean\n\nDescription: The information obtained from the server.",
            "types": ["unspecified", "list", "number", "text", "boolean"]
        }
    ],

    code(cache) {
        const inputip = this.GetInputValue("ip", cache, false, undefined) || this.GetOptionValue("ip", cache, false, undefined);
        const pingip = "https://api.mcsrvstat.us/3/" + inputip;
        const icon = "https://eu.mc-api.net/v3/server/favicon/" + this.GetInputValue("ip", cache);
        const fetch = require("node-fetch");
        async function fetchData(ipa) {
            try {
                const response = await fetch(ipa);
                const data = await response.json();
                return data;
            } catch (error) {
                console.error('Server info fetch failed:', error.message);
                return null;
            }
        }
        const option = parseInt(this.GetOptionValue("option", cache));
        let result;
        fetchData(pingip).then(data => {
            if (data) {
                let result;
                switch(option) {
                        case 1:
                            result = data.motd;
                            result = result.clean;
                            break;
                        case 2:
                            result = data.players;
                            result = result.online;
                            break;
                        case 3:
                            result = data.player;
                            result = result.max;
                            break;
                        case 4:
                            result = icon;
                            break;
                        case 5:
                            result = data.isonline;
                            break;
                    }
	        if (isonline) {
                        this.StoreOutputValue(result, "result", cache);
                }
                else {
                        this.StoreOutputValue("", "result", cache); 
                }
                this.RunNextBlock("action", cache);
            }
        });
    }
}