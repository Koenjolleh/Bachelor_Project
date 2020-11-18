import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// Material UI
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import { Error } from '@material-ui/icons';

// Components
import Zones from './Zones';
import ZonesCompare from './ZonesCompare';
import Spinner from '../../Commons/Spinner';
import CenterPanel from '../../Commons/CenterPanel';
import RankingZones from './RankingZones';

//Stiles
import { styles } from './styles';

const ZonesContainer = (props) => {
   
    const { classes, data, numberOfZones, checked, zoneCategories, errorInfo, selectedDefaultDatasetZones, selectedTypeZones, floorPlanLink 
    } = props;


    if(data.length === 0 && errorInfo.status === null){
        return (
            <CenterPanel>
                <Spinner size={80} />
            </CenterPanel>
        );
    } else if(errorInfo.status === 404 && data.length === 0){
        return (
            <Fragment>
                <CenterPanel>
                    <div className={classes.paperContainerError}>
                        <div className={classes.paperError}>
                            <Icon className={classes.iconContainerError}>
                                <Error className={classes.iconError} />
                            </Icon>
                        </div>
                    </div>
                    <Typography className={classes.typographyError}>{errorInfo.msg}</Typography>
                </CenterPanel>
            </Fragment>
        );
    }
    return (
        <Fragment>
        {
            checked === false && [...new Set(data.map(d => { return d.id_dataset; }))].length === 1 &&
            <Fragment>
                <Typography variant="h4" component="h2" className={classes.typographyOneDataset}>
                    {data[0].day_name}
                </Typography>
                <div className={classes.container}>
                    <Zones 
                        data={data}
                        numberOfZones={numberOfZones}
                        zoneCategories={zoneCategories}
                        info={true}
                        floorPlanLink={floorPlanLink}
                    />
                </div>
                <RankingZones zoneCategories={zoneCategories} />
            </Fragment>
        }

        {
            checked === true && [...new Set(data.map(d => { return d.id_dataset; }))].length === 2 &&
            <Fragment>
                <Typography variant="h4" component="h2" className={classes.typographyOneDataset}>
                    {data[0].day_name}
                </Typography>
                <div className={classes.container}>
                    <ZonesCompare 
                        data={data.filter(f => { return f.id_dataset === selectedDefaultDatasetZones[0]; }).filter(t => { return t.id_zone_type === selectedTypeZones; })}
                        numberOfZones={numberOfZones}
                        zoneCategories={zoneCategories}
                        info={true}
                        floorPlanLink={floorPlanLink}
                    />
                    <ZonesCompare 
                        data={data.filter(f => { return f.id_dataset === selectedDefaultDatasetZones[1]; }).filter(t => { return t.id_zone_type === selectedTypeZones; })}
                        numberOfZones={numberOfZones}
                        zoneCategories={zoneCategories}
                        info={true}
                        floorPlanLink={floorPlanLink}
                    />
                </div>
                <RankingZones zoneCategories={zoneCategories} />
            </Fragment>
        }
        </Fragment>
    );
}

ZonesContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  numberOfZones: PropTypes.array.isRequired,
  checked: PropTypes.bool.isRequired,
  zoneCategories: PropTypes.array.isRequired,
  errorInfo: PropTypes.object,
  selectedDefaultDatasetZones: PropTypes.array.isRequired,
  selectedTypeZones: PropTypes.number.isRequired,
  floorPlanLink: PropTypes.string.isRequired
};

export default withStyles(styles, { withTheme: true })(ZonesContainer);