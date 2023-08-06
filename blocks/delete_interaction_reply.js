module.exports = {
  
    name: "Delete Interaction Reply",

    description: "",

    category: ".MOD",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
            "id": "interactreply",
            "name": "Interaction",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["object"]
        }
    ],

    options: [],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        }
    ],

    async code(cache) {

        const inter = this.GetInputValue("interactreply", cache); 
        
        inter.deleteReply()

        this.RunNextBlock("action", cache);
        
    }
}