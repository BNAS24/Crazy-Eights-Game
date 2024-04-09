import { Box, Container, Typography } from "@mui/material";
import { useTheme } from "@mui/system";
import { CrazyEightModal } from "../../components/modals/CrazyEightModal";
import { WinnerModal } from "../../components/modals/WinnerDisplay";
import { drawCards, handleCrazyEight } from "../../util/game_logic";
import { gamePageStyles } from "./local_styles/gamepage_styles";

export const GamePres = ({
  cardState,
  handleUserTurn,
  suitSelected,
  setCardState,
  setCrazyEight,
  isCrazyEight,
  cardInPile,
  deckState,
  setDeckState,
  disableInteraction,
  isGameOver,
  handleGameReset,
  winner,
}) => {
  const turnInteractivity = (card) => {
    handleUserTurn(
      card,
      suitSelected,
      cardInPile,
      cardState.computersCardsInHand,
      cardState.userCardsInHand,
      setCardState,
      setCrazyEight,
      deckState,
      setDeckState,
      disableInteraction
    );
  };

  const drawCardsInteractivity = () => {
    const drawCardsArguments = [
      true,
      deckState,
      setDeckState,
      setCardState,
      cardInPile,
      suitSelected,
      cardState.computersCardsInHand,
      cardState.userCardsInHand,
      setCrazyEight,
      disableInteraction,
    ];

    drawCards(...drawCardsArguments);
  };

  const theme = useTheme();

  return (
    <Container
      disableGutters={true}
      maxWidth="xl"
      sx={{
        ...gamePageStyles.topContainer,
        backgroundColor: theme.palette.primary.main,
      }}
    >
      {/*Computers hand of cards*/}
      <Container
        disableGutters={true}
        sx={{
          ...gamePageStyles.opponentCardStackContainer,
        }}
      >
        {cardState.computersCardsInHand.map((card) => (
          <Box
            key={card.code}
            component="img"
            // src={card.image}
            src="https://deckofcardsapi.com/static/img/back.png"
            alt="card"
            sx={{
              ...gamePageStyles.opponentCardStackContainer.cards,
            }}
          />
        ))}
      </Container>
      {/*Deck of cards */}
      <Container style={gamePageStyles.deckOfCardConainer}>
        {[...Array(8)].map((_, index) => (
          <Box
            onClick={drawCardsInteractivity}
            key={index}
            component="img"
            src="https://deckofcardsapi.com/static/img/back.png"
            alt="deck of cards"
            sx={{
              ...(index === 0
                ? gamePageStyles.deckOfCardConainer.firstCard
                : gamePageStyles.deckOfCardConainer.deck),
            }}
            style={{
              pointerEvents: disableInteraction.current ? "none" : "auto",
            }}
          />
        ))}
        {/*Top card in pile */}
        <Box
          component="img"
          src={cardState?.topCardInPile?.image}
          alt="Card Pile"
          sx={{
            ...gamePageStyles.deckOfCardConainer.cardPool,
          }}
        />
        <Container
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(10%, -50%)",
          }}
        >
          {suitSelected && (
            <Typography variant="h5">{suitSelected.current}</Typography>
          )}
        </Container>
      </Container>
      {/*Users hand of cards */}
      <Container 
      disableGutters={true}
      sx={{ ...gamePageStyles.userCardStackContainer }}>
        {cardState.userCardsInHand.map((card) => (
          <Box
            onClick={() => turnInteractivity(card)}
            key={card.code}
            component="img"
            src={card.image}
            alt={card.code}
            sx={{
              ...gamePageStyles.userCardStackContainer.cards,
            }}
            style={{
              pointerEvents: disableInteraction.current ? "none" : "auto",
            }}
          />
        ))}
      </Container>
      {/*Crazy Eight Modal Component */}
      <CrazyEightModal
        open={isCrazyEight}
        onClose={handleCrazyEight}
        setCrazyEight={setCrazyEight}
        suitSelected={suitSelected}
        setCardState={setCardState}
        cardState={cardState}
        cardInPile={cardInPile}
        deckState={deckState}
        setDeckState={setDeckState}
        disableInteraction={disableInteraction}
      />
      {/*Winner Modal Component */}
      <WinnerModal
        open={isGameOver}
        onClose={handleGameReset}
        winner={winner}
      />
    </Container>
  );
};
