module.exports = {
    name: "Execute On Specific Timestamp (Unix or Date)",

    description: "Executes the following blocks on a given timestamp. By Domin0221#0001",

    category: "Date Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {     
            "id": "timestamp",
            "name": "Timestamp",
            "description": "Acceptable Types: Number, Text, Date, Unspecified\n\nDescription: Specifies the timestamp for triggering this block and any following blocks. If a past time is given, the block will trigger instantly.",
            "types": ["number", "text", "date", "unspecified"],
            "required": true
        }
       

    ],

    options: [],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        }
    ],

    async code(cache) {
      const schedule = await
      this.require('node-schedule');

      let timestamp = this.GetInputValue("timestamp", cache);
      
      if (typeof timestamp === 'string' || typeof timestamp === 'number') {
        timestamp = new Date(parseInt(timestamp) * 1000);
      }
      
      if (!(timestamp instanceof Date)) {
        timestamp = new Date(timestamp);
      }
      
      const now = new Date();
      
      if (timestamp.getTime() < now.getTime()) {
        this.RunNextBlock("action", cache);
      } else {
        schedule.scheduleJob(timestamp, () => {
          this.RunNextBlock("action", cache);
        });
      }            
    }
}