module.exports = {
    name: "Get Server Info",

    description: "Gets the server information.",

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
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The server to get the information.",
            "types": ["object", "unspecified"],
            "required": true
        }
    ],

    options: [
        {
            "id": "server_info",
            "name": "Server Info",
            "description": "Description: The server information to get.",
            "type": "SELECT",
            "options": {
                1: "Server AFK Channel [Voice Channel]",
                2: "Server AFK Channel ID [Text]",
                3: "Server AFK Channel Timeout (Seconds) [Number]",
                4: "Server Application ID [Text]",
                5: "Is Server Available? [Boolean]",
                6: "Server Channel List [List <Channel>]",
                7: "Server Created At [Date]",
                8: "Server Default Message Notifications [Text]",
                9: "Server Default Role (@everyone) [Role]",
                12: "Server Emoji List [List <Emoji>]",
                13: "Server Explicit Content Filter Level [Text]",
                14: "Server Features [List <Text>]",
                15: "Server Icon [Text]",
                16: "Server Icon URL [Text]",
                17: "Server ID [Text]",
                18: "Bot Joined The Server At [Date]",
                19: "Is Server Large? [Boolean]",
                20: "Bot As Member [Member]",
                21: "Server Member Count (Total) [Number]",
                humanMemberCount: "Server Member Count (Humans) [Number]",
                botMemberCount: "Server Member Count (Bots) [Number]",
                onlineMemberCount: "Server Member Count (Online) [Number]",
                offlineMemberCount: "Server Member Count (Offline) [Number]",
                22: "Server Member List [List <Member>]",
                23: "Is Server Two-Factor Authentication Enabled? [Boolean]",
                24: "Server Name [Text]",
                25: "Server Name Acronym [Text]",
                26: "Server Owner Member [Member]",
                27: "Server Owner Member ID [Text]",
                28: "Server Member Main Activity List [List <Activity>]",
                63: "Server Member Activity List [List <List <Activity>>]",
                30: "Server Role List [List <Role>]",
                31: "Server Splash [Text]",
                32: "Server Splash URL [Text]",
                33: "Server System Channel [Text Channel]",
                34: "Server System Channel ID [Text]",
                35: "Server Verification Level [Text]",
                36: "Is Server Verified? [Boolean]",
                38: "Server Ban List [List <Ban>]",
                39: "Server Invite List [List <Invite>]",
                40: "Server Vanity Code [Text]",
                41: "Server Vanity URL [Text]",
                42: "Server Webhook List [List <Webhook>]",
                43: "Server Banner [Text]",
                44: "Server Banner URL [Text]",
                45: "Server Description [Text]",
                48: "Server Maximum Members [Number]",
                49: "Server Maximum Member Activities [Number]",
                50: "Is Server Partnered? [Boolean]",
                51: "Server Boost Count [Number]",
                52: "Server Boost Level [Number]",
                53: "Server Public Updates Channel [Text Channel]",
                54: "Server Public Updates Channel ID [Text]",
                55: "Server Rules Channel [Text Channel]",
                56: "Server Rules Channel ID [Text]",
                57: "Server Widget Channel [Text Channel]",
                58: "Server Widget Channel ID [Text]",
                59: "Is Server Widget Enabled? [Text]",
                60: "Server Audit Log List [List <Audit Log>]",
                61: "Server Preview [Server Preview]",
                62: "Server Bot Prefix [Text]",
                63: "Server Scheduled Events [List]"
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
            "id": "result",
            "name": "Result",
            "description": "Type: Unspecified\n\nDescription: The information obtained from the server.",
            "types": ["unspecified"]
        }
    ],

    async code(cache, DBB) {
        const server = this.GetInputValue("server", cache);
        const server_info = this.GetOptionValue("server_info", cache) + "";

        const {GuildDefaultMessageNotifications, GuildExplicitContentFilter, GuildVerificationLevel} = require("discord.js");
        const simplify = txt => txt.replace(/([A-Z])/g, ' $1').trim();

        let result;
        switch(server_info) {
            case "1":
                result = server.afkChannel;
                break;
            case "2":
                result = server.afkChannelId;
                break;
            case "3":
                result = server.afkTimeout;
                break;
            case "4":
                result = server.applicationId;
                break;
            case "5":
                result = server.available;
                break;
            case "6":
                result = Array.from(server.channels.cache.values());
                break;
            case "7":
                result = server.createdAt;
                break;
            case "8":
                result = simplify(GuildDefaultMessageNotifications[server.defaultMessageNotifications]);
                break;
            case "9":
                result = server.roles.everyone;
                break;
            case "12":
                result = Array.from(server.emojis.cache.values());
                break;
            case "13":
                result = simplify(GuildExplicitContentFilter[server.explicitContentFilter]);
                break;
            case "14":
                result = server.features.map(a => a.replace(/_/g, " ").replace(/\w\S*/g, a => a[0].toUpperCase() + a.substring(1).toLowerCase()));
                break;
            case "15":
                result = server.icon;
                break;
            case "16":
                result = server.iconURL({dynamic: true, format: "png"});
                break;
            case "17":
                result = server.id;
                break;
            case "18":
                result = server.joinedAt;
                break;
            case "19":
                result = server.large;
                break;
            case "20":
                result = server.members.me;
                break;
            case "21":
                result = server.memberCount;
                break;
            case "humanMemberCount":
                result = server.members.cache.filter(member => !member.user.bot).size;
                break;
            case "botMemberCount":
                result = server.members.cache.filter(member => member.user.bot).size;
                break;
            case "onlineMemberCount":
                result = server.members.cache.filter(member => member.presence && member.presence.status != "offline").size;
                break;
            case "offlineMemberCount":
                result = server.members.cache.filter(member => member.presence && member.presence.status == "offline").size;
                break;
            case "22":
                result = Array.from(server.members.cache.values());
                break;
            case "23":
                switch(server.mfaLevel) {
                    default:
                    case 0:
                        result = false;
                        break;
                    case 1:
                        result = true;
                        break;
                }
                break;
            case "24":
                result = server.name;
                break;
            case "25":
                result = server.nameAcronym;
                break;
            case "26":
                result = await server.fetchOwner();
                break;
            case "27":
                result = server.ownerId;
                break;
            case "28":
                result = server.presences.cache.map(a => a.activities[0]);
                break;
            case "29":
                result = server.presences.cache.map(a => a.activities);
                break;
            case "30":
                result = Array.from(server.roles.cache.values());
                break;
            case "31":
                result = server.splash;
                break;
            case "32":
                result = server.splashURL({dynamic: true, format: "png"});
                break;
            case "33":
                result = server.systemChannel;
                break;
            case "34":
                result = server.systemChannelId;
                break;
            case "35":
                result = simplify(GuildVerificationLevel[server.verificationLevel]);
                break;
            case "36":
                result = server.verified;
                break;
            case "38":
                result = await server.bans.fetch().then(bans => Array.from(bans.values()));
                break;
            case "39":
                result = await server.invites.fetch().then(invites => Array.from(invites.values()));
                break;
            case "40":
                result = server.vanityURLCode;
                break;
            case "41":
                result = server.vanityURLCode && ("https://discord.gg/" + server.vanityURLCode);
                break;
            case "42":
                result = await server.fetchWebhooks().then(webhooks => Array.from(webhooks.values()));
                break;
            case "43":
                result = server.banner;
                break;
            case "44":
                result = server.bannerURL({dynamic: true, format: "png"});
                break;
            case "45":
                result = server.description;
                break;
            case "48":
                result = server.maximumMembers;
                break;
            case "49":
                result = server.maximumPresences;
                break;
            case "50":
                result = server.partnered;
                break;
            case "51":
                result = server.premiumSubscriptionCount;
                break;
            case "52":
                result = server.premiumTier;
                break;
            case "53":
                result = server.publicUpdatesChannel;
                break;
            case "54":
                result = server.publicUpdatesChannelId;
                break;
            case "55":
                result = server.rulesChannel;
                break;
            case "56":
                result = server.rulesChannelId;
                break;
            case "57":
                result = server.widgetChannel;
                break;
            case "58":
                result = server.widgetChannelId;
                break;
            case "59":
                result = server.widgetEnabled;
                break;
            case "60":
                result = await server.fetchAuditLogs().then(a => Array.from(a.entries.values()));
                break;
            case "61":
                result = await server.fetchPreview();
                break;
            case "62":
                result = DBB.Data.data.dbb.prefixes.servers[server.id];
                break;
            case "63":
                result = await server.scheduledEvents.cache.toJSON()
                break;
        }

        this.StoreOutputValue(result, "result", cache);
        this.RunNextBlock("action", cache);
    }
}