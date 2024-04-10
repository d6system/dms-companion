module.exports = {
    name: "Create Database Document",

    description: "Creates a document to store Data in a MongoDB Collection",

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
            "description": "The ID of the user for whom the Document is being created for.",
            "types": ["text","unspecified"],
            "required": true
        },
        {
            "id": "database_structure",
            "name": "Database Structure",
            "description": "The structure of the database document.",
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
		const { MongoClient } = require('mongodb');
        const databaseURL = this.GetInputValue("database_url", cache);
        const databaseName = this.GetInputValue("database_name", cache);
        const collectionName = this.GetInputValue("collection_name", cache);
        const serverId = this.GetInputValue("server_id", cache);
        const userId = this.GetInputValue("user_id", cache);
        const databaseStructure = JSON.parse(this.GetInputValue("database_structure", cache));

        try {
        
            const client = new MongoClient(databaseURL);
            await client.connect();
            const db = client.db(databaseName);

          
            const existingDocument = await db.collection(collectionName).findOne({ server_id: serverId, user_id: userId });
            if (!existingDocument) {
             
                const newDocument = {
                    server_id: serverId,
                    user_id: userId,
                    ...databaseStructure 
                };
                await db.collection(collectionName).insertOne(newDocument);
            } else {
           
                this.RunNextBlock("action_error", cache);
                return;
            }

       
            await client.close();

          
            this.RunNextBlock("action", cache);
        } catch (error) {
            console.error("Error creating new database document:", error);
           
        }
    }
};
