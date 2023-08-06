module.exports = {
    name: "Database SQL Query",

    description: "Wenn you get an Request to the Webserver this Block gets Triggerd. Made by @ju#1111",

    category: "Database Stuff",

    inputs: [
		{
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "query",
            "name": "SQL query",
            "description": "Type: Number\n\nDescription: Port where the server gets Deployed!\nDefaults to '3000'. Ports under 1000 are reserved for root (Linux) thats not recommend!\nWill default to 3000!",
            "types": ["text"]
        },  
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
            "id": "response",
            "name": "Server-response",
            "description": "Type: Object\n\nDescription: The Server Response Object needed to Respond to the Webclient.",
            "types": ["unspecified"]
        }
    ],

    async code(cache) {
		const dbcon = this.getDBB().database
		if(typeof dbcon === "undefined") return new Error("Database is not Initilized");

		const query = this.GetInputValue("query", cache);
		const [rows,fields] = await dbcon.con.execute(query);
		
		this.StoreOutputValue(rows, "response", cache);
        this.RunNextBlock("action", cache);      
    }
}