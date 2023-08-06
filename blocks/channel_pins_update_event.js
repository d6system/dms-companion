module.exports = {
    name: 'Channel Pins Update [Event]',

    description:
        'When the pins of a channel are updated (added or removed), this event will trigger.',

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
            id: 'channel',
            name: 'Channel',
            description:
                'Type: Object\n\nDescription: The channel that the pins update occurred in.',
            types: ['object']
        },
        {
            id: 'time',
            name: 'Time',
            description:
                'Type: Date\n\nDescription: The time of the pins update.',
            types: ['date']
        },
        {
            id: 'user',
            name: 'User (UNSTABLE)',
            description:
                'Type: Object, Undefined\n\nDescription: The user who updated the channel pins. (This can be UNSTABLE and INACCURATE and can return an undefined value)',
            types: ['object', 'undefined']
        },
        {
            id: 'message',
            name: 'Message (UNSTABLE)',
            description:
                'Type: Object, Undefined\n\nDescription: The pinned message. (This can be UNSTABLE and INACCURATE and can return an undefined value)',
            types: ['object', 'undefined']
        },
        {
            id: 'reason',
            name: 'Reason (UNSTABLE)',
            description:
                'Type: Text\n\nDescription: The reason for updating the channel pins if any. (This can be UNSTABLE and INACCURATE)',
            types: ['text']
        }
    ],

    code(cache) {
        const unstable_outputs =
            this.GetOptionValue('unstable_outputs', cache) + ''

        const { PermissionFlagsBits, AuditLogEvent } = require('discord.js')

        this.events.on('channelPinsUpdate', async (channel, time) => {
            this.StoreOutputValue(channel, 'channel', cache)
            this.StoreOutputValue(time, 'time', cache)

            if (unstable_outputs == 'yes' && channel.guild) {
                const server = channel.guild
                const me = await server.members.fetchMe()

                if (
                    me &&
                    me.permissions.has(PermissionFlagsBits.ViewAuditLog)
                ) {
                    const current = Date.now() - 10000

                    const entry = await server
                        .fetchAuditLogs({ limit: 10 })
                        .then((audit) =>
                            audit.entries.find(
                                (a) =>
                                    [
                                        AuditLogEvent.MessagePin,
                                        AuditLogEvent.MessageUnpin
                                    ].includes(a.action) &&
                                    a.extra.channel.id == channel.id &&
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

                        let message
                        try {
                            message = await channel.messages.fetch(
                                entry.extra.messageID
                            )
                        } catch (e) {}

                        if (message)
                            this.StoreOutputValue(message, 'message', cache)
                        else
                            this.StoreOutputValue(
                                await channel.messages
                                    .fetchPinned()
                                    .then((a) => a.first()),
                                'message',
                                cache
                            )
                    }
                }
            }

            this.RunNextBlock('action', cache)
        })
    }
}
