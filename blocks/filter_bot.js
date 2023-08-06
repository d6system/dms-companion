module.exports = {
  name: "Filter Bot",

  description: "Won't run next block if user is a bot",

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
      "name": "user",
      "description": "Acceptable Types: Object\n\nDescription: The user to check if bot or not.",
      "types": ["object", "unspecified"]
    }
  ],

  options: [],

  outputs: [
    {
      "id": "action",
      "name": "Action",
      "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
      "types": ["action"]
   },
  ],

  code(cache) {
    this.GetInputValue("user", cache).bot ? null : (this.RunNextBlock("action", cache));
  }
}