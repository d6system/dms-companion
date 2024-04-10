module.exports = {
  name: "Filter Bot/User V2",

  description: "Won't run next block if user is a bot/user",

  category: ".MOD",

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
      "description": "Acceptable Types: Object\n\nDescription: The user to check if bot or not.",
      "types": ["object", "unspecified"]
    }
  ],

  options: [
    {
      "id": "filter",
      "name": "Target",
      "description": "Description: The target to filter out.",
      "type": "SELECT",
      "options": {
        1: "BOT",
        2: "USER"
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
  ],

  code(cache) {

    this.GetOptionValue("filter", cache) == 1 ? this.GetInputValue("user", cache).bot ? true : (this.RunNextBlock("action", cache)) : this.GetInputValue("user", cache).bot ? (this.RunNextBlock("action", cache)) : true
  }
}