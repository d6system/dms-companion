module.exports = {
    name: "Set Bot Status as Mobile",

    description: "Sets the status of your bot between mobile and regular.",

    category: "Bot Stuff",

    inputs: [],

    auto_execute: true,

    options: [
        {
            "id": "status_type",
            "name": "Status Type",
            "description": "Description: The type of status for your bot.",
            "type": "SELECT",
            "options": {
                "mobile": "Mobile",
                "regular": "Regular"
            }
        },
    ],

    outputs: [],

    async code(cache, DBB) {
        const status_type = this.GetOptionValue("status_type", cache);
        const fs = await this.require('fs')
        await this.require('@discordjs/ws')

        var old_status = await fs.readFileSync('node_modules/@discordjs/ws/dist/index.js').toString()
        var new_status = undefined

        

        if(status_type == 'mobile'){
            if(old_status.includes("browser: DefaultDeviceProperty")) {
                new_status = await old_status.replace("browser: DefaultDeviceProperty", "browser: 'Discord iOS'")
                await fs.writeFileSync('node_modules/@discordjs/ws/dist/index.js', new_status)
            }
        } else {
            if(old_status.includes("browser: 'Discord iOS'")) {
                new_status = await old_status.replace("browser: 'Discord iOS'", "browser: DefaultDeviceProperty")
                await fs.writeFileSync('node_modules/@discordjs/ws/dist/index.js', new_status)
            }
        }

        if(new_status) {
            DBB.Core.restart()
            // console.log('Restart')
        }
    }
}