import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Slider } from 'material-ui-slider';

// Material UI
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';

// Styles
import { styles } from './styles';

const CustomPeriod = (props) => {

    const { classes, minSelected, maxSelected, selectedCustomPeriod, handleCustomPeriod, handleCheckboxCustomPeriod, 
            customPeriodEnabled } = props;
    
    return (
        <Fragment>
            <div>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormGroup>
                    <FormControlLabel
                        className={classes.formRow}
                        label="Custom Period?"
                        control={
                            <Fragment>
                                <Checkbox 
                                    className={classes.checkBox}
                                    name="customPeriodEnabled"
                                    checked={customPeriodEnabled} 
                                    onChange={handleCheckboxCustomPeriod}
                                    value="1" 
                                    disabled={false}
                                />
                            </Fragment>
                        }
                    />
                    </FormGroup>
                </FormControl>
            </div>
            {
                customPeriodEnabled === true &&
                <div>
                    <Typography variant="subtitle1" component="h3" className={classes.typography}>
                        Custom Period from {minSelected} to {maxSelected}
                    </Typography>
                    <Slider 
                        style={{ width: '90%', height: 40 }}
                        min={0}
                        max={23}
                        color="#00b8d4" 
                        defaultValue={selectedCustomPeriod} 
                        value={[minSelected,maxSelected]}
                        onChange={handleCustomPeriod}
                        range
                    />
                </div>
            }
        </Fragment>
    );
}

CustomPeriod.propTypes = {
    classes: PropTypes.object.isRequired,
    minSelected: PropTypes.number.isRequired,
    maxSelected: PropTypes.number.isRequired,
    selectedCustomPeriod: PropTypes.array.isRequired,
    handleCustomPeriod: PropTypes.func.isRequired,
    customPeriodEnabled: PropTypes.bool.isRequired,
    handleCheckboxCustomPeriod: PropTypes.func.isRequired
};

export default withStyles(styles, { withTheme: true })(CustomPeriod);