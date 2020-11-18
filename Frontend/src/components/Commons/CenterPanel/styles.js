export const styles = theme => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.palette.secondary.dark,
        height: '100%',
        width: '100%'
    },
    containerComparisonForm: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.palette.secondary.dark,
        height: 'calc(100% - 58px)',
        width: '100%',
        overflow: 'auto'
    },
    paper: {
        backgroundColor: theme.palette.secondary.dark,
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        maxWidth: '90%',
        maxHeight: '80%',
        minHeight: '10%',
        width: '90%',
    },
    paperDashboard: {
        padding: '0 !important',
        width: '100% !important',
        height: '100% !important',
        maxWidth: '100%',
        maxHeight: '100%'
    },
    paperComparisonForm: {
        padding: '0 !important',
        width: '100% !important',
        height: '100% !important',
        maxWidth: '100%',
        maxHeight: '100%',
        // marginBottom: '8%'
    },
    spinnerActive: {
        backgroundColor: 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: '90%',
        maxHeight: '80%',
        minHeight: '10%',
        width: '90%'
    }
  });