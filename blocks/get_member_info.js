

module.exports = {
    name: "Get Member Info",

    description: "Gets the member information.",

    category: "Member Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "member",
            "name": "Member",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The member to get the information.",
            "types": ["object", "unspecified"],
            "required": true
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
            "id": "member_info",
            "name": "Member Info",
            "description": "Description: The member information to get.",
            "type": "SELECT",
            "options": {
                1: "Is Member Bannable By The Bot? [Boolean]",
                2: "Member Color Role [Role]",
                3: "Is Member Deafened In Any Way? [Boolean]",
                5: "Member Display Base 10 Color [Text]",
                6: "Member Display Hex Color [Text]",
                7: "Member Display Name [Text]",
                8: "Member Server [Server]",
                9: "Member Highest Role [Role]",
                10: "Member Hoist Role [Role]",
                11: "Member ID [Text]",
                12: "Member Joined Server At [Date]",
                13: "Is Member Kickable By The Bot? [Boolean]",
                16: "Is Member Manageable By The Bot? [Boolean]",
                17: "Member Muted In Any Way? [Message]",
                18: "Member Nickname [Text]",
                19: "Member Permissions [Permissions]",
                20: "Member Main Activity [Activity]",
                37: "Member Activity List [List <Activity>]",
                38: "Member Status [Text]",
                39: "Is Member Using Desktop? [Boolean]",
                40: "Is Member Using Mobile? [Boolean]",
                41: "Is Member Using Web? [Boolean]",
                21: "Member Role List [List <Role>]",
                22: "Is Member Self-Deafened? [Boolean]",
                23: "Is Member Self-Muted? [Boolean]",
                24: "Is Member Deafened Server-Wide? [Boolean]",
                25: "Is Member Muted Server-Wide? [Boolean]",
                27: "Member User [User]",
                28: "Member Voice Channel [Voice Channel]",
                29: "Member Voice Channel ID [Text]",
                30: "Member Voice Session ID [Text]",
                31: "Member Mention [Text]",
                34: "Member Boosted Server At [Date]",
                35: "Is Member Using \"Go Live\"? [Boolean]",
                36: "Is Member In Voice Channel? [Boolean]"
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
            "description": "Type: Unspecified\n\nDescription: The information obtained from the member.",
            "types": ["unspecified"]
        }
    ],

    code(cache) {
        const server = this.GetInputValue("server", cache);
        const member = this.GetInputValue("member", cache);
        const member_info = parseInt(this.GetOptionValue("member_info", cache));

        let result;
        switch(member_info) {
            case 1:
                result = member.bannable;
                break;
            case 2:
                result = member.roles.color;
                break;
            case 3:
                result = member.voice.deaf;
                break;
            case 5:
                result = member.displayColor;
                break;
            case 6:
                result = member.displayHexColor;
                break;
            case 7:
                result = member.displayName;
                break;
            case 8:
                result = member.guild;
                break;
            case 9:
                result = member.roles.highest;
                break;
            case 10:
                result = member.roles.hoist;
                break;
            case 11:
                result = member.id;
                break;
            case 12:
                result = member.joinedAt;
                break;
            case 13:
                result = member.kickable;
                break;
            case 16:
                result = member.manageable;
                break;
            case 17:
                result = member.voice.mute;
                break;
            case 18:
                result = member.nickname;
                break;
            case 19:
                result = member.permissions;
                break;
            case 20:
                result = member.presence && member.presence.activities[0];
                break;
            case 37:
                result = member.presence && member.presence.activities;
                break;
            case 38:
                switch(member.presence && member.presence.status) {
                    case "online":
                        result = "Online";
                        break;
                    case "idle":
                        result = "Idle";
                        break;
                    case "dnd":
                        result = "Do Not Disturb";
                        break;
                    case "offline":
                        result = "Offline";
                        break;
                }
                break;
            case 39: {
                const device = member.presence && member.presence.clientStatus;
                result = device && Object.keys(device).includes("desktop");
                break;
            }
            case 40: {
                const device = member.presence && member.presence.clientStatus;
                result = device && Object.keys(device).includes("mobile");
                break;
            }
            case 41: {
                const device = member.presence && member.presence.clientStatus;
                result = device && Object.keys(device).includes("web");
                break;
            }
            case 21:
                result = Array.from(member.roles.cache.values());
                break;
            case 22:
                result = member.voice.selfDeaf;
                break;
            case 23:
                result = member.voice.selfMute;
                break;
            case 24:
                result = member.voice.serverDeaf;
                break;
            case 25:
                result = member.voice.serverMute;
                break;
            case 27:
                result = member.user;
                break;
            case 28:
                result = member.voice.channel;
                break;
            case 29:
                result = member.voice.channelId;
                break;
            case 30:
                result = member.voice.sessionId;
                break;
            case 31:
                result = member.toString();
                break;
            case 34:
                result = member.premiumSince;
                break;
            case 35:
                result = member.voice.streaming;
                break;
            case 36:
                result = Boolean(member.voice.channelId);
                break;
        }

        this.StoreOutputValue(result, "result", cache);
        this.RunNextBlock("action", cache);
    }
}