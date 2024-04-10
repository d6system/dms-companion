module.exports = {
    name: "Roulette Game",

    description: "Simulates a game of roulette.",

    category: "Fun",
    // Created By SacredLight
    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Executes this block.",
            "types": ["action"]
        },
        {
            "id": "bet_type",
            "name": "Bet Type",
            "description": "Type of bet (e.g., red, black)",
            "types": ["text","unspecified"],
            "required": true
        },
        {
            "id": "bet_amount",
            "name": "Bet Amount",
            "description": "The amount the player is betting.",
            "types": ["number","unspecified"],
            "required": true
        }
    ],

    options: [],

    outputs: [
        {
            "id": "action_win",
            "name": "Action Win",
            "description": "Executes the next block if the player wins.",
            "types": ["action"]
        },
        {
            "id": "action_loss",
            "name": "Action Loss",
            "description": "Executes the next block if the player loses.",
            "types": ["action"]
        },
        {
            "id": "action",
            "name": "Action",
            "description": "Executes the next block regardless.",
            "types": ["action"]
        },
        {
            "id": "win_loss_amount",
            "name": "Win / Loss Amount",
            "description": "The amount the player wins or loses.",
            "types": ["number"]
        },
        {
            "id": "result",
            "name": "Result Color / Number",
            "description": "The result of the roulette spin.",
            "types": ["string"]
        }
    ],

    code(cache) {
        const betType = this.GetInputValue("bet_type", cache).toLowerCase();
        const betAmount = this.GetInputValue("bet_amount", cache);
        
        // Simulate a roulette spin
        const results = [
           
            { number: "32", color: "red" },
            { number: "15", color: "black" },
            { number: "19", color: "red" },
            { number: "4", color: "black" },
            { number: "21", color: "red" },
            { number: "2", color: "black" },
            { number: "25", color: "red" },
            { number: "17", color: "black" },
            { number: "34", color: "red" },
            { number: "6", color: "black" },
            { number: "27", color: "red" },
            { number: "13", color: "black" },
            { number: "36", color: "red" },
            { number: "11", color: "black" },
            { number: "30", color: "red" },
            { number: "8", color: "black" },
            { number: "23", color: "red" },
            { number: "10", color: "black" },
            { number: "5", color: "red" },
            { number: "24", color: "black" },
            { number: "16", color: "red" },
            { number: "33", color: "black" },
            { number: "1", color: "red" },
            { number: "20", color: "black" },
            { number: "14", color: "red" },
            { number: "31", color: "black" },
            { number: "9", color: "red" },
            { number: "22", color: "black" },
            { number: "18", color: "red" },
            { number: "29", color: "black" },
            { number: "7", color: "red" },
            { number: "28", color: "black" },
            { number: "12", color: "red" },
            { number: "35", color: "black" },
            { number: "3", color: "red" },
        ];

        const result = results[Math.floor(Math.random() * results.length)];
        
        // Show the result with color and number
        const resultString = `:${result.color === "red" ? "red" : "black"}_circle: ${result.number}`;
        this.StoreOutputValue(resultString, "result", cache);

        // Check if the bet wins or loses
        let winAmount = 0;
        if ((betType === "red" && result.color === "red") || 
            (betType === "black" && result.color === "black") || 
            (betType === result.number)) {
            winAmount = betAmount * 2; 
            this.StoreOutputValue(winAmount, "win_loss_amount", cache);
            this.RunNextBlock("action_win", cache);
        } else {
            winAmount = -betAmount; // Lose the bet amount
            this.StoreOutputValue(winAmount, "win_loss_amount", cache);
            this.RunNextBlock("action_loss", cache);
        }

        this.RunNextBlock("action", cache);
    }
};