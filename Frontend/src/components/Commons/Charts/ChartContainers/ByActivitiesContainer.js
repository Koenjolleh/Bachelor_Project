import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// Material UI
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

//Components
import BarChartUnfiltered from '../BarChartUnfiltered';
import BarChartByActivities from '../BarChartByActivities';

//Styles
import { styles } from './styles';


const ByActivitiesContainer = (props) => {

    const { classes, selectedDay, errorInfo, compareOption, categoryColors,
            dataByDayByActivity, dataByTypeDaysByActivity, dataFullDaysByActivity  } = props;

    return(
        <Grid className={classes.gridContainer}>
            <Grid item sm={12}>
            {
                selectedDay > 0 && selectedDay < 8 &&
                    <Fragment>
                    {
                        <Paper className={classes.paperContentFull}>
                            <BarChartUnfiltered 
                                data={dataByDayByActivity} 
                                errorInfo={errorInfo}
                                categoryColors={categoryColors}
                            />
                        </Paper>
                    }
                    </Fragment>
            }
            {
                (selectedDay === 8 || selectedDay === 9) &&
                    <Fragment>
                    {
                        <Paper className={classes.paperContentFull}>
                            <BarChartByActivities 
                                data={dataByTypeDaysByActivity} 
                                errorInfo={errorInfo} 
                                compareOption={compareOption}
                                categoryColors={categoryColors}
                            />
                        </Paper>
                    }
                    </Fragment>
            }
            {
                selectedDay === 10 &&
                    <Fragment>
                    {
                        <Paper className={classes.paperContentFull}>
                            <BarChartByActivities 
                                data={dataFullDaysByActivity} 
                                errorInfo={errorInfo} 
                                compareOption={compareOption}
                                categoryColors={categoryColors}
                            />
                        </Paper>
                    }
                    </Fragment>
            }
            </Grid>
        </Grid>
    );
}

ByActivitiesContainer.propTypes = {
    classes: PropTypes.object.isRequired,
    selectedDay: PropTypes.number.isRequired,
    dataByDayByActivity: PropTypes.array.isRequired,
    dataByTypeDaysByActivity: PropTypes.object.isRequired,
    dataFullDaysByActivity: PropTypes.object.isRequired,
    errorInfo: PropTypes.object,
    compareOption: PropTypes.bool.isRequired,
    categoryColors: PropTypes.array.isRequired
};

export default withStyles(styles, { withTheme: true })(ByActivitiesContainer);