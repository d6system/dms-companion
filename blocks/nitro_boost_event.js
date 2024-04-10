module.exports = {
    name: 'Nitro Boost [Event]',

    description:
        "When a member boosts a server, this event will trigger.",

    category: 'Events',

    auto_execute: true,

    inputs: [],

    options: [],

    outputs: [
        {
            id: 'action',
            name: 'Action',
            description:
                'Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.',
            types: ['action']
        },
        {
            id: 'member',
            name: 'Member',
            description:
                'Type: Object\n\nDescription: The member that has boosted the server.',
            types: ['object', 'text', 'undefined']
        },
        {
            id: 'server',
            name: 'Server',
            description:
                'Type: Object\n\nDescription: The server that was boosted.',
            types: ['object', 'text', 'undefined']
        }
    ],

    code(cache) {

        this.events.on('guildMemberUpdate', async (oldMember, newMember) => {

            if (oldMember.premiumSince !== newMember.premiumSince) {
                this.StoreOutputValue(newMember, 'member', cache);
                this.StoreOutputValue(newMember.guild, 'server', cache);
                this.RunNextBlock('action', cache);
            }
        })
    }
}
