module.exports = {
    name: 'Webhook Update [Event]',

    description: 'When a webhook is updated, this event will trigger.',

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
            id: 'text_channel',
            name: 'Text Channel',
            description:
                'Type: Object\n\nDescription: The channel that had the webhook update.',
            types: ['object']
        },
        {
            id: 'old_webhook',
            name: 'Old Webhook (UNSTABLE)',
            description:
                'Type: Object\n\nDescription: The webhook before the update. (This can be UNSTABLE and INACCURATE and can return an undefined value)',
            types: ['object']
        },
        {
            id: 'new_webhook',
            name: 'New Webhook (UNSTABLE)',
            description:
                'Type: Object\n\nDescription: The webhook after the update. (This can be UNSTABLE and INACCURATE and can return an undefined value)',
            types: ['object']
        },
        {
            id: 'user',
            name: 'User (UNSTABLE)',
            description:
                'Type: Object, Undefined\n\nDescription: The user who updated the webhook. (This can be UNSTABLE and INACCURATE and can return an undefined value)',
            types: ['object', 'undefined']
        },
        {
            id: 'reason',
            name: 'Reason (UNSTABLE)',
            description:
                'Type: Text\n\nDescription: The reason for updating the webhook if any. (This can be UNSTABLE and INACCURATE)',
            types: ['text']
        }
    ],

    code(cache) {
        const unstable_outputs =
            this.GetOptionValue('unstable_outputs', cache) + ''

        const {PermissionFlagsBits, AuditLogEvent} = require('discord.js')

        this.events.on('webhookUpdate', async (text_channel) => {
            this.StoreOutputValue(text_channel, 'text_channel', cache)

            if (unstable_outputs == 'yes' && text_channel.guild) {
                const server = text_channel.guild
                const me = await server.members.fetchMe()

                if (
                    me &&
                    me.permissions.has(PermissionFlagsBits.ViewAuditLog)
                ) {
                    const current = Date.now() - 10000

                    const entry = await server
                        .fetchAuditLogs({ type: AuditLogEvent.WebhookUpdate, limit: 5 })
                        .then((audit) =>
                            audit.entries.find(
                                (a) =>
                                    a.target.channelID == text_channel.id &&
                                    a.createdTimestamp >= current
                            )
                        )
                    
                    if (entry) {
                        const executor = entry.executor
                        if (executor) this.StoreOutputValue(executor, 'user', cache)

                        this.StoreOutputValue(entry.reason || '', 'reason', cache)

                        const webhook = await text_channel
                            .fetchWebhooks()
                            .then((a) => a.find((b) => b.id == entry.target.id))

                        if (webhook) {
                            this.StoreOutputValue(webhook, 'new_webhook', cache)

                            const old_webhook = Object.assign(
                                Object.create(webhook),
                                webhook
                            )
                            const change = entry.changes.old
                            if (change) {
                                switch (entry.changes.key) {
                                    case 'name':
                                        old_webhook.name = change
                                        break
                                    case 'channel_id':
                                        old_webhook.channelID = change
                                        break
                                    case 'avatar_hash':
                                        old_webhook.avatar = change
                                        break
                                }
                                this.StoreOutputValue(
                                    old_webhook,
                                    'old_webhook',
                                    cache
                                )
                            }
                        }
                    }
                }
            }

            this.RunNextBlock('action', cache)
        })
    }
}
