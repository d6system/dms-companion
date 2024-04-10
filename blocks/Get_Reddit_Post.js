module.exports = {
    name: "Get Reddit Post",

    description: "Get Reddit post.",

    category: ".MOD",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "name",
            "name": "Reddit Channel Name",
            "description": "Example: https://www.reddit.com/r/GameDealsFree/ = GameDealsFree",
            "types": ["text"]
        }
    ],

    options: [
        {
            "id": "input",
            "name": "Options:",
            "description": "sortType - New Post or Hot Post",
            "type": "SELECT",
            "options": {
                "hot": "New Post",
                "new": "Hot Post"
            }
        }

    ],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
            "id": "title",
            "name": "title",
            "description": "Type: Unspecified\n\nDescription: The value of the data.",
            "types": ["text"]
        },
        {
            "id": "selftext",
            "name": "selftext",
            "description": "Type: Unspecified\n\nDescription: The value of the data.",
            "types": ["text"]
        },
        {
            "id": "url",
            "name": "url",
            "description": "Type: Unspecified\n\nDescription: The value of the data.",
            "types": ["text"]
        },
        {
            "id": "author",
            "name": "author",
            "description": "Type: Unspecified\n\nDescription: The value of the data.",
            "types": ["text"]
        },
        {
            "id": "thumbnail",
            "name": "thumbnail",
            "description": "Type: Unspecified\n\nDescription: The value of the data.",
            "types": ["text"]
        },
        {
            "id": "subreddit_name_prefixed",
            "name": "subreddit\nname\nprefixed",
            "description": "Type: Unspecified\n\nDescription: The value of the data.",
            "types": ["text"]
        },
        {
            "id": "permalink",
            "name": "permalink",
            "description": "Type: Unspecified\n\nDescription: The value of the data.",
            "types": ["text"]
        },
        {
            "id": "created",
            "name": "created",
            "description": "Type: Unspecified\n\nDescription: The value of the data.",
            "types": ["text"]
        },
        {
            "id": "num_comments",
            "name": "num\ncomments",
            "description": "Type: Unspecified\n\nDescription: The value of the data.",
            "types": ["number"]
        },
        {
            "id": "ups",
            "name": "Up Votes",
            "description": "Type: Unspecified\n\nDescription: The value of the data.",
            "types": ["number"]
        },
        {
            "id": "downs",
            "name": "down Votes",
            "description": "Type: Unspecified\n\nDescription: The value of the data.",
            "types": ["number"]
        },
        {
            "id": "score",
            "name": "score",
            "description": "Type: Unspecified\n\nDescription: The value of the data.",
            "types": ["number"]
        },
        {
            "id": "id_text",
            "name": "id",
            "description": "Type: Unspecified\n\nDescription: The value of the data.",
            "types": ["text"]
        },
        {
            "id": "over_18",
            "name": "over 18",
            "description": "Type: Unspecified\n\nDescription: The value of the data.",
            "types": ["boolean"]
        }
    ],

   async code(cache) {
        var fetch  = await this.require('node-fetch');
        const subreddit = this.GetInputValue("name", cache)
        postTypes = this.GetOptionValue("input", cache)
       

        const response = await fetch(`https://www.reddit.com/r/${subreddit}/${postTypes}.json`);
        const post = await response.json();

        const postsArr = post.data.children;

        this.StoreOutputValue(postsArr[0].data.title, "title", cache);
        this.StoreOutputValue(postsArr[0].data.selftext, "selftext", cache);
        this.StoreOutputValue(postsArr[0].data.url, "url", cache);
        this.StoreOutputValue(postsArr[0].data.author, "author", cache);
        this.StoreOutputValue(postsArr[0].data.thumbnail, "thumbnail", cache);
        this.StoreOutputValue(postsArr[0].data.subreddit_name_prefixed, "subreddit_name_prefixed", cache);
        this.StoreOutputValue(postsArr[0].data.permalink, "permalink", cache);
        this.StoreOutputValue(postsArr[0].data.created, "created", cache);
        this.StoreOutputValue(postsArr[0].data.num_comments, "num_comments", cache);
        this.StoreOutputValue(postsArr[0].data.ups, "ups", cache);
        this.StoreOutputValue(postsArr[0].data.downs, "downs", cache);
        this.StoreOutputValue(postsArr[0].data.score, "score", cache);
        this.StoreOutputValue(postsArr[0].data.id, "id_text", cache);
        this.StoreOutputValue(postsArr[0].data.over_18, "over_18", cache);
        this.RunNextBlock("action", cache);
    }
}