module.exports = {
    name: "Delete Database Document",

    description: "Deletes a document from a MongoDB database.",

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
            "description": "The ID of the server where the document is stored.",
            "types": ["text","unspecified"],
            "required": true
        },
        {
            "id": "user_id",
            "name": "User ID",
            "description": "The ID of the user whose document is being deleted.",
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
        }
    ],

    async code(cache) {
        const { MongoClient } = require('mongodb');
		
        const databaseURL = this.GetInputValue("database_url", cache);
        const databaseName = this.GetInputValue("database_name", cache);
        const collectionName = this.GetInputValue("collection_name", cache);
        const serverId = this.GetInputValue("server_id", cache);
        const userId = this.GetInputValue("user_id", cache);

        try {
          
            const client = new MongoClient(databaseURL);
            await client.connect();
            const db = client.db(databaseName);

           
            const filter = { server_id: serverId, user_id: userId };
            const result = await db.collection(collectionName).deleteOne(filter);
            if (result.deletedCount === 0) {
                throw new Error("Document not found.");
            }

         
            await client.close();

          
            this.RunNextBlock("action", cache);
        } catch (error) {
            console.error("Error deleting document in MongoDB:", error);
          
            this.RunNextBlock("action_error", cache);
        }
    }
};
