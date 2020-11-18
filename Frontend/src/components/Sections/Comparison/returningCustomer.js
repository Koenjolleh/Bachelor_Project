import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// Material UI
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

// Styles
import { styles } from './styles';

const ReturningCustomer = (props) => {

    const { classes, checked, handleReturningCustomer } = props;
    
    return (
        <Fragment>
            <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                    <FormControlLabel
                        className={classes.formRow}
                        control={
                        <Fragment>
                            <Checkbox 
                            name="returningCustomers" 
                            checked={checked} 
                            onChange={handleReturningCustomer}
                            value="1" 
                            className={classes.checkBox} 
                            disabled={false}
                            />
                        </Fragment>
                        }
                        label="Returning Customers"
                    />
                </FormGroup>
            </FormControl>
        </Fragment>
    );
}

ReturningCustomer.propTypes = {
    classes: PropTypes.object.isRequired,
    checked: PropTypes.bool.isRequired,
    handleReturningCustomer: PropTypes.func.isRequired
};

export default withStyles(styles, { withTheme: true })(ReturningCustomer);