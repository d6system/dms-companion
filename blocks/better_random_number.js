module.exports = {
    name: "Random Number Generator",
    description: "Generates a random number within a range.",
    category: "Math",
    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Executes this block.",
            "types": ["action"]
        },
        {
            "id": "min",
            "name": "Minimum",
            "description": "The minimum number in the range.",
            "types": ["number"]
        },
        {
            "id": "max",
            "name": "Maximum",
            "description": "The maximum number in the range.",
            "types": ["number"]
        },
        {
            "id": "amount",
            "name": "Amount",
            "description": "The amount of random numbers to generate. If not provided, generates one random number.",
            "types": ["number"]
        },
        {
            "id": "with_decimals",
            "name": "With Decimals",
            "description": "Whether or not to allow decimals in the random numbers.",
            "types": ["boolean"]
        }
    ],
    options: [
        {
            "id": "min",
            "name": "Minimum",
            "description": "The minimum number in the range.",
            "type": "NUMBER"
        },
        {
            "id": "max",
            "name": "Maximum",
            "description": "The maximum number in the range.",
            "type": "NUMBER"
        },
        {
            "id": "amount",
            "name": "Amount",
            "description": "The amount of random numbers to generate.",
            "type": "NUMBER"
        }
    ],
    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Triggers the next block.",
            "types": ["action"]
        },
        {
            "id": "random_number",
            "name": "Random Number",
            "description": "The random number generated.",
            "types": ["number"]
        },
        {
            "id": "random_number_list",
            "name": "Random Number List",
            "description": "A list of random numbers within the specified range.",
            "types": ["list"]
        }
    ],
    code: function (cache) {
        const min_input = parseFloat(this.GetInputValue("min", cache));
        const max_input = parseFloat(this.GetInputValue("max", cache));
        const amount_input = parseFloat(this.GetInputValue("amount", cache));
        const with_decimals_input = this.GetInputValue("with_decimals", cache);

        const min_option = parseFloat(this.GetOptionValue("min", cache));
        const max_option = parseFloat(this.GetOptionValue("max", cache));
        const amount_option = parseFloat(this.GetOptionValue("amount", cache));
        const with_decimals_option = this.GetOptionValue("with_decimals", cache);

        const min = (typeof min_input === "number" && !isNaN(min_input)) ? min_input : min_option || 0;
        const max = (typeof max_input === "number" && !isNaN(max_input)) ? max_input : max_option || 1;
        const amount = (typeof amount_input === "number" && !isNaN(amount_input)) ? amount_input : amount_option || 1;
        const with_decimals = with_decimals_input !== undefined ? with_decimals_input : with_decimals_option;
        let randomNumberList = [];

    if (amount > 1) {
        for (let i = 0; i < amount; i++) {
            let randomNumber;
            if (with_decimals) {
                randomNumber = Math.random() * (max - min) + min;
            } else {
                randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
            }
            randomNumberList.push(randomNumber);
        }
    } else {
        let randomNumber;
        if (with_decimals) {
            randomNumber = Math.random() * (max - min) + min;
        } else {
            randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        }
        randomNumberList.push(randomNumber);
    }

    this.StoreOutputValue(randomNumberList, "random_number_list", cache);

    if (amount > 1) {
        this.StoreOutputValue("Generated " + amount + " random numbers.", "action", cache);
    } else {
        this.StoreOutputValue(randomNumberList[0], "random_number", cache);
        this.StoreOutputValue("Generated one random number.", "action", cache);
    }

    this.RunNextBlock("action", cache);
}
};