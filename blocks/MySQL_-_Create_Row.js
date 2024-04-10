module.exports = {
    name: "Create Row (MySQL)",

    description: "A block that will insert a new row into the specified table for your MySQL database.\n\nSee \"MySQL Database Blocks\" in the blocks section of the Discord for more info.\n\nCreated by: @Wiz#7777",

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
            "description": "Description: The name of the table you'd like to insert into.",
            "types": ["text"],
            "required": true
        },
        {
            "id": "columnname",
            "name": "Column Name",
            "description": "Description: The name of the column in that table.",
            "types": ["text"],
            "required": true
        },
        {
            "id": "inserteddata",
            "name": "Inserted Data",
            "description": "Description: The data that you would like to insert.",
            "types": ["text"],
            "required": true
        },
        {
            "id": "ifexists",
            "name": "If Exists",
            "description": "Description: If you are inserting data, what variable should be updated if that row already exists?",
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
        },
        {
            "id": "columnname",
            "name": "Column Name",
            "description": "Type: Text\n\nDescription: Exports the column name.",
            "types": ["text"]
        },
        {
            "id": "inserteddata",
            "name": "Inserted Data",
            "description": "Type: Text\n\nDescription: Exports the data you entered.",
            "types": ["text"]
        },
    ],
    code(cache) {

        const databasename = this.GetInputValue("databasename", cache)
        const tablename = this.GetInputValue("tablename", cache)
        const columnname = this.GetInputValue("columnname", cache)
        const inserteddata = this.GetInputValue("inserteddata", cache)
        const ifexists = this.GetInputValue("ifexists", cache)

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
                const [r, d, e] = await pool.query(`INSERT INTO ${tablename} (${columnname}) VALUES ('${inserteddata}') ON DUPLICATE KEY UPDATE ${ifexists}=VALUES(${ifexists})`)
            })()

        this.StoreOutputValue(databasename, "databasename", cache)
        this.StoreOutputValue(tablename, "tablename", cache)
        this.StoreOutputValue(columnname, "columnname", cache)
        this.StoreOutputValue(inserteddata, "inserteddata", cache)
        this.RunNextBlock("action", cache)
    }
}