try {
    require.resolve('discord.js')
} catch (e) {
    console.error('Discord.js is not installed. Please run "bot.js" first and try again.')
    process.exit(e.code)
}

const { ShardingManager } = require('discord.js')
const fs = require('fs')

let token = process.env.DBB_TOKEN || process.env.DISCORD_TOKEN

if (!token) {
    try {
        token = fs.readFileSync('./data/token.txt', 'utf8')
    } catch (e) {
        // ignore
    }
}

if (token) {
    const manager = new ShardingManager(`./bot.js`, { token })
    manager.spawn()
} else {
    console.error('There is no bot token. Please set it in the "token.txt" or ".env" file.')
}