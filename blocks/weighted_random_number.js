module.exports = {
  name: "Weight/Cheat Generate Random Number",
  description:
    "(CREDITS for help to Beastlybear2017#2898) Generates a random number within a range, with an optional number with higher weight in generation.",
  category: "Math",
  inputs: [
    {
      id: "action",
      name: "Action",
      description: "Executes this block.",
      types: ["action"],
    },
    {
      id: "min",
      name: "Minimum",
      description: "The minimum number in the range.",
      types: ["number", "undefined"],
    },
    {
      id: "max",
      name: "Maximum",
      description: "The maximum number in the range.",
      types: ["number", "undefined"],
    },
    {
      id: "higher_weight_number",
      name: "Number with Higher Weight",
      description: "An optional number to give higher weight in generation.",
      types: ["number", "undefined"],
    },
    {
      id: "weight_percentage",
      name: "Weight Percentage",
      description:
        "The percentage of weight to give to the higher weight number. Value should be between 0 and 100.",
      types: ["number", "undefined"],
    },
    {
      id: "amount",
      name: "Amount",
      description:
        "The amount of random numbers to generate. If not provided, generates one random number.",
      types: ["number", "undefined"],
    },
    {
      id: "with_decimals",
      name: "With Decimals",
      description: "Whether or not to allow decimals in the random numbers.",
      types: ["boolean", "undefined"],
    },
  ],
  options: [
    {
      id: "min",
      name: "Minimum",
      description: "The minimum number in the range.",
      type: "NUMBER",
    },
    {
      id: "max",
      name: "Maximum",
      description: "The maximum number in the range.",
      type: "NUMBER",
    },
    {
      id: "higher_weight_number",
      name: "Number with Higher Weight",
      description: "An optional number to give higher weight in generation.",
      type: "NUMBER",
    },
    {
      id: "weight_percentage",
      name: "Weight Percentage",
      description:
        "The percentage of weight to give to the higher weight number. Value should be between 0 and 100.",
      type: "NUMBER",
    },
    {
      id: "amount",
      name: "Amount",
      description: "The amount of random numbers to generate.",
      type: "NUMBER",
    },
    {
      id: "with_decimals",
      name: "With Decimals",
      description: "Whether or not to allow decimals in the random numbers.",
      type: "SELECT",
      options: {
        false: "No",
        true: "Yes",
      },
    },
  ],
  outputs: [
    {
      id: "action",
      name: "Action",
      description: "Triggers the next block.",
      types: ["action"],
    },
    {
      id: "random_number",
      name: "Random Number",
      description: "The random number generated.",
      types: ["number", "undefined"],
    },
    {
      id: "random_number_list",
      name: "Random Number List",
      description: "A list of random numbers within the specified range.",
      types: ["list", "undefined"],
    },
  ],
  code: async function (cache) {
    await this.require("weighted");
    const weighted = require("weighted");

    let min;
    let max;
    let higher_weight;
    let weight_percentage;
    let amount;
    let decimal;
    var items = [],
      weights = [];
    let selected;
    let number;
    let random;
    var randomNumberList = [];

    min = parseFloat(this.GetInputValue("min", cache));
    max = parseFloat(this.GetInputValue("max", cache));
    higher_weight = parseFloat(
      this.GetInputValue("higher_weight_number", cache)
    );
    weight_percentage = parseFloat(
      this.GetInputValue("weight_percentage", cache)
    );
    amount = parseFloat(this.GetInputValue("amount", cache));
    decimal = this.GetInputValue("with_decimals", cache);

    if (!min) {
      min = parseFloat(this.GetOptionValue("min", cache));
    }
    if (!max) {
      max = parseFloat(this.GetOptionValue("max", cache));
    }
    if (!higher_weight) {
      higher_weight = parseFloat(
        this.GetOptionValue("higher_weight_number", cache)
      );
    }
    if (!weight_percentage) {
      weight_percentage = parseFloat(
        this.GetOptionValue("weight_percentage", cache)
      );
    }
    if (!amount) {
      amount = parseFloat(this.GetOptionValue("amount", cache));
    }
    if (!decimal) {
      decimal = this.GetOptionValue("with_decimals", cache);
    }

    if (!min) {
      min = 0;
    }
    if (!max) {
      max = 100;
    }
    if (!amount || amount < 0) {
      amount = 1;
    }

    if (higher_weight) {
      const maxx = max - min;
      const weight = weight_percentage;
      const left_weight = 100 - weight;
      const per_weight = left_weight / maxx;
      var total = 0;

      for (let a = min; a <= max; ) {
        if (a == higher_weight) {
          total = total + weight;
          items.push(a);
          weights.push(weight);
          a++;
        } else if (total == 100) {
          a++;
        } else if (a == max) {
          total = 100;
          items.push(a);
          weights.push(per_weight);
          a++;
        } else {
          items.push(a);
          weights.push(per_weight);
          a++;
        }
      }

      function selectWeighted(amount) {
        for (let i = 1; i <= amount; ) {
          selected = weighted.select(items, weights);
          if (decimal == true || decimal == "true") {
            random = Math.random();
            number = selected + random;
            if (number <= max) {
              i++;
              randomNumberList.push(number);
            }
          } else {
            number = selected;
            if (number <= max) {
              i++;
              randomNumberList.push(number);
            }
          }
        }
      }

      selectWeighted(amount);
      if (!randomNumberList[1]) {
        this.StoreOutputValue(randomNumberList[0], "random_number", cache);
      } else {
        this.StoreOutputValue(randomNumberList, "random_number_list", cache);
      }
      this.RunNextBlock("action", cache);
    } else {
      function select(amount) {
        for (let i = 1; i <= amount; ) {
          if (decimal == true || decimal == "true") {
            random = Math.random();
            number = Math.floor(Math.random() * (max - min + 1)) + min + random;
            if (number <= max) {
              i++;
              randomNumberList.push(number);
            }
          } else {
            number = Math.floor(Math.random() * (max - min + 1)) + min;
            if (number <= max) {
              i++;
              randomNumberList.push(number);
            }
          }
        }
      }

      select(amount);
      if (!randomNumberList[1]) {
        this.StoreOutputValue(randomNumberList[0], "random_number", cache);
      } else {
        this.StoreOutputValue(randomNumberList, "random_number_list", cache);
      }
      this.RunNextBlock("action", cache);
    }
  },
};
