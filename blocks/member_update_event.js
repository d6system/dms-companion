module.exports = {
    name: 'Member Update [Event]',

    description:
        "When a member's detail (role, nickname, etc...) is updated, this event will trigger.",

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
            id: 'old_member',
            name: 'Old Member',
            description:
                'Type: Object\n\nDescription: The member before the update.',
            types: ['object']
        },
        {
            id: 'new_member',
            name: 'New Member',
            description:
                'Type: Object\n\nDescription: The member after the update.',
            types: ['object']
        },
        {
            id: 'user',
            name: 'User (UNSTABLE)',
            description:
                'Type: Object, Undefined\n\nDescription: The user who updated the member. (This can be UNSTABLE and INACCURATE and can return an undefined value)',
            types: ['object', 'undefined']
        },
        {
            id: 'reason',
            name: 'Reason (UNSTABLE)',
            description:
                'Type: Text\n\nDescription: The reason for updating the member if any. (This can be UNSTABLE and INACCURATE)',
            types: ['text']
        }
    ],

    code(cache) {
        const unstable_outputs =
            this.GetOptionValue('unstable_outputs', cache) + ''

        const { PermissionFlagsBits, AuditLogEvent } = require('discord.js')

        this.events.on('guildMemberUpdate', async (oldMember, newMember) => {
            this.StoreOutputValue(oldMember, 'old_member', cache)
            this.StoreOutputValue(newMember, 'new_member', cache)

            if (unstable_outputs == 'yes' && newMember.guild) {
                const server = newMember.guild
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
                                        AuditLogEvent.MemberUpdate,
                                        AuditLogEvent.MemberRoleUpdate
                                    ].includes(a.action) &&
                                    a.target.id == newMember.id &&
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
