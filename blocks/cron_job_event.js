module.exports = {
    name: "Cron Job [Event]",

    description: "Make a Time Specific Event",

    category: "Events",

    auto_execute: true,

    inputs: [
        {     
            "id": "cronInfo",
            "name": "Cron Text",
            "description": "example: * * * * * * for every seconds",
            "types": ["text", "unspecified"]
        }
       

    ],

    options: [],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        }
    ],

    async code(cache) {

        var cron = await this.require('node-cron');
        var input = this.GetInputValue("cronInfo", cache)
        cron.schedule(input, () => {
            this.RunNextBlock('action', cache);
        });

    }
}