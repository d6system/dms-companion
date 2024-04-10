module.exports = {
    name: "Express Event [Event]",

    description: "Starts a Express Server and accepts Requests... (What you call API) Default Port: 3000",

    category: "Express",

    auto_execute: true,

    inputs: [],

    options: [
        {
            "id": "path",
            "name": "Path",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The Path that is going to be accessible to the API and will run this Block.\n\nDefault: '/'\n\nYou can use /status to build a Status reply.",
            "type": "text"
        },
        {
            "id": "method",
            "name": "The Connection Method",
            "description": "Description: The Type for the User to do the request: get, post, delete, put",
            "type": "SELECT",
            "options": {
                "get": "GET",
                "post": "POST",
                "put": "PUT",
                "delete": "DELETE"
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
            "id": "req",
            "name": "Request",
            "description": "Type: Object\n\nDescription: The Request Object that you can work with!",
            "types": ["object", "unspecified"]
        },
        {
            "id": "res",
            "name": "Response",
            "description": "Type: Object\n\nDescription: The Response that includes important Data!",
            "types": ["object", "unspecified"]
        },
        {
            "id": "headers",
            "name": "Headers",
            "description": "Type: Object\n\nDescription: The Headers, incase there are any...",
            "types": ["object", "unspecified"]
        },
        {
            "id": "body",
            "name": "Body",
            "description": "Type: Object\n\nDescription: The Body, incase there is one.",
            "types": ["object", "unspecified"]
        }
    ],

    async init(DBB) {
        if (!DBB.Dependencies.Express) DBB.Dependencies.Express = {};
        DBB.Dependencies.Express.module = await DBB.Core.require("express");
        const express = require('express');
        const app = express();
        app.use(express.json({
            type: "application/json"
        }))
        DBB.Dependencies.Express.app = app;
        DBB.Dependencies.Express.started = false;
        DBB.Dependencies.Express.port = 3000;
    },

    async code(cache, DBB) {
        const app = DBB.Dependencies.Express.app;
        if(!DBB.Dependencies.Express.started) {
            app.listen(DBB.Dependencies.Express.port)
            DBB.Dependencies.Express.started = true;
            this.console("INFO", "Express Server Started! Port: " + DBB.Dependencies.Express.port)
        }
        const path = this.GetOptionValue("path", cache) == "" ? "/" : this.GetOptionValue("path", cache);
        const method = this.GetOptionValue("method", cache);
        switch (method) {
            case "get":
                app.get(path, (req, res) => {
                    this.StoreOutputValue(req.headers, "headers", cache);
                    this.StoreOutputValue(req, "req", cache);
                    this.StoreOutputValue(res, "res", cache);
                    this.RunNextBlock("action", cache);
                });
                break;
            case "post":
                app.post(path, (req, res) => {
                    this.StoreOutputValue(req.headers, "headers", cache);
                    this.StoreOutputValue(req.body, "body", cache);
                    this.StoreOutputValue(req, "req", cache);
                    this.StoreOutputValue(res, "res", cache);
                    this.RunNextBlock("action", cache);
                });
                break;
            case "put":
                app.put(path, (req, res) => {
                    this.StoreOutputValue(req.headers, "headers", cache);
                    this.StoreOutputValue(req.body, "body", cache);
                    this.StoreOutputValue(req, "req", cache);
                    this.StoreOutputValue(res, "res", cache);
                    this.RunNextBlock("action", cache);
                });
                break;
            case "delete":
                app.delete(path, (req, res) => {
                    this.StoreOutputValue(req.headers, "headers", cache);
                    this.StoreOutputValue(req.body, "body", cache);
                    this.StoreOutputValue(req, "req", cache);
                    this.StoreOutputValue(res, "res", cache);
                    this.RunNextBlock("action", cache);
                });
                break;
        }
    }
}