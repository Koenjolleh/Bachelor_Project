import { createMuiTheme } from '@material-ui/core/styles';
import { common, grey, cyan } from '@material-ui/core/colors';

const boxShadow = '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)';

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: cyan.A700
        },
        secondary: {
            light: '#FFFFFF',
            main: grey[800],
            dark: grey[900]
        }
    },
    drawerWidthLeft: 270,
    borderBotomColor: {
        borderBotom: '2px solid '+grey[800]
    },
    typography: {
        useNextVariants: true,
        // Use the system font instead of the default Roboto font.
        fontFamily: [
                    '-apple-system',
                    'BlinkMacSystemFont',
                    '"Segoe UI"',
                    'Roboto',
                    '"Helvetica Neue"',
                    'Arial',
                    'sans-serif',
                    '"Apple Color Emoji"',
                    '"Segoe UI Emoji"',
                    '"Segoe UI Symbol"',
        ].join(','),
        fontWeightMedium: 500,
        body1: {
          fontWeight: 500,
        },
        body2: {
            fontSize: 12,
            color: grey[200]
        },
        title: {
            fontSize: 16,
            color: grey[200]
        },
        h6: {
            color: grey[600],
            fontWeight: 800
        },
        h4: {
            fontSize: 14,
            color: grey[200],
            fontWeight: 800
        },
        h3: {
            fontSize: 16,
            color: cyan.A700,
            fontWeight: 800
        },
        subtitle1: {
            fontSize: 12,
            color: grey[200]
        },
        subtitle2: {
            fontSize: 10,
            color: grey[200],
            fontWeight: 800
        },
        button: {

        },
    },
    overrides: {
        // Name of the component ⚛️ / style sheet
        MuiButton: {
            // Name of the rule
            root: {
                width: '100%',
                height: 30,
                background: 'linear-gradient(15deg,'+ cyan[600] +' 10%,'+ cyan.A700 +' 100%)',
                borderRadius: 0,
                border: 0,
                color: grey[200]+' !important',
                padding: '0 20px',
                boxShadow: boxShadow,
                fontSize: 14,
                fontWeight: 800
            }
        },
        MuiPaper: {
            root: {
                backgroundColor: '#ffffff'
            }
        },
        MuiInputBase: {
            root: {
                color: '#ffffff',
                backgroundColor: grey[900],
                padding: '5px 15px',
                boxShadow: boxShadow,
                borderRadius: 0,
                fontSize: '0.8rem'
            }
        },
        MuiMenuItem: {
            root: {
                color: '#ffffff',
                backgroundColor: grey[800],
                borderBottom: '1px solid '+grey[900],
                boxShadow: boxShadow,
                fontSize: '0.8rem',
                height: 16,
                padding: '5px !important'
            }
        },
        MuiFormControl: {
            root: {
                flexDirection: 'initial'
            }
        },
        MuiFormControlLabel: {
            root: {
                color: '#FFFFFF',
                fontSize: '0.8rem'
            }
        },
        MuiTableRow: {
            root: {
                height: 40+'px !important'
            }
        },
        MuiTableCell: {
            root: {
                color: '#000000 !important',
                fontSize: '0.8rem',
                borderBottom: '1px solid '+ grey[900]
            }
        },
        MuiSvgIcon: {
            root: {
                color: cyan.A700+' !important',
                fontSize: 20
            }
        },
        MuiAvatar: {
            root: {
                margin: 10,
                width: 40,
                height: 40,
            }
        }
    }
});