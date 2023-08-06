module.exports = {
    name: "Create Server",

    description: "Creates a new server. This is ONLY available if your bot has LESS than 10 servers!",

    category: "Server Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "server_name",
            "name": "Server Name",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The name for this server.",
            "types": ["text", "unspecified"],
            "required": true,
        },
        {
            "id": "server_icon",
            "name": "Server Icon",
            "description": "Acceptable Types: Text, Object, Unspecified\n\nDescription: The icon for this server. Supports Image, image file path and URL. (OPTIONAL)",
            "types": ["text", "object", "unspecified"]
        }
    ],

    options: [
        {
            "id": "server_default_message_notifications",
            "name": "Server Default Message Notifications",
            "description": "Description: The default message notifications for this server.",
            "type": "SELECT",
            "options": {
                "all": "All Messages",
                "mentions": "Only @mentions"
            }
        },
        {
            "id": "server_explicit_content_filter_level",
            "name": "Server Explicit Content Filter Level",
            "description": "Description: The explicit content filter level for this server.",
            "type": "SELECT",
            "options": {
                "disabled": "Disabled",
                "members_without_roles": "Members Without Roles",
                "all_members": "All Members"
            }
        },
        {
            "id": "server_verification_level",
            "name": "Server Verification Level",
            "description": "Description: The verification level for this server.",
            "type": "SELECT",
            "options": {
                "none": "None",
                "low": "Low",
                "medium": "Medium",
                "high": "High",
                "very_high": "Very High"
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
            "id": "server",
            "name": "Server",
            "description": "Type: Object\n\nDescription: This server created.",
            "types": ["object"]
        }
    ],

    code(cache) {
        const {GuildDefaultMessageNotifications, GuildExplicitContentFilter, GuildVerificationLevel} = require("discord.js");

        const guildDefaultMessageNotifications = {
            all: GuildDefaultMessageNotifications.AllMessages,
            mentions: GuildDefaultMessageNotifications.OnlyMentions
        }

        const guildExplicitContentFilter = {
            all_members: GuildExplicitContentFilter.AllMembers,
            disabled: GuildExplicitContentFilter.Disabled,
            members_without_roles: GuildExplicitContentFilter.MembersWithoutRoles
        }

        const guildVerificationLevel = {
            none: GuildVerificationLevel.None,
            low: GuildVerificationLevel.Low,
            medium: GuildVerificationLevel.Medium,
            high: GuildVerificationLevel.High,
            very_high: GuildVerificationLevel.VeryHigh,
        }

        const server_name = this.GetInputValue("server_name", cache);
        const server_icon = this.GetInputValue("server_icon", cache);
        const server_default_message_notifications = this.GetOptionValue("server_default_message_notifications", cache);
        const server_explicit_content_filter_level = this.GetOptionValue("server_explicit_content_filter_level", cache);
        const server_verification_level = this.GetOptionValue("server_verification_level", cache);

        const data = {
            name: server_name,
            icon: server_icon,
            defaultMessageNotifications: guildDefaultMessageNotifications[server_default_message_notifications],
            explicitContentFilter: guildExplicitContentFilter[server_explicit_content_filter_level],
            verificationLevel: guildVerificationLevel[server_verification_level]
        }

        Object.keys(data).forEach(key => {
            if([undefined, null, NaN].includes(data[key])) delete data[key];
        });

        this.client.guilds.create(data).then(server => {
            this.StoreOutputValue(server, "server", cache);
            this.RunNextBlock("action", cache);
        });
    }
}