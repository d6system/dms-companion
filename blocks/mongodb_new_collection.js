module.exports = {
    name: "Create Collection",

    description: "Creates a new collection in a MongoDB Database.",

    category: "MongoDB",
   // Created By SacredLight.
    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Executes this block.",
            "types": ["action"]
        },
        {
            "id": "database_url",
            "name": "Database URL",
            "description": "The URL of the MongoDB database.",
            "types": ["text"],
            "required": true
        },
        {
            "id": "database_name",
            "name": "Database Name",
            "description": "The name of the MongoDB database.",
            "types": ["text"],
            "required": true
        },
        {
            "id": "collection_name",
            "name": "Collection Name",
            "description": "The name of the new MongoDB collection to create.",
            "types": ["text"],
            "required": true
        }
    ],

    options: [],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Executes the next block.",
            "types": ["action"]
        },
		{
            "id": "action_error",
            "name": "Action Error",
            "description": "Executes if an error occurs.",
            "types": ["action"]
        }
    ],

    async code(cache) {
        const MongoClient = require('mongodb').MongoClient;
		
        const databaseURL = this.GetInputValue("database_url", cache);
        const databaseName = this.GetInputValue("database_name", cache);
        const collectionName = this.GetInputValue("collection_name", cache);

        try {
            const client = await MongoClient.connect(databaseURL);
            const db = client.db(databaseName);
           
            await db.createCollection(collectionName);

            client.close();

            this.RunNextBlock("action", cache);
        } catch (error) {
            console.error("Error creating collection:", error);
            this.RunNextBlock("action_error", cache);
        }
    }
};
