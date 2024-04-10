module.exports = {
  name: "Create Slash Command (Advanced)",

  description:
    "Creates a slash command and adds it to a slash commands list if provided! (By @T-45)\nNow features setting the permission requirement of the command. (By @wiz.creations)",

  category: "Slash Commands Builder",

  inputs: [
    {
      id: "action",
      name: "Action",
      description:
        "Acceptable Types: Action\n\nDescription: Executes this block.",
      types: ["action"],
    },
    {
      id: "name",
      name: "Name",
      description:
        'Acceptable Types: Text, Unspecified\n\nDescription: Name of the slash command.\n\nThis is how its going to look like in discord if you put "help": /help\n\n(Required)',
      types: ["text", "unspecified"],
    },
    {
      id: "desc",
      name: "Description",
      description:
        "Acceptable Types: Text, Unspecified\n\nDescription: The description of the slash command.\n\n(Required)",
      types: ["text", "unspecified"],
    },
    {
      id: "options",
      name: "Options",
      description:
        "Acceptable Types: List, Unspecified\n\nDescription: The options list. (Optional)",
      types: ["list", "unspecified"],
    },
    {
      id: "commands",
      name: "Slash Commands",
      description:
        "Acceptable Types: List, Unspecified\n\nDescription: The slash commands list to update. (Optional)\n\nThis option is made to make it to you dont need to use the lists blocks, so instead of using them you can just use the slash commands input to add this slash command to the list.",
      types: ["list", "unspecified"],
    },
  ],

  options: [
    {
      id: "namee",
      name: "Name",
      description:
        'Description: Name of the slash command.\n\nThis is how its going to look like in discord if you put "help": /help\n\n(Required)',
      type: "TEXT",
    },
    {
      id: "descc",
      name: "Description",
      description:
        "Description: The description of the slash command.\n\n(Required)",
      type: "TEXT",
    },
    {
      id: "permission",
      name: "Permission Requirement",
      description:
        "Description: The permission a user needs required to see and use this command.\n\n(Required)",
      type: "SELECT",
      options: {
        // This permission is USE_APPLICATION_COMMANDS. I've set it as 0 to keep "None" at the top of the list.
        // - Wiz (wiz.creations)
        0: "None",
        ADD_REACTIONS: "Add Reactions",
        ADMINISTRATOR: "Administrator",
        ATTACH_FILES: "Attach Files",
        BAN_MEMBERS: "Ban Members",
        CHANGE_NICKNAME: "Change Nickname",
        CONNECT: "Connect",
        CREATE_INSTANT_INVITE: "Create Invite",
        CREATE_PRIVATE_THREADS: "Create Private Threads",
        CREATE_PUBLIC_THREADS: "Create Public Threads",
        DEAFEN_MEMBERS: "Deafen Members",
        EMBED_LINKS: "Embed Links",
        KICK_MEMBERS: "Kick Members",
        MANAGE_CHANNELS: "Manage Channels",
        MANAGE_EMOJIS_AND_STICKERS: "Manage Emojis & Stickers",
        MANAGE_EVENTS: "Manage Events",
        MANAGE_GUILD: "Manage Guild",
        MANAGE_MESSAGES: "Manage Messages",
        MANAGE_NICKNAMES: "Manage Nicknames",
        MANAGE_ROLES: "Manage Roles",
        MANAGE_THREADS: "Manage Threads",
        MANAGE_WEBHOOKS: "Manage Webhooks",
        MENTION_EVERYONE: "Mention Everyone",
        MODERATE_MEMBERS: "Moderate Members",
        MOVE_MEMBERS: "Move Members",
        MUTE_MEMBERS: "Mute Members",
        PRIORITY_SPEAKER: "Priority Speaker",
        READ_MESSAGE_HISTORY: "Read Message History",
        REQUEST_TO_SPEAK: "Request to Speak",
        SEND_MESSAGES: "Send Messages",
        SEND_MESSAGES_IN_THREADS: "Send Messages in Threads",
        SEND_TTS_MESSAGES: "Send TTS Messages",
        SPEAK: "Speak",
        START_EMBEDDED_ACTIVITIES: "Use Activities",
        STREAM: "Stream",
        USE_EXTERNAL_EMOJIS: "Use External Emojies",
        USE_EXTERNAL_STICKERS: "Use Externam Stickers",
        USE_PRIVATE_THREADS: "Use Private Threads",
        USE_PUBLIC_THREADS: "Use Public Threads",
        USE_VAD: "Use Voice Activity",
        VIEW_AUDIT_LOG: "View Audit Log",
        VIEW_CHANNEL: "View Channels",
        VIEW_GUILD_INSIGHTS: "View Guild Insights",
      },
    },
  ],

  outputs: [
    {
      id: "action",
      name: "Action",
      description:
        "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
      types: ["action"],
    },
    {
      id: "slash_cmds",
      name: "Slash Command(s)",
      description:
        'Type: List\n\nDescription: The updated slash commands list.\n\nCan be connected directly with the "Register Slash Commands (Input)" block or with another "Create Slash Command" block to create a list with multiple slash commands!',
      types: ["list"],
    },
  ],

  code(cache) {
    const permissions = {
      // This permission is USE_APPLICATION_COMMANDS. I've set it as 0 to keep "None" at the top of the list.
      // - Wiz (wiz.creations)
      0: 2147483648,
      ADD_REACTIONS: 64,
      ADMINISTRATOR: 8,
      ATTACH_FILES: 32768,
      BAN_MEMBERS: 4,
      CHANGE_NICKNAME: 67108864,
      CONNECT: 1048576,
      CREATE_INSTANT_INVITE: 1,
      CREATE_PRIVATE_THREADS: 274877906944,
      CREATE_PUBLIC_THREADS: 68719476736,
      DEAFEN_MEMBERS: 8388608,
      EMBED_LINKS: 16384,
      KICK_MEMBERS: 2,
      MANAGE_CHANNELS: 16,
      MANAGE_EMOJIS_AND_STICKERS: 1073741824,
      MANAGE_EVENTS: 8589934592,
      MANAGE_GUILD: 32,
      MANAGE_MESSAGES: 8192,
      MANAGE_NICKNAMES: 134217728,
      MANAGE_ROLES: 268435456,
      MANAGE_THREADS: 17179869184,
      MANAGE_WEBHOOKS: 536870912,
      MENTION_EVERYONE: 131072,
      MODERATE_MEMBERS: 4398046511104,
      MOVE_MEMBERS: 16777216,
      MUTE_MEMBERS: 4194304,
      PRIORITY_SPEAKER: 256,
      READ_MESSAGE_HISTORY: 65536,
      REQUEST_TO_SPEAK: 4294967296,
      SEND_MESSAGES: 2048,
      SEND_MESSAGES_IN_THREADS: 1099511627776,
      SEND_TTS_MESSAGES: 4096,
      SPEAK: 2097152,
      START_EMBEDDED_ACTIVITIES: 2199023255552,
      STREAM: 512,
      USE_EXTERNAL_EMOJIS: 262144,
      USE_EXTERNAL_STICKERS: 549755813888,
      USE_PRIVATE_THREADS: 137438953472,
      USE_PUBLIC_THREADS: 34359738368,
      USE_VAD: 33554432,
      VIEW_AUDIT_LOG: 128,
      VIEW_CHANNEL: 1024,
      VIEW_GUILD_INSIGHTS: 524288,
    };

    const permission =
      permissions[this.GetOptionValue("permission", cache) + ""] || undefined;

    let name =
      this.GetInputValue("name", cache) || this.GetOptionValue("namee", cache);
    const desc =
      this.GetInputValue("desc", cache) || this.GetOptionValue("descc", cache);
    const options = this.GetInputValue("options", cache);
    let slcslist = this.GetInputValue("commands", cache);

    let cmd;

    const cleanedName = (inputName) =>
      ((cleanedName) => {
        const cleanedUpName = cleanedName
          .toLowerCase()
          .match(/[a-z -]*/g)
          .join("")
          .replace(/ /g, "-");

        if (cleanedUpName !== inputName) {
          console.log(
            `\nNOTICE: Your command name "${inputName}" was invalid.\nDon't worry! I've taken care of that for you. It is now "${cleanedUpName}".\n`
          );
        }
        return cleanedUpName;
      })(inputName);

    if (permission) {
      cmd = {
        name: cleanedName(name),
        description: desc,
        options: options,
        default_member_permissions: permission,
      };
    } else {
      cmd = {
        name: cleanedName(name),
        description: desc,
        options: options,
      };
    }

    if (!slcslist) slcslist = [cmd];
    else slcslist.push(cmd);

    this.StoreOutputValue(slcslist, "slash_cmds", cache);
    this.RunNextBlock("action", cache);
  },
};
