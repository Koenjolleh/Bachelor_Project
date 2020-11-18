import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// Material UI
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

//Components
import FiltersZone from './FiltersZone';
import CompareForm from './CompareForm';

//Styles
import { styles } from './styles';


const LeftContent = (props) => {

    const { classes, handleChangeSelecteDay, handleChangeSelecteTypeZone, selectedDay, selectedTypeZone,
        selectedLocation, selectDefaultDataset, compareIsActive, compareOption, zoneTypes, selectedDefaultDatasetZones,
        selectedDefaultDatasetCompareZones, selectDatasetCompareZones
    } = props;

    return (
        <Grid item sm={12} className={classes.grid}>
            <Paper className={classes.paperFilters}>
                <CompareForm 
                    selectedLocation={selectedLocation}
                    selectDefaultDataset={selectDefaultDataset}
                    compareIsActive={compareIsActive}
                    compareOption={compareOption}
                    selectedDefaultDatasetZones={selectedDefaultDatasetZones}
                    selectedDefaultDatasetCompareZones={selectedDefaultDatasetCompareZones}
                    selectDatasetCompareZones={selectDatasetCompareZones}
                />
                <FiltersZone 
                    handleChangeSelecteDay={handleChangeSelecteDay}
                    handleChangeSelecteTypeZone={handleChangeSelecteTypeZone}
                    selectedDay={selectedDay}
                    selectedTypeZone={selectedTypeZone}
                    checked={compareOption}
                    zoneTypes={zoneTypes}
                />
            </Paper>
        </Grid> 
    )
}

LeftContent.propTypes = {
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

export default withStyles(styles, { withTheme: true })(LeftContent);