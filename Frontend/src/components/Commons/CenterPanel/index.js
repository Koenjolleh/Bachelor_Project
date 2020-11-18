import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

// Styles
import { styles } from './styles';


const CenterPanel = (props) => {
    const { classes, children, customDashBoard, spinner,customDetailsLocation, comparisonForms } = props;
    return (
        <div className={classNames(classes.container,
            {
                [classes.containerComparisonForm]: comparisonForms
            })}>
            <div className={classNames(classes.paper,
                {
                    [classes.paperDashboard]: customDashBoard,
                    [classes.paperDetailsLocation]: customDetailsLocation,
                    [classes.spinnerActive]: spinner,
                    [classes.paperComparisonForm]: comparisonForms
                })}>
                {children}    
            </div>
        </div>
    );
}

CenterPanel.propTypes = {
  classes: PropTypes.object.isRequired,
  customDashBoard: PropTypes.bool,
  spinner: PropTypes.bool,
  customDetailsLocation: PropTypes.bool
};

export default withStyles(styles, { withTheme: true })(CenterPanel);