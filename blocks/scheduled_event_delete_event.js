module.exports = {
    name: "Scheduled Event Delete [Event]",

    description: "this triggers when a event gets created in a discord server",

    category: "Scheduled Event",

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
            "description": "Type: text\n\nDescription: The name of the Scheduled Event.",
            "types": ["text", "unspecified"]
        },
        {
            "id": "server",
            "name": "Server ID",
            "description": "Type: text\n\nDescription: The Server ID where the Scheduled Event is.",
            "types": ["text", "unspecified"]
        },
        {
            "id": "eventId",
            "name": "Event ID",
            "description": "Type: text\n\nDescription: The ID of the Scheduled Event.",
            "types": ["text", "unspecified"]
        },
        {
            "id": "desc",
            "name": "Description",
            "description": "Type: text\n\nDescription: The Description of the Scheduled Event.",
            "types": ["text", "unspecified"]
        },
        {
            "id": "user",
            "name": "User",
            "description": "Type: object\n\nDescription: The User which has created the Scheduled Event.",
            "types": ["object", "unspecified"]
        },
        {
            "id": "location",
            "name": "Location",
            "description": "Type: text\n\nDescription: The location of the Scheduled Event.",
            "types": ["text", "unspecified"]
        },
        {
            "id": "Event_URL",
            "name": "Link",
            "description": "Type: text\n\nDescription: The URL/Link of the Scheduled Event.",
            "types": ["text", "unspecified"]
        },
        {
            "id": "Start_At",
            "name": "Event Start",
            "description": "Type: date\n\nDescription: The Date when the Scheduled Event starts.",
            "types": ["date", "unspecified"]
        },
        {
            "id": "Created_At",
            "name": "Created At",
            "description": "Type: date\n\nDescription: The Date when the Scheduled Event was created.",
            "types": ["date", "unspecified"]
        },
        {
            "id": "End_At",
            "name": "End At",
            "description": "Type: date\n\nDescription: The Date when the Scheduled Event ends.",
            "types": ["date", "unspecified"]
        },
        {
            "id": "image",
            "name": "Image",
            "description": "Type: object\n\nDescription: The Image of the Scheduled Event",
            "types": ["object"]
        }, 
    ],

    code(cache) {
        const { Events } = require('discord.js');

        this.events.on(Events.GuildScheduledEventDelete, (event) => {
            this.StoreOutputValue(event.guildId, "server", cache);
            this.StoreOutputValue(event.name, "name", cache);
            this.StoreOutputValue(event.id, "eventId", cache);
            this.StoreOutputValue(event.description, "desc", cache);
            this.StoreOutputValue(event.creator, "user", cache)
            if(event.channel == undefined) {
                this.StoreOutputValue(event.entityMetadata.location, "location", cache)
            } else {
                this.StoreOutputValue(event.channel, "location", cache)
            }
            this.StoreOutputValue(event.url, "Event_URL", cache)
            this.StoreOutputValue(event.image, "image", cache)
            this.StoreOutputValue(event.scheduledStartAt, "Start_At", cache)
            this.StoreOutputValue(event.createdAt, "Created_At", cache)
            this.StoreOutputValue(event.scheduledEndAt, "End_At", cache)
            this.RunNextBlock("action", cache)
        })
    }
}