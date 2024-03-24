// Functions that checks conditonal values
const checkConditionals = conditions => {
    const [
        selectedSuitMatches,
        cardSuitMatches,
        cardValueMatches,
        crazyEight,
        skipPlayer,
        drawTwo,
        aSpecialCard
    ] = conditions;

    if (!aSpecialCard && selectedSuitMatches && cardSuitMatches && cardValueMatches) {
        return 'normal'
    } else if (crazyEight) {
        return 'crazyEight'
    } else if (skipPlayer) {
        return 'skipPlayer'
    } else if (drawTwo) {
        return 'drawTwo'
    } else {
        console.log('None of the conditions were met');
    };
};

// Define the checkCards function
const checkCards = (card, suit, topCardInPile) => {
    const conditions = [
        suit.current === card.suit,
        card.suit === topCardInPile.current.suit,
        card.value === topCardInPile.current.value,
        card.value === '8',
        card.value === '4',
        card.value === '2',
        ['2', '4', '8'].includes(card.value)
    ];

    const value = checkConditionals(conditions);

    return value;
};

// Really think about how you built this logic as a whole before you start working on these two functions.
// Remember the rules and principles of functional programming.
const drawCards = x => x;

// Crazy eight modal logic
const handleCrazyEight = (fromComputer, event, reason, setCrazyEight) => {
    // Prevent clicking and escape key from closing back drop on modal
    if (reason === "backdropClick" || reason === "escapeKeyDown") {
        return;
    };

    if (fromComputer) {
        console.log('Computer for handleCrazyEight logic running.');

        // UI State change
        setTimeout(() => {
            setCrazyEight(false);
        }, 2000);
    } else {
        console.log('User for handleCrazyEight logic running.');

        // UI State change
        setCrazyEight(false);
    };
};

const compIntelligence = (filteredCards, cardsInHand, usersCards) => {
    const getCardScore = (card) => {
        switch (card.value) {
            case '8':
                return 10;
            case '4':
                return 6;
            case '2':
                return 8;
            default:
                return 2;
        };
    };

    // Pure function that find the most common suit
    const findingMostCommonSuit = (cardsFiltered) => {
        // Checking for the most common suit
        const suitsCount = cardsFiltered.reduce((count, card) => {
            count[card.suit] = (count[card.suit] || 0) + 1;
            return count;
        }, {});

        // Find the most common suit
        const mostCommonSuit = Object.keys(suitsCount).reduce((a, b) => suitsCount[a] > suitsCount[b] ? a : b);

        return mostCommonSuit;
    };

    // Higher order function, official scoring logic
    const computeScore = (card, cardsFiltered, allCardsInHand, userCards, commonSuit) => {
        const score =
            // Official scoring logic
            getCardScore(card) +

            // If the user cards length is less than or equal 3 and the user has a 2 in filtered cards
            (userCards.length <= 3 && ['2', '4'].includes(card.value) ? 10 : 0) +

            // If the card is part of the most suits in the computers hand 
            (card.suit === commonSuit(cardsFiltered) ? 10 : 0) +

            // Prioritize playing special cards (8, 4, 2) if available
            (['8', '4', '2'].includes(card.value) ? 8 : 0) +

            // Winning move value
            (['8'].includes(card.value) && allCardsInHand.length <= 2 ? 12 : 0);

        return score;
    };

    // Compute the score for each card in the computer's hand
    const computerScores = filteredCards.map(card => ({
        card,
        score: computeScore(card, filteredCards, cardsInHand, usersCards, findingMostCommonSuit),
    }));

    // Find the card with the highest score
    const bestCard = computerScores.reduce((prev, current) => prev.score > current.score ? prev : current).card;

    // Return the card with the highest score
    return bestCard;

};

// Computer turn and decision making process
const computerResponse = (card, suitSelected, cardsInHand, usersCards) => {
    let compSelectedCard;
    let cardMatchedWithSuit;

    // Cards that can possibly be played
    if (card && !suitSelected) {
        // Filter out the matching cards
        const filteredCards = cardsInHand.filter(card => card.suit === suit || card.value === value || card.value === '8');
        console.log('Filtered cards:', filteredCards);

        // Pass cards that possibly be played and returns the seemingly best choice
        compSelectedCard = compIntelligence(filteredCards, cardsInHand, usersCards);

    } else if (suitSelected) {
        // Filter out the matching cards
        const filteredCards = cardsInHand.filter(card => card.suit === suitSelected);
        console.log('Filtered cards:', filteredCards);

        // Pass cards that possibly be played and returns the seemingly best choice
        cardMatchedWithSuit = compIntelligence(filteredCards, cardsInHand, usersCards);
    };

    // Once the card is chosen this logic plays the card or plucks from the deck
    if (compSelectedCard) {
        const cardValidation = checkCards(compSelectedCard, suitSelected, card);

        decisionMaking(true, cardValidation, compSelectedCard, _);
    } else if (cardMatchedWithSuit) {
        const cardValidation = checkCards(cardMatchedWithSuit, suitSelected, card);

        decisionMaking(true, cardValidation, cardMatchedWithSuit, _);
    } else if ((compSelectedCard || cardMatchedWithSuit) === undefined) {
        // Logic for when the computer cant find a matching card inside the deck.
        console.log('Computer couldnt find any matching cards, so they drew a card from the deck.');

        // Call this function to draw a card from the deck
        // No fetching is need from an external API
        drawCards(true, false); // This function is not defined yet
    };
};

// Updating UI state
const playCard = (card, turn, setCardState) => {
    const usersTurn = turn ? 'usersCardsInHand' : 'computersCardsInHand';

    // Update the UI state by the players turn with card selected
    setCardState(prevState => ({
        ...prevState,
        [usersTurn]: [...prevState[usersTurn], card],
    }));
};

// Warning this function includes side effects!
const decisionMaking = (fromComputer, value, card, func) => {
    // Initiate variables
    const usersTurn = fromComputer ? false : true;

    // PLEASE READ THIS!!!
    // This is the switch case that effects the UI state of component
    // Play card function and computerResponse function not yet defined.
    // Suit variable passed to compResponse function is also not defined yet.
    // You could probably make this a pure function by having the useState function 
    // passed as an argument to the higher order function (possibly handleUserTurn) 
    // and pass it down to be used. ### See chatGPT conversation 'Currying Error Correction' for example.

    switch (value) {
        case 'normal':
            // Do something
            playCard(card, usersTurn, func);
            break;
        case 'crazyEight':
            // Do something else
            playCard(card, usersTurn, func);
            handleCrazyEight(); // Not defined yet
            break;
        case 'skipPlayer':
            // Do something else
            playCard(card, usersTurn, func);
        case 'drawTwo':
            //Do something else
            playCard(card, usersTurn, func);
            break;
        default:
            console.log('Something went wrong in the decision making process');
    };
};

const handleUsersTurn = (card, suit, pluck, turn, topCardInPile, computersCardsInHand, usersCards, _) => {
    // Initializing variable to store paramter functions and values
    const topCard = topCardInPile;
    const userTurn = turn;
    const cardSelected = card;
    const plucked = pluck;
    const suitSelected = suit;

    // Logic to run if plucked boolean is true.
    if (plucked) {
        // Some code...
    };

    // Captures the value in the return statement and stores it in a variable
    const cardValidation = checkCards(cardSelected, suitSelected, topCard);

    // Play a card
    decisionMaking(false, cardValidation, cardSelected, _);

    // Start computers turn
    setTimeout(() => {
        computerResponse(cardSelected, suitSelected, computersCardsInHand, usersCards);
    }, 2000);
};

// export { };