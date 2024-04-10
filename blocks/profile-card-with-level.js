module.exports = {
    name: "Profile Card With Rank",
    description: "Makes a cool profile card with nice level and xp feature.",
    
    category: ".T45",
    
    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
            "id": "usertag",
            "name": "User Tag",
            "description": "Acceptable Types: Unspecified, Text\n\nDescription: The user tag.\n\nExample: T-45#4087",
            "types": ["text", "unspecified"],
            "required": true
        },
        {
            "id": "avatar",
            "name": "Avatar",
            "description": "Acceptable Types: Unspecified, Text\n\nDescription: The user's avatar url.",
            "types": ["text", "unspecified"],
            "required": true
        },
        {
            "id": "banner",
            "name": "Banner",
            "description": "Acceptable Types: Unspecified, Text\n\nDescription: The user's banner url. (OPTIONAL)",
            "types": ["text", "unspecified"]
        },
        {
            "id": "bio",
            "name": "Bio",
            "description": "Acceptable Types: Unspecified, Text\n\nDescription: Can be the user's about me or something.",
            "types": ["text", "unspecified"],
            "required": true
        },
        {
            "id": "roles",
            "name": "Roles",
            "description": "Acceptable Types: Unspecified, List\n\nDescription: The member's roles list.",
            "types": ["list", "unspecified"],
            "required": true
        },
        {
            "id": "xp",
            "name": "XP",
            "description": "Acceptable Types: Unspecified, Number\n\nDescription: The user/member's XP.\n\nNote: Only use if the xp system option is set to true!",
            "types": ["number","unspecified"],
        },
        {
            "id": "total",
            "name": "Total",
            "description": "Acceptable Types: Unspecified, Number\n\nDescription: The user/member's total XP.\n\nNote: Only use if the xp system option is set to true!",
            "types": ["number","unspecified"],
        },
        {
            "id": "level",
            "name": "Level",
            "description": "Acceptable Types: Unspecified, Number\n\nDescription: The user/member's level.\n\nNote: Only use if the xp system option is set to true!",
            "types": ["number","unspecified"],
        },
    ],
    
    options: [
        {
            "id": "XPSystem",
            "name": "XP System?",
            "description": "Type: Boolean\n\nDescription: Add XP system? Select True or False (REQUIRED)",
            "type": "SELECT",
            "options": {
                "true": "True",
                "false": "False"
            }
        },
    ],
    
    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
            "id": "card",
            "name": "Card",
            "description": "Type: Action\n\nDescription: The created card image url.",
            "types": ["text"]
        },
        {
            "id": "error",
            "name": "Error",
            "description": "Type: Action\n\nDescription: Returns an error if there's any.",
            "types": ["text"]
        }
    ],
    
    async code(cache) {
        const usertag = this.GetInputValue("usertag", cache);
        const avatar = this.GetInputValue("avatar", cache);
        const banner = this.GetInputValue("banner", cache);
        const bio = this.GetInputValue("bio", cache);
        const roles = this.GetInputValue("roles", cache);
        let xp = this.GetInputValue("xp", cache);
        let total = this.GetInputValue("total", cache);
        let level = this.GetInputValue("level", cache);
        const XPSystem = this.GetOptionValue("XPSystem", cache);

        let xpBool;
        let errorMessage;
        
        switch (XPSystem) {
            case "true":
            if (xp && total && level) {
                xpBool = true
            } else {
                xpBool = false
                errorMessage = "All xp system values must be set to something!"
            }
            break;
            case "false":
            xpBool = false
            xp = 1
            total = 1
            level = 1
            break;
        }
        
        const axios = require('axios');
        const cardCreate = async () => {
            const response = await axios.get('https://api.daimon-bot.ga/image/profilecard/v1', {
            params: {
                usertag: usertag,
                avatar: avatar,
                banner: banner,
                bio: bio,
                roles: roles,
                xp: xp,
                total: total,
                level: level,
                rank_system: xpBool,
                nitro: false,
                developer: false
            },
        });
        return response.request.res.responseUrl
    }
    
    const image = await cardCreate()
    
    this.StoreOutputValue(errorMessage, "error", cache);
    this.StoreOutputValue(image, "card", cache);
    this.RunNextBlock("action", cache);
}
}
