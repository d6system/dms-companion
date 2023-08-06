module.exports = {
    name: "Interaction Register+™",

    description: "Registers Slash Command and Event in One Block (Credits: @NotCallMeHacker, @GOLD, @JU, @Excordo; Combined by @XCraftTM)",

    category: ".MOD",
	
	auto_execute: true,

    inputs: [
		{
            "id": "commands",
            "name": "commands",
            "description": "Acceptable Types: Text\n\nDescription: Contains a command from: https://autocode.com/tools/discord/command-builder/ \nNote: Don't forget to add the [] to the start and end of the Command!",
            "types": ["text"],
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
        "id": "options",
        "name": "Arguments",
        "description": "Type: List\n\nDescription: List of Arguments.\nUsage: Get Item From List + Get Property from Object with option(value)",
        "types": ["list"]
      },
      {
        "id": "channel",
        "name": "Channel",
        "description": "Type: Object\n\nDescription: The Channel where the Command was used!",
        "types": ["object"]
      },
      {
        "id": "user",
        "name": "User",
        "description": "Type: Object\n\nDescription: The User that used the command.\nTo get the Member use Find member with the Server Object!",
        "types": ["object"]
      },
	  {
        "id": "member",
        "name": "Member",
        "description": "Type: Object\n\nDescription: The Member that used the command.",
        "types": ["object"]
      },
      {
        "id": "name",
        "name": "Name",
        "description": "Type: Text\n\nDescription: Name of the Command that was used.\nCombine with Check Comparision to check which command was used.",
        "types": ["text"]
      },
      {
        "id": "guild",
        "name": "Server",
        "description": "Type: Object\n\nDescription: Server Object, with this you can find the Member.",
        "types": ["object"]
      },
      {
        "id": "packet",
        "name": "Interaction",
        "description": "Type: Object\n\nDescription: The Interaction Packet for further Usage...",
        "types": ["object"]
      }
    ],

    async code(cache) {
		// Bot V2 Register
        const fs = require('fs')
		const { Client } = require("eris");
		const token = fs.readFileSync('./data/token.txt').toString()

        const bot = new Client(token, {
            intents: [
                "allNonPrivileged",
                // "allPrivileged"
            ]
        },
            {
                description: "Bot V2 made with Eris",
                owner: ""
            });

        await bot.on("ready", () => {
            console.log(`Logged in as: ${bot.user.username}`);
            global.bot = bot;
		
			//Command Register
			bot.bulkEditCommands(JSON.parse(this.GetInputValue("commands", cache)));
        });

        bot.on("error", (err, id) => {
            console.error(err, id);
        });

        await bot.connect();
		
		// EVENT START
		this.events.on("raw", async packet => {
			if(!["INTERACTION_CREATE"].includes(packet.t) || packet.d.type !== 2) return

		let data

		if (packet.d.data.resolved !== undefined) {
			if (packet.d.data.resolved.members !== undefined) {
			data = packet.d.data.resolved.members
			} else if (packet.d.data.resolved.messages !== undefined) {
			data = packet.d.data.resolved.messages
			}
		} else if (packet.d.data.options !== undefined) {
			data = packet.d.data.options.reduce((acc, option) => ({...acc, [option.name]: option.value}), {})
		}

		//if (packet.d.member === undefined) {
		//	member = await this.client.users.fetch(packet.d.user.id).catch(() => {return null})
		//} else {
		//	member = await this.client.users.fetch(packet.d.member.user.id).catch(() => {return null})
		//}

		server = await this.client.guilds.fetch(packet.d.guild_id).catch(() => {return null});
		const members = server ? server.members.cache : [].concat(...this.client.guilds.cache.map(a => a.members.array()));

		const command = {
          channel: await this.client.channels.fetch(packet.d.channel_id).catch(() => {return null}),
          guild: await this.client.guilds.fetch(packet.d.guild_id).catch(() => {return null}),
          member: await members.find(c => c.id == packet.d.member.user.id),
		  user: await this.client.users.fetch(packet.d.member.user.id).catch(() => {return null}),
          options: packet.d.data.options,
          name: packet.d.data.name,
          id: packet.d.id,
          token: packet.d.token,
		}

			const options = command["options"]
			const channel = command["channel"]
			const member = command["member"]
			const user = command["user"]
			const name = command["name"]
			const guild = command["guild"]

			this.StoreOutputValue(options, "options", cache);
			this.StoreOutputValue(channel, "channel", cache);
			this.StoreOutputValue(user, "user", cache);
			this.StoreOutputValue(member, "member", cache);
			this.StoreOutputValue(name, "name", cache);
			this.StoreOutputValue(packet, "packet", cache);
			this.StoreOutputValue(guild, "guild", cache);

			this.RunNextBlock("action", cache);
		})
	}
}