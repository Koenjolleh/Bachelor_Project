import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// Materil UI
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ArrowRight from '@material-ui/icons/ArrowRight';

// Styles
import { styles } from './styles';

// Constants
import { listDays } from './constants';


const FilterZoneMockup = (props) => {
    
    const { classes, handleChangeSelecteDay, handleChangeSelecteTypeZone, selectedDay, selectedTypeZone, checked, zoneTypes } = props;
    
    return (
        <Fragment>
            <div className={classes.containerDays}>
                <MenuList 
                    className={classes.menuList} 
                    selected={selectedDay}
                    onClick={handleChangeSelecteDay}
                >
                {
                    listDays.map(option => (
                        <MenuItem key={option.value} value={option.value} className={classes.menuItem} selected={option.value === selectedDay}>
                            <ListItemIcon className={classes.icon}>
                                <option.icon />
                            </ListItemIcon>
                            {option.label}
                        </MenuItem>
                    ))
                }
                </MenuList>
            </div>
            {
                checked === true &&
                <div>
                    <MenuList 
                        className={classes.menuList} 
                        selected={selectedTypeZone}
                        onClick={handleChangeSelecteTypeZone}
                    >
                    {
                        zoneTypes.map(option => (
                            <MenuItem key={option.zone_type_number} value={option.zone_type_number} className={classes.menuItem} selected={option.zone_type_number === selectedTypeZone}>
                                <ListItemIcon className={classes.icon}>
                                    <ArrowRight />
                                </ListItemIcon>
                                {option.zone_type_name}
                            </MenuItem>
                        ))
                    }
                    </MenuList>
                </div>
            }
        </Fragment>
    )
}

FilterZoneMockup.propTypes = {
    classes: PropTypes.object.isRequired,
    handleChangeSelecteDay: PropTypes.func.isRequired,
    handleChangeSelecteTypeZone: PropTypes.func.isRequired,
    selectedTypeZone: PropTypes.number.isRequired,
    checked: PropTypes.bool.isRequired,
    zoneTypes: PropTypes.array.isRequired
};
  
export default withStyles(styles, { withTheme: true })(FilterZoneMockup);