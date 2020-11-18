import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

//Components
import ModalBBB from '../Modal';

//Styles
import { styles } from './styles';

const DrawerHeaderLeft = (props) => {

    const { classes, handleShowMap, mapShowStatus, serviceSelected, setInitMap, initialMap, selectedLocation } = props;
    return (
        <div className={classes.drawerHeader}>
        {
            serviceSelected === 2 ?
                <ModalBBB 
                    setInitMap={setInitMap}
                    initialMap={initialMap}
                    selectedLocation={selectedLocation}
                    mapShowStatus={mapShowStatus} 
                    handleShowMap={handleShowMap}
                /> : null
        }
        </div>
    )
}

DrawerHeaderLeft.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    serviceSelected: PropTypes.number.isRequired,
    handleShowMap: PropTypes.func.isRequired,
    mapShowStatus: PropTypes.bool,
    setInitMap: PropTypes.func,
    initialMap: PropTypes.object,
    selectedLocation: PropTypes.array.isRequired
};

export default withStyles(styles, { withTheme: true })(DrawerHeaderLeft);