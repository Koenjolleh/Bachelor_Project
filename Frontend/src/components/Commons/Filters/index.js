import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { MenuList, MenuItem, ListItemIcon, Divider } from '@material-ui/core';

// Components
import CustomPeriod from './CustomPeriod';
import ActivitiesBusiness from './ActivitiesBusiness';
import ActivitiesCustomer from './ActivitiesCustomer';
import ActivitiesOutside from './ActivitiesOutside';
import ReturningCustomers from './ReturningCustomers';

// Styles
import { styles } from './styles';

// Constants
import { listDays } from './constants';


const Filters = (props) => {

    const { classes, selectedDay, handleChangeSelecteDay, selectPeriodsDay, selectActivitiesDay, periodsDay, serviceSelected, 
            isReturningCustomers, returningCustomers, selectedLocation, activitiesBusiness, activitiesCustomer, activitiesOutside,
            customPeriosIsEnabled, customPeriodEnabled
    } = props;

    
    return (
        <Fragment>
            <Divider className={classes.divider} />
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

            {/*  INSIDE FILTER */}
            {
                selectedDay > 0 && serviceSelected === 1 ? 
                <Fragment>
                    <Divider className={classes.divider} />
                    <CustomPeriod 
                        selectPeriodsDay={selectPeriodsDay} 
                        periodsDay={periodsDay} 
                        service={1}
                        customPeriosIsEnabled={customPeriosIsEnabled}
                        customPeriodEnabled={customPeriodEnabled}
                    />
                </Fragment> : null
            }

            {
                selectedDay > 0 && serviceSelected === 1 &&
                <Fragment>
                    <Divider className={classes.divider} />
                    <ReturningCustomers 
                        isReturningCustomers={isReturningCustomers} 
                        returningCustomers={returningCustomers} 
                        isDisabled={activitiesCustomer.isDisable}
                    />
                </Fragment>
            }

            {
                selectedDay > 0 && serviceSelected === 1 &&
                <Fragment>
                    <Divider className={classes.divider} />
                    <ActivitiesCustomer
                        selectActivitiesDay={selectActivitiesDay} 
                        isDisabled={activitiesCustomer.isDisable}
                        activities={activitiesCustomer.data}
                        activityOptions={selectedLocation[0].customerActivities}
                        service={1} // 1 = INSIDE , 2 = OUTSIDE
                    />
                </Fragment>
                
            }

            {
                selectedDay > 0 && serviceSelected === 1 &&
                <Fragment>
                    <Divider className={classes.divider} />
                    <ActivitiesBusiness 
                        selectActivitiesDay={selectActivitiesDay} 
                        isDisabled={activitiesBusiness.isDisable}
                        activities={activitiesBusiness.data}
                        activityOptions={selectedLocation[0].businessActivities}
                        service={1} // 1 = INSIDE , 2 = OUTSIDE
                    />
                </Fragment>
            }

            {/*  OUTSIDE FILTER */}

            {
                selectedDay > 0 && serviceSelected === 2 ? 
                <Fragment>
                    <Divider className={classes.divider} />
                    <CustomPeriod 
                        selectPeriodsDay={selectPeriodsDay} 
                        periodsDay={periodsDay} 
                        service={2}
                        customPeriosIsEnabled={customPeriosIsEnabled}
                        customPeriodEnabled={customPeriodEnabled}
                    />
                </Fragment> : null
            }

            {
                selectedDay > 0 && serviceSelected === 2 ? 
                <Fragment>
                    <Divider className={classes.divider} />
                    <ActivitiesOutside
                        selectActivitiesDay={selectActivitiesDay} 
                        isDisabled={false}
                        activities={activitiesOutside}
                        activityOptions={selectedLocation[0].outsideActivities}
                        service={2} // 1 = INSIDE , 2 = OUTSIDE
                    />
                </Fragment> : null
            }

        </Fragment>
    )
}

Filters.propTypes = {
    classes: PropTypes.object.isRequired,
    handleChangeSelecteDay: PropTypes.func.isRequired,
    selectPeriodsDay: PropTypes.func.isRequired,
    selectActivitiesDay: PropTypes.func.isRequired,
    isReturningCustomers: PropTypes.func.isRequired,
    selectedDay: PropTypes.number.isRequired,
    periodsDay: PropTypes.array.isRequired,
    serviceSelected: PropTypes.number.isRequired,
    returningCustomers: PropTypes.array.isRequired,
    selectedLocation: PropTypes.array.isRequired,
    activitiesBusiness: PropTypes.object.isRequired,
    activitiesCustomer: PropTypes.object.isRequired,
    activitiesOutside: PropTypes.array.isRequired,
    customPeriosIsEnabled: PropTypes.func.isRequired,
    customPeriodEnabled: PropTypes.bool.isRequired
};
  
export default withStyles(styles, { withTheme: true })(Filters);