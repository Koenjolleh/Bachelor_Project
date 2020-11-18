import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';


//Styles
import { styles } from './styles';

const RankingZones = (props) => {

    const { classes, zoneCategories } = props;

    return (
        <div id="target">
            <ul className={classes.main} id="list">
            {
                zoneCategories.map(z => { return (
                    <li key={z.zone_category_number} className={classes.mcblock} style={{ backgroundColor: `#${z.zone_category_color}` }}>
                        <span className={classes.hexval}>{z.zone_category_name}</span>
                    </li>
                ) })
            }
            </ul>
        </div>
    )
}

RankingZones.propTypes = {
    classes: PropTypes.object.isRequired,
    zoneCategories: PropTypes.array.isRequired
};


export default withStyles(styles, { withTheme: true })(RankingZones);