module.exports = {
    name: "Better Create Message Embed",

    description: "Creates an embed to insert into a message.",

    category: ".MOD",

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
            "id": "timestamp",
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
            "id": "timestamp",
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
        const color_input = this.GetInputValue("color", cache, false, "#2f3136");
        const thumbnail_input = this.GetInputValue("thumbnail", cache, true);
        const author_icon_input = this.GetInputValue("author_icon", cache);
        const author_name_input = this.GetInputValue("author_name", cache);
        const author_url_input = this.GetInputValue("author_url", cache);
        const title_input = this.GetInputValue("title", cache, true);
        const url_input = this.GetInputValue("url", cache, true);
        const description_input = this.GetInputValue("description", cache, true);
        const image_input = this.GetInputValue("image", cache, true);
        const footer_icon_input = this.GetInputValue("footer_icon", cache);
        const footer_text_input = this.GetInputValue("footer_text", cache);
        const timestamp_input = this.GetInputValue("timestamp", cache, true);

        const color_option = this.GetOptionValue("color", cache) !== '' ? this.GetOptionValue("color", cache) : null;
        const thumbnail_option = this.GetOptionValue("thumbnail", cache) !== '' ? this.GetOptionValue("thumbnail", cache, true) : undefined;
        const author_icon_option = this.GetOptionValue("author_icon", cache) !== '' ? this.GetOptionValue("author_icon", cache) : undefined;
        const author_name_option = this.GetOptionValue("author_name", cache) !== '' ? this.GetOptionValue("author_name", cache) : undefined;
        const author_url_option = this.GetOptionValue("author_url", cache) !== '' ? this.GetOptionValue("author_url", cache) : undefined;
        const title_option = this.GetOptionValue("title", cache) !== '' ? this.GetOptionValue("title", cache, true) : undefined;
        const url_option = this.GetOptionValue("url", cache) !== '' ? this.GetOptionValue("url", cache, true) : undefined;
        const description_option = this.GetOptionValue("description", cache) !== '' ? this.GetOptionValue("description", cache, true) : undefined;
        const image_option = this.GetOptionValue("image", cache) !== '' ? this.GetOptionValue("image", cache, true) : undefined;
        const footer_icon_option = this.GetOptionValue("footer_icon", cache) !== '' ? this.GetOptionValue("footer_icon", cache) : undefined;
        const footer_text_option = this.GetOptionValue("footer_text", cache) !== '' ? this.GetOptionValue("footer_text", cache) : undefined;

        let timestamp_option = this.GetOptionValue("timestamp", cache); 
        if(timestamp_option == "true") { timestamp_option = true; }
    	else { timestamp_option = false; }

        const color = color_input !== "#2f3136" ? color_input : color_option;
        const thumbnail = thumbnail_input !== undefined ? thumbnail_input : thumbnail_option;
        const author_icon = author_icon_input !== undefined ? author_icon_input : author_icon_option;
        const author_name = author_name_input !== undefined ? author_name_input : author_name_option;
        const author_url = author_url_input !== undefined ? author_url_input : author_url_option;
        const title = title_input !== undefined ? title_input : title_option;        
        const url = url_input !== undefined ? url_input : url_option;
        const description = description_input !== undefined ? description_input : description_option;
        const image = image_input !== undefined ? image_input : image_option;
        const footer_icon = footer_icon_input !== undefined ? footer_icon_input : footer_icon_option;
        const footer_text = footer_text_input !== undefined ? footer_text_input : footer_text_option;        
        const timestamp = timestamp_input !== undefined ? timestamp_input : timestamp_option;   

        const {EmbedBuilder} = require("discord.js");

        const embed = new EmbedBuilder()

        embed.setColor(color)

        if(thumbnail) embed.setThumbnail(thumbnail.value);
        if(author_icon || author_name || author_url) embed.setAuthor({
            name: author_name || "\u200b",
            url: author_url,
            iconURL: author_icon
        });
        if(title) embed.setTitle(title.value);
        if(url) embed.setURL(url.value);
        if(description) embed.setDescription(description.value);
        if(image) embed.setImage(image.value);
        if(footer_icon || footer_text) embed.setFooter({
            text: footer_text || "\u200b",
            iconURL: footer_icon
        });
        if(timestamp) embed.setTimestamp(timestamp.value === true ? undefined : timestamp.value);

        this.StoreOutputValue(embed, "message_embed", cache);
        this.RunNextBlock("action", cache);
    }
}