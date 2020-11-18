import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

//Styles
import { styles } from './styles';

const DrawerHeaderLeft = (props) => {

    const { classes } = props;
    return (
        <div className={classes.drawerHeader}>
        </div>
    )
}

DrawerHeaderLeft.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(DrawerHeaderLeft);