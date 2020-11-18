export const styles = (theme) => ({
    gridContainer: {
        width: "100%",
        height: '100%',
        display: 'flex',
        alignItems: 'inherit',
        justifyContent: 'center',
    },
    paperContent: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '50%',
        width: '100%',
        maxHeight: '50%',
        maxWidth: '100%',
        backgroundColor: theme.palette.secondary.dark
    },
    paperContentFull: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        backgroundColor: theme.palette.secondary.dark
    }
});