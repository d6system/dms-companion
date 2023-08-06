module.exports = {
    name: "Send Message With Button from Slash Command",

    description: "Sends a message with a button from a slash command interaction.",

    category: "Buttons",

    inputs: [
        {
            id: "action",
            name: "Action",
            description: "Acceptable Types: Action\n\nDescription: Executes this block.",
            types: ["action"]
        },
        {
            id: "channel",
            name: "Channel",
            description: "Acceptable Types: Object, Unspecified\n\nDescription: The text channel or DM channel to send this message.",
            types: ["object", "unspecified"],

        },
        {
            id: "interaction",
            name: "Interaction",
            description: "Description: The slash command interaction that triggered the event.",
            types: ["object", "unspecified"],

        },
        {
            id: "text",
            name: "Text",
            description: "Acceptable Types: Text, Unspecified\n\nDescription: The text to put in the message. (OPTIONAL)",
            types: ["text", "unspecified"]
        },
        {
            id: "button1",
            name: "Button 1",
            description: "Description: To add Buttons to the Message.",
            types: ["object", "unspecified"],
            required: true
        },
        {
            id: "button2",
            name: "Button 2",
            description: "Description: To add 2 Buttons to the Message. (OPTIONAL)",
            types: ["object", "unspecified"]
        },
        {
            id: "button3",
            name: "Button 3",
            description: "Description: To add 3 Buttons to the Message. (OPTIONAL)",
            types: ["object", "unspecified"]
        },
        {
            id: "button4",
            name: "Button 4",
            description: "Description: To add 4 Buttons to the Message. (OPTIONAL)",
            types: ["object", "unspecified"]
        },
        {
            id: "button5",
            name: "Button 5",
            description: "Description: To add 5 Buttons to the Message. (OPTIONAL)",
            types: ["object", "unspecified"]
        }
    ],

    options: [
        {
            id: "amount",
            name: "Amount of Buttons",
            description: "Description: The amount of Buttons to send",
            type: "SELECT",
            options: {                
                1: "1",
                2: "2",
                3: "3",
                4: "4",
                5: "5"
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
        // }

    ],

    outputs: [
        {
            id: "action",
            name: "Action",
            description: "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            types: ["action"]
        }
    ],

    code(cache) {

        const { ActionRowBuilder } = require('discord.js');
        let msg;
        const message = this.StoreOutputValue(msg, "message", cache);
        const run_block = this.RunNextBlock("action", cache);
        const amount = this.GetOptionValue("amount", cache);
        const channel = this.GetInputValue("channel", cache);
        const defer = this.GetOptionValue("defer", cache);
        const interaction = this.GetInputValue("interaction", cache);
        const text = this.GetInputValue("text", cache);
		const button1 = this.GetInputValue("button1", cache);
        const button2 = this.GetInputValue("button2", cache);
        const button3 = this.GetInputValue("button3", cache);
        const button4 = this.GetInputValue("button4", cache);
        const button5 = this.GetInputValue("button5", cache);

        function end(buttons){
                mess = channel.send({ ephemeral: true, content: text, components: buttons })
                msg = mess
                message
                run_block
        }

        if(amount == 1){
            one()
        }else if(amount == 2){
            two()
        }else if(amount == 3){
            three()
        }else if(amount == 4){
            four()
        }else if(amount == 5){
            five()
        }

        

        function one(){
            const buttons = [
                new ActionRowBuilder()
                    .addComponents(button1),
            ]
        end(buttons)
        }

        function two(){
            const buttons = [
                new ActionRowBuilder()
                    .addComponents(button1)
                    .addComponents(button2),    
            ]
        end(buttons)
        }

        function three(){
            const buttons = [
                new ActionRowBuilder()
                    .addComponents(button1)
                    .addComponents(button2)
                    .addComponents(button3),
            ]
        end(buttons)
        }

        function four(){
            const buttons = [
                new ActionRowBuilder()
                    .addComponents(button1)
                    .addComponents(button2)
                    .addComponents(button3)
                    .addComponents(button4),
            ]
        end(buttons)
        }

        function five(){
            const buttons = [
                new ActionRowBuilder()
                    .addComponents(button1)
                    .addComponents(button2)
                    .addComponents(button3)
                    .addComponents(button4)
                    .addComponents(button5),
            ]
        end(buttons)
        }    
    }
}