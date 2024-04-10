module.exports = {
    name: "Text & Slash Command [Event]",

    description: "When a user types this bot command, this event will trigger.",

    category: "Events",

    auto_execute: true,

    inputs: [],

    options: [
        {
            "id": "cmd_type",
            "name": "Command Type",
            "description": "Description: If \"No\", for example, \"play\", \"PLAY\" and \"PlAy\" are the same command name. This is useful if you want commands with the same name but with different case variants.",
            "type": "SELECT",
            "options": {
                "text": "Text Command",
                "slash": "Slash Command",
                "both": "Both"
            }
        },
        {
            "id": "command_name",
            "name": "Command / Interaction Name",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The name the user needs to type after typing the bot prefix to trigger this bot command (i.e. <Prefix><Command Name>, in other words, \"!myCommand\").",
            "type": "TEXT"
        },
        {
            "id": "custom_prefix",
            "name": "Custom Prefix",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: Custom prefix for this command [Only for Text Commands]",
            "type": "TEXT"
        },       
        {
            "id": "command_restriction",
            "name": "Command Restriction",
            "description": "Description: The user will not be able to use this command if a command restriction applies.",
            "type": "SELECT",
            "options": {
                "none": "None",
                "server_only": "Server Only",
                "server_owner_only": "Server Owner Only",
                "bot_owner_only": "Bot Owner Only",
                "dms_only": "DMs Only"
            }
        },
        {
            "id": "required_member_permission",
            "name": "Required Member Permission",
            "description": "Description: The required member permission to use this command.",
            "type": "SELECT",
            "options": {
                "none": "None",
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
                "manage_emojis": "Manage Emojis"
            }
        },
        {
            "id": "case_sensitive",
            "name": "Case Sensitive",
            "description": "Description: If \"No\", for example, \"play\", \"PLAY\" and \"PlAy\" are the same command name. This is useful if you want commands with the same name but with different case variants.",
            "type": "SELECT",
            "options": {
                "no": "No",
                "yes": "Yes"
            }
        },
        {
            "id": "command_slowmode_restriction",
            "name": "Command Slowmode Restriction",
            "description": "Description: The restriction that will affect the user slowmode at each location. Only use this option if you put a value in the \"Command Slowmode\" input.",
            "type": "SELECT",
            "options": {
                "none": "None",
                "channel": "Per Channel",
                "server/dm": "Per Server/DM",
                "everywhere": "Everywhere",
            }
        }
    ],

    outputs: [
        {
            "id": "action1",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks if there is no error message.",
            "types": ["action"]
        },
        {
            "id": "action2",
            "name": "Action (Error)",
            "description": "Type: Action\n\nDescription: Executes the following blocks if there is any error message.",
            "types": ["action"]
        },
        {
            "id": "message",
            "name": "Message",
            "description": "Type: Object\n\nDescription: The command author's message.",
            "types": ["object"]
        },
        {
            "id": "server",
            "name": "Server",
            "description": "Type: Object\n\nDescription: The server.",
            "types": ["object"]
        },
        {
            "id": "channel",
            "name": "Channel",
            "description": "Type: Object\n\nDescription: The command author's message channel.",
            "types": ["object"]
        },
        {
            "id": "vc",
            "name": "Voice Channel",
            "description": "Type: Object\n\nDescription: The command author's voice channel.",
            "types": ["object"]
        },
        {
            "id": "user",
            "name": "User",
            "description": "Type: Object\n\nDescription: The command author.",
            "types": ["object"]
        },
        {
            "id": "member",
            "name": "Member",
            "description": "Type: Object\n\nDescription: The command author.",
            "types": ["object"]
        },
        {
            "id": "interaction",
            "name": "Interaction",
            "description": "The interaction that started the event",
            "types": ["object"]
        },
        {
            "id": "args",
            "name": "Interaction Arguments",
            "description": "The command arguments or the modal questions",
            "types": ["list", "unspecified"]
        },
        {
            "id": "type",
            "name": "Command Type",
            "description": "The name of the command or the id of the button / modal",
            "types": ["text"]
        },
        {
            "id": "error_message",
            "name": "Error Message",
            "description": "Type: Object\n\nDescription: The error message if the user is still in slowmode, does not have the required permission or other restriction violated.\n\nPossible Values: \"Command Restriction\", \"User Permission\", \"User Slowmode\", \"Nothing\".",
            "types": ["text"]
        }
    ],

    init(DBB, fileName) {
        const Data = DBB.Blocks.Data;
        const slowmodeData = Data.getData("slowmode", fileName, "block");

        if(slowmodeData && DBB.Core.typeof(slowmodeData) == "object") {
            for (const commandName in slowmodeData) {
                const userIDs = slowmodeData[commandName];

                for (const userID in userIDs) {
                    const discordIDs = userIDs[userID];

                    for (const discordID in discordIDs) {
                        const time = discordIDs[discordID];

                        if(Date.now() >= (parseInt(time) || 0)) delete discordIDs[discordID];
                    }

                    if(!Object.values(discordIDs).length) delete userIDs[userID];
                }

                if(!Object.values(userIDs).length) delete slowmodeData[commandName];
            }

            if(Object.values(slowmodeData).length) Data.setData("slowmode", slowmodeData, fileName, "block");
            else Data.deleteData("slowmode", fileName, "block");
        } else Data.deleteData("slowmode", fileName, "block");
    },

    code(cache, DBB) {
        const {PermissionFlagsBits, ChannelType} = require("discord.js");

        const permissions = {
            none: "none",
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

        let command_name = this.GetOptionValue("command_name", cache);
        const custom_prefix = this.GetOptionValue("custom_prefix", cache, true);
        let command_slowmode = this.GetInputValue("command_slowmode", cache);
        const command_restriction = this.GetOptionValue("command_restriction", cache) + "";
        const required_member_permission = permissions[this.GetOptionValue("required_member_permission", cache) + ""];
        const case_sensitive = this.GetOptionValue("case_sensitive", cache) == "yes";
        const command_slowmode_restriction = this.GetOptionValue("command_slowmode_restriction", cache) + "";

        command_name = typeof command_name == "string" ? command_name : "";
        if(case_sensitive) command_name = command_name.toLowerCase();

        command_slowmode = Math.max(0, command_slowmode instanceof Date ? command_slowmode.getTime() : Date.now() + parseInt(command_slowmode));

        const {prefixes, owners} = DBB.Data.data.dbb;

        let prefix = prefixes.main;
        if(custom_prefix.value != "") prefix = custom_prefix.value + "";

        const cmd_type = this.GetOptionValue("cmd_type", cache) + "";
        
        if(cmd_type == "text"){            
            function CheckCommandRestriction(msg) {
                switch(command_restriction) {
                    default: // "none"
                        return [true, msg.member ? CheckPermission(msg.member) : true];
                    case "server_only":
                        return [Boolean(msg.guild), CheckPermission(msg.member)];
                    case "server_owner_only":
                        return [msg.guild && msg.guild.owner.id == msg.member.id, true];
                    case "bot_owner_only":
                        return [owners.includes(msg.author.id), true];
                    case "dms_only":
                        return [msg.channel.type == ChannelType.DM, true];
                }
            }
    
            function CheckPermission(member) {
                if(required_member_permission == "none") return true;
                else if(!member) return false;
                return member.permissions.has(required_member_permission);
            }
    
    
            function ExtraCheckSlowmode(userData, targetID, slowmodeData) {
                if(userData[targetID] >= Date.now())
                    return false;
                
                userData[targetID] = command_slowmode;
    
                this.setData("slowmode", slowmodeData, command_name, "block");
    
                return true;
            }
            function CheckSlowmode(msg) {
                let slowmodeData = this.getData("slowmode", command_name, "block");
    
                if(!(slowmodeData && DBB.Core.typeof(slowmodeData) == "object"))
                    slowmodeData = {}
    
                const userIDs = slowmodeData[command_name];
    
                if(!(userIDs && DBB.Core.typeof(userIDs) == "object"))
                    slowmodeData[command_name] = {}
    
                const authorId = msg.author.id
                const userData = userIDs[authorId];
    
                if(!(userData && DBB.Core.typeof(userData) == "object"))
                    userIDs[authorId] = {}
    
                switch(command_slowmode_restriction) {
                    case "channel":
                        return ExtraCheckSlowmode(userData, msg.channel.id, slowmodeData);
                    case "server/dm":
                        return ExtraCheckSlowmode(userData, msg.guild ? msg.guild.id : msg.channel.id, slowmodeData);
                    case "everywhere":
                        return ExtraCheckSlowmode(userData, "global");
                    default:
                        return true;
                }
            }
    
    
                const EndBlock = (msg, reason, action) => {
                this.StoreOutputValue(msg, "message", cache);
                this.StoreOutputValue(msg.channel, "channel", cache);
                this.StoreOutputValue(msg.author, "user", cache);
                this.StoreOutputValue(msg.member, "member", cache);
                this.StoreOutputValue(msg.member.voice.channel, "vc", cache);
                this.StoreOutputValue(msg.guild, "server", cache);
                this.StoreOutputValue(reason, "error_message", cache);
                this.StoreOutputValue("Text", "type", cache);
                this.RunNextBlock(action ? "action1" : "action2", cache);
            }
    
            this.events.on("messageCreate", msg => {
                if(msg.author.bot) return;
    
                const _prefix = !custom_prefix && msg.guild && msg.guild.id in prefixes.servers ? prefixes.servers[msg.guild.id] : prefix;
    
                let content = msg.content.trim();
                if(case_sensitive) content = content.toLowerCase();
    
                if(!content.startsWith(_prefix + command_name)) return;
    
    
                const restriction = CheckCommandRestriction(msg);
    
                if(!restriction[0]) EndBlock(msg, "Command Restriction");
                else if(!restriction[1]) EndBlock(msg, "Member Permission");
                else if(command_slowmode && !CheckSlowmode(msg)) EndBlock(msg, "User Slowmode");
                else EndBlock(msg, "Nothing", true);
            });

        } else if(cmd_type == "slash") {           
        
                this.events.on('interactionCreate', interaction => {
                    if (interaction.isChatInputCommand()) {
                        if (interaction.commandName == command_name) {
                        //Slash Command
                        this.StoreOutputValue(interaction.options._hoistedOptions, "args", cache)
                        this.StoreOutputValue(interaction.member, "member", cache)
                        this.StoreOutputValue(interaction.guild, "server", cache)
                        this.StoreOutputValue(interaction, "interaction", cache)
                        this.StoreOutputValue(interaction.user, "user", cache)
                        this.StoreOutputValue(interaction.channel, "channel", cache);
                        this.StoreOutputValue(interaction.message, "message", cache);
                        this.StoreOutputValue("Slash", "type", cache);
                        this.RunNextBlock("action1", cache);
                        }
                    } 
                })

        

        } else if(cmd_type == "both") {

            this.events.on('interactionCreate', interaction => {
                if (interaction.isChatInputCommand()) {
                    if (interaction.commandName == command_name) {
                    //Slash Command
                    this.StoreOutputValue(interaction.options._hoistedOptions, "args", cache)
                    this.StoreOutputValue(interaction.member, "member", cache)
                    this.StoreOutputValue(interaction.guild, "server", cache)
                    this.StoreOutputValue(interaction, "interaction", cache)
                    this.StoreOutputValue(interaction.user, "user", cache)
                    this.StoreOutputValue(interaction.channel, "channel", cache);
                    this.StoreOutputValue(interaction.message, "message", cache);
                    this.StoreOutputValue("Slash", "type", cache);
                    this.RunNextBlock("action1", cache);
                    }
                } 
            })

            function CheckCommandRestriction(msg) {
                switch(command_restriction) {
                    default: // "none"
                        return [true, msg.member ? CheckPermission(msg.member) : true];
                    case "server_only":
                        return [Boolean(msg.guild), CheckPermission(msg.member)];
                    case "server_owner_only":
                        return [msg.guild && msg.guild.owner.id == msg.member.id, true];
                    case "bot_owner_only":
                        return [owners.includes(msg.author.id), true];
                    case "dms_only":
                        return [msg.channel.type == ChannelType.DM, true];
                }
            }
    
            function CheckPermission(member) {
                if(required_member_permission == "none") return true;
                else if(!member) return false;
                return member.permissions.has(required_member_permission);
            }
    
    
            function ExtraCheckSlowmode(userData, targetID, slowmodeData) {
                if(userData[targetID] >= Date.now())
                    return false;
                
                userData[targetID] = command_slowmode;
    
                this.setData("slowmode", slowmodeData, command_name, "block");
    
                return true;
            }
            function CheckSlowmode(msg) {
                let slowmodeData = this.getData("slowmode", command_name, "block");
    
                if(!(slowmodeData && DBB.Core.typeof(slowmodeData) == "object"))
                    slowmodeData = {}
    
                const userIDs = slowmodeData[command_name];
    
                if(!(userIDs && DBB.Core.typeof(userIDs) == "object"))
                    slowmodeData[command_name] = {}
    
                const authorId = msg.author.id
                const userData = userIDs[authorId];
    
                if(!(userData && DBB.Core.typeof(userData) == "object"))
                    userIDs[authorId] = {}
    
                switch(command_slowmode_restriction) {
                    case "channel":
                        return ExtraCheckSlowmode(userData, msg.channel.id, slowmodeData);
                    case "server/dm":
                        return ExtraCheckSlowmode(userData, msg.guild ? msg.guild.id : msg.channel.id, slowmodeData);
                    case "everywhere":
                        return ExtraCheckSlowmode(userData, "global");
                    default:
                        return true;
                }
            }
    
    
                const EndBlock = (msg, reason, action) => {
                this.StoreOutputValue(msg, "message", cache);
                this.StoreOutputValue(msg.channel, "channel", cache);
                this.StoreOutputValue(msg.author, "user", cache);
                this.StoreOutputValue(msg.member, "member", cache);
                this.StoreOutputValue(msg.member.voice.channel, "vc", cache);
                this.StoreOutputValue(msg.guild, "server", cache);
                this.StoreOutputValue(reason, "error_message", cache);
                this.StoreOutputValue("Text", "type", cache);
                this.RunNextBlock(action ? "action1" : "action2", cache);
            }
    
            this.events.on("messageCreate", msg => {
                if(msg.author.bot) return;
    
                const _prefix = !custom_prefix && msg.guild && msg.guild.id in prefixes.servers ? prefixes.servers[msg.guild.id] : prefix;
    
                let content = msg.content.trim();
                if(case_sensitive) content = content.toLowerCase();
    
                if(!content.startsWith(_prefix + command_name)) return;
    
    
                const restriction = CheckCommandRestriction(msg);
    
                if(!restriction[0]) EndBlock(msg, "Command Restriction");
                else if(!restriction[1]) EndBlock(msg, "Member Permission");
                else if(command_slowmode && !CheckSlowmode(msg)) EndBlock(msg, "User Slowmode");
                else EndBlock(msg, "Nothing", true);
            });


        }
    
        
    }
}