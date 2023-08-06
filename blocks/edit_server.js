module.exports = {
    name: "Edit Server",

    description: "Edits a server.",

    category: "Server Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "server",
            "name": "Server",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The server to edit.",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "server_name",
            "name": "Server Name",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The new name for this server. (OPTIONAL)",
            "types": ["text", "unspecified"]
        },
        {
            "id": "server_icon",
            "name": "Server Icon",
            "description": "Acceptable Types: Text, Object, Unspecified\n\nDescription: The new icon for this server. Supports URL and file path. (OPTIONAL)",
            "types": ["text", "object", "unspecified"]
        },
        {
            "id": "server_afk_channel",
            "name": "Server AFK Channel",
            "description": "Acceptable Types: Object, Text, Unspecified\n\nDescription: The new AFK channel for this server. Supports Channel ID. (OPTIONAL)",
            "types": ["object", "text", "unspecified"]
        },
        {
            "id": "server_system_channel",
            "name": "Server System Channel",
            "description": "Acceptable Types: Object, Text, Unspecified\n\nDescription: The new system channel for this server. Supports Channel ID. (OPTIONAL)",
            "types": ["object", "text", "unspecified"]
        },
        {
            "id": "server_afk_timeout",
            "name": "Server AFK Timeout",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The new AFK timeout in seconds for this server. (OPTIONAL)",
            "types": ["number", "unspecified"]
        },
        {
            "id": "server_owner",
            "name": "Server Owner",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The new owner for this server. Supports Member and User object. Obviously, your bot needs to be the owner of the server. (OPTIONAL)",
            "types": ["object", "unspecified"]
        },
        {
            "id": "server_splash",
            "name": "Server Splash",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The new splash for this server. Only supports Image. (OPTIONAL)",
            "types": ["object", "unspecified"]
        },
        {
            "id": "server_banner",
            "name": "Server Banner",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The new banner for this server. Only supports Image. (OPTIONAL)",
            "types": ["object", "unspecified"]
        },
        {
            "id": "reason",
            "name": "Reason",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The reason for editing this server. This will appear in Audit Log of the server. (OPTIONAL)",
            "types": ["text", "unspecified"]
        }
    ],

    options: [
        {
            "id": "server_default_message_notifications",
            "name": "Server Default Message Notifications",
            "description": "Description: The new default message notifications for this server.",
            "type": "SELECT",
            "options": {
                "dont_edit": "Do Not Edit",
                "all": "All Messages",
                "mentions": "Only @mentions"
            }
        },
        {
            "id": "server_explicit_content_filter_level",
            "name": "Server Explicit Content Filter Level",
            "description": "Description: The new explicit content filter level for this server.",
            "type": "SELECT",
            "options": {
                "dont_edit": "Do Not Edit",
                "disabled": "Disabled",
                "members_without_roles": "Members Without Roles",
                "all_members": "All Members"
            }
        },
        {
            "id": "server_verification_level",
            "name": "Server Verification Level",
            "description": "Description: The new verification level for this server.",
            "type": "SELECT",
            "options": {
                "dont_edit": "Do Not Edit",
                "none": "None",
                "low": "Low",
                "medium": "Medium",
                "high": "High",
                "very_high": "Very High"
            }
        },
        {
            "id": "server_default_message_notifications",
            "name": "Server Default Message Notifications",
            "description": "Description: The new default message notifications for this server.",
            "type": "SELECT",
            "options": {
                "dont_edit": "Do Not Edit",
                "all": "All Messages",
                "mentions": "Only @mentions"
            }
        }
    ],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        }
    ],

    code(cache) {
        const server = this.GetInputValue("server", cache);
        const server_name = this.GetInputValue("server_name", cache);
        const server_icon = this.GetInputValue("server_icon", cache);
        const server_afk_channel = this.GetInputValue("server_afk_channel", cache);
        const server_system_channel = this.GetInputValue("server_system_channel", cache);
        const server_afk_timeout = parseInt(this.GetInputValue("server_afk_timeout", cache));
        const server_owner = this.GetInputValue("server_owner", cache);
        const server_splash = this.GetInputValue("server_splash", cache);
        const server_banner = this.GetInputValue("server_banner", cache);
        const server_default_message_notifications = this.GetOptionValue("server_default_message_notifications", cache);
        const server_explicit_content_filter_level = this.GetOptionValue("server_explicit_content_filter_level", cache);
        const server_verification_level = this.GetOptionValue("server_verification_level", cache);
        const reason = this.GetInputValue("reason", cache);

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

        const data = {
            name: server_name,
            afkChannel: server_afk_channel,
            systemChannel: server_system_channel,
            afkTimeout: server_afk_timeout,
            icon: server_icon,
            owner: server_owner,
            splash: server_splash,
            banner: server_banner,
            defaultMessageNotifications: guildDefaultMessageNotifications[server_default_message_notifications],
            explicitContentFilter: guildExplicitContentFilter[server_explicit_content_filter_level],
            verificationLevel: guildVerificationLevel[server_verification_level],
            reason
        }

        Object.keys(data).forEach(key => {
            if([undefined, null, NaN].includes(data[key])) delete data[key];
        });

        server.edit(data).then(() => {
            this.RunNextBlock("action", cache);
        });
    }
}