module.exports = {
    name: "Get Scheduled Event Info",

    description: "Gets the Scheduled Event information.",

    category: "Scheduled Event",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "event",
            "name": "Event",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The Scheduled Event to get the information.",
            "types": ["object", "unspecified"],
            "required": true
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
            "id": "subscriber",
            "name": "Subscriber",
            "description": "Type: list\n\nDescription: A list of the Scheduled Event Subscriber's.",
            "types": ["list", "unspecified"]
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

    async code(cache) {
    const event = this.GetInputValue("event", cache);
        this.StoreOutputValue(event.guildId, "server", cache);
        this.StoreOutputValue(event.name, "name", cache);
        this.StoreOutputValue(event.id, "eventId", cache);
        this.StoreOutputValue(event.description, "desc", cache);
        this.StoreOutputValue(await event.fetchSubscribers().then(x => x.toJSON()), "subscriber", cache);
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
    }
}