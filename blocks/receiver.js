module.exports = {
    name: 'Receiver',

    description: 'The receiver for any "Emitter" block with the same ID.',

    category: 'Trigger Stuff',

    inputs: [
        {
            id: 'id',
            name: 'Receiver ID',
            description:
                'Acceptable Types: Text, Number, Unspecified\n\nDescription: The ID of this Receiver. This must match with the ID of the desired "Emitter" block.',
            types: ['text', 'number', 'unspecified'],
            required: true
        }
    ],

    options: [],

    outputs: [
        {
            id: 'action',
            name: 'Action',
            description:
                'Type: Action\n\nDescription: Executes the following blocks when this block is trigger by any "Emitter" block with the same ID.',
            types: ['action']
        },
        {
            id: 'values',
            name: 'Value',
            description:
                'Type: Unspecified\n\nDescription: The value(s) received from the emitter if any.',
            types: ['unspecified'],
            multiOutput: true
        }
    ],

    code(cache) {
        const values = cache._temp.__VALUES

        this.StoreOutputValue(values, 'values', cache)
        this.RunNextBlock('action', cache)
    }
}
