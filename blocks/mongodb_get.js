module.exports = {
    name: "Get Database Info",

    description: "Retrieves a specific document from MongoDB database.",

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
            "description": "The name of the MongoDB collection.",
            "types": ["text"],
            "required": true
        },
        {
            "id": "server_id",
            "name": "Server ID",
            "description": "The ID of the server where the User is.",
            "types": ["text","unspecified"],
            "required": true
        },
        {
            "id": "user_id",
            "name": "User ID",
            "description": "The ID of the user whose Document is being retrieved.",
            "types": ["text","unspecified"],
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
        },
        {
            "id": "document",
            "name": "Document",
            "description": "The entire user document retrieved from the database.",
            "types": ["object","array"]
        },
        {
            "id": "collection",
            "name": "Entire Collection",
            "description": "The entire collection retrieved from the database.",
            "types": ["object","array"]
        }
    ],

    async code(cache) {
        const MongoClient = require('mongodb').MongoClient;
		
        const databaseURL = this.GetInputValue("database_url", cache);
        const databaseName = this.GetInputValue("database_name", cache);
        const collectionName = this.GetInputValue("collection_name", cache);
        const serverId = this.GetInputValue("server_id", cache);
        const userId = this.GetInputValue("user_id", cache);

        try {
            const client = await MongoClient.connect(databaseURL);
            const db = client.db(databaseName);

            const document = await db.collection(collectionName).findOne({ server_id: serverId, user_id: userId });
            const collection = await db.collection(collectionName).find({ server_id: serverId }).toArray();

            client.close();

            this.StoreOutputValue(document, "document", cache);
            this.StoreOutputValue(collection, "collection", cache);

            this.RunNextBlock("action", cache);
        } catch (error) {
            console.error("Error retrieving specific Document:", error);
            this.RunNextBlock("action_error", cache);
        }
    }
};
