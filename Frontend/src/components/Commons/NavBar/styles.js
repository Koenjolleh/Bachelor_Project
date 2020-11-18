export const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.secondary.dark
  },
  logoCont: {
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    position: 'absolute', 
    zIndex: 9999
  },
  Logo: {
    margin: 2,
    display: 'block',
    maxWidth: 100,
    maxHeight: 74,
    boxShadow: theme.shadows[5],
    zIndex: 9999
  },
  logoutContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logout:{
    position: 'absolute',
    zIndex: 999,
    right: '5%',
    textDecoration: 'none'
  },
  button: {
    position: 'absolute',
    right: 20,
    width: 100
  }
});