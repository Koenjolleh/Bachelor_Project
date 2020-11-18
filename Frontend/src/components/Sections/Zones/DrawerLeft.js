import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Scrollbars } from 'react-custom-scrollbars';

// Material UI
import Drawer from '@material-ui/core/Drawer';

//Components
import LeftContent from './LeftContent';
import DrawerHeaderLeft from './DrawerHeaderLeft';

//Styles
import { styles } from './styles';

const DrawerLeft = (props) => {

    const { classes, handleChangeSelecteDay, handleChangeSelecteTypeZone, selectedDay, selectedTypeZone,
            selectedLocation, selectDefaultDataset, compareIsActive, compareOption, zoneTypes, selectedDefaultDatasetZones,
            selectedDefaultDatasetCompareZones, selectDatasetCompareZones
    } = props;
    
    return (
        <Drawer
            variant="persistent"
            anchor="left"
            open={true}
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <DrawerHeaderLeft />
            
            <Scrollbars>
                <LeftContent 
                    handleChangeSelecteDay={handleChangeSelecteDay}
                    handleChangeSelecteTypeZone={handleChangeSelecteTypeZone}
                    selectedDay={selectedDay}
                    selectedTypeZone={selectedTypeZone}
                    zoneTypes={zoneTypes}
                    // CompareForm Props
                    selectedLocation={selectedLocation}
                    selectDefaultDataset={selectDefaultDataset}
                    compareIsActive={compareIsActive}
                    compareOption={compareOption}
                    selectedDefaultDatasetZones={selectedDefaultDatasetZones}
                    selectedDefaultDatasetCompareZones={selectedDefaultDatasetCompareZones}
                    selectDatasetCompareZones={selectDatasetCompareZones}
                />
            </Scrollbars>
        </Drawer>
    )
}

DrawerLeft.propTypes = {
    classes: PropTypes.object.isRequired,
    handleChangeSelecteDay: PropTypes.func.isRequired,
    handleChangeSelecteTypeZone: PropTypes.func.isRequired,
    selectedTypeZone: PropTypes.number.isRequired,
    zoneTypes: PropTypes.array.isRequired,    
    // Compare Form Props
    selectedLocation: PropTypes.array.isRequired,
    selectDefaultDataset: PropTypes.func.isRequired,
    compareIsActive: PropTypes.func.isRequired,
    compareOption: PropTypes.bool.isRequired,
    selectedDefaultDatasetZones: PropTypes.array.isRequired,
    selectedDefaultDatasetCompareZones: PropTypes.number.isRequired,
    selectDatasetCompareZones: PropTypes.func.isRequired
};


export default withStyles(styles, { withTheme: true })(DrawerLeft);