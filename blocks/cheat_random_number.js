module.exports = {
  name: "Weight/Cheat Generate Random Number",
  description:
    "Generates a random number within a range, with an optional number with higher weight in generation.",
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
      types: ["number"],
    },
    {
      id: "max",
      name: "Maximum",
      description: "The maximum number in the range.",
      types: ["number"],
    },
    {
      id: "higher_weight_number",
      name: "Number with Higher Weight",
      description: "An optional number to give higher weight in generation.",
      types: ["number"],
    },
    {
      id: "weight_percentage",
      name: "Weight Percentage",
      description:
        "The percentage of weight to give to the higher weight number. Value should be between 0 and 100.",
      types: ["number"],
    },
    {
      id: "amount",
      name: "Amount",
      description:
        "The amount of random numbers to generate. If not provided, generates one random number.",
      types: ["number"],
    },
    {
      id: "with_decimals",
      name: "With Decimals",
      description: "Whether or not to allow decimals in the random numbers.",
      types: ["boolean"],
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
        true: "Yes",
        false: "No",
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
      types: ["number"],
    },
    {
      id: "random_number_list",
      name: "Random Number List",
      description: "A list of random numbers within the specified range.",
      types: ["list"],
    },
  ],
  code: function (cache) {
    const min_input = parseFloat(this.GetInputValue("min", cache));
    const max_input = parseFloat(this.GetInputValue("max", cache));
    const higher_weight_input = parseFloat(
      this.GetInputValue("higher_weight_number", cache)
    );
    const weight_percent_input = parseFloat(
      this.GetInputValue("weight_percent", cache)
    );
    const amount_input = parseFloat(this.GetInputValue("amount", cache));
    const with_decimals_input = this.GetInputValue("with_decimals", cache);
    const min_option = parseFloat(this.GetOptionValue("min", cache));
    const max_option = parseFloat(this.GetOptionValue("max", cache));
    const number_with_weight_option = parseFloat(
      this.GetOptionValue("number_with_weight", cache)
    );
    const weight_percent_option = parseFloat(
      this.GetOptionValue("weight_percent", cache)
    );
    const amount_option = parseFloat(this.GetOptionValue("amount", cache));
    const with_decimals_option =
      this.GetOptionValue("with_decimals_select", cache) === "true";

    const min =
      typeof min_input === "number" && !isNaN(min_input)
        ? min_input
        : min_option || 0;
    const max =
      typeof max_input === "number" && !isNaN(max_input)
        ? max_input
        : max_option || 1;
    const amount =
      typeof amount_input === "number" && !isNaN(amount_input)
        ? amount_input
        : amount_option || 1;
    const with_decimals =
      with_decimals_input !== undefined
        ? with_decimals_input
        : with_decimals_option;
    const number_with_weight =
      typeof number_with_weight_input === "number" &&
      !isNaN(number_with_weight_input)
        ? number_with_weight_input
        : number_with_weight_option;
    const weight_percent =
      typeof weight_percent_input === "number" && !isNaN(weight_percent_input)
        ? weight_percent_input
        : weight_percent_option;

    let randomNumberList = [];

    if (amount > 1) {
      for (let i = 0; i < amount; i++) {
        let randomNumber;
        if (number_with_weight) {
          // Generate a random number between 0 and 1
          const randomWeight = Math.random();

          // Calculate the weighted range
          const weightedRange =
            (((max - min + 1) * weight_percent) / 100) * number_with_weight;

          // Calculate the weighted min value
          const weightedMin =
            min +
            Math.floor((max - min + 1) / 2) -
            Math.floor(weightedRange / 2);

          // Generate the random number within the weighted range
          randomNumber = Math.floor(weightedMin + randomWeight * weightedRange);
        } else {
          if (with_decimals) {
            randomNumber = Math.random() * (max - min) + min;
          } else {
            randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
          }
        }
        randomNumberList.push(randomNumber);
      }
    } else {
      let randomNumber;
      if (number_with_weight) {
        // Generate a random number between 0 and 1
        const randomWeight = Math.random();

        // Calculate the weighted range
        const weightedRange =
          (((max - min + 1) * weight_percent) / 100) * number_with_weight;

        // Calculate the weighted min value
        const weightedMin =
          min + Math.floor((max - min + 1) / 2) - Math.floor(weightedRange / 2);

        // Generate the random number within the weighted range
        randomNumber = Math.floor(weightedMin + randomWeight * weightedRange);
      } else {
        if (with_decimals) {
          randomNumber = Math.random() * (max - min) + min;
        } else {
          randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        }
        randomNumberList.push(randomNumber);
      }
      this.StoreOutputValue(randomNumberList, "random_number_list", cache);
      if (amount > 1) {
        this.StoreOutputValue(
          `Generated ${amount} random numbers.`,
          "action",
          cache
        );
      } else {
        this.StoreOutputValue("Generated one random number.", "action", cache);
      }
      this.RunNextBlock("action", cache);
    }
  },
};
