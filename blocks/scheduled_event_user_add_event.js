module.exports = {
    name: 'Scheduled Event User Add [Event]',

    description:
        "When a User joined a Scheduled Event.",

    category: 'Scheduled Event',

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
            id: 'user',
            name: 'User',
            description: 'Type: Object\n\nDescription: The User',
            types: ['object']
        },
        {
            id: 'event',
            name: 'Event',
            description: 'Type: Object\n\nDescription: The Scheduled Event',
            types: ['object']
        }
    ],

    code(cache) {
        this.events.on('guildScheduledEventUserAdd', async (event, user) => {

                this.StoreOutputValue(event, 'event', cache);
                this.StoreOutputValue(user, 'user', cache);
                this.RunNextBlock('action', cache)
        })
    }
}
