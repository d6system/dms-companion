module.exports = {
    name: "Twitch Stream [Event]",

    description: "Triggers an event when a Twitch channel starts streaming.",

    auto_execute: true,

    category: "Internet Stuff",

    inputs: [
        {
            "id": "id",
            "name": "Channel ID",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The Name of the channel (Go to the channel page, click the URL then copy the name after the '@' ('https://www.youtube.com/@LiveMusicRadio' would become 'LiveMusicRadio')).",
            "types": ["number", "unspecified"],
            "required": true
        },
        {
            "id": "client_id",
            "name": "Client ID",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The Name of the channel (Go to the channel page, click the URL then copy the name after the '@' ('https://www.youtube.com/@LiveMusicRadio' would become 'LiveMusicRadio')).",
            "types": ["text", "unspecified"],
            "required": true
        },
        {
            "id": "token",
            "name": "Access Token",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The Name of the channel (Go to the channel page, click the URL then copy the name after the '@' ('https://www.youtube.com/@LiveMusicRadio' would become 'LiveMusicRadio')).",
            "types": ["text", "unspecified"],
            "required": true
        },
    ],

    options: [],

    outputs: [
        {
            "id": "action1",
            "name": "Stream Start",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
            "id": "action2",
            "name": "Stream End",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
            "id": "title",
            "name": "Title",
            "description": "Type: Text, Undefined\n\nDescription: The Title of the stream.",
            "types": ["text", "undefined"]
        },
        {
            "id": "link",
            "name": "Link",
            "description": "Type: Text, Undefined\n\nDescription: The URL of the stream.",
            "types": ["text", "undefined"]
        },
        {
            "id": "game",
            "name": "Game",
            "description": "Type: Text, Undefined\n\nDescription: The Game that is being played.",
            "types": ["text", "undefined"]
        },
        {
            "id": "thumbnailUrl",
            "name": "Thumbnail URL",
            "description": "Type: Text, Undefined\n\nDescription: The Game that is being played.",
            "types": ["text", "undefined"]
        },
        {
            "id": "tags",
            "name": "Stream Tags",
            "description": "Type: Text, Undefined\n\nDescription: The Game that is being played.",
            "types": ["list", "undefined"]
        },
        {
            "id": "viewers",
            "name": "Viewer Count",
            "description": "Type: Text, Undefined\n\nDescription: The Game that is being played.",
            "types": ["number", "undefined"]
        },
        {
            "id": "language",
            "name": "Language",
            "description": "Type: Text, Undefined\n\nDescription: The Game that is being played.",
            "types": ["text", "undefined"]
        },
        {
            "id": "startDate",
            "name": "Stream Started",
            "description": "Type: Text, Undefined\n\nDescription: The Game that is being played.",
            "types": ["date", "undefined"]
        },
        {
            "id": "author",
            "name": "Channel Name",
            "description": "Type: Text, Undefined\n\nDescription: The Name of the channel.",
            "types": ["text", "undefined"]
        }
    ],

    async code(cache) {
        const id = this.GetInputValue("id", cache);
        const client_id = this.GetInputValue("client_id", cache);
        const token = this.GetInputValue("token", cache);

        const { StaticAuthProvider } = await this.require('@twurple/auth@6.0.0');
        const { ApiClient } = await this.require('@twurple/api@6.0.0');
        const { EventSubWsListener } = await this.require('@twurple/eventsub-ws@6.0.0');

        const clientId = client_id;
        const accessToken = token;

        const authProvider = new StaticAuthProvider(clientId, accessToken);
        const apiClient = new ApiClient({ authProvider });

        const listener = new EventSubWsListener({ apiClient });
        await listener.start();

        let title;
        let link;
        let game_name;
        let user_name;
        let thumbnailUrl;
        let tags;
        let viewers;
        let language;
        let startDate;

        const onlineSubscription = await listener.onStreamOnline(id, async e => {
            const stream = await e.getStream()

            title = await stream.title
            link = "https://www.twitch.tv/" + await stream.userName
            game_name = await stream.gameName
            user_name = await stream.userDisplayName
            thumbnailUrl = await stream.thumbnailUrl
            tags = await stream.tags
            viewers = await stream.viewers
            language = await stream.language
            startDate = await stream.startDate

            this.StoreOutputValue(title, "title", cache);
            this.StoreOutputValue(link, "link", cache);
            this.StoreOutputValue(game_name, "game", cache);
            this.StoreOutputValue(user_name, "author", cache);
            this.StoreOutputValue(thumbnailUrl, "thumbnailUrl", cache);
            this.StoreOutputValue(tags, "tags", cache);
            this.StoreOutputValue(viewers, "viewers", cache);
            this.StoreOutputValue(language, "language", cache);
            this.StoreOutputValue(startDate, "startDate", cache);
            this.RunNextBlock("action1", cache);
        });
        
        const offlineSubscription = await listener.onStreamOffline(id, async e => {

            if(title == undefined) {
                console.log('The stream has ended, but no data was saved as the bot was not on when the stream started. No blocks will be run after this one to prevent any errors.')
            } else {
                this.StoreOutputValue(title, "title", cache);
                this.StoreOutputValue(link, "link", cache);
                this.StoreOutputValue(game_name, "game", cache);
                this.StoreOutputValue(user_name, "author", cache);
                this.RunNextBlock("action2", cache);
            }            
        });
    }
}