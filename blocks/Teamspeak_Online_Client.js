module.exports = {
    name: "Get Teamspeak Online User",

    description: "Get Online User Data",

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
        }
    ],

    options: [
        {
            "id": "option",
            "name": "Option",
            "description": "",
            "type": "SELECT",
            "options": {
                "A": "Online User Counter",
                "B": "Online User <LIST>",
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

            if (option == "A")
            {
                result = onlineClients.length;
            }
            if (option == "B") {
                result = onlineClients;
            }

        })

        this.StoreOutputValue(result, "result", cache);
        this.RunNextBlock("action", cache);
    }
}