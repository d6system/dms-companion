module.exports = {
    name: "Document Builder",

    description: "Builds a MongoDB document for your collection",

    category: "MongoDB",
    // Created By SacredLight
   auto_execute: true,

    inputs: [],

    options: [
        {
            "id": "text1",
            "name": "Field 1 Name",
            "description": "Name for the field in the document.",
            "type": "text"
        },
        {
            "id": "text2",
            "name": "Field 2 Name",
            "description": "Name for the field in the document.",
            "type": "text"
        },
        {
            "id": "text3",
            "name": "Field 3 Name",
            "description": "Name for the field in the document.",
            "type": "text"
        },
		{
            "id": "text4",
            "name": "Field 4 Name",
            "description": "Name for the field in the document.",
            "type": "text"
        },
		{
            "id": "text5",
            "name": "Field 5 Name",
            "description": "Name for the field in the document.",
            "type": "text"
        },
		{
            "id": "text6",
            "name": "Field 6 Name",
            "description": "Name for the field in the document.",
            "type": "text"
        },
        {
            "id": "text7",
            "name": "Field 7 Name",
            "description": "Name for the field in the document.",
            "type": "text"
        },
        {
            "id": "text8",
            "name": "Field 8 Name",
            "description": "Name for the field in the document.",
            "type": "text"
        },
		{
            "id": "text9",
            "name": "Field 9 Name",
            "description": "Name for the field in the document.",
            "type": "text"
        },
		{
            "id": "text10",
            "name": "Field 10 Name",
            "description": "Name for the field in the document.",
            "type": "text"
        }
    ],

    outputs: [
        {
            "id": "document",
            "name": "New Document",
            "description": "The MongoDB document.",
            "types": ["text"]
        }
    ],

    async code(cache) {
        const document = {};
        for (let i = 1; i <= 10; i++) {
            const textOption = this.GetOptionValue(`text${i}`, cache);
            if (textOption) {
                document[textOption] = "";
            }
        }

        const documentJSON = JSON.stringify(document);

        this.StoreOutputValue(documentJSON, "document", cache);
    }
};