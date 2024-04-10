module.exports = {
    name: "Transfer Object Keys",
    
    description: "Copies the keys of the first object and adds them to the second object.",
    
    category: ".T45",
    
    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "object1",
            "name": "First Object",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The  object to take keys from.",
            "types": ["object", "unspecified"]
        },
        {
            "id": "object2",
            "name": "Second Object",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The object to add the keys to.",
            "types": ["object", "unspecified"]
        },
    ],
    
    options: [],
    
    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
            "id": "result",
            "name": "New Object",
            "description": "Type: Object\n\nDescription: The second object with added keys.",
            "types": ["object"]
        }
    ],
    
    code(cache) {
        const object1 = this.GetInputValue("object1", cache);
        let object2 = this.GetInputValue("object2", cache);
        
        for ( const [k, v] of Object.entries(object1)) {
            object2[k] = v
        }

        this.StoreOutputValue(object2, "result", cache);
        this.RunNextBlock("action", cache);
    }
}