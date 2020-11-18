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
  rootTable: {
    width: '100%',
    height: '100%'
  },
  table: {
    width: '100%',
    height: '100%'
  },
  tableRow: {
    '&:hover':{
      borderTop: '2px solid '+theme.palette.secondary.main,
      borderBottom: '2px solid '+theme.palette.secondary.main
    },
    '&:hover $tableCell':{
      color: theme.palette.primary.main+' !important'
    }
  },
  tableCell: {
    borderTop: '4px solid '+theme.palette.secondary.main, //
    borderBottom: '4px solid '+theme.palette.secondary.main, //
    borderLeft: '1px solid '+theme.palette.secondary.main, //
    borderRight: '1px solid '+theme.palette.secondary.main, //
    padding: '4px 8px 4px 8px'
  },
  formRow: {
      borderBottom: '1px solid '+theme.palette.secondary.dark,
      margin: 0
  },
  checkBox: {
    padding: 5,
    marginRight: 5,
    fontSize: '0.8rem'
  },
  form: {
  },
  button: {
    width: '100%',
    fontSize: 10
  },
  textField: {
    marginTop: 5,
    marginBottom: 5
  },
  input: {
    color: theme.palette.secondary.light+ ' !important'
  },
  notchedOutline: {
    borderWidth: "2px",
    borderColor: theme.palette.secondary.main+' !important',
    color: theme.palette.secondary.main+' !important',
  },
  formControl: {
      width: '100%'
  },
  select: {
      width: '80%'
  },
  typography: {
    boxSizing: 'border-box',
    textAlign: 'justify'
    
  },
  formResult: {
    marginTop: 5,
    display: 'flex',
    justifyContent: 'space-between'
  },
  buttonResultFailure: {
    width: 12,
    backgroundColor: '#FF0000 !important',
    background: '#FF0000 !important'
  },
  buttonResultSuccess: {
    width: 12,
    backgroundColor: '#008000 !important',
    background: '#008000 !important'
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconSuccess: {
    fontSize: 30,
    color: '#008000 !important',
  },
  iconFailure: {
    fontSize: 30,
    color: '#FF0000 !important'
  },
  iconAddInsight: {
    fontSize: 30
  },
  list: {
    padding: 0
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

  //Modal
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalPaper: {
    backgroundColor: theme.palette.secondary.dark,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: 10,
    width: '95%'
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.9)'
  },
  modalIcon: {
    zIndex: 999,
    top: '0%',
    right: '0%',
    color: theme.palette.primary.main,
    position: 'absolute',
    fontSize: 50,
    cursor: 'pointer'
  },

  // START NEW METRICS CARDS
  card: {
      maxWidth: '100%',
      width: '100%',
      margin: 10
  },
  cardActionArea: {
    height: '100%',
    '&:hover' :{
      color: theme.palette.primary.main+' !important',
    }
  },
  cardMedia: {
    height: '60%'
  },
  cardContent: {
    height: '40%'
  }
  // END NEW METRICS CARDS
});