module.exports = {
    name: "Better Create Message Embed",

    description: "Creates an embed to insert into a message.",

    category: "Message Embed Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "color",
            "name": "Color",
            "description": "Acceptable Types: Text, Number, Unspecified\n\nDescription: The color for this message embed. (OPTIONAL)",
            "types": ["text", "number", "unspecified"]
        },
        {
            "id": "thumbnail",
            "name": "Thumbnail URL",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The thumbnail URL for this message embed. (OPTIONAL)",
            "types": ["text", "unspecified"]
        },
        {
            "id": "author_icon",
            "name": "Author Icon URL",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The author icon URL for this message embed. (OPTIONAL)",
            "types": ["text", "unspecified"]
        },
        {
            "id": "author_name",
            "name": "Author Name",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The author name for this message embed. (OPTIONAL)",
            "types": ["text", "unspecified"]
        },
        {
            "id": "author_url",
            "name": "Author URL",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The author URL for this message embed. This requires the embed author name to highlight it! (OPTIONAL)",
            "types": ["text", "unspecified"]
        },
        {
            "id": "title",
            "name": "Title",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The title for this message embed. (OPTIONAL)",
            "types": ["text", "unspecified"]
        },
        {
            "id": "url",
            "name": "URL",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The URL for this message embed. This requires the embed title to highlight it! (OPTIONAL)",
            "types": ["text", "unspecified"]
        },
        {
            "id": "description",
            "name": "Description",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The description for this message embed. (OPTIONAL)",
            "types": ["text", "unspecified"]
        },
        {
            "id": "image",
            "name": "Image URL",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The image URL for this message embed. (OPTIONAL)",
            "types": ["text", "unspecified"]
        },
        {
            "id": "footer_icon",
            "name": "Footer Icon URL",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The footer icon URL for this message embed. (OPTIONAL)",
            "types": ["text", "unspecified"]
        },
        {
            "id": "footer_text",
            "name": "Footer Text",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The footer text for this message embed. (OPTIONAL)",
            "types": ["text", "unspecified"]
        },
        {
            "id": "timestamp_input",
            "name": "Timestamp (Date)",
            "description": "Acceptable Types: Date, Number, Boolean, Unspecified\n\nDescription: The timestamp (Date) for this message embed. If a boolean as \"true\", this uses the current time. (OPTIONAL)",
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
            "id": "timestamp_option",
            "name": "Timestamp (Date)",
            "description": "Acceptable Types: Date, Number, Boolean, Unspecified\n\nDescription: The timestamp (Date) for this message embed. If a boolean as \"true\", this uses the current time. (OPTIONAL)",
            "type": "SELECT",
            "options": {                
                "false": "False",                
                "true": "True",
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
            "description": "Type: Object\n\nDescription: This message embed created.",
            "types": ["object"]
        }
    ],

    code: function(cache) {
        const color = this.GetInputValue("color", cache) || this.GetOptionValue("color", cache, false, undefined);
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

        const timestamp_input = this.GetInputValue("timestamp_input", cache, undefined);
        let timestamp_option = this.GetOptionValue("timestamp_option", cache); 
        if(timestamp_option == "true") { timestamp_option = true; }
    	else { timestamp_option = false; }

        const timestamp = timestamp_input !== undefined ? timestamp_input : timestamp_option;       
        
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
        
        const {EmbedBuilder} = require("discord.js");

        const embed = new EmbedBuilder()

        embed.setColor(color || "#2f3136")

        let author = {};
        if(author_name) author.name = author_name;
        if(author_icon) author.iconURL = author_icon;
        if(author_url) author.url = author_url;

        let footer = {}
        if(footer_icon) footer.iconURL = footer_icon;
        if(footer_text) footer.text = footer_text;

        if(thumbnail) embed.setThumbnail(thumbnail || "\u200b");
        if(author_icon || author_name || author_url) embed.setAuthor(author);
        if(title) embed.setTitle(title || "\u200b");
        if(url) embed.setURL(url || "\u200b");
        if(description) embed.setDescription(description || "\u200b");
        if(image) embed.setImage(image || "\u200b");
        if(footer_icon || footer_text) embed.setFooter(footer);
        if(timestamp) embed.setTimestamp(timestamp === true ? undefined : timestamp);

        this.StoreOutputValue(embed, "message_embed", cache);
        this.RunNextBlock("action", cache);
    }
}