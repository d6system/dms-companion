module.exports = {
    name: 'Message Delete [Event]',

    description: 'When a message is deleted, this event will trigger',

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
            id: 'message',
            name: 'Message',
            description: 'Type: Object\n\nDescription: The deleted message.',
            types: ['object']
        },
        {
            id: 'user',
            name: 'User (UNSTABLE)',
            description:
                'Type: Object, Undefined\n\nDescription: The user who deleted the message. (This can be UNSTABLE and INACCURATE and can return an undefined value)',
            types: ['object', 'undefined']
        },
        {
            id: 'reason',
            name: 'Reason (UNSTABLE)',
            description:
                'Type: Text\n\nDescription: The reason for deleting the message if any. (This can be UNSTABLE and INACCURATE)',
            types: ['text']
        }
    ],

    code(cache) {
        const unstable_outputs =
            this.GetOptionValue('unstable_outputs', cache) + ''

        const { PermissionFlagsBits, AuditLogEvent } = require('discord.js')

        this.events.on('messageDelete', async (msg) => {
            this.StoreOutputValue(msg, 'message', cache)

            if (unstable_outputs == 'yes' && msg.guild) {
                const server = msg.guild
                const me = await server.members.fetchMe()

                if (
                    me &&
                    me.permissions.has(PermissionFlagsBits.ViewAuditLog)
                ) {
                    const current = Date.now() - 10000

                    const entry = await server
                        .fetchAuditLogs({
                            type: AuditLogEvent.MessageDelete,
                            limit: 5
                        })
                        .then((audit) =>
                            audit.entries.find(
                                (a) =>
                                    a.extra.channel.id == msg.channel.id &&
                                    a.target.id == msg.author.id &&
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
