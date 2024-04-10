module.exports = {
    name: "Send SSH Command",

    description: "Send a SSH Command to Linux Server",

    category: ".MOD",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "host",
            "name": "Host",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The number of the specific workspace. Starts at \"1\". Only use this input if you selected the option \"Specific Workspace\" in \"Variable Restriction Type\". (OPTIONAL)",
            "types": ["text","unspecified"]
        },
        {
            "id": "port",
            "name": "Port",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The number of the specific workspace. Starts at \"1\". Only use this input if you selected the option \"Specific Workspace\" in \"Variable Restriction Type\". (OPTIONAL)",
            "types": ["number","unspecified"]
        },
        {
            "id": "username",
            "name": "Username",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The number of the specific workspace. Starts at \"1\". Only use this input if you selected the option \"Specific Workspace\" in \"Variable Restriction Type\". (OPTIONAL)",
            "types": ["text","unspecified"]
        },
        {
            "id": "password",
            "name": "Password",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The number of the specific workspace. Starts at \"1\". Only use this input if you selected the option \"Specific Workspace\" in \"Variable Restriction Type\". (OPTIONAL)",
            "types": ["text","unspecified"]
        },
        {
            "id": "textcommand",
            "name": "Command",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The number of the specific workspace. Starts at \"1\". Only use this input if you selected the option \"Specific Workspace\" in \"Variable Restriction Type\". (OPTIONAL)",
            "types": ["text","unspecified"]
        }
    ],

    options: [
        {
            "id": "host",
            "name": "Host",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The number of the specific workspace. Starts at \"1\". Only use this input if you selected the option \"Specific Workspace\" in \"Variable Restriction Type\". (OPTIONAL)",
            "type": "TEXT"
        },
        {
            "id": "port",
            "name": "Port",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The number of the specific workspace. Starts at \"1\". Only use this input if you selected the option \"Specific Workspace\" in \"Variable Restriction Type\". (OPTIONAL)",
            "type": "NUMBER"
        },
        {
            "id": "username",
            "name": "Username",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The number of the specific workspace. Starts at \"1\". Only use this input if you selected the option \"Specific Workspace\" in \"Variable Restriction Type\". (OPTIONAL)",
            "type": "TEXT"
        },
        {
            "id": "password",
            "name": "Password",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The number of the specific workspace. Starts at \"1\". Only use this input if you selected the option \"Specific Workspace\" in \"Variable Restriction Type\". (OPTIONAL)",
            "type": "TEXT"
        },
        {
            "id": "textcommand",
            "name": "Command",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The number of the specific workspace. Starts at \"1\". Only use this input if you selected the option \"Specific Workspace\" in \"Variable Restriction Type\". (OPTIONAL)",
            "type": "text"
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
            "id": "output",
            "name": "Output",
            "description": "Type: Text, unspecified\n\nDescription: The Output of the Shell.",
            "types": ["text", "unspecified"]
        }
    ],

    async code(cache) {
        const { Client } = require('ssh2');
        let host = this.GetInputValue("host", cache)
        let port = this.GetInputValue("port", cache)
        let username = this.GetInputValue("username", cache)
        let password = this.GetInputValue("password", cache)
        let textcommand = this.GetInputValue("textcommand", cache)

        if (!host) {
            host = this.GetOptionValue("host", cache)
        }
        if (!port) {
            port = this.GetOptionValue("port", cache)
        }
        if (!username) {
            username = this.GetOptionValue("username", cache)
        }
        if (!password) {
            password = this.GetOptionValue("password", cache)
        }
        if (!textcommand) {
            textcommand = this.GetOptionValue("textcommand", cache)
        }

        const conn = new Client();
        conn.on('ready', () => {
            textcommand.split(/\r?\n/).forEach(command => {
                conn.exec(command, (err, stream) => {
                    if (err) console.log(err);
                    let log = [];
                    log.push(`${username}@${host}:~$ ${command.trim()}`)
                    stream.on('close', (code, signal) => {
                        conn.end();
                        this.StoreOutputValue(log.join("\n"), "output", cache)
                        this.RunNextBlock("action", cache);
                    }).on('data', (data) => {
                        log.push(String(data).trim())
                    }).stderr.on('data', (data) => {
                        log.push(String(data).trim())
                    });
                });
            });
        }).connect({
            host: host,
            port: port,
            username: username,
            password: password
        });

        conn.on("error", (err) => {
            err.message = "Send_SSH_Command: " + err.message;
            this.end(err)
        })
    }
}