module.exports = {
    name: "Scheduled Event Create event",

    description: "this triggers when a event gets created in a discord server",

    category: ".MOD",

    auto_execute: true,

    inputs: [],

    options: [],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
            "id": "name",
            "name": "Name",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["text", "unspecified"]
        },
        {
            "id": "server",
            "name": "Server ID",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["text", "unspecified"]
        },  
        {
            "id": "eventId",
            "name": "Event ID",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["text", "unspecified"]
        },  
        {
            "id": "desc",
            "name": "Description",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["text", "unspecified"]
        },  
        {
            "id": "user",
            "name": "User",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["object", "unspecified"]
        },
        {
            "id": "location",
            "name": "Location",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["text", "unspecified"]
        }, 
        {
            "id": "Event URL",
            "name": "Link",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["text", "unspecified"]
        },
        {
            "id": "Start At",
            "name": "Event Start",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["date", "unspecified"]
        },
        {
            "id": "Created At",
            "name": "Created At",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["date", "unspecified"]
        },
        {
            "id": "image",
            "name": "Image",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["object"]
        }, 
    ],

    code(cache) {
        const { Events } = require('discord.js');

        this.events.on(Events.GuildScheduledEventCreate, (event) => {
            this.StoreOutputValue(event.guildId, "server", cache);
            this.StoreOutputValue(event.name, "name", cache);
            this.StoreOutputValue(event.id, "eventId", cache);
            this.StoreOutputValue(event.description, "desc", cache);
            this.StoreOutputValue(event.creator, "user", cache)
            this.StoreOutputValue(event.location, "location", cache)
            this.StoreOutputValue(event.url, "Event URL", cache)
            this.StoreOutputValue(event.image, "image", cache)
            this.StoreOutputValue(event.scheduledStartAt, "Start At", cache)
            this.StoreOutputValue(event.createdAt, "Created At", cache)
            this.RunNextBlock("action", cache)
        })
    }
}