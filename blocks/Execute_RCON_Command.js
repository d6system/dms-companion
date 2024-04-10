module.exports = {
    name: "Execute RCON Command [Bojo]",
    description: "Executes an RCON command on a server.",
    category: "RCON",
  
    inputs: [
      {
        "id": "action",
        "name": "Action",
        "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
        "types": ["action"]
      },
      {
        "id": "ip",
        "name": "Server IP",
        "description": "The IP address of the server.",
        "types": ["text", "unspecified"],
        "required": true
      },
      {
        "id": "port",
        "name": "Server Port",
        "description": "The port of the server.",
        "types": ["number", "unspecified"],
        "required": true
      },
      {
        "id": "password",
        "name": "RCON Password",
        "description": "The RCON password for the server.",
        "types": ["text", "unspecified"],
        "required": true
      },
      {
        "id": "command",
        "name": "RCON Command",
        "description": "The RCON command to execute on the server.",
        "types": ["text", "unspecified"],
        "required": true
      }
    ],
    options: [],
    outputs: [
      {
        "id": "action",
        "name": "Action",
        "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
        "types": ["action"]
      },
      {
        "id": "output",
        "name": "Output",
        "description": "Type: Text\n\nDescription: Whether the button is clickable or not.",
        "types": ["text"]
    }
    ],
  
    async code(cache) {
      const { Rcon } = await this.require('rcon-client');;
    
      const ip = this.GetInputValue("ip", cache);
      const port = this.GetInputValue("port", cache);
      const password = this.GetInputValue("password", cache);
      const command = this.GetInputValue("command", cache);
      const rcon = await Rcon.connect(({
        host: ip, port: port, password: password
    })); // wait for the connection to establish
      const responses = await Promise.all([
        rcon.send(command),
      ])
      rcon.end();
      this.StoreOutputValue(responses, "output", cache);
      this.RunNextBlock("action", cache);
    }
  };    