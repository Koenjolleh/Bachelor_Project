import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// Material UI
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

// Styles
import { styles } from './styles';

const SelectOptions = (props) => {

    const { classes, title, data, defaultSelected, handleSelect } = props;
    
    return (
        <Fragment>
            <FormControl className={classes.formControl}>                        
            <InputLabel id="selectDefault">Select {title} </InputLabel>
                <Select
                    labelid={`select${title}`}
                    id={`select${title}`}
                    value={defaultSelected}
                    onChange={handleSelect}
                    className={classes.select}
                >    
                    { 
                        data.length > 0 &&
                        data.map(ds => {
                                return <MenuItem key={ds.id} value={ds.id}>{ds.description}</MenuItem>;
                            }) 
                    }
                </Select>
            </FormControl>
        </Fragment>
    );
}

SelectOptions.propTypes = {
    classes: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    defaultSelected: PropTypes.number.isRequired,
    handleSelect: PropTypes.func.isRequired
};

export default withStyles(styles, { withTheme: true })(SelectOptions);