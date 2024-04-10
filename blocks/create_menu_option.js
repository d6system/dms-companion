module.exports = {
    name: "Create Selection Menu Option",
    description: "Create a selection menu option.",
    category: "Menu",
    inputs: [
        {
            id: "action",
            name: "Action",
            description: "Type: Action\n\nDescription: Executes this block.",
            types: ["action"]
        },
        {
            id: "label",
            name: "Label",
            description: "Description: The Label of the Button.",
            types: ["text"]
        },
		{
            id: "description",
            name: "Description",
            description: "Description: The ID or URL of the Button.",
            types: ["text"]
        },
		{
            id: "value",
            name: "Value",
            description: "Description: The value of the menu component.",
            types: ["text"]
        },
        {
            id: "emoji",
            name: "Emoji",
            description: "Description: The value of the menu component.",
            types: ["text"]
        }


    ],
    options: [
        {
            id: "label",
            name: "Label",
            description: "Description: The Label of the Button.",
            type: "TEXT"
        },
		{
            id: "description",
            name: "Description",
            description: "Description: The ID or URL of the Button.",
            type: "TEXT"
        },
		{
            id: "value",
            name: "Value",
            description: "Description: The value of the menu component.",
            type: "TEXT"
        },
        {
            id: "emoji",
            name: "Emoji",
            description: "Description: The Emoji of the option.",
            type: "TEXT"
        }
    ],
    outputs: [
        {
            id: "action",
            name: "Action",
            description: "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            types: ["action"]
        },
        {
            id: "menu",
            name: "Option",
            description: "Description: The Menu object output.",
            types: ["object"]
        },
    ],
    async code(cache) {

        var label = this.GetInputValue("label", cache);
        var description = this.GetInputValue("description", cache);
        var value = this.GetInputValue("value", cache);
        var emoji = this.GetInputValue("emoji", cache);


        if(label == undefined) {
            label = this.GetOptionValue("label", cache);
        }

        if(description == undefined) {
            description = this.GetOptionValue("description", cache);
        }

        if(value == undefined) {
            value = this.GetOptionValue("value", cache);
        }
        if(emoji == undefined) {
            emoji = this.GetOptionValue("emoji", cache);
        }

        

        if (description == '') {
            var description = " ";
        }


        const menu_object = {
            label,
            description,
            value,
            emoji: emoji
        }
        
         
        if(!emoji) delete menu_object.emoji;
         
        const menu = [menu_object];

        this.StoreOutputValue(menu, "menu", cache);
        this.RunNextBlock("action", cache);                
    }
}

