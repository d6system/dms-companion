module.exports = {
  name: "Create and Host Webhook",

  description: "Creates and Hosts a webhook on your machine. By Domin0221.",

  category: "Webhook Stuff",

  auto_execute: true,

  inputs: [],

  options: [
    {
      "id": "port",
      "name": "Port",
      "description": "Description: The webhook port to use. If not specified it defaults to 3000. Remember to open the desired port.",
      "type": "NUMBER"
    },
    {
      "id": "token",
      "name": "Token",
      "description": "Description: The webhook token to use. You can write anything here or generate it using:\nhttps://www.random.org/strings/?num=1&len=32&digits=on&upperalpha=on&loweralpha=on&unique=on&format=html&rnd=new",
      "type": "TEXT"
    }
  ],

  outputs: [
    {
      "id": "dataaction",
      "name": "Action (Received Data)",
      "description": "Type: Action\n\nDescription: Executes the following blocks when a webhook receives new data.",
      "types": ["action"]
    },
    {
      "id": "data",
      "name": "Data",
      "description": "Description: The Data received by the webhook.",
      "types": ["object", "unspecified"]
    },
    {
      "id": "erroraction",
      "name": "Action (Error)",
      "description": "Type: Action\n\nDescription: Executes the following blocks when an error occurs.",
      "types": ["action"]
    },
    {
      "id": "error",
      "name": "Error Message",
      "description": "Type: Text\n\nDescription: The error message if an error occurs.",
      "types": ["text"]
    },
    {
      "id": "startaction",
      "name": "Action (Server Started)",
      "description": "Type: Action\n\nDescription: Executes the following blocks when a webhook server is started.",
      "types": ["action"]
    },
    {
      "id": "url",
      "name": "Webhook URL",
      "description": "Type: Text\n\nDescription: The URL to the created webhook. You can test your webhook using this command:\ncurl -X POST your_webhook_url -H \"Content-Type: application/json\" -d '{\"example_key\":\"example_value\"}'",
      "types": ["text"]
    }
  ],

  async code(cache, DBB) {
    const express = await this.require('express');
    const bodyParser = await this.require('body-parser');
    const https = require('https');

    const webhookToken = this.GetOptionValue("token", cache);
    let port = this.GetOptionValue("port", cache);

    async function getPublicIP() {
      return new Promise((resolve, reject) => {
        const options = {
          hostname: 'api64.ipify.org',
          path: '/?format=json',
          method: 'GET',
        };

        const req = https.request(options, (res) => {
          let data = '';

          res.on('data', (chunk) => {
            data += chunk;
          });

          res.on('end', () => {
            try {
              const publicIP = JSON.parse(data);
              resolve(publicIP.ip);
            } catch (error) {
              reject(new Error('Failed to parse public IP response.\nStarting the server regardless.'));
            }
          });
        });

        req.on('error', (error) => {
          reject(new Error(`Failed to fetch public IP: ${error.message}\nStarting the server regardless.`));
        });

        req.end();
      });
    }


    function startWebhookServer(port, webhookToken) {
      const defaultPort = 3000;

      if (!port || port < 1 || port > 65535) {
        DBB.Core.console("INFO", `Invalid port specified. Port must be a number between 1 and 65535. Using default port ${defaultPort}.`);
        port = defaultPort;
      }

      if (!webhookToken) {
        throw new Error('Webhook token not specified. Please provide a valid token.');
      }

      const app = express();

      app.use(bodyParser.json());

      app.post(`/webhook/:token`, (req, res) => {
        const receivedToken = req.params.token;

        if (receivedToken === webhookToken) {
          const webhookData = req.body;

          res.status(200).send('Webhook received successfully');
          DBB.Blocks.Core.StoreOutputValue(webhookData, "data", cache);
          DBB.Blocks.Core.RunNextBlock("dataaction", cache);

        } else {

          res.status(403).send('Invalid webhook token');
        }
      });

      app.on('error', (error) => {
        throw new Error('Webhook server error occurred:', error.message);
      });

      app.listen(port);
    }


    getPublicIP()
      .then((publicIP) => {
        try {
          startWebhookServer(port, webhookToken);
          this.StoreOutputValue(`http://${publicIP}:${port}/webhook/${webhookToken}`, "url", cache);
          this.RunNextBlock("startaction", cache);

        } catch (error) {
          this.console("WARN", error.message);
          this.StoreOutputValue(error.message, "error", cache);
          this.RunNextBlock("erroraction", cache);
        }
      })

      .catch((error) => {
        this.console("WARN", error.message);

        try {
          startWebhookServer(port, webhookToken);
          this.console("INFO", "The server has started but the public IP will be missing from the webhook URL.");
          this.StoreOutputValue(`http://[put_your_public_ip_here]:${port}/webhook/${webhookToken}`, "url", cache);
          this.RunNextBlock("startaction", cache);

        } catch (error) {
          this.console("WARN", error.message);
          this.StoreOutputValue(error.message, "error", cache);
          this.RunNextBlock("erroraction", cache);
        }
      });
  }
}