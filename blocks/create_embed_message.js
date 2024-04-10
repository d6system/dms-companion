module.exports = {
    name: "Create Message Embed",

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
            "id": "timestamp",
            "name": "Timestamp (Date)",
            "description": "Acceptable Types: Date, Number, Boolean, Unspecified\n\nDescription: The timestamp (Date) for this message embed. If a boolean as \"true\", this uses the current time. (OPTIONAL)",
            "types": ["date", "number", "boolean", "unspecified"]
        }
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
            "id": "message_embed",
            "name": "Message Embed",
            "description": "Type: Object\n\nDescription: This message embed created.",
            "types": ["object"]
        }
    ],

    code: function(cache) {
        const color = this.GetInputValue("color", cache, false, "#2f3136");
        const thumbnail = this.GetInputValue("thumbnail", cache);
        const author_icon = this.GetInputValue("author_icon", cache);
        const author_name = this.GetInputValue("author_name", cache);
        const author_url = this.GetInputValue("author_url", cache);
        const title = this.GetInputValue("title", cache);
        const url = this.GetInputValue("url", cache);
        const description = this.GetInputValue("description", cache);
        const image = this.GetInputValue("image", cache);
        const footer_icon = this.GetInputValue("footer_icon", cache);
        const footer_text = this.GetInputValue("footer_text", cache);
        const timestamp = this.GetInputValue("timestamp", cache);

        const { EmbedBuilder } = require("discord.js");

        const embed = new EmbedBuilder()

        embed.setColor(color || "black")

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