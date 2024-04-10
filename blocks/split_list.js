module.exports = {
    name: "Split List",

    description: "Split a List into different Lists.",

    category: "Extras",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "list",
            "name": "List",
            "description": "Acceptable Types: List, Unspecified\n\nDescription: The List to split.",
            "types": ["list", "unspecified"],
            "required": true
        },
        {
            "id": "splitsize",
            "name": "Split Size",
            "description": "Description: The size of each split. DEFAULT: 5",
            "types": ["number", "unspecified"]
        },
        {
            "id": "minsplitsize",
            "name": "Minimum Split Size",
            "description": "Description: The Minimum Split Size for each Split... (OPTIONAL, DEFAULT: 0)",
            "types": ["number", "unspecified"]
        }
    ],

    options: [
        {
            "id": "splitsize",
            "name": "Split Size",
            "description": "Description: The size of each split. DEFAULT: 5",
            "type": "NUMBER"
        },
        {
            "id": "minsplitsize",
            "name": "Minimum Split Size",
            "description": "Description: The Minimum Split Size for each Split...\nThink one number below the Minimum\n (OPTIONAL, DEFAULT: 0)",
            "type": "NUMBER"
        }
    ],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
            "id": "list",
            "name": "List",
            "description": "Type: List\n\nDescription: The List that contains the Split Lists. (The Split Lists are Lists too!)\nExample: Split Size Set to 3 -> [[1, 2, 3], [4, 5, 6], [7, 8]]\n\nWARNING: If you use the Minimum Split Size, the last List may be smaller than the Split Size!",
            "types": ["list", "unspecified"]
        }
    ],

    code(cache) {
        const list = this.GetInputValue("list", cache);

        var splitsize = parseInt(this.GetInputValue("splitsize", cache) ? this.GetInputValue("splitsize", cache) : this.GetOptionValue("splitsize", cache));
        if(splitsize === 0 || splitsize === undefined || splitsize === null) {
            splitsize = 5;
        }
        const minsplitsize = parseInt(this.GetInputValue("minsplitsize", cache) ? this.GetInputValue("minsplitsize", cache) : this.GetOptionValue("minsplitsize", cache));

        const chunkWithMinSize = (arr, chunkSize, minChunkSize = 0) => {
            const remainder = arr.length % chunkSize;
            const isLastChunkTooSmall = remainder < minChunkSize;
            const totalChunks = isLastChunkTooSmall
                ? Math.floor(arr.length / chunkSize)
                : Math.ceil(arr.length / chunkSize);
            return Array.from({ length: totalChunks }, (_, i) => {
                const chunk = arr.slice(i * chunkSize, i * chunkSize + chunkSize);
                if (i === totalChunks - 1 && isLastChunkTooSmall)
                    chunk.push(...arr.slice(-remainder));
                return chunk;
            });
        };

        this.StoreOutputValue(chunkWithMinSize(list, splitsize, minsplitsize), "list", cache);
        this.RunNextBlock("action", cache);
    }
}