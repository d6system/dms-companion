module.exports = {

    name: "Create Thread in Forum",

    description: "This Block Creates a Thread in a Forum Channel",

    category: ".MOD",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
            "id": "forum",
            "name": "Forum Channel",
            "description": "The Forum Channel Object",
            "types": ["object"],
            "required": true
        },
        {
            "id": "name",
            "name": "Name",
            "description": "The Name of the Thread",
            "types": ["text"],
            "required": true
        },
        {
            "id": "message",
            "name": "Text",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["text"]
        },
        {
            id: "embeds",
            name: "Embed",
            description: "Description: To add a single Button to the Message. (NOT A ROW) (MUST EITHER BE BUTTON OR ROW -- NOT BOTH --)",
            types: ["object", "unspecified"],
        },
        {
            id: "menu",
            name: "Menu",
            description: "Description: To add a single Button to the Message. (NOT A ROW) (MUST EITHER BE BUTTON OR ROW -- NOT BOTH --)",
            types: ["object", "unspecified"],
        },
        {
            id: "button_row",
            name: "Button Row",
            description: "Description: To add a Button Row to the Message. (MUST EITHER BE BUTTON OR ROW -- NOT BOTH --)",
            types: ["object", "unspecified"],
        },
        {
            id: "button",
            name: "Button",
            description: "Description: To add a single Button to the Message. (NOT A ROW) (MUST EITHER BE BUTTON OR ROW -- NOT BOTH --)",
            types: ["object", "unspecified"],
        },
        {
            id: "attachment",
            name: "Attachment",
            description: "Acceptable Types: Object, Text, Unspecified\n\nDescription: The attachment to put in the message. Supports Image, file path and URL. (OPTIONAL)",
            types: ["object", "text", "unspecified"]
        },
        {
            "id": "forumtag",
            "name": "Forum Tag",
            "description": "The Forum Tag(s) to add to the Thread",
            "types": ["object", "list"]
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
            "id": "thread",
            "name": "Thread",
            "description": "The Thread Created!",
            "types": ["object"]
        },
        {
            "id": "message",
            "name": "Message",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["object"]
        }
    ],

    async code(cache) {
        const forum = this.GetInputValue("forum", cache);
        var name = this.GetInputValue("name", cache);

        var tags = this.GetInputValue("forumtag", cache);
        var tagids;
        if (Array.isArray(tags)) {
            newlist = [];
            await tags.forEach(element => {
                newlist.push(element.id);
            });
            tagids = newlist;
        } else if (typeof tags === "object") {
            tagids = [tags.id];
        } else {
            tagids = [];
        }

        const { ActionRowBuilder } = require('discord.js');

        const msg = this.GetInputValue("message", cache);
        const em = this.GetInputValue("embeds", cache);
        const attachment = this.GetInputValue("attachment", cache);
        const button1 = this.GetInputValue("button", cache);
        const button_row = this.GetInputValue("button_row", cache);
        const menu1 = this.GetInputValue("menu", cache);
        let components;
        let button;
        let menu;

        if (button1 !== undefined) {
            button =
                new ActionRowBuilder()
                    .addComponents(button1)
        }

        if (menu1 !== undefined) {
            menu =
                new ActionRowBuilder()
                    .addComponents(menu1)
        }

        if (button1 == undefined && button_row == undefined && menu1 !== undefined) {
            components = [menu]
        } else if (button_row == undefined && menu1 == undefined && button1 !== undefined) {
            components = [button]
        } else if (menu1 == undefined && button1 == undefined && button_row !== undefined) {
            components = [button_row]
        } else if (menu1 !== undefined && button_row !== undefined && button1 == undefined) {
            components = [menu, button_row]
        } else if (menu1 !== undefined && button1 !== undefined && button_row == undefined) {
            components = [menu, button]
        } else if (menu1 == undefined && button1 !== undefined && button_row !== undefined) {
            components = [button_row, button]
        } else if (menu1 !== undefined && button1 !== undefined && button_row !== undefined) {
            components = [menu, button_row, button]
        }

        let msgoptions;

        if(em !== undefined) {
            msgoptions = { content: msg, files: attachment ? [attachment] : null, embeds: [em], components: components }
        } else {
            msgoptions = {
                content: msg,
                components: components,
                files: attachment ? [attachment] : null
            }}

        await forum.threads.create({
            name: name,
            //autoArchiveDuration: ThreadAutoArchiveDuration.OneHour,
            message: msgoptions,
            appliedTags: tagids
        }).then(
            threadChannel => (
                this.StoreOutputValue(threadChannel, "thread", cache),
                this.StoreOutputValue(threadChannel.fetchStarterMessage(), "message", cache)
                )
            )
            .catch(console.error);
        this.RunNextBlock("action", cache);
    }
}