module.exports = {
    name: 'Channel Update [Event]',

    description: 'When a channel is updated, this event will trigger.',

    category: 'Events',

    auto_execute: true,

    inputs: [],

    options: [
        {
            id: 'unstable_outputs',
            name: 'Unstable Outputs',
            description:
                'Description: Process unstable outputs. It is not recommended due to low performance and accuracy, as values are not provided directly by the Discord API, using the server Audit Log instead.',
            type: 'SELECT',
            options: {
                no: 'No',
                yes: 'Yes (Not Recommended)'
            }
        }
    ],

    outputs: [
        {
            id: 'action',
            name: 'Action',
            description:
                'Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.',
            types: ['action']
        },
        {
            id: 'old_channel',
            name: 'Old Channel',
            description:
                'Type: Object\n\nDescription: The channel before the update.',
            types: ['object']
        },
        {
            id: 'new_channel',
            name: 'New Channel',
            description:
                'Type: Object\n\nDescription: The channel after the update.',
            types: ['object']
        },
        {
            id: 'user',
            name: 'User (UNSTABLE)',
            description:
                'Type: Object, Undefined\n\nDescription: The user who updated the channel. (This can be UNSTABLE and INACCURATE and can return an undefined value)',
            types: ['object', 'undefined']
        },
        {
            id: 'reason',
            name: 'Reason (UNSTABLE)',
            description:
                'Type: Text\n\nDescription: The reason for updating the channel if any. (This can be UNSTABLE and INACCURATE)',
            types: ['text']
        }
    ],

    code(cache) {
        const unstable_outputs =
            this.GetOptionValue('unstable_outputs', cache) + ''

        const { PermissionFlagsBits, AuditLogEvent } = require('discord.js')

        this.events.on('channelUpdate', async (old_channel, new_channel) => {
            this.StoreOutputValue(old_channel, 'old_channel', cache)
            this.StoreOutputValue(new_channel, 'new_channel', cache)

            if (unstable_outputs == 'yes' && new_channel.guild) {
                const server = new_channel.guild
                const me = await server.members.fetchMe()

                if (
                    me &&
                    me.permissions.has(PermissionFlagsBits.ViewAuditLog)
                ) {
                    const current = Date.now() - 10000

                    const entry = await server
                        .fetchAuditLogs({
                            type: AuditLogEvent.ChannelUpdate,
                            limit: 5
                        })
                        .then((audit) =>
                            audit.entries.find(
                                (a) =>
                                    a.target.id == new_channel.id &&
                                    a.createdTimestamp >= current
                            )
                        )

                    if (entry) {
                        const executor = entry.executor
                        if (executor)
                            this.StoreOutputValue(executor, 'user', cache)

                        this.StoreOutputValue(
                            entry.reason || '',
                            'reason',
                            cache
                        )
                    }
                }
            }

            this.RunNextBlock('action', cache)
        })
    }
}
