module.exports = {
    name: "Get User Info x3",

    description: "Gets the user information [x3].",

    category: "User Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "user",
            "name": "User",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The user to get the information.",
            "types": ["object", "unspecified"],
            "required": true
        }
    ],

    options: [
        {
            "id": "user_info1",
            "name": "User Info 1",
            "description": "Description: The user information to get.",
            "type": "SELECT",
            "options": {
                1: "User Avatar ID [Text]",
                2: "User Avatar URL [Text]",
                3: "Is User A Bot? [Boolean]",
                4: "User Created At [Date]",
                5: "User Default Avatar URL [Text]",
                6: "User Discriminator [Text]",
                7: "User Display Avatar URL [Text]",
                8: "User DM Channel [DM Channel]",
                9: "User Flags [List <Text>]",
                10: "User ID [Text]",
                11: "User Last Message [Message]",
                12: "User Last Message ID [Text]",
                13: "User Last Message Channel ID [Text]",
                14: "User Rich Presence [Rich Presence]",
                15: "User Tag [Text]",
                16: "User Username [Text]",
                17: "User Status [Text]",
                18: "Is User Using Desktop? [Boolean]",
                19: "Is User Using Mobile? [Boolean]",
                20: "Is User Using Web? [Boolean]",
                21: "User Mention [Text]",
                22: "User Locale [Text]",
                23: "Is An Official Discord System User? [Boolean]",
                24: "Is Bot Owner? [Boolean]",
				25: "Get User Banner [URL]",
				26: "Get User Banner Object [Object]",
				27: "Get User Badges [List of Objects]"
            }
        },
        {
            "id": "user_info2",
            "name": "User Info 2",
            "description": "Description: The user information to get.",
            "type": "SELECT",
            "options": {
                1: "User Avatar ID [Text]",
                2: "User Avatar URL [Text]",
                3: "Is User A Bot? [Boolean]",
                4: "User Created At [Date]",
                5: "User Default Avatar URL [Text]",
                6: "User Discriminator [Text]",
                7: "User Display Avatar URL [Text]",
                8: "User DM Channel [DM Channel]",
                9: "User Flags [List <Text>]",
                10: "User ID [Text]",
                11: "User Last Message [Message]",
                12: "User Last Message ID [Text]",
                13: "User Last Message Channel ID [Text]",
                14: "User Rich Presence [Rich Presence]",
                15: "User Tag [Text]",
                16: "User Username [Text]",
                17: "User Status [Text]",
                18: "Is User Using Desktop? [Boolean]",
                19: "Is User Using Mobile? [Boolean]",
                20: "Is User Using Web? [Boolean]",
                21: "User Mention [Text]",
                22: "User Locale [Text]",
                23: "Is An Official Discord System User? [Boolean]",
                24: "Is Bot Owner? [Boolean]",
				25: "Get User Banner [URL]",
				26: "Get User Banner Object [Object]",
				27: "Get User Badges [List of Objects]"
            }
        },
        {
            "id": "user_info3",
            "name": "User Info 3",
            "description": "Description: The user information to get.",
            "type": "SELECT",
            "options": {
                1: "User Avatar ID [Text]",
                2: "User Avatar URL [Text]",
                3: "Is User A Bot? [Boolean]",
                4: "User Created At [Date]",
                5: "User Default Avatar URL [Text]",
                6: "User Discriminator [Text]",
                7: "User Display Avatar URL [Text]",
                8: "User DM Channel [DM Channel]",
                9: "User Flags [List <Text>]",
                10: "User ID [Text]",
                11: "User Last Message [Message]",
                12: "User Last Message ID [Text]",
                13: "User Last Message Channel ID [Text]",
                14: "User Rich Presence [Rich Presence]",
                15: "User Tag [Text]",
                16: "User Username [Text]",
                17: "User Status [Text]",
                18: "Is User Using Desktop? [Boolean]",
                19: "Is User Using Mobile? [Boolean]",
                20: "Is User Using Web? [Boolean]",
                21: "User Mention [Text]",
                22: "User Locale [Text]",
                23: "Is An Official Discord System User? [Boolean]",
                24: "Is Bot Owner? [Boolean]",
				25: "Get User Banner [URL]",
				26: "Get User Banner Object [Object]",
				27: "Get User Badges [List of Objects]"
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
            "id": "result1",
            "name": "Result 1",
            "description": "Type: Unspecified\n\nDescription: The information obtained from the user.",
            "types": ["unspecified"]
        },
        {
            "id": "result2",
            "name": "Result 2",
            "description": "Type: Unspecified\n\nDescription: The information obtained from the user.",
            "types": ["unspecified"]
        },
        {
            "id": "result3",
            "name": "Result 3",
            "description": "Type: Unspecified\n\nDescription: The information obtained from the user.",
            "types": ["unspecified"]
        }
    ],

    async code(cache) {
        const user = this.GetInputValue("user", cache);
        const user_info1 = parseInt(this.GetOptionValue("user_info1", cache));
        const user_info2 = parseInt(this.GetOptionValue("user_info2", cache));
        const user_info3= parseInt(this.GetOptionValue("user_info3", cache));
	    const client = this.client;
		const token = client.token;
	    const { getUserBanner } = await this.require("discord-banner");
		const badges = await this.require("discord-badges");		

        let result1;
        switch(user_info1) {
            case 1:
                result1 = user.avatar;
                break;
            case 2:
                result1 = user.avatarURL({dynamic: true, format: "png"});
                break;
            case 3:
                result1 = user.bot;
                break;
            case 4:
                result1 = user.createdAt;
                break;
            case 5:
                result1 = user.defaultAvatarURL;
                break;
            case 6:
                result1 = user.discriminator;
                break;
            case 7:
                result1 = user.displayAvatarURL({dynamic: true, format: "png"});
                break;
            case 8:
                result1 = await user.createDM();
                break;
            case 9:
                result1 = await user.fetchFlags().then(flags => flags.toArray().map(a => a.replace(/_/g, " ").replace(/\w\S*/g, a => a[0].toUpperCase() + a.substring(1).toLowerCase())));
                break;
            case 10:
                result1 = user.id;
                break;
            case 11:
                result1 = user.lastMessage;
                break;
            case 12:
                result1 = user.lastMessageID;
                break;
            case 13:
                result1 = user.lastMessageChannelID;
                break;
            case 14:
                result1 = user.presence;
                break;
            case 15:
                result1 = user.tag;
                break;
            case 16:
                result1 = user.username;
                break;
            case 17:
                switch(user.presence.status) {
                    case "online":
                        result1 = "Online";
                        break;
                    case "idle":
                        result1 = "Idle";
                        break;
                    case "dnd":
                        result1 = "Do Not Disturb";
                        break;
                    case "offline":
                        result1 = "Offline";
                        break;
                }
                break;
            case 18:
                var device = user.presence.clientStatus;
                result1 = device && Object.keys(device).includes("desktop");
                break;
            case 19:
                var device = user.presence.clientStatus;
                result1 = device && Object.keys(device).includes("mobile");
                break;
            case 20:
                var device = user.presence.clientStatus;
                result1 = device && Object.keys(device).includes("web");
                break;
            case 21:
                result1 = user.toString();
                break;
            case 22:
                result1 = user.locale;
                break;
            case 23:
                result1 = user.system;
                break;
            case 24:
                result1 = this.getDBB().Data.data.dbb.owners.includes(user.id);
                break;
            case 25:
                let banneroutputimage;
                const bannerimage = await getUserBanner((user.id),{token: token, format: "gif"})
                if (!isNaN(bannerimage.url)) {
                    banneroutputimage = "undefined";
                } else {
                    banneroutputimage = (bannerimage.url);
                }
                result1 = banneroutputimage;
                break;
            case 26:
                const bannerobject = await getUserBanner((user.id),{token: token})
                result1 = (bannerobject);
                break;
            case 27:
            let badgedev;
                await badges
                .badges(user) 
                   .then((response) => {
                     result1 = (response);
                })
                  .catch((e) => {
                      result1 = undefined;
                  });
                break;
        }

        let result2;
        switch(user_info2) {
            case 1:
                result2 = user.avatar;
                break;
            case 2:
                result2 = user.avatarURL({dynamic: true, format: "png"});
                break;
            case 3:
                result2 = user.bot;
                break;
            case 4:
                result2 = user.createdAt;
                break;
            case 5:
                result2 = user.defaultAvatarURL;
                break;
            case 6:
                result2 = user.discriminator;
                break;
            case 7:
                result2 = user.displayAvatarURL({dynamic: true, format: "png"});
                break;
            case 8:
                result2 = await user.createDM();
                break;
            case 9:
                result2 = await user.fetchFlags().then(flags => flags.toArray().map(a => a.replace(/_/g, " ").replace(/\w\S*/g, a => a[0].toUpperCase() + a.substring(1).toLowerCase())));
                break;
            case 10:
                result2 = user.id;
                break;
            case 11:
                result2 = user.lastMessage;
                break;
            case 12:
                result2 = user.lastMessageID;
                break;
            case 13:
                result2 = user.lastMessageChannelID;
                break;
            case 14:
                result2 = user.presence;
                break;
            case 15:
                result2 = user.tag;
                break;
            case 16:
                result2 = user.username;
                break;
            case 17:
                switch(user.presence.status) {
                    case "online":
                        result2 = "Online";
                        break;
                    case "idle":
                        result2 = "Idle";
                        break;
                    case "dnd":
                        result2 = "Do Not Disturb";
                        break;
                    case "offline":
                        result2 = "Offline";
                        break;
                }
                break;
            case 18:
                var device = user.presence.clientStatus;
                result2 = device && Object.keys(device).includes("desktop");
                break;
            case 19:
                var device = user.presence.clientStatus;
                result2 = device && Object.keys(device).includes("mobile");
                break;
            case 20:
                var device = user.presence.clientStatus;
                result2 = device && Object.keys(device).includes("web");
                break;
            case 21:
                result2 = user.toString();
                break;
            case 22:
                result2 = user.locale;
                break;
            case 23:
                result2 = user.system;
                break;
            case 24:
                result2 = this.getDBB().Data.data.dbb.owners.includes(user.id);
                break;
            case 25:
                let banneroutputimage;
                const bannerimage = await getUserBanner((user.id),{token: token, format: "gif"})
                if (!isNaN(bannerimage.url)) {
                    banneroutputimage = "undefined";
                } else {
                    banneroutputimage = (bannerimage.url);
                }
                result2 = banneroutputimage;
                break;
            case 26:
                const bannerobject = await getUserBanner((user.id),{token: token})
                result2 = (bannerobject);
                break;
            case 27:
            let badgedev;
                await badges
                .badges(user) 
                   .then((response) => {
                     result2 = (response);
                })
                  .catch((e) => {
                      result2 = undefined;
                  });
                break;
        }

        let result3;
        switch(user_info3) {
            case 1:
                result3 = user.avatar;
                break;
            case 2:
                result3 = user.avatarURL({dynamic: true, format: "png"});
                break;
            case 3:
                result3 = user.bot;
                break;
            case 4:
                result3 = user.createdAt;
                break;
            case 5:
                result3 = user.defaultAvatarURL;
                break;
            case 6:
                result3 = user.discriminator;
                break;
            case 7:
                result3 = user.displayAvatarURL({dynamic: true, format: "png"});
                break;
            case 8:
                result3 = await user.createDM();
                break;
            case 9:
                result3 = await user.fetchFlags().then(flags => flags.toArray().map(a => a.replace(/_/g, " ").replace(/\w\S*/g, a => a[0].toUpperCase() + a.substring(1).toLowerCase())));
                break;
            case 10:
                result3 = user.id;
                break;
            case 11:
                result3 = user.lastMessage;
                break;
            case 12:
                result3 = user.lastMessageID;
                break;
            case 13:
                result3 = user.lastMessageChannelID;
                break;
            case 14:
                result3 = user.presence;
                break;
            case 15:
                result3 = user.tag;
                break;
            case 16:
                result3 = user.username;
                break;
            case 17:
                switch(user.presence.status) {
                    case "online":
                        result3 = "Online";
                        break;
                    case "idle":
                        result3 = "Idle";
                        break;
                    case "dnd":
                        result3 = "Do Not Disturb";
                        break;
                    case "offline":
                        result3 = "Offline";
                        break;
                }
                break;
            case 18:
                var device = user.presence.clientStatus;
                result3 = device && Object.keys(device).includes("desktop");
                break;
            case 19:
                var device = user.presence.clientStatus;
                result3 = device && Object.keys(device).includes("mobile");
                break;
            case 20:
                var device = user.presence.clientStatus;
                result3 = device && Object.keys(device).includes("web");
                break;
            case 21:
                result3 = user.toString();
                break;
            case 22:
                result3 = user.locale;
                break;
            case 23:
                result3 = user.system;
                break;
            case 24:
                result3 = this.getDBB().Data.data.dbb.owners.includes(user.id);
                break;
            case 25:
                let banneroutputimage;
                const bannerimage = await getUserBanner((user.id),{token: token, format: "gif"})
                if (!isNaN(bannerimage.url)) {
                    banneroutputimage = "undefined";
                } else {
                    banneroutputimage = (bannerimage.url);
                }
                result3 = banneroutputimage;
                break;
            case 26:
                const bannerobject = await getUserBanner((user.id),{token: token})
                result3 = (bannerobject);
                break;
            case 27:
            let badgedev;
                await badges
                .badges(user) 
                   .then((response) => {
                     result3 = (response);
                })
                  .catch((e) => {
                      result3 = undefined;
                  });
                break;
        }




        this.StoreOutputValue(result1, "result1", cache);
        this.StoreOutputValue(result2, "result2", cache);
        this.StoreOutputValue(result3, "result3", cache);
        this.RunNextBlock("action", cache);
    }
}