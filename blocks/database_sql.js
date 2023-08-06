module.exports = {
    name: "Database SQL Setup",

    description: "When you get an Request to the Webserver this Block gets Triggerd. Made by @ju#1111",

    category: "Database Stuff",

	init(DBB){
		DBB.database = {
			initdb: (con) => {
				DBB.database.con = con
			},
			con: undefined
		}
	},
	
    auto_execute: true,

    inputs: [
        {
            "id": "host",
            "name": "Host",
            "description": "Type: Number\n\nDescription: Port where the server gets Deployed!\nDefaults to '3000'. Ports under 1000 are reserved for root (Linux) thats not recommend!\nWill default to 3000!",
            "types": ["text"]
        },
		{
            "id": "port",
            "name": "Port",
            "description": "Type: Number\n\nDescription: Port where the server gets Deployed!\nDefaults to '3000'. Ports under 1000 are reserved for root (Linux) thats not recommend!\nWill default to 3000!",
            "types": ["number"]
        },  
		{
            "id": "user",
            "name": "User",
            "description": "Type: Number\n\nDescription: Port where the server gets Deployed!\nDefaults to '3000'. Ports under 1000 are reserved for root (Linux) thats not recommend!\nWill default to 3000!",
            "types": ["text"]
        },  
		{
            "id": "password",
            "name": "Password",
            "description": "Type: Number\n\nDescription: Port where the server gets Deployed!\nDefaults to '3000'. Ports under 1000 are reserved for root (Linux) thats not recommend!\nWill default to 3000!",
            "types": ["text"]
        },  
		{
            "id": "database",
            "name": "Database",
            "description": "Type: Number\n\nDescription: Port where the server gets Deployed!\nDefaults to '3000'. Ports under 1000 are reserved for root (Linux) thats not recommend!\nWill default to 3000!",
            "types": ["text"]
        }		
    ],

    options: [],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        }
    ],

    async code(cache) {
		await this.require('mysql2');
		const mysql = require('mysql2/promise');
		const con = await mysql.createPool({
				host: this.GetInputValue("host", cache),
				port: this.GetInputValue("port", cache),
				user: this.GetInputValue("user", cache),
				password: this.GetInputValue("password", cache),
				database: this.GetInputValue("database", cache),
                waitForConnections: true,
                connectionLimit: 10,
                queueLimit: 0
		});
		
		this.getDBB().database.initdb(con)
        this.RunNextBlock("action", cache);       
    }
}