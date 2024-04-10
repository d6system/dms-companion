module.exports = {
    name: "List Item Counter",

    description: "Counts how many items the selected lists have.",

    category: "List Stuff",


    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Description: Activates the block.",
            "types": ["action"] 
        },
        {
            "id": "list1",
            "name": "List 1",
            "description": "Description: THe list of numbers",
            "types": ["list", "undefined", "null"],
        },
        {
            "id": "list2",
            "name": "List 2",
            "description": "Description: THe list of numbers",
            "types": ["list", "undefined", "null"],
        },
        {
            "id": "list3",
            "name": "List 3",
            "description": "Description: THe list of numbers",
            "types": ["list", "undefined", "null"],
        },
        {
            "id": "list4",
            "name": "List 4",
            "description": "Description: THe list of numbers",
            "types": ["list", "undefined", "null"],
        },
        {
            "id": "list5",
            "name": "List 5",
            "description": "Description: THe list of numbers",
            "types": ["list", "undefined", "null"],
        }
    ],

    options: [],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Description: Runs next blocks.",
            "types": ["action"]
        },
        {
            "id": "result",
            "name": "Result",
            "description": "Type: Text\n\nDescription: The text.",
            "types": ["number"]
        }
    ],

    code(cache) {      
        const list1 = this.GetInputValue("list1", cache);
        const list2 = this.GetInputValue("list2", cache);
        const list3 = this.GetInputValue("list3", cache);
        const list4 = this.GetInputValue("list4", cache);
        const list5 = this.GetInputValue("list5", cache);      
        
        value1 = list1 !== undefined ? list1.length : 0;
        value2 = list2 !== undefined ? list2.length : 0;
        value3 = list3 !== undefined ? list3.length : 0;
        value4 = list4 !== undefined ? list4.length : 0;
        value5 = list5 !== undefined ? list5.length : 0;       

        result = value1 + value2 + value3 + value4 + value5;
        
        this.StoreOutputValue(result, "result", cache);
        this.RunNextBlock("action", cache);
    }
}