module.exports = {
  
    name: "interactions [Event, Fixed] discord-js-v14 v2",

    description: "this block simply makes djs work with modals",

    category: "ytAidenstime",

    auto_execute: true,

    inputs: [],

    options: [
        {
            id: "eventtype",
            name: "Event Type",
            description: "Type: Text\n\nDescription: The Style of the Button. [blurple], [grey], [green], [red], [url]",
            type: "SELECT",
            options: {                
                "slash": "slash command",
                "button": "buttons"
            }
        },
        // {
        //     id: "defer",
        //     name: "Public or Private response?",
        //     description: "Description: Only use 'Private' if the response is to be private AND you have 'Think' selected on the interaction block.",
        //     type: "SELECT",
        //     options: {                
        //         "public": "Public",
        //         "private": "Private"
        //     }
        // },
        {
            id: "id",
            name: "Command / Button Id",
            description: "Type: Text\n\nDescription: The Label of the Button or Command.",
            type: "TEXT"
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
            "id": "channel",
            "name": "Channel",
            "description": "this is literally the channel id of witch the message was sent in\n\nuse find message with the id option to be able\n\nto use this to get the channel object",
            "types": ["object"]
        },
        {
            "id": "name",
            "name": "Name",
            "description": "this is literally the channel id of witch the message was sent in\n\nuse find message with the id option to be able\n\nto use this to get the channel object",
            "types": ["text"]
        },
        {
            "id": "user",
            "name": "User",
            "description": "this is literally the channel id of witch the message was sent in\n\nuse find message with the id option to be able\n\nto use this to get the channel object",
            "types": ["object"]
        },
        {
            "id": "member",
            "name": "Member",
            "description": "this is literally the channel id of witch the message was sent in\n\nuse find message with the id option to be able\n\nto use this to get the channel object",
            "types": ["object"]
        },
        {
            "id": "server",
            "name": "Server",
            "description": "this is literally the channel id of witch the message was sent in\n\nuse find message with the id option to be able\n\nto use this to get the channel object",
            "types": ["object"]
        },
        {
            "id": "args",
            "name": "Arguments",
            "description": "this is literally the channel id of witch the message was sent in\n\nuse find message with the id option to be able\n\nto use this to get the channel object",
            "types": ["text", "unspecified", "object"]
        },
        {
            "id": "interaction",
            "name": "Interaction",
            "description": "this is literally the channel id of witch the message was sent in\n\nuse find message with the id option to be able\n\nto use this to get the channel object",
            "types": ["object"]
        }

    ],

    async code(cache) {
        const options = this.GetOptionValue("eventtype", cache);
        const defer = this.GetOptionValue("defer", cache);
        const id = this.GetOptionValue("id", cache);
        
        if(options == "slash") {
            this.events.on('interactionCreate', async interaction => {
                if(interaction.commandName == id){
                    this.StoreOutputValue(interaction.options._hoistedOptions, "args", cache)
                    this.StoreOutputValue(interaction.commandName, "name", cache)
                    this.StoreOutputValue(interaction.member, "member", cache)
                    this.StoreOutputValue(interaction.guild, "server", cache)
                    this.StoreOutputValue(interaction, "interaction", cache)
                    this.StoreOutputValue(interaction.user, "user", cache)
                    this.StoreOutputValue(interaction.channel, "channel", cache);
                    this.RunNextBlock("action", cache);
                }
            })
        } else if(options == "button"){
            if(defer == "public") {
                this.events.on('interactionCreate', async interaction => {
                    if(interaction.customId == id){
                        interaction.deferUpdate()
                        .then(this.StoreOutputValue(interaction.customId, "name", cache))
                        this.StoreOutputValue(interaction.member, "member", cache)
                        this.StoreOutputValue(interaction.guild, "server", cache)
                        this.StoreOutputValue(interaction, "interaction", cache)
                        this.StoreOutputValue(interaction.user, "user", cache)
                        this.StoreOutputValue(interaction.channel, "channel", cache);
                        this.RunNextBlock("action", cache);
                    }
                })
            }else if(defer == "private")
                this.events.on('interactionCreate', async interaction => {
                    interaction.deferUpdate({ ephemeral: true })
                    .then(this.StoreOutputValue(interaction.customId, "name", cache))
                    this.StoreOutputValue(interaction.member, "member", cache)
                    this.StoreOutputValue(interaction.guild, "server", cache)
                    this.StoreOutputValue(interaction, "interaction", cache)
                    this.StoreOutputValue(interaction.user, "user", cache)
                    this.StoreOutputValue(interaction.channel, "channel", cache);
                    this.RunNextBlock("action", cache);
            })
        }
    }
}