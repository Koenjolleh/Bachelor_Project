import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// Material UI
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

//Components
import BarChartCustomPeriod from '../BarChartCustomPeriod';

//Styles
import { styles } from './styles';


const ByPeriodsContainer = (props) => {

    const { classes, selectedDay, errorInfo, compareOption, categoryColors,
            dataByDayByPeriod, dataByTypeDaysByPeriod, dataFullDaysByPeriod } = props;

    return(
        <Grid className={classes.gridContainer}>
            <Grid item sm={12}>
            {
                selectedDay > 0 && selectedDay < 8 &&
                    <Fragment>
                    {
                        <Paper className={classes.paperContentFull}>
                            <BarChartCustomPeriod 
                                data={dataByDayByPeriod} 
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
                            <BarChartCustomPeriod 
                                data={dataByTypeDaysByPeriod} 
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
                            <BarChartCustomPeriod 
                                data={dataFullDaysByPeriod} 
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

ByPeriodsContainer.propTypes = {
    classes: PropTypes.object.isRequired,
    selectedDay: PropTypes.number.isRequired,
    dataByDayByPeriod: PropTypes.array.isRequired,
    dataByTypeDaysByPeriod: PropTypes.object.isRequired,
    dataFullDaysByPeriod: PropTypes.object.isRequired,
    errorInfo: PropTypes.object,
    compareOption: PropTypes.bool.isRequired,
    categoryColors: PropTypes.array.isRequired
};

export default withStyles(styles, { withTheme: true })(ByPeriodsContainer);