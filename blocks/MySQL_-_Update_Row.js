module.exports = {
    name: "Update Row (MySQL)",

    description: "A block that will update an existing value for the specified row, under the specified table, in your database.\n\nSee \"MySQL Database Blocks\" in the blocks section of the Discord for more info.\n\nCreated by: @Wiz#7777",

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
            "id": "columnname",
            "name": "Column Name",
            "description": "Description: The column within the specified table that you'd like to update.",
            "types": ["text"],
            "required": true
        },
        {
            "id": "updatewhere",
            "name": "Update Where",
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
        },
        {
            "id": "updatewith",
            "name": "Update With",
            "description": "Description: The updated value you'd like to use.",
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
            "id": "updateddata",
            "name": "Updated Data",
            "description": "Type: Text\n\nDescription: Exports the data you entered.",
            "types": ["text"]
        },
    ],
    code(cache) {

        const databasename = this.GetInputValue("databasename", cache)
        const tablename = this.GetInputValue("tablename", cache)
        const columnname = this.GetInputValue("columnname", cache)
        const updatewhere = this.GetInputValue("updatewhere", cache)
        const dataequals = this.GetInputValue("dataequals", cache)
        const updatewith = this.GetInputValue("updatewith", cache)

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
                const [r, d, e] = await pool.query(`UPDATE \`${tablename}\` SET \`${columnname}\`='${updatewith}' WHERE ${updatewhere}=?`, [dataequals])
            })()

        this.StoreOutputValue(databasename, "databasename", cache)
        this.StoreOutputValue(tablename, "tablename", cache)
        this.StoreOutputValue(columnname, "columnname", cache)
        this.StoreOutputValue(updatewith, "updateddata", cache)
        this.RunNextBlock("action", cache)
    }
}