import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { SvgLoader, SvgProxy } from "react-svgmt";
import _range from 'lodash/range';

// Material UI
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import InfoIcon from '@material-ui/icons/Info';

// Components
import Spinner from '../../Commons/Spinner';

// Actions
import { getComparisonZonesData } from '../../../redux/actions/comparison_zones.action';

//Stiles
import { styles } from './styles';

class ComparisonContentZones extends Component {
    state = {
        numberOfZones: 0,
        zoneCategories: [],
        floorPlanLink: '',
        visualizeNow: false,
        lenForms: 2
    }
    
    componentDidMount(){
        const { idForm, selectedDay, selectedDefaultDataset, selectedTypeZones, selectedLocation } = this.props;
        const idLocation = selectedLocation[0].id_location;
        const numberOfZones = _range(1,selectedLocation[0].totalNumbersZones+1);
        const zoneCategories = selectedLocation[0].zoneCategories;
        const floorPlanLink = selectedLocation[0].floorPlanLink;
        this.setState({ numberOfZones, zoneCategories, floorPlanLink });
        
        this.props.getComparisonZonesData(idForm, idLocation, selectedDefaultDataset, selectedDay, selectedTypeZones);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.comparisonData !== this.props.comparisonData) {
            const lenForms = this.props.comparisonData.map(d => { return d.idForm; }).length;
            this.setState({ visualizeNow: true, lenForms });
        }
    }
   
    render(){
        const { classes, comparisonData, idForm } = this.props;
        const { numberOfZones, zoneCategories, floorPlanLink, visualizeNow, lenForms } = this.state;
        
        if(visualizeNow === false){
            return <Spinner />;
        }

        return (
            <div className={classNames(classes.chart, 
                {
                    [classes.chartMore]: lenForms > 2
                })}>
                {
                <Fragment>
                    {
                        comparisonData.filter(f => { return f.idForm === idForm; })[0].comparisonZoneData.map(d => {
                            return(
                                <Fragment >
                                    <div className={classes.zonesContainer}>
                                        <Fragment>
                                            <Typography variant="subtitle1" component="h2" className={classes.typographyZones}>
                                                {d.zone_type_name}
                                                <Tooltip title={d.zone_type_desc}>
                                                    <InfoIcon className={classes.iconInfoZones}/>
                                                </Tooltip>
                                            </Typography>
                                        </Fragment>

                                        <Fragment>
                                            <SvgLoader key={`${d.id_day}svg`} path={require(`../../../assets/${floorPlanLink}.svg`)} className={classes.svg}>
                                                {
                                                    d.zone_number.map((z, indexz) => {
                                                    return (
                                                        <Fragment>
                                                            <SvgProxy 
                                                                key={`${d.id_day}spzone`}
                                                                selector={`#zone_${z}`} 
                                                                fill={numberOfZones.includes(z) ? '#'+d.id_zone_category.filter((c, indexc) => { return indexc === indexz; }).map(d => { return zoneCategories.filter(f => { return f.zone_category_number === d; }).map(t => { return t.zone_category_color; })[0]})[0] : "rgb(255, 255, 255)"}
                                                            />
                                                            <SvgProxy 
                                                                key={`${d.id_day}sptxt`}
                                                                selector={`#txt_zone_${z}`} 
                                                                fill={numberOfZones.includes(z) ? "#FFFFFF" : "rgb(0, 0, 0)"}
                                                            />
                                                        </Fragment>
                                                    )
                                                    })
                                                }
                                            </SvgLoader>
                                        </Fragment>
                                    </div>
                                </Fragment>
                            )
                        })
                    }      
                </Fragment>
            }
            </div>
        );
    }
}

ComparisonContentZones.propTypes = {
    classes: PropTypes.object.isRequired,
    selectedLocation: PropTypes.array.isRequired,
    selectedDay: PropTypes.number.isRequired,
    errorInfo: PropTypes.object,
    idForm: PropTypes.number.isRequired,
    getComparisonZonesData: PropTypes.func.isRequired,
    comparisonData: PropTypes.array.isRequired,
};


function mapStateToProps({ comparison, app, error }) {
    return {
        selectedLocation: app.selectedLocation,
        comparisonData: comparison.comparisonData,
        errorInfo: error,
    }
}

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, { 
    getComparisonZonesData
})(ComparisonContentZones));