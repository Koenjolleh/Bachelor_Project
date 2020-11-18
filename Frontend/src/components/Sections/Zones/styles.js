export const styles = theme => ({
  container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.palette.secondary.dark,
      height: '80%',
      width: '100%'
  
  },
  containerCompare: {
    display: 'flex',
    backgroundColor: theme.palette.secondary.dark,
    height: '100%',
    width: '100%'
  },
  paper: {
      padding: 0,
      textAlign: 'center',
      maxWidth: '100%',
      maxHeight: '100%',
      minHeight: '50%',
      width: '100%',
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
  paperCompare: {
    padding: 0,
    textAlign: 'center',
    maxWidth: '100%',
    maxHeight: '100%',
    minHeight: '50%',
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    position: 'relative',
    boxShadow: 'none !important'
  },
  card: {
      maxWidth: '100%',
      width: '100%',
      margin: 8
  },
  cardActionArea: {
    height: '100%'
  },
  cardMedia: {
    height: '60%'
  },
  cardContent: {
    height: '40%'
  },
  typography: {
    textAlign: 'center',
    width: '100%',
    padding: 4,
    color: theme.palette.secondary.light,
    backgroundColor: theme.palette.secondary.dark,
    margin: 'auto'
  },
  typographyCompare: {
    textAlign: 'center',
    width: '100%',
    color: theme.palette.secondary.light,
    backgroundColor: theme.palette.secondary.dark,
    margin: 'auto'
  },
  svg:{
    width: "100%",
    height: "auto"
  },
  svgCompare:{
    width: "76%",
    height: "auto"
  },
  iconInfo: {
    color: theme.palette.secondary.light+ ' !important',
    opacity: 0.2,
    verticalAlign: 'middle',
    marginLeft: 4
  },   

 // Error Message
  paperContainerError: {
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
  typographyError: {
    color: theme.palette.primary.main,
  },
  iconContainerError: {
    width: '100%',
    height: '100%',
    fontSize: 0
  },
  iconError: {
    fontSize: 50
  },

  // typography Title (name of day) One dataset Zone
  typographyOneDataset: {
    textAlign: 'center',
    width: '100%',
    padding: 4,
    color: theme.palette.secondary.light,
    backgroundColor: theme.palette.secondary.dark,
    marginTop: '2%'
  },

  // Ranking Zones (Gradient)
  main: {
    width: '100%',
    display: 'flex',
    overflow: 'hidden',
    listStyle: 'none',
    paddingInlineStart: 0
  },
  mcblock: {
    flex: 1,
    position: 'relative',
    height: 20
  },
  mc: {
    padding: 0,
    position: 'relative'
  },
  hexval: {
    width: '100%',
    fontSize: 14,
    position: 'absolute',
    letterSpacing: 2,
    color: '#FFFFFF',
    left: 0,
    fontWeight: 600
  },

  // Options (Left Panel)
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
    width: '100%',
    backgroundColor:theme.palette.secondary.dark
  },
  drawerPaper: {
    position: 'relative',
    width: theme.drawerWidthLeft,
    backgroundColor: theme.palette.secondary.main
  },
  grid: {
    padding: 5
  },
  paperFilters: {
    display: 'block',
    padding: 0,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: theme.palette.secondary.main
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    boxShadow: 'none',
    backgroundColor: theme.palette.secondary.main,
    ...theme.mixins.toolbar
  },
  menuList: {
    paddingTop: 0,
    paddingBottom: 0
  },
  menuItem: {
      '&:focus': {
          backgroundColor: theme.palette.primary.main,
          '& $primary, & $icon': {
          color: theme.palette.common.white,
          },
      },
  },
  primary: {},
  icon: {},
  containerDays: {
      marginBottom: 30
  },

  // Compare Form
  containerCompareForm: {
    width: '100%',
    padding: '5px 0'
  },
  paperCompareForm: {
    width: '100%',
    height: '100%',
    display: 'block',
    backgroundColor: theme.palette.secondary.main,
    boxShadow: 'none'
  },
  formControl: {
    width: '100%'
  },
  formGroup: {
      width: '100%'
  },
  select: {
      width: '100%'
  },
  formRow: {
  },
  checkBox: {
      padding: 5,
      marginRight: 5,
      fontSize: '0.8rem',
      borderBottom: 'none'
  }
});