module.exports = {
    name: "Document Builder (Advanced)",

    description: "Builds a MongoDB document with custom field types for your collection.",

    category: "MongoDB",
    // Created By SacredLight.
    auto_execute: true,

    inputs: [],

    options: [
        {
            "id": "text1",
            "name": "Field 1 Name",
            "description": "Value for Field 1 in the document.",
            "type": "text"
        },
        {
            "id": "type1",
            "name": "Field 1 Type",
            "description": "Type for Field 1 in the document.",
            "type": "SELECT",
            "options": {
			"String": "String",
			"Number": "Number",
			"Array": "Array",
			"Boolean": "Boolean",
			"Timestamp": "Timestamp"
			}
		},
        {
            "id": "text2",
            "name": "Field 2 Name",
            "description": "Value for Field 2 in the document.",
            "type": "text"
        },
		{
            "id": "type2",
            "name": "Field 2 Type",
            "description": "Type for Field 2 in the document.",
            "type": "SELECT",
            "options": {
		    "String": "String",
			"Number": "Number",
			"Array": "Array",
			"Boolean": "Boolean",
			"Timestamp": "Timestamp"
			}
		},
		{
            "id": "text3",
            "name": "Field 3 Name",
            "description": "Value for Field 1 in the document.",
            "type": "text"
        },
        {
            "id": "type3",
            "name": "Field 3 Type",
            "description": "Type for Field 1 in the document.",
            "type": "SELECT",
            "options": {
			"String": "String",
			"Number": "Number",
			"Array": "Array",
			"Boolean": "Boolean",
			"Timestamp": "Timestamp"
			}
		},
        {
            "id": "text4",
            "name": "Field 4 Name",
            "description": "Value for Field 2 in the document.",
            "type": "text"
        },
		{
            "id": "type4",
            "name": "Field 4 Type",
            "description": "Type for Field 2 in the document.",
            "type": "SELECT",
            "options": {
		    "String": "String",
			"Number": "Number",
			"Array": "Array",
			"Boolean": "Boolean",
			"Timestamp": "Timestamp"
			}
		},
        {
            "id": "text5",
            "name": "Field 5 Name",
            "description": "Value for Field 1 in the document.",
            "type": "text"
        },
        {
            "id": "type5",
            "name": "Field 5 Type",
            "description": "Type for Field 1 in the document.",
            "type": "SELECT",
            "options": {
			"String": "String",
			"Number": "Number",
			"Array": "Array",
			"Boolean": "Boolean",
			"Timestamp": "Timestamp"
			}
		},
        {
            "id": "text6",
            "name": "Field 6 Name",
            "description": "Value for Field 2 in the document.",
            "type": "text"
        },
		{
            "id": "type6",
            "name": "Field 6 Type",
            "description": "Type for Field 2 in the document.",
            "type": "SELECT",
            "options": {
		    "String": "String",
			"Number": "Number",
			"Array": "Array",
			"Boolean": "Boolean",
			"Timestamp": "Timestamp"
			}
		},
        {
            "id": "text7",
            "name": "Field 7 Name",
            "description": "Value for Field 1 in the document.",
            "type": "text"
        },
        {
            "id": "type7",
            "name": "Field 7 Type",
            "description": "Type for Field 1 in the document.",
            "type": "SELECT",
            "options": {
			"String": "String",
			"Number": "Number",
			"Array": "Array",
			"Boolean": "Boolean",
			"Timestamp": "Timestamp"
			}
		},
        {
            "id": "text8",
            "name": "Field 8 Name",
            "description": "Value for Field 2 in the document.",
            "type": "text"
        },
		{
            "id": "type8",
            "name": "Field 8 Type",
            "description": "Type for Field 2 in the document.",
            "type": "SELECT",
            "options": {
		    "String": "String",
			"Number": "Number",
			"Array": "Array",
			"Boolean": "Boolean",
			"Timestamp": "Timestamp"
			}
		},
		 {
            "id": "text9",
            "name": "Field 9 Name",
            "description": "Value for Field 1 in the document.",
            "type": "text"
        },
        {
            "id": "type9",
            "name": "Field 9 Type",
            "description": "Type for Field 1 in the document.",
            "type": "SELECT",
            "options": {
			"String": "String",
			"Number": "Number",
			"Array": "Array",
			"Boolean": "Boolean",
			"Timestamp": "Timestamp"
		  }
		},
        {
            "id": "text10",
            "name": "Field 10 Name",
            "description": "Value for Field 2 in the document.",
            "type": "text"
        },
		{
            "id": "type10",
            "name": "Field 10 Type",
            "description": "Type for Field 2 in the document.",
            "type": "SELECT",
            "options": {
		    "String": "String",
			"Number": "Number",
			"Array": "Array",
			"Boolean": "Boolean",
			"Timestamp": "Timestamp"
			}
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
            const typeOption = this.GetOptionValue(`type${i}`, cache);
            if (textOption) {
                document[textOption] = getValueByType("", typeOption);
            }
        }

        const documentJSON = JSON.stringify(document);

        this.StoreOutputValue(documentJSON, "document", cache);
    }
};

function getValueByType(value, type) {
    switch (type) {
        case "Number":
            return Number(value);
        case "Array":
            return Array.isArray(value) ? value : [];
        case "Boolean":
            return Boolean(value);
        case "Timestamp":
            const currentDate = new Date();
            const formattedDate = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
            return formattedDate;
        default:
            return String(value);
    }
}




