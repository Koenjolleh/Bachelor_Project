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


const ByPeriodsByActivitiesContainer = (props) => {    

    const { classes, selectedDay, errorInfo, compareOption, categoryColors,
            dataByDayByPeriodByActivity, dataByTypeDaysByPeriodByActivity, dataByFullDaysByPeriodByActivity  } = props;
        
    return(
        <Grid className={classes.gridContainer}>
            <Grid item sm={12}>
            {
                selectedDay > 0 && selectedDay < 8 &&
                    <Fragment>
                    {
                        <Paper className={classes.paperContentFull}>
                            <BarChartUnfiltered 
                                data={dataByDayByPeriodByActivity} 
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
                                data={dataByTypeDaysByPeriodByActivity} 
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
                                data={dataByFullDaysByPeriodByActivity} 
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

ByPeriodsByActivitiesContainer.propTypes = {
    classes: PropTypes.object.isRequired,
    selectedDay: PropTypes.number.isRequired,
    dataByDayByPeriodByActivity: PropTypes.array.isRequired,
    dataByTypeDaysByPeriodByActivity: PropTypes.object.isRequired,
    dataByFullDaysByPeriodByActivity: PropTypes.object.isRequired,
    errorInfo: PropTypes.object,
    compareOption: PropTypes.bool.isRequired,
    categoryColors: PropTypes.array.isRequired
};

export default withStyles(styles, { withTheme: true })(ByPeriodsByActivitiesContainer);