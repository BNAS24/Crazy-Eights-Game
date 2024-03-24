import { Container } from "@mui/material";
import { Card } from "../../components/cards/Card";
import { useTheme } from '@mui/system';
import { gamePageStyles } from './local_styles/gamepage_styles';
import { Box } from "@mui/material";


export const GamePres = ({
    cardState,
}) => {

    const theme = useTheme();

    return (
        <Container
            disableGutters={true}
            maxWidth='xl'
            sx={{
                ...gamePageStyles.topContainer,
                backgroundColor: theme.palette.primary.main,
            }}
        >
            <Container
                sx={{
                    ...gamePageStyles.opponentCardStackContainer
                }}
            >
                {cardState.computersCardsInHand.map(card => (
                    <Box
                        key={card.code}
                        component='img'
                        src={card.image}
                        // src='https://deckofcardsapi.com/static/img/back.png'
                        alt={card.code}
                        sx={{
                            ...gamePageStyles.opponentCardStackContainer.cards
                        }}
                    />
                ))}
            </Container>
            <Container
                style={gamePageStyles.deckOfCardConainer}
            >
                {[...Array(8)].map((_, index) => (
                    <Box
                        key={index}
                        component='img'
                        src='https://deckofcardsapi.com/static/img/back.png'
                        alt="deck of cards"
                        sx={{
                            ...index === 0
                                ? gamePageStyles.deckOfCardConainer.firstCard
                                : gamePageStyles.deckOfCardConainer.deck,
                        }}
                    />
                ))}
                <Box
                    component='img'
                    src={cardState?.topCardInPile?.image}
                    alt='Card Pile'
                    sx={{
                        ...gamePageStyles.deckOfCardConainer.cardPool
                    }}
                />
            </Container>
            <Container
                sx={{ ...gamePageStyles.userCardStackContainer }}
            >
                {cardState.userCardsInHand.map(card => (
                    <Box
                        key={card.code}
                        component='img'
                        src={card.image}
                        alt={card.code}
                        sx={{
                            ...gamePageStyles.userCardStackContainer.cards,
                        }}
                    />
                ))}
            </Container>
        </Container>
    )
};