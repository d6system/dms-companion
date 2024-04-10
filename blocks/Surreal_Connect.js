module.exports = {
    name: "Create Connection",

    description: "A block that will create a credential object for SurrealDB login/Connection.\n",

    category: "SurrealDB",

    auto_execute: true,

    inputs: [],

    options: [
        {
            "id": "host",
            "name": "Host",
            "description": "Description: The host of surrealdb.",
            "types": "text",
            "required": true
        },
        {
            "id": "database",
            "name": "Database Name",
            "description": "Description: The name of the database you are making changes to.",
            "types": "text",
            "required": true
        },
        {
            "id": "username",
            "name": "Username",
            "description": "Description: username of the surrealdb user.",
            "types": "text",
            "required": true
        },
        {
            "id": "password",
            "name": "Password",
            "description": "Description: password of the surrealdb user.",
            "types": "text",
            "required": true
        },
        {
            "id": "namespace",
            "name": "Namespace",
            "description": "Description: namespace of the surrealdb user.",
            "types": "text",
            "required": true
        }
    ],

    outputs: [
        {
            "id": "surreal",
            "name": "SurrealDB Connection Object",
            "description": "Description: The connection information object for SurrealDB.",
            "types": ["object"]
        },
    ],
    code(cache) {

        this.StoreOutputValue({
            "host": this.GetOptionValue("host", cache),
            "database": this.GetOptionValue("database", cache),
            "username": this.GetOptionValue("username", cache),
            "password": this.GetOptionValue("password", cache),
            "namespace": this.GetOptionValue("namespace", cache),
        }, "surreal", cache, "inputBlock");

        /* this.StoreOutputValue(this.GetOptionValue("database", cache), "database", cache, "inputBlock");
        this.StoreOutputValue(this.GetOptionValue("username", cache), "username", cache, "inputBlock");
        this.StoreOutputValue(this.GetOptionValue("password", cache), "password", cache, "inputBlock");
        this.StoreOutputValue(this.GetOptionValue("namspace", cache), "namespace", cache, "inputBlock"); */
    }
}