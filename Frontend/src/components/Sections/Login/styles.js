export const styles = (theme) => ({
    container:{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.palette.secondary.dark
    },
    paperLogin: {
        padding: 30,
        borderRadius: 0,
        backgroundColor: theme.palette.secondary.main,
        textAlign: "center"
    },
    form: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        width: '100%'
    },
    button: {
        width: '100%'
    },
    logo: {
        display: 'block',
        maxWidth: 200,
        maxHeight: 200,
        boxShadow: theme.shadows[5],
        position: 'absolute',
        zIndex: 999,
        top: '3%',
        '&:hover': {
            boxShadow: theme.shadows[9],
        }
    },
    containerButton: {
        width: '100%',
        padding: '10px 0'
    },
    errorMsg: {
        color: theme.palette.error.main
    },
    link: {
        width: '100%',
        textDecoration: 'none'
    },
    forgotPassword: {
        color: theme.palette.secondary.light,
        '&:hover': {
            fontSize: 16
        }
    }
});