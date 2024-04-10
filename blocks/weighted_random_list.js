module.exports = {
  name: "Weighted Item From List",
  description: "Pickes an Item from a list with different weights of the items.",
  category: "Math",
  inputs: [
    {
      id: "action",
      name: "Action",
      description: "Executes this block.",
      types: ["action"],
    },
    {
      id: "items",
      name: "Item List",
      description: "The list to select from.",
      types: ["list", "undefined"],
    },
    {
      id: "weights",
      name: "Item Chance",
      description: "The chance of getting that item [ 0.1, 0.3, 0.6 ].",
      types: ["list", "undefined"],
    }
  ],
  options: [],
  outputs: [
    {
      id: "action",
      name: "Action",
      description: "Triggers the next block.",
      types: ["action"],
    },
    {
      id: "random_item",
      name: "Random Item",
      description: "The random item slected.",
      types: ["undefined"],
    }
  ],
  code: async function (cache) {
    const weighted = await this.require("weighted");

    const items = await this.GetInputValue('items', cache)
    var weights = await (await this.GetInputValue('weights', cache)).map( i => Number(i))

    var total = 0

    for (const number of weights) {
      total = total + number
    }

    weights = (await this.GetInputValue('weights', cache)).map( i => Number(i/total))
    
    this.StoreOutputValue(weighted.select(items, weights) , 'random_item', cache)
    
    this.RunNextBlock("action", cache);
  },
};
