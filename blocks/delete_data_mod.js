module.exports = {
    name: "Delete Data [MOD]",

    description: "Deletes the data.",

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
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The file path to delete the data from.",
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
            "description": "Description: The file path to delete the data from.",
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
        }
    ],

    code(cache, DBB) {

        var name = this.GetInputValue("name", cache) || this.GetOptionValue("name", cache);
        const target = this.GetInputValue("target", cache);
        const data_type = this.GetOptionValue("data_type", cache) + "";
        var path = this.GetInputValue("path", cache) || this.GetOptionValue("path", cache) || DBB.File.paths.data;
        var data         
        
        if(path.startsWith('./')) path = path.replace('./', '../');
       
        try {
            data = require(path)            
        } catch (err) {
            DBB.Core.console("WARN", `The file '${path}' was not found (Delete Data [MOD] block)`)
            this.RunNextBlock("action", cache);
            return
        }

        if(["server", "user"].includes(data_type)) {
            setData(name, undefined, typeof target == "object" ? target.id : target, data_type);
        }
        if(data_type == "member") {
            setData(name, undefined, typeof target == "object" ? target.id + target.guild.id: target, data_type);
        } 
        if(data_type == "none") { // "none"
            try {
                setData(name, undefined);
            } catch (err) {
                console.log(err)
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
            try {
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
            } catch (err) {
                console.log(err)
            }
          }

        this.RunNextBlock("action", cache);
    }
}