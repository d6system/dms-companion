module.exports = {
    name: "YouTube Live Stream [Event]",

    description: "Triggers an event when a YouTube channel starts or stops streaming.",

    auto_execute: true,

    category: "Internet Stuff",

    inputs: [
        {
            "id": "id",
            "name": "Channel ID",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The ID of the channel.",
            "types": ["text", "unspecified"],
            "required": true
        }
    ],

    options: [],

    outputs: [
        {
            "id": "start",
            "name": "Stream Start",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
            "id": "end",
            "name": "Stream End",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
            "id": "title",
            "name": "Stream Title",
            "description": "Type: Text, Undefined\n\nDescription: The Title of the stream.",
            "types": ["text", "undefined"]
        },
        {
            "id": "link",
            "name": "Stream URL",
            "description": "Type: Text, Undefined\n\nDescription: The URL of the stream.",
            "types": ["text", "undefined"]
        },
        {
            "id": "author",
            "name": "Channel Name",
            "description": "Type: Text, Undefined\n\nDescription: The Name of the channel.",
            "types": ["text", "undefined"]
        },
        {
            "id": "channel",
            "name": "Channel URL",
            "description": "Type: Text, Undefined\n\nDescription: The URL of the channel.",
            "types": ["text", "undefined"]
        },
        {
            "id": "thumb",
            "name": "Thumbnail URL",
            "description": "Type: Text, Undefined\n\nDescription: The Name of the channel.",
            "types": ["text", "undefined"]
        }
    ],

    async code(cache) {

        const YoutubePoster = await this.require("discord-yt-poster");
        const grabLink = await this.require('youtube-thumbnail-grabber');
        const fetch = await this.require('node-fetch');        

        this.client.on("ready", () => YTP = new YoutubePoster(this.client));
        
        const channelid = this.GetInputValue("id", cache);
        const channel = 'https://www.youtube.com/channel/' + channelid

        const delay = 2000;
        let isLive;
        isLive = false

        let stream;
        let thumb;

        const start = async () => {
            const info = await YTP.getLatestVideos(channel);
            stream = info[0];
            thumb = await grabLink(stream.link, 'max');

            this.StoreOutputValue(stream.title, "title", cache);
            this.StoreOutputValue(stream.link, "link", cache);
            this.StoreOutputValue(stream.author, "author", cache);
            this.StoreOutputValue(channel, "channel", cache);
            this.StoreOutputValue(thumb, "thumb", cache);
            this.RunNextBlock("start", cache);
            };
            
            const end = async () => {
                this.StoreOutputValue(stream.title, "title", cache);
                this.StoreOutputValue(stream.link, "link", cache);
                this.StoreOutputValue(stream.author, "author", cache);
                this.StoreOutputValue(channel, "channel", cache);
                this.StoreOutputValue(thumb, "thumb", cache);
                this.RunNextBlock("end", cache);
            };

        function loop() {
            setTimeout(function() {
              yt_loop()
            }, delay) 
          }
          
          
          
        function yt_loop() {
        setTimeout(function() { 
            
            fetch(channel).then(function (response) {
            return response.text();
            }).then(function (html) {
            if (html.includes("hqdefault_live.jpg") && isLive == false) {
                isLive = true;
                start()
            } else {if(!html.includes("hqdefault_live.jpg") && isLive == true) {
                isLive = false;
                end()
                }
            }
            }).catch(function (err) {
            console.warn('Something went wrong', err);
            });
        
            if (isLive == false) {           
            yt_loop();             
            } else loop()                  
        }, delay)
        }
      
        yt_loop();
    }
}