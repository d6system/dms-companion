module.exports = {
  name: "Filter Channel",

  description: "Compares if the channel input is equal to selected option and runs next block if true, otherwise will stop\n\nHover mouse to description node for more info",

  category: ".MOD",

  inputs: [
    {
      "id": "action",
      "name": "Action",
      "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
      "types": ["action"],
      "required": true
    },
    {
      "id": "channel",
      "name": "Channel Input",
      "description": "Acceptable Types: Object\n\nDescription: The text channel to filter.",
      "types": ["object", "unspecified", "text"],
      "required": true
    }
  ],

  options: [
    {
      "id": "type",
      "name": "Channel Type",
      "description": "Description: The type of channel to filter.",
      "type": "SELECT",
      "options": {
          "SUIJI": "NONE",     
          0: "TEXT CHANNEL",
          1: "DM CHANNEL",
          2: "VOICE CHANNEL",
          4: "CATEGORY",
          5: "ANNOUNCEMENTS",
          10: "ANNOUNCEMENTS SUB CHANNEL",
          15: "FORUM MAIN CHANNEL",
          11: "FORUM/THREAD PUBLIC SUB CHANNEL",
          12: "FORUM/THREAD PRIVATE SUB CHANNEL",
          13: "STAGE CHANNEL"
      }
    }
  ],

  outputs: [
    {
      "id": "action",
      "name": "Action (If True)",
      "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
      "types": ["action"]
    },

   {
    "id": "action 2",
    "name": "Action (If False)",
    "description": "Type: This works like the following blocks:\n\nget text channel info > text channel type\ncheck comparison > equal.\n\nIf Channel Input is equal to Channel Type option it will run next block.",
    "types": ["action"]
  },
  ],

  code(cache) {
      const channel = this.GetInputValue("channel", cache).type;
      const type = this.GetOptionValue("type", cache);
      console.log(channel);
  
      if (channel == type) {this.RunNextBlock("action", cache)}
      else{this.RunNextBlock("action 2", cache)}
  }
}