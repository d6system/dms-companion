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
            "id": "image",
            "name": "Image",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["unspecified"]
        }, 
    ],

    code(cache) {
        const { Events } = require('discord.js');

    console.log("works")
        this.events.on(Events.GuildScheduledEventCreate, (event) => {
            this.StoreOutputValue(event.guildId, "server", cache);
            this.StoreOutputValue(event.name, "name", cache);
            this.StoreOutputValue(event.id, "eventId", cache);
            this.StoreOutputValue(event.description, "desc", cache);
            this.StoreOutputValue(event.creator, "user", cache)
            this.StoreOutputValue(event.entityMetadata.location, "location", cache)
            this.StoreOutputValue(event.image, "image", cache)
            this.RunNextBlock("action", cache)
        })
    }
}