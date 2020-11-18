export const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.secondary.main,
        height: 'calc(100% - 48px)'
    },
      appFrame: {
        height: '100%',
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        width: '100%',
    },
    containerMainContent: {
        flexGrow: 1, 
        padding: 0, 
        height: '100%', 
        width: '100%'
    }
});