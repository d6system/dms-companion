module.exports = {
    name: 'Messages Delete [Event]',

    description: 'When messages are deleted in bulk, this event will trigger',

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
            id: 'messages',
            name: 'Messages',
            description:
                'Type: List\n\nDescription: The list containing the deleted messages.',
            types: ['list']
        },
        {
            id: 'channel',
            name: 'Channel',
            description:
                'Type: Object\n\nDescription: The channel where the messages were deleted.',
            types: ['object']
        },
        {
            id: 'user',
            name: 'User (UNSTABLE)',
            description:
                'Type: Object, Undefined\n\nDescription: The user who deleted the messages in bulk. (This can be UNSTABLE and INACCURATE and can return an undefined value)',
            types: ['object', 'undefined']
        },
        {
            id: 'reason',
            name: 'Reason (UNSTABLE)',
            description:
                'Type: Text\n\nDescription: The reason for deleting the messages in bulk if any. (This can be UNSTABLE and INACCURATE)',
            types: ['text']
        }
    ],

    code(cache) {
        const unstable_outputs =
            this.GetOptionValue('unstable_outputs', cache) + ''

        const {PermissionFlagsBits, AuditLogEvent} = require('discord.js')

        this.events.on('messageDeleteBulk', async (msgs, channel) => {
            this.StoreOutputValue(Array.from(msgs.values()), 'messages', cache)
            this.StoreOutputValue(channel, 'channel', cache)

            if (unstable_outputs == 'yes' && msgs.size) {
                const message = msgs.first()
                const server = message.guild
                const me = server && server.members.fetchMe()

                if (me && me.permissions.has(PermissionFlagsBits.ViewAuditLog)) {
                    const current = Date.now() - 10000

                    const entry = await server
                        .fetchAuditLogs({ type: AuditLogEvent.MessageBulkDelete, limit: 5 })
                        .then((audit) =>
                            audit.entries.find(
                                (a) =>
                                    a.target.id == message.channel.id &&
                                    a.extra.count == msgs.size &&
                                    a.createdTimestamp >= current
                            )
                        )
                    
                    if (entry) {
                        const executor = entry.executor
                        if (executor) this.StoreOutputValue(executor, 'user', cache)

                        this.StoreOutputValue(entry.reason || '', 'reason', cache)
                    }
                }
            }

            this.RunNextBlock('action', cache)
        })
    }
}
