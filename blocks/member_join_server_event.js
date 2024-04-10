module.exports = {
    name: "Member Join Server [Event]",

    description: "When a member joins a server, this event will trigger.",

    category: "Events",

    auto_execute: true,

    inputs: [],

    options: [
        {
            "id": "react",
            "name": "React to Bots?",
            "description": "Description: \nIf this is set to \"Bots Only\" the block will return the invite as undefined, \nbecause we can\'t figure out who invited a bot!",
            "type": "SELECT",
            "options": {
                "member": "Member Only",
                "bots": "Bots Only",
                "both": "Both"
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
            "id": "member",
            "name": "Member",
            "description": "Type: Object\n\nDescription: The member who joined the server.",
            "types": ["object", "unspecified"]
        },
        {
            "id": "user",
            "name": "User",
            "description": "Type: Object\n\nDescription: The user who joined the server.",
            "types": ["object", "unspecified"]
        },
        {
            "id": "guild",
            "name": "Server",
            "description": "Type: Object\n\nDescription: The Server which the Member joined!",
            "types": ["object", "unspecified"]
        },
        {
            "id": "invite",
            "name": "Invite",
            "description": "Type: Object\n\nDescription: The Invite that the Member used to join!",
            "types": ["object", "unspecified"]
        },
        {
            "id": "isbot",
            "name": "Is Bot?",
            "description": "Type: Boolean\n\nDescription: If the Invited Member is a bot!",
            "types": ["boolean", "unspecified"]
        }
    ],

    code(cache) {
        const {Events, Collection} = require("discord.js");
        const react = this.GetOptionValue("react", cache);

        const invites = new Collection();

        this.client.guilds.cache.forEach((guild) => {
            guild.invites.fetch().then(firstInvites => {
                invites.set(guild.id, new Collection(firstInvites.map((invite) => [invite.code, invite.uses])));
                console.log(invites)
            });
        });

        this.client.on(Events.InviteDelete, (invite) => {
            invites.get(invite.guild.id).delete(invite.code);
        });

        this.client.on(Events.InviteCreate, (invite) => {
            invites.get(invite.guild.id).set(invite.code, invite.uses);
        });

        this.client.on(Events.GuildCreate, (guild) => {
            guild.invites.fetch().then(guildInvites => {
                invites.set(guild.id, new Map(guildInvites.map((invite) => [invite.code, invite.uses])));
            })
        });

        this.client.on(Events.GuildDelete, (guild) => {
            invites.delete(guild.id);
        });

        this.events.on(Events.GuildMemberAdd, async member => {
            if (react == "member") {
                if (!member.user.bot) {
                    try {
                        const newInvites = await member.guild.invites.fetch()
                        const oldInvites = await invites.get(member.guild.id);
                        const invite = await newInvites.find(i => i.uses > oldInvites.get(i.code));
                        this.StoreOutputValue(invite, "invite", cache);
                    } catch {
                    }
                    this.StoreOutputValue(member, "member", cache);
                    this.StoreOutputValue(member.user, "user", cache);
                    this.StoreOutputValue(member.guild, "guild", cache);
                    this.StoreOutputValue(Boolean(false), "isbot", cache);
                    this.RunNextBlock("action", cache);
                }
            } else if (react == "bots") {
                if (member.user.bot) {
                    this.StoreOutputValue(member, "member", cache);
                    this.StoreOutputValue(member.user, "user", cache);
                    this.StoreOutputValue(member.guild, "guild", cache);
                    this.StoreOutputValue(Boolean(true), "isbot", cache);
                    this.RunNextBlock("action", cache);
                }
            } else if (react == "both") {
                if (!member.user.bot) {
                    try {
                        const newInvites = await member.guild.invites.fetch()
                        const oldInvites = await invites.get(member.guild.id);
                        const invite = await newInvites.find(i => i.uses > oldInvites.get(i.code));
                        this.StoreOutputValue(invite, "invite", cache);
                    } catch {
                    }
                    this.StoreOutputValue(member, "member", cache);
                    this.StoreOutputValue(member.user, "user", cache);
                    this.StoreOutputValue(member.guild, "guild", cache);
                    this.StoreOutputValue(Boolean(false), "isbot", cache);
                    this.RunNextBlock("action", cache);
                } else {
                    this.StoreOutputValue(member, "member", cache);
                    this.StoreOutputValue(member.user, "user", cache);
                    this.StoreOutputValue(member.guild, "guild", cache);
                    this.StoreOutputValue(Boolean(true), "isbot", cache);
                    this.RunNextBlock("action", cache);
                }
            }
        });
    }
}