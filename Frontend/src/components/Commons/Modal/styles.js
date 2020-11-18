export const styles = (theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: 10,
        height: '80%',
        width: '80%'
    },
    icon: {
        zIndex: 999,
        top: '0%',
        right: '0%',
        color: theme.palette.primary.main,
        position: 'absolute',
        fontSize: 50,
        cursor: 'pointer'
    },
    button: {
        width: '40%',
        margin: 4
    },
    rightIcon: {
        marginLeft: 4,
        color: '#eeeeee !important'
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.9)'
    }
});