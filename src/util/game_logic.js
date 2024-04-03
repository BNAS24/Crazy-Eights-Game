// Functions that checks conditonal values
const checkConditionals = (conditions) => {
  const [
    selectedSuitMatches,
    cardSuitMatches,
    cardValueMatches,
    crazyEight,
    skipPlayer,
    drawTwo,
    aSpecialCard,
  ] = conditions;

  console.log(conditions);

  return !aSpecialCard &&
    (cardSuitMatches || cardValueMatches || selectedSuitMatches)
    ? "normal"
    : crazyEight
    ? "crazyEight"
    : skipPlayer && (cardValueMatches || cardSuitMatches || selectedSuitMatches)
    ? "skipPlayer"
    : drawTwo && (cardValueMatches || cardSuitMatches || selectedSuitMatches)
    ? "drawTwo"
    : (console.log("None of the conditions were met"), undefined);
};

// Define the checkCards function
const checkCards = (card, suitSelected, cardInPile) => {
  // Delete after testing
  console.log({
    message: "check cards",
    cardInPile: cardInPile,
    suitSelected: suitSelected,
    card: card,
  });

  const conditions = [
    suitSelected.current === card.suit, // suit selected matches
    card.suit ===
      (!suitSelected.current && (cardInPile.suit || cardInPile.current.suit)), // suit matches
    card.value === (cardInPile.value || cardInPile.current.value), // value macthes
    card.value === "8", // Crazy eight
    card.value === "4", // Draw Four
    card.value === "2", // Draw Two
    ["2", "4", "8"].includes(card.value), // Special card
  ];

  const value = checkConditionals(conditions);

  // Delete after testing
  console.log("value", value);

  return value;
};

// Logic for drawing cards from the deck
const drawCards = (...args) => {
  const [
    usersTurn,
    deckState,
    setDeckState,
    setCardState,
    cardInPile,
    suitSelected,
    cardsInHand,
    usersCards,
    setCrazyEight,
    disableInteractivity,
  ] = args;

  console.log({
    message: "draw cards",
    usersTurn: usersTurn,
    deckState: deckState,
    usersCards: usersCards,
    cardsInHand: cardsInHand,
  });

  // Determine which player is playing and plucking the card
  const whosTurn = usersTurn ? "userCardsInHand" : "computersCardsInHand";

  // Remove the last card from the deck
  const pluckedCard = deckState?.slice(-1)[0];

  console.log("plucked card", pluckedCard);

  setDeckState((prevDeckState) =>
    prevDeckState.filter((card) => card.code !== pluckedCard.code)
  );

  // Update the UI state by the players turn with card selected
  setCardState((prevState) => ({
    ...prevState,
    [whosTurn]: [...prevState[whosTurn], pluckedCard],
    remainingCardsInDeck: prevState.remainingCardsInDeck - 1,
  }));

  // Trigger computers response when the user plucks a card
  if (usersTurn) {
    // Ensures that the deck state represents the updated state not the previous state when passed to computerRepsonse function
    const updatedDeckState = deckState.filter(
      (card) => card.code !== pluckedCard.code
    );

    disableInteractivity.current = true;

    setTimeout(() => {
      computerResponse(
        cardInPile,
        suitSelected,
        cardsInHand,
        usersCards,
        setCardState,
        setCrazyEight,
        updatedDeckState ? updatedDeckState : deckState,
        setDeckState,
        disableInteractivity
      );
    }, 2000);
  }
};

const drawTwo = (...args) => {

  console.log(...args);

  const [
    usersTurn,
    deckState,
    setDeckState,
    setCardState,
    cardInPile,
    suitSelected,
    cardsInHand,
    usersCards,
    setCrazyEight,
    disableInteractivity,
  ] = args;

  // Determine which player is drawing the cards
  const whoDrawsCards = usersTurn ? "computersCardsInHand" : "userCardsInHand";

  // Remove the last card from the deck
  const twoCardsDrawn = deckState.splice(-2);

  console.log('two cards drawn', twoCardsDrawn);

  // Update the deckState by filtering out the plucked cards
  setDeckState((prevDeckState) =>
    prevDeckState.filter((card) => !twoCardsDrawn.includes(card))
  );

  // Update the player's hand by adding the plucked cards
  setCardState((prevState) => ({
    ...prevState,
    [whoDrawsCards]: [...prevState[whoDrawsCards], ...twoCardsDrawn],
    remainingCardsInDeck: prevState.remainingCardsInDeck - 2,
  }));

  if (!usersTurn) {
    // Trigger computers response when the user plucks a card
    disableInteractivity.current = true;

    // Ensures that the deck state represents the updated state not the previous state when passed to computerRepsonse function
    const updatedDeckState = deckState.filter(
      (card) => !twoCardsDrawn.includes(card)
    );

    setTimeout(() => {
      computerResponse(
        cardInPile,
        suitSelected,
        cardsInHand,
        usersCards,
        setCardState,
        setCrazyEight,
        updatedDeckState ? updatedDeckState : deckState,
        setDeckState,
        disableInteractivity
      );
    }, 2000);
  }
};

// Crazy eight modal logic
const handleCrazyEight = (...arr) => {
  console.log("arr", arr);
  const [
    usersTurn,
    event,
    reason,
    suitSelected,
    cardsInHand,
    usersCards,
    setCardState,
    setCrazyEight,
    deckState,
    setDeckState,
    cardInPile,
    disableInteraction,
  ] = arr;

  console.log("args", arr);

  // Prevent clicking and escape key from closing back drop on modal
  if (reason === "backdropClick" || reason === "escapeKeyDown") {
    return;
  }

  // Testing purposes (remove later)
  console.log("event", event);

  !usersTurn
    ? ((suitSelected.current = event),
      setTimeout(() => {
        setCrazyEight(false);
      }, 1000))
    : (console.log("User for handleCrazyEight logic running."),
      (suitSelected.current = event),
      setCrazyEight(false),
      disableInteraction.current = true,
      setTimeout(() => {
        computerResponse(
          cardInPile,
          suitSelected,
          cardsInHand,
          usersCards,
          setCardState,
          setCrazyEight,
          deckState,
          setDeckState,
          disableInteraction
        );
      }, 2000));
};

const compIntelligence = (filteredCards, cardsInHand, usersCards) => {
  // Pure function that find the most common suit
  const findingMostCommonSuit = (arr) => {
    // Checking for the most common suit
    const suitsCount = arr.reduce((count, card) => {
      count[card.suit] = (count[card.suit] || 0) + 1;
      return count;
    }, {});

    // Find the most common suit
    const mostCommonSuit = Object.keys(suitsCount).reduce((a, b) =>
      suitsCount[a] > suitsCount[b] ? a : b
    );

    return mostCommonSuit;
  };

  // Higher order function, official scoring logic
  const computeScore = (card, allCardsInHand, userCards, commonSuit) => {
    const score =
      // If the user cards length is less than or equal 3 and the user has a 2 in filtered cards
      (userCards.length <= 3 && ["2", "4"].includes(card.value) ? 10 : 0) +
      // If the card is part of the most suits in the computers hand
      (card.suit === commonSuit(cardsInHand) ? 10 : 0) +
      // Prioritize playing special cards (8, 4, 2) if available
      (["8", "4", "2"].includes(card.value) ? 8 : 0) +
      ([
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "JACK",
        "QUEEN",
        "KING",
        "ACE",
      ].includes(card.value) && userCards.length >= 6
        ? 20
        : 0) +
      // Winning move value
      (["8"].includes(card.value) && allCardsInHand.length <= 2 ? 12 : 0);

    return score;
  };

  // Compute the score for each card in the computer's hand
  const computerScores = filteredCards.map((card) => ({
    card,
    score: computeScore(card, cardsInHand, usersCards, findingMostCommonSuit),
  }));

  // Find the card with the highest score
  const bestCard = computerScores.reduce((prev, current) =>
    prev.score > current.score ? prev : current
  ).card;

  // Return the card with the highest score
  return bestCard;
};

// Computer turn and decision making process
const computerResponse = (
  cardInPile,
  suitSelected,
  cardsInHand,
  usersCards,
  setCardState,
  setCrazyEight,
  deckState,
  setDeckState,
  disableInteraction
) => {
  let compSelectedCard = null;
  let cardMatchedWithSuit = null;

  // Delete after testing
  console.log({
    message: "computer",
    cardInPile: cardInPile,
    suitSelected: suitSelected,
    cardsInHand: cardsInHand,
    usersCards: usersCards,
    deckState: deckState,
    setDeckState: setDeckState,
  });

  // Cards that can possibly be played
  let filteredCards;

  if (cardInPile.current && suitSelected.current === null) {
    filteredCards = cardsInHand.filter(
      (card) =>
        card.suit === cardInPile.current.suit ||
        card.value === cardInPile.current.value ||
        card.value === "8"
    );
    console.log("Filtered cards (regular):", filteredCards);
    compSelectedCard =
      filteredCards.length > 0
        ? compIntelligence(filteredCards, cardsInHand, usersCards)
        : null;
    console.log("compSelectedCard", compSelectedCard);
  } else if (suitSelected.current !== null) {
    filteredCards = cardsInHand.filter(
      (card) => card.suit === suitSelected.current
    );
    console.log("Filtered cards (suitSelected):", filteredCards);
    cardMatchedWithSuit =
      filteredCards.length > 0
        ? compIntelligence(filteredCards, cardsInHand, usersCards)
        : null;
  }

  // Once the card is chosen this logic plays the card or plucks from the deck
  compSelectedCard
    ? // Check card selected and return value
      decisionMaking(
        true,
        checkCards(compSelectedCard, suitSelected, cardInPile),
        compSelectedCard,
        setCardState,
        setCrazyEight,
        cardInPile,
        suitSelected,
        cardsInHand,
        usersCards,
        disableInteraction,
        deckState,
        setDeckState
      )
    : cardMatchedWithSuit
    ? // Check card selected and return value
      decisionMaking(
        true,
        checkCards(cardMatchedWithSuit, suitSelected, cardInPile),
        cardMatchedWithSuit,
        setCardState,
        setCrazyEight,
        cardInPile,
        suitSelected,
        cardsInHand,
        usersCards,
        disableInteraction,
        deckState,
        setDeckState
      )
    : // Logic for when the computer can't find a matching card inside the deck.
      (console.log(
        "Computer couldn't find any matching cards, so they drew a card from the deck."
      ),
      drawCards(false, deckState, setDeckState, setCardState),
      (disableInteraction.current = false)); // This function is not defined yet

  // Conditionally check if a card is played that is not a special card so it can reset the user interaction state
  if (
    compSelectedCard !== null &&
    compSelectedCard.value !== "2" &&
    compSelectedCard.value !== "4"
  ) {
    disableInteraction.current = false;
  }

  // Conditionally check if a card is played that is not a special card so it can reset the user interaction state
  if (
    cardMatchedWithSuit !== null &&
    cardMatchedWithSuit.value !== "2" &&
    cardMatchedWithSuit.value !== "4"
  ) {
    disableInteraction.current = false;
  }
};

// Updating UI state
const playCard = (selectedCard, usersTurn, setCardState) => {
  const whosTurn = usersTurn ? "userCardsInHand" : "computersCardsInHand";

  // Update the UI state by the players turn with card selected
  setCardState((prevState) => ({
    ...prevState,
    [whosTurn]: prevState[whosTurn].filter(
      (card) => card.code !== selectedCard.code
    ),
    topCardInPile: selectedCard,
    cardPileHistory: [...prevState.cardPileHistory, selectedCard],
  }));
};

// Warning this function includes side effects!
const decisionMaking = (
  fromComputer,
  value,
  card,
  setCardState,
  setCrazyEight,
  cardInPile,
  suitSelected,
  cardsInHand,
  usersCards,
  disableInteraction,
  deckState,
  setDeckState
) => {
  // Initiate variables
  const usersTurn = fromComputer ? false : true;

  // Delete after testing
  console.log({
    message: "decisionMaking",
    fromComputer: fromComputer,
    value: value,
    card: card,
    cardInPile: cardInPile,
    suitSelected: suitSelected,
    usersTurn: usersTurn,
    deckState: deckState,
    setDeckState: setDeckState,
  });

  // Variable intialized to return to user function
  let returnValue;

  switch (value) {
    case "normal":
      // Play the normal card
      playCard(card, usersTurn, setCardState);
      cardInPile.current = card;

      // Reset the suit selected variable
      suitSelected.current = null;

      break;
    case "crazyEight":
      // Logic for when a player plays a 8 card
      playCard(card, usersTurn, setCardState);
      cardInPile.current = card;
      setCrazyEight(true);

      !usersTurn
        ? (() => {
            const crazyEightSelections = [
              "SPADES",
              "HEARTS",
              "CLUBS",
              "DIAMONDS",
            ];
            const suit =
              crazyEightSelections[
                Math.floor(Math.random() * crazyEightSelections.length)
              ];
            console.log("suit selected (decision making):", suit);
            const arr = [
              usersTurn,
              suit,
              null,
              suitSelected,
              cardsInHand,
              usersCards,
              setCardState,
              setCrazyEight,
              deckState,
              setDeckState,
            ];
            handleCrazyEight(...arr);
          })()
        : (returnValue = "crazyEight");
      break;
    case "skipPlayer":
      // Logic for when a player plays a 4 card
      playCard(card, usersTurn, setCardState);
      const skipRecursiveCardProtect = card.code;
      cardInPile.current = card;

      // Removes the selected cards from cards in hand so the recursive call can pass accurate arguments
      const skipCardsFiltered = cardsInHand?.filter(
        (card) => card.code !== skipRecursiveCardProtect
      );

      // Skip the opponents turn
      !usersTurn
        ? (setTimeout(() => {
            computerResponse(
              cardInPile,
              suitSelected,
              skipCardsFiltered,
              usersCards,
              setCardState,
              setCrazyEight,
              deckState,
              setDeckState,
              disableInteraction
            );
          }, 2000),
          console.log("Computer recursive call finished (skipPlayer)"))
        : (returnValue = "skipPlayer");

      // Reset the suit selected variable
      suitSelected.current = null;
      break;
    case "drawTwo":
      // Logic for when a player plays a 2 card
      playCard(card, usersTurn, setCardState);
      cardInPile.current = card;
      const drawTwoRecursiveCardProtect = card.code;

      // Reset the suit selected variable
      suitSelected.current = null;

      // Removes the selected cards from cards in hand so the recursive call can pass accurate arguments
      const drawTwoCardsFiltered = cardsInHand?.filter(
        (card) => card.code !== drawTwoRecursiveCardProtect
      );

      const drawCardsArguments = [
        fromComputer ? false : true,
        deckState,
        setDeckState,
        setCardState,
        cardInPile,
        suitSelected,
        drawTwoCardsFiltered,
        usersCards,
        setCrazyEight,
        disableInteraction,
      ];

      !usersTurn
        ? (setTimeout(() => {
            drawTwo(...drawCardsArguments);
          }, 2000),
          console.log("Computer recursive call finished (drawTwo)"))
        : (drawTwo(...drawCardsArguments), (returnValue = "drawTwo"));

      // Reset the suit selected variable
      suitSelected.current = null;
      break;
    default:
      console.log("Something went wrong in the decision making process");
  }

  return returnValue;
};

const handleUsersTurn = (
  cardSelected,
  suitSelected,
  cardInPile,
  computersCardsInHand,
  usersCards,
  setCardState,
  setCrazyEight,
  deckState,
  setDeckState,
  disableInteraction
) => {
  console.log("handleUsersTurn called");

  // Captures the value in the return statement and stores it in a variable
  const cardValidation = checkCards(cardSelected, suitSelected, cardInPile);

  // Stops the player from playing card that doesn't meet the validation standards and prevents the computer from responding to the event.
  if (!cardValidation) {
    return;
  }

  // Play a card
  const decision = decisionMaking(
    false,
    cardValidation,
    cardSelected,
    setCardState,
    setCrazyEight,
    cardInPile,
    suitSelected,
    computersCardsInHand,
    usersCards,
    disableInteraction,
    deckState,
    setDeckState,
  );

  console.log("decision making value", decision);

  // Prevents the computerResponse from running if certain values are returned
  if (
    decision === "crazyEight" ||
    decision === "skipPlayer" ||
    decision === "drawTwo"
  ) {
    console.log("return value ran from decision making handleUser");
    return;
  }

  // Setting state to make sure the user can't interact with the UI while the computer is playing.
  disableInteraction.current = true;

  // Start computers turn
  setTimeout(() => {
    computerResponse(
      cardInPile,
      suitSelected,
      computersCardsInHand,
      usersCards,
      setCardState,
      setCrazyEight,
      deckState,
      setDeckState,
      disableInteraction,
      deckState,
      setDeckState
    );
  }, 2000);
};

export {
  handleUsersTurn,
  computerResponse,
  compIntelligence,
  decisionMaking,
  playCard,
  handleCrazyEight,
  drawCards,
};
