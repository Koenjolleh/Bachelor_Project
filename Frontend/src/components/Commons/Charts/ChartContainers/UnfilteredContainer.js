import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// Material UI
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

//Components
import BarChartUnfiltered from '../BarChartUnfiltered';
import BarChartUnfilteredWeekByHours from '../BarChartUnfilteredWeekByHours';

//Styles
import { styles } from './styles';


class UnfilteredContainer extends Component { 
    state = {
        id_dataset: 0
    }

    componentDidMount(){
        const { dataAllWeekByHours } = this.props;
        let id_dataset = [];
        if(dataAllWeekByHours.length > 0){
            id_dataset = dataAllWeekByHours.map(d => { return d.id_dataset; });
            id_dataset = [...new Set(id_dataset)];
            this.setState({ id_dataset });
        }
    }
    
    componentDidUpdate(prevProps, prevState){
        const { dataAllWeekByHours } = this.props;
        let id_dataset = [];
        if(dataAllWeekByHours !== prevProps.dataAllWeekByHours){
            if(dataAllWeekByHours.length > 0){
                id_dataset = dataAllWeekByHours.map(d => { return d.id_dataset; });
                id_dataset = [...new Set(id_dataset)];
                this.setState({ id_dataset });
            }
        }
    }

    shouldComponentUpdate(nextProps, nextState){
        const { dataAllWeekByHours, dataByDay, dataByTypeDays, dataFullDays, errorInfo } = this.props;
        const { id_dataset } = this.state;
        if(nextProps.dataAllWeekByHours !== dataAllWeekByHours || nextState.id_dataset !== id_dataset){
            return true
        } else if(nextProps.dataByDay !== dataByDay){
            return true;
        } else if(nextProps.dataByTypeDays !== dataByTypeDays){
            return true;
        } else if(nextProps.dataFullDays !== dataFullDays){
            return true;
        } else if(nextProps.errorInfo !== errorInfo){
            return true;
        }
        return false;
    }

    render() {

        const { classes, selectedDay, errorInfo, categoryColors,
                dataAllWeekByHours, dataByDay, dataByTypeDays, dataFullDays } = this.props;
        const { id_dataset } = this.state;        
        
        return(
            <Grid className={classes.gridContainer}>
                <Grid item sm={12}>
                {
                    selectedDay > 0 && selectedDay < 8 &&
                        <Fragment>
                        {
                            <Paper className={classes.paperContentFull}>
                                <BarChartUnfiltered 
                                    data={dataByDay} 
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
                                <BarChartUnfiltered 
                                    data={dataByTypeDays} 
                                    errorInfo={errorInfo}
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
                                <BarChartUnfiltered 
                                    data={dataFullDays} 
                                    errorInfo={errorInfo} 
                                    categoryColors={categoryColors}
                                />
                            </Paper>
                        }
                        </Fragment>
                }
                {
                    selectedDay === 0 &&
                        <Fragment>
                        {
                            dataAllWeekByHours.length > 0 &&
                                <Fragment>
                                {
                                    id_dataset.length === 1 &&
                                                <Paper className={classes.paperContentFull}>
                                                    <BarChartUnfilteredWeekByHours 
                                                        data={dataAllWeekByHours} 
                                                        errorInfo={errorInfo} 
                                                        id_dataset={id_dataset[0]}
                                                        categoryColors={categoryColors[0]}
                                                    />
                                                </Paper>
                                }

                                {
                                    id_dataset.length === 2 &&
                                            <Fragment>
                                                <Paper className={classes.paperContent}>
                                                    <BarChartUnfilteredWeekByHours 
                                                        data={dataAllWeekByHours} 
                                                        errorInfo={errorInfo} 
                                                        id_dataset={id_dataset[0]} 
                                                        categoryColors={categoryColors[0]}
                                                    />
                                                </Paper>
                                                <Paper className={classes.paperContent}>
                                                    <BarChartUnfilteredWeekByHours 
                                                        data={dataAllWeekByHours} 
                                                        errorInfo={errorInfo} 
                                                        id_dataset={id_dataset[1]} 
                                                        categoryColors={categoryColors[1]}
                                                    />
                                                </Paper>
                                            </Fragment>
                                }
                                </Fragment>
                        }
                        </Fragment>
                }
                </Grid>
            </Grid>
        );
    }
}

UnfilteredContainer.propTypes = {
    classes: PropTypes.object.isRequired,
    selectedDay: PropTypes.number.isRequired,
    dataByDay: PropTypes.array.isRequired,
    dataByTypeDays: PropTypes.array.isRequired,
    dataFullDays: PropTypes.array.isRequired,
    dataAllWeekByHours: PropTypes.array.isRequired,
    errorInfo: PropTypes.object,
    categoryColors: PropTypes.array.isRequired
};

export default withStyles(styles, { withTheme: true })(UnfilteredContainer);