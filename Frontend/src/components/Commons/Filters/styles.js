export const styles = theme => ({
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
    divider: {
        height: 15
    },
    /** Custom Period */
    root: {
        boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 5px 8px 0px rgba(0,0,0,0.14), 0px 1px 14px 0px rgba(0,0,0,0.12);'
    },
    typography: {
        textAlign: 'left',
        width: '100%',
        paddingLeft: 12,
        paddingTop: 6,
        color: theme.palette.secondary.light
    },

    /** Activities and Custom Period*/
    formControl: {
        width: '100%',
        margin: '0 !important'
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

    /// DESCRIPTION ACTIVITIES
    iconInfo: {
        position: 'absolute',
        right: '5%',
        color: theme.palette.secondary.light+ ' !important',
        opacity: 0.2
    }
});