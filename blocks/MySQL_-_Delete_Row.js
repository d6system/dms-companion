module.exports = {
    name: "Delete Row (MySQL)",

    description: "A block that will select existing rows, within the criteria, under the specified table in your database.\n\nSee \"MySQL Database Blocks\" in the blocks section of the Discord for more info.\n\nCreated by: @Wiz#7777",

    category: "MySQL",

    auto_execute: true,

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"],
        },
        {
            "id": "databasename",
            "name": "Database Name",
            "description": "Description: The name of the database you are making changes to.",
            "types": ["text"],
            "required": true
        },
        {
            "id": "tablename",
            "name": "Table Name",
            "description": "Description: The name of the table you'd like to make changes to.",
            "types": ["text"],
            "required": true
        },
        {
            "id": "deletewhere",
            "name": "Delete Where",
            "description": "Description: The type of variable you'd like to look for.",
            "types": ["text"],
            "required": true
        },
        {
            "id": "dataequals",
            "name": "Data Equals",
            "description": "Description: The data that your type of variable should be.",
            "types": ["text"],
            "required": true
        }
    ],

    options: [],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the next block if your insert was successful.",
            "types": ["action"]
        },
        {
            "id": "database",
            "name": "Database Name",
            "description": "Type: Text\n\nDescription: Exports the database name.",
            "types": ["text"]
        },
        {
            "id": "tablename",
            "name": "Table Name",
            "description": "Type: Text\n\nDescription: Exports the table name.",
            "types": ["text"]
        }
    ],
    code(cache) {

        const databasename = this.GetInputValue("databasename", cache)
        const tablename = this.GetInputValue("tablename", cache)
        const deletewhere = this.GetInputValue("deletewhere", cache)
        const dataequals = this.GetInputValue("dataequals", cache)

        const pool = mysql.createPool(
            {
                host: `localhost`,
                user: `root`,
                database: `${databasename}`,
                waitForConnections: true,
                connectionLimit: 30,
                queueLimit: 0
            }
        )

            (async function () {
                const [r, d, e] = await pool.query(`DELETE FROM \`${tablename}\` WHERE ${deletewhere}=?`, [dataequals])
            })()

        this.StoreOutputValue(databasename, "databasename", cache)
        this.StoreOutputValue(tablename, "tablename", cache)
        this.RunNextBlock("action", cache)
    }
}