import { GamePres } from "./GamePres";
import { gameSetup } from "../../util/game_setup";
import { useState } from "react";
import React, { useEffect } from "react";
import * as gameLogic from '../../util/game_logic';

export const GameContainer = () => {
  // const usersTurn = useRef(true);
  // const suitSelected = useRef(null);
  // const cardResolved = useRef(true); 
  // const stopRecusion = useRef(true); 
  // const cardOnTop = useRef(null);

  const [deckState, setDeckState] = useState([]);
  const [cardState, setCardState] = useState({
    topCardInPile: {},
    userCardsInHand: [],
    computersCardsInHand: [],
    cardPileHistory: [],
    remainingCardsInDeck: null,
  });

  useEffect(() => {
    // Destructure functions from gameSetup module
    const { createDeck, shuffleArray } = gameSetup();

    // Create deck of cards 
    const deck = createDeck();

    // Shuffle deck of cards
    const shuffledDeck = shuffleArray(deck);

    // Distrubuting cards to the players and card pile from the shuffled deck
    const usersCards = shuffledDeck.splice(-8);
    const computersCards = shuffledDeck.splice(-8);
    const topCard = shuffledDeck.pop();

    // Updating cardState variable with its respective properties
    setCardState(prevState => ({
      ...prevState,
      userCardsInHand: usersCards,
      computersCardsInHand: computersCards,
      topCardInPile: topCard,
      cardPileHistory: [topCard],
    }));

    // Set shuffled deck to the state
    setDeckState(shuffledDeck);

  }, []);

  useEffect(() => {
    // Update the remainingCardsInDeck state based on the length of the deckState array
    setCardState(prevState => ({
      ...prevState,
      remainingCardsInDeck: deckState.length,
    }));
  }, [deckState]);

  console.log('shuffled deck', deckState);
  console.log('card state', cardState);

  return (
    <>
      <GamePres
        cardState={cardState}
      />
    </>
  )
};