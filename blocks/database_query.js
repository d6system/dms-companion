module.exports = {
    name: "Database SQL Query",

    description: "This block is used to execute a SQL query and retrieve, manipulate, or manage data in a SQL database. Created by @ju#1111",

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
            "name": "SQL Query",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: A SQL query that retrieves, modifies, or manages data in a SQL database by specifying operations and conditions to interact with the database tables.",
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
            "id": "erroraction",
            "name": "Action (Error)",
            "description": "Type: Action\n\nDescription: Executes the following blocks when an error occurs.",
            "types": ["action"]
        },
        {
            "id": "response",
            "name": "Server Response",
            "description": "Type: Object, Unspecified\n\nDescription: The server response object that contains relevant data or information in response to the query.",
            "types": ["unspecified"]
        },
        {
            "id": "errormsg",
            "name": "Error Message",
            "description": "Type: Text, Unspecified\n\nDescription: The error message if an error occurs.",
            "types": ["text", "unspecified"]
        }
    ],

    async code(cache) {
        try {
            const dbcon = this.getDBB().database;
            if (typeof dbcon === "undefined") {
                throw new Error("Database is not initialized");
            }
    
            const query = this.GetInputValue("query", cache);
            const [rows, fields] = await dbcon.con.execute(query);
    
            this.StoreOutputValue(rows, "response", cache);
            this.RunNextBlock("action", cache);
        } catch (error) {
            console.log(error);
            this.StoreOutputValue(error.message, "errormsg", cache);
            this.RunNextBlock("erroraction", cache);
        }
    }
}