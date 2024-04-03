export const styles = {
    modalContainer: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%',
        minWidth: '300px',
        height: '50vh',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        border: '2px solid var(--theme-black)',
        backgroundColor: 'var(--theme-white)',
        overflowY: 'hidden',
    },
    groupTextAndButtons: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    gameOverText:{
        color: 'var(--theme-black)',
    },
    winnerText: {
        color: 'var(--theme-black)',
    },
    gameOverButton: {
        height: '50px',
        width: '100px',
        border: '2px solid var(--theme-black)',
    },
};