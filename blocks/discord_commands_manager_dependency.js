module.exports = {
    name: "Discord Commands Manager [Dependency]",

    description: "Starts the Discord Commands Manager dependency required for other related blocks to work.",

    category: "Dependencies",

    inputs: [],

    options: [],

    outputs: [],

    init(DBB) {
        if (!DBB.Dependencies.DiscordCommands) {
            const newCommands = {
                globals: undefined,
                servers: {}
            }

            const { commands } = DBB.DiscordJS.client.application

            commands.fetch({ withLocalizations: true })

            const startSendingCommands = function(serverId) {
                setTimeout(() => {
                    let newCmds

                    if (serverId) {
                        newCmds = newCommands.servers[serverId]
                        newCommands.servers[serverId] = undefined
                    } else {
                        newCmds = newCommands.globals
                        newCommands.globals = undefined
                    }

                    const firstCommand = newCmds[0]

                    if (newCmds.length == 1 && typeof firstCommand != 'function') {
                        switch (typeof firstCommand) {
                            case 'function': {
                                const foundCmd = commands.cache.find(firstCommand)
                                if (foundCmd) commands.delete(foundCmd.id)
                                break;
                            }
                            case 'string': {
                                commands.delete(firstCommand)
                                break;
                            }
                            case 'object':
                                commands.create(firstCommand)
                                break;
                        }
                    } else {
                        const finalData = []

                        let firstCmdAdded = false

                        for (const [id, cmd] of commands.cache) {
                            if ((serverId && cmd.guildId != serverId) || (!serverId && cmd.guildId))
                                continue

                            switch (typeof firstCommand) {
                                case 'function': {
                                    if (!firstCommand(cmd))
                                        finalData.push(cmd)
                                    break;
                                }
                                case 'string': {
                                    if (firstCommand != id)
                                        finalData.push(cmd)
                                    break;
                                }
                                case 'object':
                                    if (cmd.name == firstCommand.name) {
                                        firstCmdAdded = true
                                        finalData.push(firstCommand)
                                    } else
                                        finalData.push(cmd)
                                    break;
                            }
                        }

                        if (!firstCmdAdded && typeof firstCommand == 'object')
                            finalData.push(firstCommand)

                        for (let i = 1; i < newCmds.length; i++) {
                            const newCmd = newCmds[i]

                            switch (typeof newCmd) {
                                case 'function': {
                                    const existingCmdIndex = finalData.findIndex(newCmd)
                                    
                                    if (existingCmdIndex)
                                        finalData.splice(existingCmdIndex, 1)

                                    break;
                                }
                                case 'string': {
                                    const existingCmdIndex = finalData.findIndex(cmd => cmd.id == newCmd)

                                    if (existingCmdIndex)
                                        finalData.splice(existingCmdIndex, 1)
                                    
                                    break;
                                }
                                case 'object': {
                                    const existingCmdIndex = finalData.findIndex(cmd => cmd.name == newCmd.name)

                                    if (existingCmdIndex < 0)
                                        finalData.push(newCmd)
                                    else
                                        finalData[existingCmdIndex] = newCmd
                                    
                                    break;
                                }
                            }
                        }

                        commands.set(finalData, serverId)
                    }
                }, 3000)
            }

            DBB.Dependencies.DiscordCommands = {
                create(command, serverId) {
                    if (serverId) {
                        if (newCommands.servers[serverId])
                            newCommands.servers[serverId].push(command)
                        else {
                            newCommands.servers[serverId] = [command]
                            startSendingCommands(serverId)
                        }
                    } else {
                        if (newCommands.globals)
                            newCommands.globals.push(command)
                        else {
                            newCommands.globals = [command]
                            startSendingCommands()
                        }
                    }
                },
                delete(idOrFunc, serverId) {
                    this.create(idOrFunc, serverId)
                }
            }
        }
    },

    code() {}
}