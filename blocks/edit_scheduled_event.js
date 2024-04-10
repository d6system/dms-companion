module.exports = {
    name: "Edit Scheduled Event",

    description: "Edit a Scheduled Event",

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
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The Scheduled Event to edit",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "event_name",
            "name": "Name",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The Name for the Event",
            "types": ["text", "unspecified"]
        },
        {
            "id": "start_date",
            "name": "Start Date",
            "description": "Acceptable Types: Date, Unspecified\n\nDescription: The Start Date for the Event",
            "types": ["date", "unspecified"]
        },
        {
            "id": "end_date",
            "name": "End Date",
            "description": "Acceptable Types: Date, Unspecified\n\nDescription: The End Date for the Event(OPTIONAL)\nThis is required if Type is set to External/URL",
            "types": ["date", "unspecified"]
        },
        {
            "id": "description",
            "name": "Description",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The Description for the Event (OPTIONAL)",
            "types": ["text", "unspecified"]
        },
        {
            "id": "location",
            "name": "Location",
            "description": "Acceptable Types: Object, Text, Unspecified\n\nDescription: The Location where the Event should be hosted, depending on the Type selected in the Option.",
            "types": ["object", "text", "unspecified"]
        },
        {
            "id": "image",
            "name": "Image",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The Cover to set for the Event, can be URL, File, or Buffer. (OPTIONAL)",
            "types": ["text", "object", "unspecified"]
        },
        {
            "id": "reason",
            "name": "Reason",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The Reason for creating this Event (OPTIONAL)",
            "types": ["text", "unspecified"]
        }
    ],

    options: [
        {
            "id": "type",
            "name": "Type",
            "description": "Description: Event Channel Type",
            "type": "SELECT",
            "options": {
                "stage": "Stage Channel",
                "voice": "Voice Channel",
                "external": "URL/Location"
            }
        },
    ],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
            "id": "event",
            "name": "Event",
            "description": "Type: Object\n\nDescription: The Created Event",
            "types": ["object"]
        }
    ],

    code(cache) {
        const event = this.GetInputValue("event", cache);
        var event_name = this.GetInputValue("event_name", cache);
        var start_date = this.GetInputValue("start_date", cache);
        var end_date = this.GetInputValue("end_date", cache);
        var description = this.GetInputValue("description", cache);
        var location = this.GetInputValue("location", cache);
        var image = this.GetInputValue("image", cache);
        var type = this.GetOptionValue("type", cache);
        var reason = this.GetInputValue("reason", cache);

        if(event_name == undefined) {
            event_name = event.name;
        }
        if(start_date == undefined) {
            start_date = event.scheduledStartAt;
        }
        if(end_date == undefined) {
            end_date = event.scheduledEndAt;
        }
        if(description == undefined) {
            description = event.description;
        }
        if(location == undefined) {
            if(event.channel == undefined) {
                location = event.entityMetadata.location;
            } else {
                location = event.channel;
            }
        }
        if(image == undefined) {
            image = event.image;
        }

        const { GuildScheduledEventEntityType } = require("discord.js")

        let etype;
        if (type == "voice") {
            etype = GuildScheduledEventEntityType.Voice;
        } else if (type == "stage") {
            etype = GuildScheduledEventEntityType.StageInstance;
        }

        if (type == "voice") {
            event.edit({
                name: event_name,
                scheduledStartTime: start_date,
                privacyLevel: 2,
                entityType: GuildScheduledEventEntityType.Voice,
                description: description,
                channel: location,
                image: image,
                reason: reason
            }).then(event => {
                this.StoreOutputValue(event, "event", cache);
                this.RunNextBlock("action", cache);
            });
        } else if (type == "stage") {
                event.edit({
                    name: event_name,
                    scheduledStartTime: start_date,
                    privacyLevel: 2,
                    entityType: GuildScheduledEventEntityType.StageInstance,
                    description: description,
                    channel: location,
                    image: image,
                    reason: reason
                }).then(event => {
                    this.StoreOutputValue(event, "event", cache);
                    this.RunNextBlock("action", cache);
                });
            } else {
                event.edit({
                name: event_name,
                scheduledStartTime: start_date,
                scheduledEndTime: end_date,
                privacyLevel: 2,
                entityType: GuildScheduledEventEntityType.External,
                description: description,
                entityMetadata: { location: location },
                image: image,
                reason: reason
            }).then(event => {
                this.StoreOutputValue(event, "event", cache);
                this.RunNextBlock("action", cache);
            });
        }
    }
}