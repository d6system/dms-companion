module.exports = {
    name: "Send Message (Components)",

    description: "Sends a message with Components.",

    category: "Component Stuff",

    inputs: [
        {
            id: "action",
            name: "Action",
            description: "Acceptable Types: Action\n\nDescription: Executes this block.",
            types: ["action"]
        },
        {
            id: "channel",
            name: "Channel / Message",
            description: "Acceptable Types: Object, Unspecified\n\nDescription: The text channel or DM channel to send this message.",
            types: ["object", "list", "unspecified"],
            required: true
        },
        {
            id: "text",
            name: "Text",
            description: "Acceptable Types: Text, Unspecified\n\nDescription: The text to put in the message. (OPTIONAL)",
            types: ["text", "unspecified"]
        },
        {
            id: "embed",
            name: "Embed(s)",
            description: "Acceptable Types: Object, Unspecified\n\nDescription: The embed to add to the message",
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
            id: "file",
            name: "Attachment",
            description: "Acceptable Types: Object, Text, Unspecified\n\nDescription: The attachment to put in the message. Supports Image, file path and URL. (OPTIONAL)",
            types: ["object", "text", "unspecified"]
        }
        
        
    ],

    options: [
        {
            "id": "type",
            "name": "Send / Reply",
            "description": "Description: The type of message to send.",
            "type": "SELECT",
            "options": {
                "send": "Send in Channel",
                "reply": "Reply to Message"
            }
        },
        {
            "id": "silent",
            "name": "Silent Message",
            "description": "Description: Prevents users from getting a notification.",
            "type": "SELECT",
            "options": {
                undefined: "False",
                "true": "True"
            }
        }
    ],

    outputs: [
        {
            id: "action",
            name: "Action",
            description: "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            types: ["action"]
        },
        {
            id: "message",
            name: "Message",
            description: "Description: The message that was sent.",
            types: ["object", "list", "unspecified"]
        },
        {
            id: "action_err",
            name: "Action Error",
            description: "Type: Action\n\nDescription: Executes the following blocks when an error occurs.",
            types: ["action"]
        },
        {
            id: "message_err",
            name: "Error",
            description: "Description: The Error Message.",
            types: ["text", "unspecified"]
        }
    ],

    async code(cache) {
        
        const { ActionRowBuilder, MessageFlags } = require('discord.js');

        const channel = this.GetInputValue("channel", cache);
        const msg = this.GetInputValue("text", cache);
        const embed = this.GetInputValue("embed", cache);
        const comp1 = this.GetInputValue("row1", cache);
        const comp2 = this.GetInputValue("row2", cache);
        const comp3 = this.GetInputValue("row3", cache);
        const comp4 = this.GetInputValue("row4", cache);
        const comp5 = this.GetInputValue("row5", cache);
        const file = this.GetInputValue("file", cache);
        const type = this.GetOptionValue("type", cache);
        const silent = this.GetOptionValue("silent", cache);
        let comps = []
        let Components;
        let components1
        let components2
        let components3
        let components4
        let components5
        let flags;
        if (silent === "true") {
            flags = MessageFlags.SuppressNotifications;
        }


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

        if(type == "send") {
            channel.send({ flags: flags, content: msg ? msg : undefined, embeds: embed ? Array.isArray(embed) ? embed : [embed] : undefined, files: file ? [file] : undefined, components: comps ? comps : undefined}).then( msg => {
                this.StoreOutputValue(msg, "message", cache);
                this.RunNextBlock("action", cache);
                return
            })
                .catch(err => {
                    this.StoreOutputValue(err.message, "message_err", cache);
                    this.RunNextBlock("action_err", cache);
                })
        } else {
            channel.reply({ flags: flags, content: msg ? msg : undefined, embeds: embed ? Array.isArray(embed) ? embed : [embed] : undefined, files: file ? [file] : undefined, components: comps ? comps : undefined}).then( msg => {
                this.StoreOutputValue(msg, "message", cache);
                this.RunNextBlock("action", cache);
                return
            })
                .catch(err => {
                    this.StoreOutputValue(err.message, "message_err", cache);
                    this.RunNextBlock("action_err", cache);
                })
        }
    }
}