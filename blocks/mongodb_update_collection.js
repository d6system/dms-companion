module.exports = {
    name: "Update Collection Layout",

    description: "Adds new fields to the entire collection while preserving existing data.",

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
            "description": "The name of the MongoDB collection to update.",
            "types": ["text"],
            "required": true
        },
        {
            "id": "new_layout",
            "name": "New Document",
            "description": "The new layout for documents in the collection",
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
        const newLayout = JSON.parse(this.GetInputValue("new_layout", cache));

        try {
            const client = await MongoClient.connect(databaseURL);
            const db = client.db(databaseName);

            const documents = await db.collection(collectionName).find({}).toArray();

            for (const document of documents) {
                const updatedDocument = { ...document };

                for (const field in newLayout) {
                    if (!(field in updatedDocument)) {
                        updatedDocument[field] = "";
                    }
                }

                await db.collection(collectionName).updateOne({ _id: document._id }, { $set: updatedDocument });
            }

            client.close();

            this.RunNextBlock("action", cache);
        } catch (error) {
            console.error("Error updating document layout:", error);
            this.RunNextBlock("action_error", cache);
        }
    }
};
