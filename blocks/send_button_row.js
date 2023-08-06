module.exports = {
    name: "Send Message With Button",

    description: "Sends a message with a button.",

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
            required: true
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
        const run_block = this.RunNextBlock("action", cache);
        const amount = this.GetOptionValue("amount", cache);
        const channel = this.GetInputValue("channel", cache);
        const defer = this.GetOptionValue("defer", cache);
        const text = this.GetInputValue("text", cache);
		const button1 = this.GetInputValue("button1", cache);
        const button2 = this.GetInputValue("button2", cache);
        const button3 = this.GetInputValue("button3", cache);
        const button4 = this.GetInputValue("button4", cache);
        const button5 = this.GetInputValue("button5", cache);

        

        function end(buttons){
            channel.send({ content: text, components: buttons })
            run_block
        }

        if(button2 == null){
            one()
        }else if(button3 == null){
            two()
        }else if(button4 == null){
            three()
        }else if(button5 == null){
            four()
        }else{
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