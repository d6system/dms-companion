module.exports = {
    name: "Edit Database Document",

    description: "Edits the document in MongoDB database.",

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
            "description": "The ID of the user whose values are being edited.",
            "types": ["text","unspecified"],
            "required": true
        },
        {
            "id": "field_to_edit",
            "name": "Field to Edit",
            "description": "The field to edit in the document.",
            "types": ["text","unspecified"],
            "required": true
        },
        {
            "id": "new_values",
            "name": "New Value(s)",
            "description": "The new value(s) for the specified field.",
            "types": ["text","number","unspecified"],
            "multiInput": true,
            "required": true
        }
    ],

    options: [
        {
            "id": "edit_type",
            "name": "Edit Type",
            "description": "Choose the type of edit to perform on the field.",
            "type": "SELECT",
            "options": {
                "Text": "Text Field",
                "Array": "Array Field"
            }
        },
        {
            "id": "array_edit_method",
            "name": "Array Edit Method",
            "description": "Choose whether to append or overwrite the existing array values.",
            "type": "SELECT",
            "options": {
                "Append": "Append",
                "Overwrite": "Overwrite"
            },
            "required": false
        }
    ],

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
        const serverId = this.GetInputValue("server_id", cache);
        const userId = this.GetInputValue("user_id", cache);
        const fieldToEdit = this.GetInputValue("field_to_edit", cache);
        const editType = this.GetOptionValue("edit_type", cache);
        const newValues = this.GetInputValue("new_values", cache);
        const arrayEditMethod = this.GetOptionValue("array_edit_method", cache);

        try {
            const client = await MongoClient.connect(databaseURL);
            const db = client.db(databaseName);

            let updateDoc;
            if (editType === "Text") {
                if (newValues && newValues.length > 0) {
                    updateDoc = { $set: { [fieldToEdit]: newValues[0] } };
                } else {
                    console.error("New value not provided for Text edit type.");
                    this.RunNextBlock("action_error", cache);
                    return;
                }
            } else if (editType === "Array") {
                let arrayValues;
                if (!Array.isArray(newValues)) {
                    newValues = [newValues];
                }
                arrayValues = newValues.filter(value => value !== undefined && value !== "");
                if (arrayValues.length > 0) {
                    if (arrayEditMethod === "Append") {
                        updateDoc = { $addToSet: { [fieldToEdit]: { $each: arrayValues } } };
                    } else if (arrayEditMethod === "Overwrite") {
                        updateDoc = { $set: { [fieldToEdit]: arrayValues } };
                    } else {
                        console.error("Invalid array edit method.");
                        this.RunNextBlock("action_error", cache);
                        return;
                    }
                } else {
                    console.error("No valid values provided for Array edit type.");
                    this.RunNextBlock("action_error", cache);
                    return;
                }
            } else {
                console.error("Invalid edit type.");
                this.RunNextBlock("action_error", cache);
                return;
            }

            const filter = { server_id: serverId, user_id: userId };
            await db.collection(collectionName).updateOne(filter, updateDoc);

            client.close();

            this.RunNextBlock("action", cache);
        } catch (error) {
            console.error("Error editing document in MongoDB:", error);
            this.RunNextBlock("action_error", cache);
        }
    }
};
