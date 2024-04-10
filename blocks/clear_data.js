module.exports = {
    name: "Clear Data",

    description: "Clears entire Data Parts",

    category: "Data Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        }
    ],

    options: [
        {
            "id": "data_type",
            "name": "Data Type",
            "description": "Description: The type of this data. If not \"None\", you need to put a value in the \"Server/Member/User\" input depending on which option you selected here.",
            "type": "SELECT",
            "options": {
                "custom": "Custom",
                "server": "Servers",
                "member": "Members",
                "user": "Users"
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
        const data_type = this.GetOptionValue("data_type", cache) + "";

        if(data_type == "server") {
             this.getDBB().Data.data.discord.servers = {}
             this.saveData()
        } 
        if(data_type == "user") {
            this.getDBB().Data.data.discord.users = {}
            this.saveData()
        } 
        if(data_type == "member") {
            this.getDBB().Data.data.discord.members = {}
            this.saveData()
        } 
        if(data_type == "custom") {
            this.getDBB().Data.data.custom = {}
            this.saveData()
        }

        this.RunNextBlock("action", cache);
        
    }
}