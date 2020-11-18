export const styles = theme => ({
    root: {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-evenly',
      boxShadow: 'none',
      position: 'relative',
      '&> $card': {
        flex: '1 1 30%',
        boxSizing: 'border-box'
      }
    },
    typography: {
      boxSizing: 'border-box',
      textAlign: 'right',
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.palette.secondary.dark,
        height: '100%',
        width: '100%'
    
    },
    paper: {
      padding: 0,
      textAlign: 'center',
      maxWidth: '98%',
      maxHeight: '80%',
      minHeight: '10%',
      width: '98%'
    },
  
    // START NEW METRICS CARDS
    card: {
        maxWidth: '100%',
        width: '100%',
        margin: 10
    },
    cardActionArea: {
      height: '100%',
      display: 'flex',
      alignItems: 'flex-start',
      '&:hover' :{
        color: theme.palette.primary.main+' !important',
      }
    },
    cardMedia: {
      maxWidth: '100%',
      width: '100%',
      height: '100%'
    },
    cardContent: {
      width: '50%',
      height: '100%',
      maxHeight: '100%'
    },
    // END NEW METRICS CARDS

    // START ERROR MESSAGE
    paperContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paperError: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 0
    },
    iconContainer: {
        width: '100%',
        height: '100%',
        fontSize: 0
    },
    icon: {
        fontSize: 50
    },
    typographyError: {
        color: theme.palette.primary.main,
    }
    // END ERROR MESSAGE


  });