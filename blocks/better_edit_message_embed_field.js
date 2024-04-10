module.exports = {
    name: "Better Edit Message Embed Field",

    description: "Edits a field to the message embed.",

    category: "Message Embed Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "message_embed",
            "name": "Message Embed",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The message embed to add this field.",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "field_name",
            "name": "Field Name",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The field name to add to the message embed. Default: Blank. (OPTIONAL)",
            "types": ["text", "unspecified"]
        },
        {
            "id": "field_value",
            "name": "Field Value",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The field value to add to the message embed. Default: Blank. (OPTIONAL)",
            "types": ["text", "number", "unspecified"]
        },
        {
            "id": "field_inline",
            "name": "Field Inline",
            "description": "Acceptable Types: Boolean, Unspecified\n\nDescription: The field inline to display to the message embed. Default: \"false\". (OPTIONAL)",
            "types": ["boolean", "unspecified"]
        },
        {
            "id": "custom_position",
            "name": "Custom Position",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The custom position to add this field to the message embed. Starts at \"1\". (Only use this input if you selected the option \"Custom Position\")",
            "types": ["number", "text", "unspecified"]
        }
    ],

    options: [
        {
            "id": "position_type",
            "name": "Position Type",
            "description": "Description: The position to add this field to the message embed.",
            "type": "SELECT",
            "options": {
                "last": "Last Position",
                "first": "First Position",
                "random": "Random Position",
                "custom": "Custom Position"
            }
        },
        {
            "id": "field_name",
            "name": "Field Name",
            "description": "Description: The field name to add to the message embed. Default: Blank. (OPTIONAL)",
            "type": "TEXT"
        },
		{
            "id": "field_value",
            "name": "Field Value",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The field value to add to the message embed. Default: Blank. (OPTIONAL)",
            "type": "TEXT"
        },		
		{
            "id": "field_inline",
            "name": "Field Inline",
            "description": "Description: The field inline to display to the message embed. Default: \"false\". (OPTIONAL)",
            "type": "SELECT",
            "options": {     
                "original": "No Edit",       
                "false": "False",                
                "true": "True",
                "input": "Edit from Input"
            }
        },
		{
            "id": "custom_position",
            "name": "Custom Position",
            "description": "Description: The custom position to add this field to the message embed. Starts at \"1\". (Only use this input if you selected the option \"Custom Position\")",
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
            "id": "message_embed",
            "name": "Message Embed",
            "description": "Type: Object\n\nDescription: The message embed with this field added.",
            "types": ["object"]
        }
    ],

    code(cache) {
        const message_embed = this.GetInputValue("message_embed", cache);
        const position_type = this.GetOptionValue("position_type", cache) + "";

        const field_name_input = this.GetInputValue("field_name", cache, false, "\u200b") + "";
        const field_name_option = this.GetOptionValue("field_name", cache, false) !== '' ? this.GetOptionValue("field_name", cache) : "\u200b";

        const field_value_input = this.GetInputValue("field_value", cache, false, "\u200b") + "";
        const field_value_option = this.GetOptionValue("field_value", cache, false) !== '' ? this.GetOptionValue("field_value", cache) : "\u200b"; 

        const field_inline_input = Boolean(this.GetInputValue("field_inline", cache));

        const new_name = field_name_input !== "\u200b" ? field_name_input : field_name_option;
        const new_value = field_value_input !== "\u200b" ? field_value_input : field_value_option;

        var custom_position = parseInt(this.GetInputValue("custom_position", cache)) || parseInt(this.GetOptionValue("custom_position", cache));
        if(isNaN(custom_position)){
            custom_position = 0;
        }else{
            custom_position = custom_position - 1;
        } 

        switch(position_type) {
            case "first":
                position = 0;
                break;
            default:
            case "last":
                position = message_embed.data.fields.length - 1;
                break;
            case "random":
                position = Math.round(Math.random() * (message_embed.data.fields.length)-1);                
                break;
                case "custom": { 
                position = custom_position;
            }
        }
        
        const fields = message_embed.data.fields[position];
        const old_name = fields["name"];
        const old_value = fields["value"];
        const old_inline = fields["inline"];        

        let field_inline_option = this.GetOptionValue("field_inline", cache); 
        if(field_inline_option == "original") { field_inline = old_inline; }
        if(field_inline_option == "true") { field_inline = true; }
        if(field_inline_option == "false") { field_inline = false; }
        if(field_inline_option == "input") { field_inline = field_inline_input; }
        
        if(new_name == "" || new_name == undefined || new_name == "\u200b"){ 
            field_name = old_name;
        }else{
            field_name = new_name;
        }
        
        if(new_value == "" || new_value == undefined || new_value == "\u200b"){ 
            field_value = old_value;
        }else{
            field_value = new_value;
        }

        message_embed.data.fields[position] = {
            name: field_name,
            value: field_value,
            inline: field_inline
         };

        this.StoreOutputValue(message_embed, "message_embed", cache);
        this.RunNextBlock("action", cache);           
    }
}