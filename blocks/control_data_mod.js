module.exports = {

name: "Control Data [MOD]",

    description: "Adds more value or sets a new value to the data.",

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
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The file path to save the data to.",
            "types": ["text", "unspecified"]
        },
        {
            "id": "name",
            "name": "Name",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The name for this data.",
            "types": ["text", "unspecified"]
        },
        {
            "id": "value",
            "name": "Value",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Object, Boolean, Date, Number, Text, List\n\nDescription: The value for this data.",
            "types": ["unspecified", "undefined", "null", "object", "boolean", "date", "number", "text", "list"]
        },
        {
            "id": "target",
            "name": "Server/Member/User",
            "description": "Acceptable Types: Object, Text, Unspecified\n\nDescription: The server/member/user for the data. Supports server/member/user ID. Only use this input if you have not select the option \"None\" in \"Data Type\". (OPTIONAL)",
            "types": ["object", "text", "unspecified"]
        }
    ],

    options: [
        {
            "id": "path",
            "name": "File Path",
            "description": "Description: The file path to save the data to.",
            "type": "TEXT"
        },
        {
            "id": "name",
            "name": "Name",
            "description": "Description: The name for this data.",
            "type": "TEXT"
        },
        {
            "id": "value",
            "name": "Value",
            "description": "Description: The value for this data.",
            "type": "TEXT"
        },
        {
            "id": "action_type",
            "name": "Action Type",
            "description": "Description: The type of action for this data. If \"Add\", inserted a number in the \"Value\" input add to the current number in the data or use a negative number to subtract.",
            "type": "SELECT",
            "options": {
                "set": "Set",
                "add": "Add"
            }
        },
        {
            "id": "data_type",
            "name": "Data Type",
            "description": "Description: The type of this data. If not \"None\", you need to put a value in the \"Server/Member/User\" input depending on which option you selected here.",
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
            "name": "New Data",
            "description": "Type: All types\n\nDescription: Sends the new data.",
            "types": ["unspecified", "undefined", "null", "object", "boolean", "date", "number", "text", "list"]
        }
    ],

    async code(cache, DBB) {
        
        var name = this.GetInputValue("name", cache) || this.GetOptionValue("name", cache);

        var value = this.GetInputValue("value", cache) || this.GetOptionValue("value", cache);

        const target = this.GetInputValue("target", cache);
        const action_type = this.GetOptionValue("action_type", cache) + "";
        const data_type = this.GetOptionValue("data_type", cache) + "";
        var path = this.GetInputValue("path", cache) || this.GetOptionValue("path", cache) === "" ?  DBB.File.paths.data : this.GetOptionValue("path", cache);
        var data         

        function delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
        
        if(path.startsWith('./')) path = path.replace('./', '../');
        
        try {
            data = require(path)
        } catch (err) {
            data = ({
                "dbb": {
                    "prefixes": {
                        "main": "!",
                        "servers": {}
                    },
                    "owners": []
                },
                "discord": {
                    "servers": {},
                    "members": {},
                    "users": {}
                },
                "blocks": {},
                "custom": {}
            })
            saveData()
            DBB.Core.console("WARN", `Could not find the file '${path}' so created a new file`)
            await delay(100)
            data = require(path)
        }


        if(action_type == "add" && data_type == "member") {
            let data = this.getData(name, typeof target == "object" ? target.id +target.guild.id : target, data_type);
            if(!isNaN(data)) value += data;
        }
        if(action_type == "add") {
            let data = this.getData(name, typeof target == "object" ? target.id : target, data_type);
            if(!isNaN(data)) value += data;
        }

        if(["server", "user"].includes(data_type)) {
            setData(name, value, typeof target == "object" ? target.id : target, data_type);
        }
        if(data_type == "member") {
            setData(name, value, typeof target == "object" ? target.id + target.guild.id: target, data_type);
        } 
        if(data_type == "none") { // "none"
            try {
                setData(name, value);
            } catch (err) {
                DBB.Core.console("WARN", `${err}`)
            }
            
        }

        function saveData () {
            try {
                DBB.File.writeFile(path.replace('../', './'), data)
            } catch (err) {
                console.log(err)
            }
            
        }

        function setData (
            name,
            value,
            target,
            type = 'custom'
          ) {
            if (type != 'custom' && !target) {
              return false
            }
            target = target + ''
            switch (type) {
              case 'server': {
                const servers = data.discord.servers
                if (!(target in servers)) {
                  servers[target] = {}
                }
                servers[target][name] = value
                break
              }
              case 'member': {
                const member = data.discord.members
                if (!(target in member)) {
                  member[target] = {}
                }
                member[target][name] = value
                break
              }
              case 'user': {
                const user = data.discord.users
                if (!(target in user)) {
                  user[target] = {}
                }
                user[target][name] = value
                break
              }
              case 'block': {
                const blocks = data.blocks
                if (!(target in blocks)) {
                  blocks[target] = {}
                }
                blocks[target][name] = value
                break
              }
              default:
                data.custom[name] = value
                break
            }
            saveData()
            return true
          }

        this.StoreOutputValue(value, "value", cache)
        this.StoreOutputValue(name, "nameOutput", cache);
        this.RunNextBlock("action", cache);
        
    }
}