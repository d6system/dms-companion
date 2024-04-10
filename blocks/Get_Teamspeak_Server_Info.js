module.exports = {
    name: "Get Teamspeak Server Info",

    description: "Get Teamspeak Server Information",

    category: "Server Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "host",
            "name": "host",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Object, Boolean, Date, Number, Text, List\n\nDescription: The value to send to your console.",
            "types": ["text", "unspecified"],
            "required": true
        },
        {
            "id": "queryport",
            "name": "queryport",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Object, Boolean, Date, Number, Text, List\n\nDescription: The value to send to your console.",
            "types": ["text", "unspecified"]
        },
        {
            "id": "serverport",
            "name": "serverport",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Object, Boolean, Date, Number, Text, List\n\nDescription: The value to send to your console.",
            "types": ["text", "unspecified"],
            "required": true
        },
        {
            "id": "username",
            "name": "username",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Object, Boolean, Date, Number, Text, List\n\nDescription: The value to send to your console.",
            "types": ["text", "unspecified"],
            "required": true
        },
        {
            "id": "password",
            "name": "password",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Object, Boolean, Date, Number, Text, List\n\nDescription: The value to send to your console.",
            "types": ["text", "unspecified"],
            "required": true
        },
        {
            "id": "nickname",
            "name": "nickname",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Object, Boolean, Date, Number, Text, List\n\nDescription: The value to send to your console.",
            "types": ["text", "unspecified"]
        },
        {
            "id": "servernum",
            "name": "Server Number (optional)",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Object, Boolean, Date, Number, Text, List\n\nDescription: The value to send to your console.",
            "types": ["number", "unspecified"]
        }
    ],

    options: [
        {
            "id": "option",
            "name": "Option",
            "description": "",
            "type": "SELECT",
            "options": {
                "1": "Online User Counter",
                "2": "Online User <LIST>",
                "3": "Teamspeak Server MaxSlots",
                "4": "Teamspeak Server Uptime",
                "5": "Teamspeak Server Name",
                "6": "Teamspeak Server Status (online/offline)",
                "7": "Debug List (consoleLog)"
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
            "description": "Type: Unspecified\n\nDescription: The information obtained from the object.",
            "types": ["unspecified", "text", "number", "list"]
        }
    ],

    async code(cache) {
        const { TeamSpeak } = await this.require("ts3-nodejs-library")
        var host = this.GetInputValue("host", cache);
        var queryport = this.GetInputValue("queryport", cache);
        var serverport = this.GetInputValue("serverport", cache);
        var username = this.GetInputValue("username", cache);
        var password = this.GetInputValue("password", cache);
        var nickname = this.GetInputValue("nickname", cache);
        var serverNum = this.GetInputValue("servernum", cache);
        const option = this.GetOptionValue("option", cache);

        let result;

        //create a new connection
        await TeamSpeak.connect({
            host: host,
            //protocol: QueryProtocol.RAW, //optional
            queryport: queryport, //optional
            serverport: serverport,
            username: username,
            password: password,
            nickname: nickname
        }).then(async teamspeak => {
            let onlineClients = await teamspeak.clientList({ clientType: 0 })
            const TeamSpeakServer = await teamspeak.serverList()

                if(serverNum == undefined){
                    serverNum = 0;
                }

                if (option == 1) {
                    result = onlineClients.length;
                }
                if (option == 2) {
                    let users = [];
                    onlineClients.forEach(client => {
                        users.push(client.propcache.clientNickname)
                    });
                    result = users;
                }
                if (option == 3) {
                    console.log(TeamSpeakServer[serverNum].propcache.virtualserverMaxclients);
                }
                if (option == 4) {
                    result = (TeamSpeakServer[serverNum].propcache.virtualserverUptime);
                }
                if (option == 5) {
                    result = (TeamSpeakServer[serverNum].propcache.virtualserverName);
                }
                if (option == 6) {
                    result = (TeamSpeakServer[serverNum].propcache.virtualserverStatus);
                }
                if (option == 7) {
                    console.log = (TeamSpeakServer);
                }
            
            await teamspeak.quit();
            
        })
        this.StoreOutputValue(result, "result", cache);
        this.RunNextBlock("action", cache);
    }
}