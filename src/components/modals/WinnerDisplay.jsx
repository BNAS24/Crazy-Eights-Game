import { Box, Button, Container, Modal, Typography } from "@mui/material";
import { styles } from "../../styles/modals/winnerModal";

export const WinnerModal = ({ open, onClose, winner }) => {
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
        <Container sx={{ ...styles.groupTextAndButtons }}>
          <Typography 
          sx={{
            ...styles.gameOverText
          }}
          variant="h3" align="center">
            Game Over!
          </Typography>
          {open ? (
            <Typography
            sx={{
              ...styles.winnerText
            }}
             variant="h5" align="center">
              {winner} won!
            </Typography>
          ) : null}
          <Button
            sx={{
              ...styles.gameOverButton,
            }}
            onClick={onClose}
          >
            Play Again
          </Button>
        </Container>
      </Box>
    </Modal>
  );
};
