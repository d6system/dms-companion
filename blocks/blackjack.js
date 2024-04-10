module.exports = {
    name: "Blackjack",

    description: "Simulates a game of Blackjack with automatic player and dealer moves.",

    category: "Fun",

    inputs: [{
        "id": "action",
        "name": "Action",
        "description": "Executes this block.",
        "types": ["action"]
    }, {
        "id": "bet_amount",
        "name": "Bet Amount",
        "description": "The amount the player is betting.",
        "types": ["number"],
        "required": true
    }],

    options: [],

    outputs: [{
        "id": "action_win",
        "name": "Action Win",
        "description": "Executes the next block if the player wins.",
        "types": ["action"]
    }, {
        "id": "action_loss",
        "name": "Action Loss",
        "description": "Executes the next block if the player loses.",
        "types": ["action"]
    }, {
        "id": "action_draw",
        "name": "Action Draw",
        "description": "Executes the next block if the game is a draw (push).",
        "types": ["action"]
    }, {
        "id": "player_hand",
        "name": "Player Hand",
        "description": "The cards in the player's hand.",
        "types": ["string"]
    }, {
        "id": "dealer_hand",
        "name": "Dealer Hand",
        "description": "The cards in the dealer's hand.",
        "types": ["string"]
    }, {
        "id": "player_total",
        "name": "Player Total",
        "description": "The total value of the player's hand.",
        "types": ["number"]
    }, {
        "id": "dealer_total",
        "name": "Dealer Total",
        "description": "The total value of the dealer's hand.",
        "types": ["number"]
    }, {
        "id": "win_amount",
        "name": "Win Amount",
        "description": "The amount won or lost in this game.",
        "types": ["number"]
    }],

    code(cache) {
      
        const betAmount = this.GetInputValue("bet_amount", cache);

       
        const deck = getShuffledDeck();
        const playerHand = [deck.pop(), deck.pop()];
        const dealerHand = [deck.pop(), deck.pop()];

        // Player's Stand Amount
        while (calculateHandValue(playerHand) < 18) {
            playerHand.push(deck.pop());
        }

        // Dealer's Stand Amount
        while (calculateHandValue(dealerHand) < 17) {
            dealerHand.push(deck.pop());
        }

     
        const playerHandWithEmojis = playerHand.map(card => getCardEmoji(card)).join(" - ");
        const dealerHandWithEmojis = dealerHand.map(card => getCardEmoji(card)).join(" - ");
        this.StoreOutputValue(playerHandWithEmojis, "player_hand", cache);
        this.StoreOutputValue(dealerHandWithEmojis, "dealer_hand", cache);

     
        const playerTotal = calculateHandValue(playerHand);
        const dealerTotal = calculateHandValue(dealerHand);
        this.StoreOutputValue(playerTotal, "player_total", cache);
        this.StoreOutputValue(dealerTotal, "dealer_total", cache);

       
        let outcome = "";
        if ((dealerTotal > 21 && playerTotal <= 21) || (playerTotal > dealerTotal && playerTotal <= 21)) {
            outcome = "win";
        } else if ((playerTotal > 21 && dealerTotal <= 21) || (dealerTotal > playerTotal && dealerTotal <= 21)) {
            outcome = "loss";
        } else if (dealerTotal <= 21 && playerTotal <= 21 && playerTotal === dealerTotal) {
            outcome = "draw";
        }

      
        let winAmount = 0;
        if (outcome === "win") {
            winAmount = betAmount; 

            // Check for a natural blackjack 
            if (playerHand.length === 2 && playerTotal === 21) {
                winAmount += betAmount * 0.5; // Add 50% bonus for natural blackjack
            }

            // Regular win without natural blackjack
            winAmount += betAmount; // Regular win
        } else if (outcome === "draw") {
            winAmount = betAmount; // Draw wins the bet amount back
        } else {
            winAmount = -betAmount; // Loss is the bet amount
        }

     
        this.StoreOutputValue(winAmount, "win_amount", cache);

        
        if (outcome === "win") {
            this.RunNextBlock("action_win", cache);
        } else if (outcome === "draw") {
            this.RunNextBlock("action_draw", cache);
        } else {
            this.RunNextBlock("action_loss", cache);
        }
    }
};


function getShuffledDeck() {
    const suits = ["♠️", "♥️", "♦️", "♣️"];
    const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let deck = [];

    for (const suit of suits) {
        for (const value of values) {
            deck.push({
                suit,
                value
            });
        }
    }

    
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    return deck;
}

function calculateHandValue(hand) {
    let total = 0;
    let aceCount = 0;

    for (const card of hand) {
        if (card.value === "A") {
            aceCount++;
            total += 11; // Assuming soft ace (can be 11 or 1)
        } else if (["J", "Q", "K"].includes(card.value)) {
            total += 10;
        } else {
            total += parseInt(card.value);
        }
    }

 
    while (total > 21 && aceCount > 0) {
        total -= 10; // Change ace value from 11 to 1
        aceCount--;
    }

    return total;
}

function getCardEmoji(card) {
    const suits = {
        "♠️": "Spades",
        "♥️": "Hearts",
        "♦️": "Diamonds",
        "♣️": "Clubs"
    };
    const values = {
        "A": "Ace",
        "2": "2",
        "3": "3",
        "4": "4",
        "5": "5",
        "6": "6",
        "7": "7",
        "8": "8",
        "9": "9",
        "10": "10",
        "J": "Jack",
        "Q": "Queen",
        "K": "King"
    };

    return `${getSuitEmoji(card.suit)} ${values[card.value]}`;
}

function getSuitEmoji(suit) {
    switch (suit) {
    case "♠️":
        return "♠️";
    case "♥️":
        return "♥️";
    case "♦️":
        return "♦️";
    case "♣️":
        return "♣️";
    default:
        return "";
    }
}
