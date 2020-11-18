import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// Material UI
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Cancel from '@material-ui/icons/Cancel';

// Component
import Map from '../Map';

// Styles
import { styles } from './styles';


const ModalBBB = (props) => {
    const { classes, mapShowStatus, setInitMap, initialMap, selectedLocation, handleShowMap } = props;
    
    return (
        <Fragment>
            <Button variant="contained" color="secondary" className={classes.button} onClick={handleShowMap}>
                Map
                {
                    mapShowStatus === false ? 
                        <Visibility className={classes.rightIcon} />
                        : 
                        <VisibilityOff className={classes.rightIcon} />
                }
            </Button> 
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={mapShowStatus}
                onClose={handleShowMap}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                    className: classes.backdrop
                }}
            >
                <Fade in={mapShowStatus}>
                <div className={classes.paper}>
                    <Cancel className={classes.icon} onClick={handleShowMap} />
                    <Map 
                        setInitMap={setInitMap}
                        initialMap={initialMap}
                        selectedLocation={selectedLocation[0].coordinates}
                    />
                </div>
                </Fade>
            </Modal>
        </Fragment>
    );
}

ModalBBB.propTypes = {
    classes: PropTypes.object.isRequired,
    mapShowStatus: PropTypes.bool,
    selectedLocation: PropTypes.array,
    setInitMap: PropTypes.func,
    initialMap: PropTypes.object,
    handleShowMap: PropTypes.func.isRequired
};

export default withStyles(styles, { withTheme: true })(ModalBBB);