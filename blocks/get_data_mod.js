module.exports = {
    name: "Get Data [MOD]",

    description: "Gets the value of the data.",

    category: "Data Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"],
            "required": true
        },
        {
            "id": "path",
            "name": "File Path",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The file path to get the data from.",
            "types": ["text", "unspecified"]
        },
        {
            "id": "name",
            "name": "Name",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The name of the data.",
            "types": ["text", "unspecified"]
        },
        {
            "id": "target",
            "name": "Server/Member/User",
            "description": "Acceptable Types: Object, Text, Unspecified\n\nDescription: The server/member/user of the data. Supports server/member/user ID. Only use this input if you have not select the option \"None\" in \"Data Type\". (OPTIONAL)",
            "types": ["object", "text", "unspecified"]
        }
    ],

    options: [
        {
            "id": "path",
            "name": "File Path",
            "description": "Description: The file path to get the data from.",
            "type": "TEXT"
        },
        {
            "id": "name",
            "name": "Name",
            "description": "Description: The name for this data.",
            "type": "TEXT"
        },
        {
            "id": "data_type",
            "name": "Data Type",
            "description": "Description: The type of the data. If not \"None\", you need to put a value in the \"Server/Member/User\" input depending on which option you selected here.",
            "type": "SELECT",
            "options": {
                "none": "None",
                "server": "Server",
                "member": "Member",
                "user": "User"
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
            "id": "nameOutput",
            "name": "Name",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["text"]
        },
        {
            "id": "value",
            "name": "Value",
            "description": "Type: Unspecified\n\nDescription: The value of the data.",
            "types": ["unspecified"]
        }
    ],

    code(cache, DBB) {

        var name = this.GetInputValue("name", cache) || this.GetOptionValue("name", cache);
        const target = this.GetInputValue("target", cache);
        const data_type = this.GetOptionValue("data_type", cache) + "";
        var path = this.GetInputValue("path", cache) || this.GetOptionValue("path", cache) || DBB.File.paths.data;
        if(path.startsWith('./')) path = path.replace('./', '../');
        var data

        try {
            data = require(path)            
        } catch (err) {
            DBB.Core.console("WARN", `The file '${path}' was not found (Get Data [MOD] block)`)
            this.RunNextBlock("action", cache);
            return
        }

        let value;
        if(["server", "user"].includes(data_type)) {
            value = getData(name, typeof target == "object" ? target.id : target, data_type);
        }
        if(data_type == "member") {
            value = getData(name, typeof target == "object" ? target.id + target.guild.id: target, data_type);
        }

        if(data_type == "none"){ // "none"
            value = getData(name);
        }

        

        function getData (
            name,
            target,
            type = 'custom'
          ) {
            target = target + ''

            switch (type) {
              case 'server': {
                const server = data.discord.servers
                return target in server
                  ? server[target][name]
                  : undefined
              }
              case 'member': {
                const member = data.discord.members
                return target in member
                  ? member[target][name]
                  : undefined
              }
              case 'user': {
                const user = data.discord.users
                return target in user
                  ? user[target][name]
                  : undefined
              }
              case 'block': {
                const blocks = data.blocks
                return target in blocks
                  ? blocks[target][name]
                  : undefined
              }
              default:
                return data.custom[name]
            }
          }

        this.StoreOutputValue(value, "value", cache);
        this.StoreOutputValue(name, "nameOutput", cache);
        this.RunNextBlock("action", cache);
    }
}