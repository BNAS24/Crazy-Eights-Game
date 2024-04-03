import { Box, Container, Modal } from "@mui/material";
import { styles } from "../../styles/modals/crazyEightModal";
import { SuitItem } from "../suitItems";

export const CrazyEightModal = ({
  open,
  onClose,
  setCrazyEight,
  suitSelected,
  cardState,
  setCardState,
  cardInPile,
  deckState,
  setDeckState,
  disableInteraction,
}) => {

  // Array of OnClose(handleUsersTurn) arguments to pass in
  const arr = [
    true,
    null,
    null,
    setCrazyEight,
    suitSelected,
    cardState.computersCardsInHand,
    cardState.userCardsInHand,
    setCardState,
    setCrazyEight,
    deckState,
    setDeckState,
    cardInPile,
    disableInteraction,
  ];

  // newArr variable initialize for later use
  let newArr;

  return (
    <Modal
      disableAutoFocus={true}
      disableEscapeKeyDown={true}
      open={open}
      onClose={onClose}
    >
      <Box
        sx={{
          ...styles.modalContainer,
        }}
      >
        <Container
          sx={{
            ...styles.imageContainer,
          }}
        >
          <Container
            disableGutters={true}
            sx={{
              ...styles.imageContainer.heartAndSpadesContainer,
            }}
          >
            <SuitItem
              component="img"
              src="/heart-symbol.png"
              alt="HEARTS"
              onClick={(e) => (
                (newArr = [
                  ...arr.splice(0, 1),
                  e.target.alt,
                  ...arr.splice(2),
                ]),
                onClose(...newArr)
              )}
              style={{
                pointerEvents: disableInteraction.current ? "none" : "auto",
              }}
            />
            <SuitItem
              component="img"
              src="/spade-symbol.png"
              alt="SPADES"
              onClick={(e) => (
                (newArr = [
                  ...arr.splice(0, 1),
                  e.target.alt,
                  ...arr.splice(2),
                ]),
                onClose(...newArr)
              )}
              style={{
                pointerEvents: disableInteraction.current ? "none" : "auto",
              }}
            />
          </Container>
          <Container
            disableGutters={true}
            sx={{
              ...styles.imageContainer.clubsAndDiamondsContainer,
            }}
          >
            <SuitItem
              component="img"
              src="/club-symbol.png"
              alt="CLUBS"
              onClick={(e) => (
                (newArr = [
                  ...arr.splice(0, 1),
                  e.target.alt,
                  ...arr.splice(2),
                ]),
                onClose(...newArr)
              )}
              style={{
                pointerEvents: disableInteraction.current ? "none" : "auto",
              }}
            />
            <SuitItem
              component="img"
              src="/diamond-symbol.png"
              alt="DIAMONDS"
              onClick={(e) => (
                (newArr = [
                  ...arr.splice(0, 1),
                  e.target.alt,
                  ...arr.splice(2),
                ]),
                onClose(...newArr)
              )}
              style={{
                pointerEvents: disableInteraction.current ? "none" : "auto",
              }}
            />
          </Container>
        </Container>
      </Box>
    </Modal>
  );
};
