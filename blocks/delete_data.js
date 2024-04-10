module.exports = {
    name: "Delete Data",

    description: "Deletes the data.",

    category: "Data Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
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

    code(cache) {
        var name = this.GetInputValue("name", cache) + "";
        if(name == "undefined") {
            name = this.GetOptionValue("name", cache);
        }        
        const target = this.GetInputValue("target", cache);
        const data_type = this.GetOptionValue("data_type", cache) + "";

        if(["server", "user"].includes(data_type)) {
            this.setData(name, undefined, typeof target == "object" ? target.id : target, data_type);
        }
        if(data_type == "member") {
             this.setData(name, undefined, typeof target == "object" ? target.id + target.guild.id: target, data_type);
        } 
        if(data_type == "none") { // "none"
            this.setData(name, undefined);
        }       

        this.RunNextBlock("action", cache);
    }
}