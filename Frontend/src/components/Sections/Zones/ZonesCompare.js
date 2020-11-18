import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { SvgLoader, SvgProxy } from "react-svgmt";

// Material UI
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import InfoIcon from '@material-ui/icons/Info';


//Stiles
import { styles } from './styles';

const ZonesCompare = (props) => {
   
    const { classes, data, numberOfZones,  info, zoneCategories, floorPlanLink } = props;

    return (
        <Fragment>
            <Paper className={classes.paper}>
            {
                data.map(d => {
                    return(
                        <Fragment >
                            <Card key={d.id_day} className={classes.card}>
                                <Card className={classes.cardActionArea}>
                                    <Fragment>
                                        <Typography variant="subtitle1" component="h2" className={classes.typography}>
                                            {d.zone_type_name} ({d.dataset_desc})
                                            {
                                                info === true &&
                                                <Tooltip title={d.zone_type_desc}>
                                                    <InfoIcon className={classes.iconInfo}/>
                                                </Tooltip>
                                            }
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
                                </Card>
                            </Card>    
                        </Fragment>
                    )
                })
            }
            </Paper>            
        </Fragment>
    );
}

ZonesCompare.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  numberOfZones: PropTypes.array.isRequired,
  mainTitle: PropTypes.string.isRequired,
  polygonProp: PropTypes.string.isRequired,
  textProp: PropTypes.string.isRequired,
  tspanProp: PropTypes.object.isRequired,
  info: PropTypes.bool,
  zoneCategories: PropTypes.array.isRequired,
  floorPlanLink: PropTypes.string.isRequired
};

export default withStyles(styles, { withTheme: true })(ZonesCompare);