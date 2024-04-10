module.exports = {
    name: "Reply to Interaction",

    description: "Replies to an Interaction(by @XCraftTM)",

    category: ".MOD",

    inputs: [
        {
            id: "action",
            name: "Action",
            description: "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            types: ["action"]
        },
        {
            id: "interaction",
            name: "Interaction",
            description: "Type: Object\n\nDescription: The Title of Your Application",
            types: ["object"],
            required: true
        },
        {
            id: "message",
            name: "Text",
            description: "Type: Text\n\nDescription: The text to add to the reply",
            types: ["text", "unspecified"]
        },
        {
            id: "embeds",
            name: "Embed(s)",
            description: "Description: The embed to reply with. Accepts: Object & List",
            types: ["object", "list", "unspecified"],
        },
        {
            id: "row1",
            name: "Component 1",
            description: "Acceptable Types: Object, List, Unspecified\n\nDescription: The 1st Action Row to send",
            types: ["object", "list", "unspecified"],
        },
        {
            id: "row2",
            name: "Component 2",
            description: "Acceptable Types: Object, List, Unspecified\n\nDescription: The 2nd Action Row to send",
            types: ["object", "list", "unspecified"],
        },
        {
            id: "row3",
            name: "Component 3",
            description: "Acceptable Types: Object, List, Unspecified\n\nDescription: The 3rd Action Row to send",
            types: ["object", "list", "unspecified"],
        },
        {
            id: "row4",
            name: "Component 4",
            description: "Acceptable Types: Object, List, Unspecified\n\nDescription: The 4th Action Row to send",
            types: ["object", "list", "unspecified"],
        },
        {
            id: "row5",
            name: "Component 5",
            description: "Acceptable Types: Object, List, Unspecified\n\nDescription: The 5th Action Row to send",
            types: ["object", "list", "unspecified"],
        },
        {
            id: "attachment",
            name: "Attachment",
            description: "Acceptable Types: Object, Text, Unspecified\n\nDescription: The attachment to put in the message. Supports Image, file path and URL. (OPTIONAL)",
            types: ["object", "text", "unspecified"]
        }
    ],

    options: [
        {
            id: "response",
            name: "Response",
            description: "Type: Text\n\nDescription: What response do you want to give?",
            type: "SELECT",
            options: {
                "reply": "Reply with Message",
                "update": "Update Message",
                "edit": "Edit Reply Message",
                "defer": "Defer Reply",
                "fetch": "Fetch Reply",
                "delete": "Delete Reply",
                "follow": "Follow Up Reply"
            }
        },
        {
            id: "private",
            name: "Is Ephemeral",
            description: "can only you see it or other people to?",
            type: "SELECT",
            options: {
                "true": "Yes",
                "false": "No",
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
            "id": "interaction",
            "name": "Interaction",
            "description": "Type: Object, Unspecified\n\nDescription: The Interaction Object",
            "types": ["object", "unspecified"]
        },
        {
            "id": "message",
            "name": "Message",
            "description": "Type: Object, Unspecified\n\nDescription: The Message Object",
            "types": ["object", "unspecified"]
        }
    ],

    code: async function (cache) {
        const response = this.GetOptionValue("response", cache);
        const interaction = this.GetInputValue("interaction", cache);
        this.StoreOutputValue(interaction, "interaction", cache);

        const { ActionRowBuilder } = require('discord.js');

        const msg = this.GetInputValue("message", cache);
        const em = this.GetInputValue("embeds", cache);
        const attachment = this.GetInputValue("attachment", cache);  
        const comp1 = this.GetInputValue("row1", cache);
        const comp2 = this.GetInputValue("row2", cache);
        const comp3 = this.GetInputValue("row3", cache);
        const comp4 = this.GetInputValue("row4", cache);
        const comp5 = this.GetInputValue("row5", cache);
        let comps = []
        let Components;
        let components1
        let components2
        let components3
        let components4
        let components5        
       

        if(comp1 && Array.isArray(comp1)) {
            components1 = new ActionRowBuilder()
            await comp1.forEach(element => {
                components1.addComponents(element)
            });
        } else if(comp1) {
            components1 = new ActionRowBuilder().addComponents(comp1)
        }
        

        if(comp2 && Array.isArray(comp2)) {
            components2 = new ActionRowBuilder()
            await comp2.forEach(element => {
                components2.addComponents(element)
            });
        } else if(comp2) {
            components2 = new ActionRowBuilder().addComponents(comp2)
        }
        

        if(comp3 && Array.isArray(comp3)) {
            components3 = new ActionRowBuilder()
            await comp3.forEach(element => {
             components3.addComponents(element)
            });
        } else if(comp3) {
            components3 = new ActionRowBuilder().addComponents(comp3)
        }
        

        if(comp4 && Array.isArray(comp4)) {
            components4 = new ActionRowBuilder()
            await comp4.forEach(element => {
                components4.addComponents(element)
            });
        } else if(comp4) {
            components4 = new ActionRowBuilder().addComponents(comp4)
        }
        

        if(comp5 && Array.isArray(comp5)) {
            components5 = new ActionRowBuilder()
            await comp5.forEach(element => {
                components5.addComponents(element)
            });
        } else if(comp5) {
            components5 = new ActionRowBuilder().addComponents(comp5)
        }
         


        Components =  [components1, components2, components3, components4, components5]

        Components.forEach(element => {
            if(element) {
                comps.push(element)
            }
        });
        
        comps = comps.filter(comp => comp)
        if(comps.length > 5) {
            comps.pop()
        }

        let pri = this.GetOptionValue("private", cache);
        let awnser = "";
        if (pri == "true") {
            awnser = true
        } else if (pri == "false") {
            awnser = false
        }

        switch (response) {
            case "reply":
                if (em !== undefined) {
                    message = await interaction.reply({ content: msg, embeds: em ? Array.isArray(em) ? em : [em] : undefined, components: comps, files: attachment ? [attachment] : null, ephemeral: awnser, fetchReply: true });
                    this.StoreOutputValue(message, "message", cache);
                    this.RunNextBlock("action", cache)
                } else {
                    message = await interaction.reply({
                        content: msg,
                        components: comps,
                        files: attachment ? [attachment] : null,
                        ephemeral: awnser,
                        fetchReply: true
                    })
                    this.StoreOutputValue(message, "message", cache);
                    this.RunNextBlock("action", cache)
                }
                break;
            case "update":
                if (em !== undefined) {
                    message = await interaction.update({ content: msg, embeds: em ? Array.isArray(em) ? em : [em] : undefined, components: comps, files: attachment ? [attachment] : null, ephemeral: awnser});
                    this.StoreOutputValue(message, "message", cache);
                    this.RunNextBlock("action", cache)
                } else {
                    message = await interaction.update({
                        content: msg,
                        components: comps,
                        files: attachment ? [attachment] : null,
                        ephemeral: awnser
                        })
                    this.StoreOutputValue(message, "message", cache);
                    this.RunNextBlock("action", cache)
                }
                break;
            case "edit":
                if (em !== undefined) {
                    message = await interaction.editReply({ content: msg, embeds: em ? Array.isArray(em) ? em : [em] : undefined, components: comps, files: attachment ? [attachment] : null, ephemeral: awnser, fetchReply: true });
                    this.StoreOutputValue(message, "message", cache);
                    this.RunNextBlock("action", cache)
                } else {
                    message = await interaction.editReply({
                        content: msg,
                        components: comps,
                        files: attachment ? [attachment] : null,
                        ephemeral: awnser,
                        fetchReply: true
                    })
                    this.StoreOutputValue(message, "message", cache);
                    this.RunNextBlock("action", cache)
                }
                break;
            case "defer":
                message = await interaction.deferReply({ ephemeral: awnser, fetchReply: true });
                this.StoreOutputValue(message, "message", cache);
                this.RunNextBlock("action", cache)
                break;
            case "fetch":
                message = await interaction.fetchReply();
                this.StoreOutputValue(message, "message", cache);
                this.RunNextBlock("action", cache)
                break;
            case "delete":
                await interaction.deleteReply();
                this.RunNextBlock("action", cache)
                break;
            case "follow":
                if (em !== undefined) {
                    message = await interaction.followUp({ content: msg, embeds: em ? Array.isArray(em) ? em : [em] : undefined, components: comps, files: attachment ? [attachment] : null, ephemeral: awnser, fetchReply: true });
                    this.StoreOutputValue(message, "message", cache);
                    this.RunNextBlock("action", cache)
                } else {
                    message = await interaction.followUp({
                        content: msg,
                        components: comps,
                        files: attachment ? [attachment] : null,
                        ephemeral: awnser,
                        fetchReply: true
                    })
                    this.StoreOutputValue(message, "message", cache);
                    this.RunNextBlock("action", cache)
                }
                break;
        }
    }
}