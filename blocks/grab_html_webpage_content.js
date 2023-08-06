module.exports = {
    name: "Grab Html Contents v1.0 (some sites this wont work on)",

    description: "grabs the html contents of a page and gives it to you",

    category: ".MOD",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "url",
            "name": "Website Url or name",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: the name of the website or url to get the html contents of",
            "types": ["text", "unspecified"],
            "required": true
        }
        
    ],

    options: [],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
            "id": "result",
            "name": "Html Code",
            "description": "Type: Action\n\nDescription: this is where the websites html code is listed!",
            "types": ["unspecified"]
        }
    ],

    async code(cache) {
        const puppeteer = require('puppeteer');
        // variables
        const url = this.GetInputValue("url", cache);

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);
        const html = await page.content();
                 this.StoreOutputValue(html, "result", cache);
                 this.RunNextBlock("action", cache);
        await browser.close();
        // end of the api request | ONLY ADD CODE PAST THIS POINT UNLESS YOU KNOW WHAT YOUR DOING!
    }
}