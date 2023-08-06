module.exports = {
    name: "Set Permission",

    description: "Sets a permission for the role or channel.",

    category: "Server Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "target1",
            "name": "Target 1",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The role or channel to set the permission. Set the corresponded option in \"Comparison Type\".",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "target2",
            "name": "Target 2",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: Follow the instructions in \"Comparison Type\" option if necessary. (OPTIONAL)",
            "types": ["object", "unspecified"]
        }
    ],

    options: [
        {
            "id": "target_type",
            "name": "Target Type",
            "description": "Description: The option related to the role/channel from the \"Target 1\" input.",
            "type": "SELECT",
            "options": {
                "role": "Role",
                "channel_everyone": "Channel (Related to @everyone role)",
                "channel_target": "Channel (Related to a role or member. Put the role or member on the \"Target 2\" input.)",
            }
        },
        {
            "id": "permission",
            "name": "Permission",
            "description": "Description: The permission to set for the role or channel.",
            "type": "SELECT",
            "options": {
                "administrator": "Administrator",
                "create_instant_invite": "Create Instant Invite",
                "kick_members": "Kick Members",
                "ban_members": "Ban Members",
                "manage_channels": "Manage Channels",
                "manage_guild": "Manage Server",
                "add_reactions": "Add Reactions",
                "view_audit_log": "View Audit Log",
                "priority_speaker": "Priority Speaker",
                "stream": "Video",
                "view_channel": "View Text/Voice Channel(s)",
                "send_messages": "Send Messages",
                "send_tts_messages": "Send TTS Messages",
                "manage_messages": "Manage Messages",
                "embed_links": "Embed Links",
                "attach_files": "Attach Files",
                "read_message_history": "Read Message History",
                "mention_everyone": "Mention Everyone",
                "use_external_emojis": "Use External Emojis",
                "view_guild_insights": "View Server Insights",
                "connect": "Connect (Connect to a voice channel)",
                "speak": "Speak (Speak in a voice channel)",
                "mute_members": "Mute Members (Mute members across all voice channels)",
                "deafen_members": "Deafen Members (Deafen members across all voice channels)",
                "move_members": "Move Members (Move members between voice channels)",
                "use_vad": "Use Voice Activity",
                "change_nickname": "Change Nickname",
                "manage_nicknames": "Manage Nicknames (Change other members' nicknames)",
                "manage_roles": "Manage Roles",
                "manage_webhooks": "Manage Webhooks",
                "manage_emojis": "Manage Emojis and Stickers"
            }
        },
        {
            "id": "permission_setting",
            "name": "Permission Setting",
            "description": "Description: The setting for the selected permission.",
            "type": "SELECT",
            "options": {
                "allow": "Allow",
                "inherit": "Inherit/Neutral",
                "deny": "Deny"
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
        const {PermissionFlagsBits} = require("discord.js");

        const permissions = {
            administrator: PermissionFlagsBits.Administrator,
            create_instant_invite: PermissionFlagsBits.CreateInstantInvite,
            kick_members: PermissionFlagsBits.KickMembers,
            ban_members: PermissionFlagsBits.BanMembers,
            manage_channels: PermissionFlagsBits.ManageChannels,
            manage_guild: PermissionFlagsBits.ManageGuild,
            add_reactions: PermissionFlagsBits.AddReactions,
            view_audit_log: PermissionFlagsBits.ViewAuditLog,
            priority_speaker: PermissionFlagsBits.PrioritySpeaker,
            stream: PermissionFlagsBits.Stream,
            view_channel: PermissionFlagsBits.ViewChannel,
            send_messages: PermissionFlagsBits.SendMessages,
            send_tts_messages: PermissionFlagsBits.SendTTSMessages,
            manage_messages: PermissionFlagsBits.ManageMessages,
            embed_links: PermissionFlagsBits.EmbedLinks,
            attach_files: PermissionFlagsBits.AttachFiles,
            read_message_history: PermissionFlagsBits.ReadMessageHistory,
            mention_everyone: PermissionFlagsBits.MentionEveryone,
            use_external_emojis: PermissionFlagsBits.UseExternalEmojis,
            view_guild_insights: PermissionFlagsBits.ViewGuildInsights,
            connect: PermissionFlagsBits.Connect,
            speak: PermissionFlagsBits.Speak,
            mute_members: PermissionFlagsBits.MuteMembers,
            deafen_members: PermissionFlagsBits.DeafenMembers,
            move_members: PermissionFlagsBits.MoveMembers,
            use_vad: PermissionFlagsBits.UseVAD,
            change_nickname: PermissionFlagsBits.ChangeNickname,
            manage_nicknames: PermissionFlagsBits.ManageNicknames,
            manage_roles: PermissionFlagsBits.ManageRoles,
            manage_webhooks: PermissionFlagsBits.ManageWebhooks,
            manage_emojis: PermissionFlagsBits.ManageEmojisAndStickers
        }

        const permissionSetting = {
            allow: true,
            inherit: null,
            deny: false
        }

        const target1 = this.GetInputValue("target1", cache);
        const target2 = this.GetInputValue("target2", cache);
        const target_type = this.GetOptionValue("target_type", cache) + "";
        const permission = permissions[this.GetOptionValue("permission", cache) + ""];
        const permission_setting = permissionSetting[this.GetOptionValue("permission_setting", cache) + ""];

        switch(target_type) {
            case "role":
                result = target1.setPermissions(permission);
                break;
            case "channel_everyone":
                if (target1.guild)
                    target1.permissionOverwrites.edit(target1.guild.id, permission_setting)
                break;
            case "channel_target":
                if (target2)
                    target1.permissionOverwrites.edit(target2, permission_setting)
                break;
        }

        this.RunNextBlock("action", cache);
    }
}