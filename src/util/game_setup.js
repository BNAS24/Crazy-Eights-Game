// gameSetup.js
export const gameSetup = () => {
    const backOfCard = "https://deckofcardsapi.com/static/img/back.png";
  
    const cardTemplate = {
      code: "",
      image: "",
      suit: "",
      value: ""
    };
  
    const SUITS = ["Hearts", "Diamonds", "Clubs", "Spades"];
  
    const RANKS = [
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "Jack",
      "Queen",
      "King",
      "Ace"
    ];
  
    // Function to create a deck of cards using a functional approach
    const createDeck = () => {
      const deck = SUITS.flatMap(suit =>
        RANKS.map(rank => {
          const cardCode = getCardCode(rank);
          const firstLetter = suit.charAt(0);
          const cardCodeAndFirstLetter = `${cardCode}${firstLetter}`;
          return {
            ...cardTemplate,
            code: cardCodeAndFirstLetter,
            image: `https://deckofcardsapi.com/static/img/${cardCodeAndFirstLetter}.png`,
            suit: suit.toUpperCase(),
            value: rank.toUpperCase(),
          };
        })
      );
  
      return deck;
    };
  
    // Function to get the card code for ranks greater than 10
    const getCardCode = (rank) => {
      switch (rank) {
        case "Jack":
          return "J";
        case "Queen":
          return "Q";
        case "King":
          return "K";
        case "Ace":
          return "A";
        case "10":
          return "0";
        default:
          return rank;
      };
    };
  
    // Fisher Yates algorithm for shuffling cards
    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Generate random index from 0 to i
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements at i and j
      }
      return array;
    };
  
    // Return the functions needed for game setup
    return {
      createDeck,
      shuffleArray
    };
  };
  