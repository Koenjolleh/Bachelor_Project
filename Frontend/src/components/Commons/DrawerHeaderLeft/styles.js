export const styles = (theme) => ({    
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      boxShadow: 'none',
      backgroundColor: theme.palette.secondary.main,
      ...theme.mixins.toolbar
    }
});