import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// Material UI
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';


// Styles
import { styles } from './styles';

const selectActivities = (props) => {

    const { classes, title, data, defaultSelected, handleSelect } = props;
    
    return (
        <Fragment>
            <FormControl className={classes.formControl}>
                <InputLabel shrink htmlFor={`selectActivities${title}`}>
                {title}
                </InputLabel>
                <Select
                    multiple
                    native
                    value={defaultSelected}
                    onChange={handleSelect}
                    inputProps={{
                        id: `selectActivities${title}`,
                    }}
                >
                    {
                        data.map((c) => (
                            <option key={c.activity_number} value={c.activity_number}>
                            {c.activity_name}
                            </option>
                    ))}
                </Select>
            </FormControl>
        </Fragment>
    );
}

selectActivities.propTypes = {
    classes: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    defaultSelected: PropTypes.array.isRequired,
    handleSelect: PropTypes.func.isRequired
};

export default withStyles(styles, { withTheme: true })(selectActivities);