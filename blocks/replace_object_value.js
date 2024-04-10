module.exports = {
  name: "Replace Object Value",

  description: "Replaces the first or all old values with the new value inside an object. By Domin0221#0001",

  category: "Object Stuff",

  inputs: [
      {
          "id": "action",
          "name": "Action",
          "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
          "types": ["action"]
      },
      {
          "id": "source_object",
          "name": "Source Object",
          "description": "Acceptable Types: Object, Unspecified\n\nDescription: The source object for replacement.",
          "types": ["object", "unspecified"],
          "required": true
      },
      {
          "id": "old_value",
          "name": "Old Value",
          "description": "Acceptable Types: Unspecified, Undefined, Null, Object, Boolean, Date, Number, Text, List\n\nDescription: The old value that will be replaced by the new value.",
          "types": ["unspecified", "undefined", "null", "object", "boolean", "date", "number", "text", "list"],
          "required": true
      },
      {
          "id": "new_value",
          "name": "New Value",
          "description": "Acceptable Types: Unspecified, Undefined, Null, Object, Boolean, Date, Number, Text, List\n\nDescription: The new value to replace the old value.",
          "types": ["unspecified", "undefined", "null", "object", "boolean", "date", "number", "text", "list"],
          "required": true
      }
  ],

  options: [
      {
          "id": "replacement_type",
          "name": "Replacement Type",
          "description": "Description: The type of replacement to execute.",
          "type": "SELECT",
          "options": {
              "first": "First Result",
              "all": "All Results"
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
          "id": "object",
          "name": "Object",
          "description": "Type: Object\n\nDescription: The object with replaced values.",
          "types": ["object"]
      }
  ],

  code(cache) {
      const source_object = this.GetInputValue("source_object", cache);
      const old_value = this.GetInputValue("old_value", cache);
      const new_value = this.GetInputValue("new_value", cache);
      const replacement_type = this.GetOptionValue("replacement_type", cache);

      const replaceObjectValue = (obj, oldVal, newVal) => {
          for (let prop in obj) {
              if (obj.hasOwnProperty(prop)) {
                  if (typeof obj[prop] === "object" && obj[prop] !== null) {
                      if (replaceObjectValue(obj[prop], oldVal, newVal)) {
                          if (replacement_type === "first") {
                              return true;
                          }
                      }
                  } else if (obj[prop] === oldVal) {
                      obj[prop] = newVal;
                      if (replacement_type === "first") {
                          return true;
                      }
                  }
              }
          }
          return false;
      };

      replaceObjectValue(source_object, old_value, new_value);

      this.StoreOutputValue(source_object, "object", cache);
      this.RunNextBlock("action", cache);
  }
}