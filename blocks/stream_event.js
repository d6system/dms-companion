module.exports = {
    name: 'Stream [Event]',

    description: 'When a message is deleted, this event will trigger',

    category: 'Events',

    auto_execute: true,

    inputs: [
        // {
        //     id: 'token',
        //     name: 'Token',
        //     description: 'Type: Object\n\nDescription: The deleted message.',
        //     types: ['text', 'undefined']
        // },
        // {
        //     id: 'id',
        //     name: 'ID',
        //     description:
        //         'Type: Object, Undefined\n\nDescription: The user who deleted the message. (This can be UNSTABLE and INACCURATE and can return an undefined value)',
        //     types: ['text', 'undefined']
        // }
    ],

    options: [],

    outputs: [
        {
            id: 'respone',
            name: 'Response',
            description:
                'Type: Object, Undefined\n\nDescription: The user who deleted the message. (This can be UNSTABLE and INACCURATE and can return an undefined value)',
            types: ['text', 'undefined']
        }
    ],

    async code(cache) {

        // const token = this.GetInputValue('token', cache);
        // const id = this.GetInputValue('id', cache);

        //     const response = await fetch(
        //         "https://api.twitch.tv/helix/search/channels?query=elensarjk",
        //         {
        //             headers: {
        //                 "Authorization": `Bearer ${token}`,
        //                 "Client-Id": id,
        //             }
        //         }
        //     )
        //     const result = response.body
        //     // const isLive = result.data

        //     console.log(response)

        this.StoreOutputValue(await fetch(
            "https://youtube.com/channel/UC0f4WJAjYdwl4XYHz-6FhyQ/live"
        ).then(res => res.text()), "response", cache)

        // this.StoreOutputValue(response, "respose", cache)

        // this.RunNextBlock('action', cache)
        
    }
}
