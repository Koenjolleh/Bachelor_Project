import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// Material UI
import CircularProgress from '@material-ui/core/CircularProgress';

// Styles
import { styles } from './styles';


const Spinner = (props) => {

    const { classes, size } = props;
    
    return (
        <CircularProgress className={classes.progress} thickness={5} size={size}/>
    );
}


Spinner.propTypes = {
    classes: PropTypes.object.isRequired,
    size: PropTypes.number
};


export default withStyles(styles, { withTheme: true })(Spinner);