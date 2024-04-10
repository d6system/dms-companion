module.exports = {
    name: "Better Edit Message Embed",

    description: "Edits the embed to insert into a message.",

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
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The message embed to edit.",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "color",
            "name": "Color",
            "description": "Acceptable Types: Text, Number, Unspecified\n\nDescription: The new color for this message embed. (OPTIONAL)",
            "types": ["text", "number", "unspecified"]
        },
        {
            "id": "thumbnail",
            "name": "Thumbnail URL",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The new thumbnail URL for this message embed. (OPTIONAL)",
            "types": ["text", "unspecified"]
        },
        {
            "id": "author_icon",
            "name": "Author Icon URL",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The new author icon URL for this message embed. (OPTIONAL)",
            "types": ["text", "unspecified"]
        },
        {
            "id": "author_name",
            "name": "Author Name",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The new author name for this message embed. (OPTIONAL)",
            "types": ["text", "unspecified"]
        },
        {
            "id": "author_url",
            "name": "Author URL",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The new author URL for this message embed. This requires the embed author name to highlight it! (OPTIONAL)",
            "types": ["text", "unspecified"]
        },
        {
            "id": "title",
            "name": "Title",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The new title for this message embed. (OPTIONAL)",
            "types": ["text", "unspecified"]
        },
        {
            "id": "url",
            "name": "URL",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The new URL for this message embed. This requires the embed title to highlight it! (OPTIONAL)",
            "types": ["text", "unspecified"]
        },
        {
            "id": "description",
            "name": "Description",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The new description for this message embed. (OPTIONAL)",
            "types": ["text", "unspecified"]
        },
        {
            "id": "image",
            "name": "Image URL",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The new image URL for this message embed. (OPTIONAL)",
            "types": ["text", "unspecified"]
        },
        {
            "id": "footer_icon",
            "name": "Footer Icon URL",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The new footer icon URL for this message embed. (OPTIONAL)",
            "types": ["text", "unspecified"]
        },
        {
            "id": "footer_text",
            "name": "Footer Text",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The new footer text for this message embed. (OPTIONAL)",
            "types": ["text", "unspecified"]
        },
        {
            "id": "timestamp",
            "name": "Timestamp (Date)",
            "description": "Acceptable Types: Date, Number, Unspecified\n\nDescription: The new timestamp (Date) for this message embed. If a boolean as \"true\", this uses the current time. (OPTIONAL)",
            "types": ["date", "number", "boolean", "unspecified"]
        }
    ],

    options: [           
        {
            "id": "color",
            "name": "Color",
            "description": "Description: Thumbnail.",
            "type": "COLOR"
        },
        {
            "id": "thumbnail",
            "name": "Thumbnail URL",
            "description": "Description: Thumbnail.",
            "type": "TEXT"
        },
		{
            "id": "author_icon",
            "name": "Author Icon URL",
            "description": "Description: Author Icon URL",
            "type": "TEXT"
        },		
		{
            "id": "author_name",
            "name": "Author Name",
            "description": "Description: Author Name.",
            "type": "TEXT"
        },		
		{
           "id": "author_url",
            "name": "Author URL",
            "description": "Description: Author URL.",
            "type": "TEXT"
        },
		{
            "id": "title",
            "name": "Title",
            "description": "Description: Title.",
            "type": "TEXT"
        },		
		{
            "id": "url",
            "name": "URL",
            "description": "Description: URL.",
            "type": "TEXT"
        },		
		{
            "id": "description",
            "name": "Description",
            "description": "Description: Description.",
            "type": "TEXT"
        },
		{
            "id": "image",
            "name": "Image URL",
            "description": "Description: Image URL.",
            "type": "TEXT"
        },		
		{
            "id": "footer_icon",
            "name": "Footer Icon URL",
            "description": "Description: Footer Icon.",
            "type": "TEXT"
        },			
		{
            "id": "footer_text",
            "name": "Footer Text",
            "description": "Description: Footer Text.",
            "type": "TEXT"
        },			
		{
            "id": "timestamp",
            "name": "Timestamp (Date)",
            "description": "Description: The timestamp (Date) for this message embed.\nTrue: Adds/Keeps timestamp // False: Removes timestamp.",
            "type": "SELECT",
            "options": {   
                "true": "True",             
                "false": "False",
            }
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
            "description": "Type: Object\n\nDescription: This message embed edited.",
            "types": ["object"]
        }
    ],

    code: function(cache) {
        const { EmbedBuilder, time } = require('discord.js');
        const message_embed = this.GetInputValue("message_embed", cache);
        const color_input = this.GetInputValue("color", cache, false, "#2f3136");     
        const color_option = this.GetOptionValue("color", cache) !== "#000000" ? this.GetOptionValue("color", cache) : null;
        const color = color_input !== "#2f3136" ? color_input : color_option;       

        const thumbnailtest = this.GetInputValue("thumbnail", cache) || this.GetOptionValue("thumbnail", cache, false, undefined);
        const author_icontest = this.GetInputValue("author_icon", cache) || this.GetOptionValue("author_icon", cache, false, undefined);
        const author_name = this.GetInputValue("author_name", cache) || this.GetOptionValue("author_name", cache, false, undefined);
        const author_url = this.GetInputValue("author_url", cache) || this.GetOptionValue("author_url", cache, false, undefined);
        const title = this.GetInputValue("title", cache) || this.GetOptionValue("title", cache, false, undefined);
        const url = this.GetInputValue("url", cache) || this.GetOptionValue("url", cache, false, undefined);
        const description = this.GetInputValue("description", cache) || this.GetOptionValue("description", cache, false, undefined);
        const imagetest = this.GetInputValue("image", cache) || this.GetOptionValue("image", cache, false, undefined);
        const footer_icontest = this.GetInputValue("footer_icon", cache) || this.GetOptionValue("footer_icon", cache, false, undefined);
        const footer_text = this.GetInputValue("footer_text", cache) || this.GetOptionValue("footer_text", cache, false, undefined); 

        var timestamp = this.GetInputValue("timestamp", cache) || this.GetOptionValue("timestamp", cache);            

        if (imagetest.match(/(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))/i)) {
            image = imagetest;
        }else{
            image = undefined;
        }

        if (thumbnailtest.match(/(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))/i)) {
            thumbnail = thumbnailtest;
        }else{
            thumbnail = undefined;
        }

        if (author_icontest.match(/(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))/i)) {
            author_icon = author_icontest;
        }else{
            author_icon = undefined;
        }

        if (footer_icontest.match(/(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))/i)) {
            footer_icon = footer_icontest;
        }else{
            footer_icon = undefined;
        }

        let footer = {};
        if (footer_text) {
            footer.text = footer_text
        } 
        if (footer_icon) {
            footer.iconURL = footer_icon
        } 

        let author = {};
        if (author_name) {
            author.name = author_name
        }
        if (author_icon) {
            author.iconURL = author_icon
        }
        if (author_url) {
            author.url = author_url
        }

        const embed = EmbedBuilder.from(message_embed)
        if (color) embed.setColor(color);
        if (thumbnail) embed.setThumbnail(thumbnail);
        if (author_icon || author_name || author_url) embed.setAuthor(author);
        if (title) embed.setTitle(title);
        if (url) embed.setURL(url);
        if (description) embed.setDescription(description);
        if (image) embed.setImage(image);
        if (footer_icon || footer_text) embed.setFooter(footer);

        if (timestamp == true || timestamp == "true"){
            timestamp = undefined;
            embed.setTimestamp(timestamp);
        }
        else if(timestamp == false || timestamp == "false"){  
            embed.setTimestamp(null);
        }else{
            embed.setTimestamp(timestamp);
        }
        
        this.StoreOutputValue(embed, "message_embed", cache);        
        this.RunNextBlock("action", cache);
    }
}