import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Error } from '@material-ui/icons';
import { Typography, Icon } from '@material-ui/core';
import echarts from 'echarts';

// Components
import Spinner from '../../Spinner';

//Styles
import { theme } from '../../../../theme';
import { styles } from './styles';

// Configuration
import { config } from '../Conf';

class BarChartByPeriodsByActivities extends Component { 
    
    componentDidMount(){
        const { id_dataset, data, compareOption, categoryColors } = this.props;
        if(Object.keys(data).length > 0 && id_dataset > 0){
            const { title, xAxis, yAxis, periods, activities } = data;
            let yAxisData = [...yAxis];
            let peopleData =  yAxisData.filter(d => { return d.id_dataset === id_dataset; }).map(p => { return p.people; })[0];
            if(peopleData !== undefined){
                this.createChart(title, xAxis, yAxis, periods, activities, id_dataset, compareOption, categoryColors);
            }
        }
    }

    componentDidUpdate(prevProps){
        const { id_dataset, data, compareOption, categoryColors } = this.props;
        if(data !== prevProps.data || id_dataset !== prevProps.id_dataset){
            if(Object.keys(data).length > 0 && id_dataset > 0){
                const { title, xAxis, yAxis, periods, activities } = data;
                let yAxisData = [...yAxis];
                let peopleData =  yAxisData.filter(d => { return d.id_dataset === id_dataset; }).map(p => { return p.people; })[0];
                if(peopleData !== undefined){
                    this.createChart(title, xAxis, yAxis, periods, activities, id_dataset, compareOption, categoryColors);
                }
            }
        }
    }

    // componentWillUnmount() {
    //     let myChart = echarts.init(this.refs.chartEcharts);
    //     myChart.clear();
    // }

    shouldComponentUpdate(nextProps, nextState){
        const { data, errorInfo, id_dataset } = this.props;
        if(nextProps.data !== data){
            return true
        } else if(nextProps.errorInfo !== errorInfo){
            return true;
        } else if(nextProps.id_dataset !== id_dataset){
            return true;
        }
        return false;
    }

    createChart = (title, xAxis, yAxis, periods, activities, id_dataset, compareOption, categoryColors) => {
        let myChart = echarts.init(this.refs.chartEcharts);        
        let xAxisData = [...xAxis];
        let yAxisData = [...yAxis];
        let legend = [...periods];
        const datasetDesc = yAxisData.filter(d => { return d.id_dataset === id_dataset; }).map(de => { return de.dataset_desc; });
        let peopleData =  yAxisData.filter(d => { return d.id_dataset === id_dataset; }).map(p => { return p.people; })[0];   
        const titleData = compareOption ? `${title} (${datasetDesc})` : title;    
        let option = null;
        let series = [];

        for(let i = 0; i < activities.length; i++){
            for(let j = 0; j < periods.length; j++){
                series.push(
                    {
                        name: periods[j],
                        type: 'bar',
                        stack: activities[i],
                        label: config.serieLabel,
                        itemStyle: {
                            normal: {
                                color:  `rgba(${categoryColors[j]}, 0.8)`,
                                shadowBlur: 200,
                                shadowColor: `rgba(${categoryColors[j]}, 0.6)`
                            },
                            // emphasis: {
                            //     color: `rgba(${categoryColors[j]}, 0.9)`,
                            //     shadowBlur: 200,
                            //     shadowColor: `rgba(${categoryColors[j]}, 0.6)`
                            // }
                        },
                        data: peopleData[i][j]
                    }
                )
            }
        }
        
        
        const bgColor = theme.palette.secondary.main;
        const bgColorTooltip = theme.palette.secondary.dark;
        
        option = {
            backgroundColor: bgColor,
            title: {
                text: titleData,
                left: 'center',
                top: config.top,
                textStyle: config.titleTextStyle
            },
            legend: {
                data: legend,
                textStyle: config.legendTextStyle,
                show: true,
                top: config.top,
                left: config.left
            },
            toolbox: config.toolbox,
            calculable: true,
            tooltip: {
                show: true,
                trigger: 'item',
                backgroundColor: bgColorTooltip,
                axisPointer: config.tooltipAxisPointer,
                formatter: (params) => {
                    const seriesIndex = params.seriesIndex;
                    const lenData = yAxisData.filter(d => { return d.id_dataset === id_dataset; })[0].people[0].length;
                    const lenActivities = activities.length;
                    let stackName = null;
                    let i = 0;
                    let j = 0;
                    let initValue = 0;
                    let endValue = 0;

                    /** Create the tooltip (cursor values) of the chart */
                    for(i = 0; i < lenActivities; i++){
                        initValue = lenData * [i]; 
                        endValue = lenData * [i] + lenData;
                        for(j = initValue; j < endValue; j++){
                            if(seriesIndex >=initValue && seriesIndex < endValue){
                                stackName = activities[i];
                            }
                        }
                    }

                    return '<span style="height:10px;width:10px;background-color:'+params.color+';border-radius: 50%;display: inline-block;"></span> ' +
                    '<br />' + params.name + '<br />' + params.seriesName + '<br /> ' + stackName + '<br /> ' + params.value;
                }
            },
            xAxis: {
                type: 'category',
                data: xAxisData,
                axisTick: config.axisTick,
                axisLine: config.axisLine,
                silent: false,
                splitLine: {show: false},
                splitArea: {show: false},
                axisLabel : config.axisLabel
            },
            yAxis: {
                axisTick: config.axisTick,
                axisLine: config.yAxisLine,
                inverse: false,
                splitArea: {show: false},
                type: 'value',
                axisLabel : config.axisLabel
            },
            // dataZoom: config.dataZoom,
            // grid: config.grid,
            series: series
        };

        if (option && typeof option === "object") {
            myChart.setOption(option, true);
            window.onresize = function() {
                myChart.resize();
            };
        }
    }

    render() {
        const { classes, data, errorInfo } = this.props;

        if(Object.keys(data).length === 0 && errorInfo.status === null){
            return (
                <Spinner size={80} />
            );
        } else if(errorInfo.status === 404 && Object.keys(data).length === 0){
            return (
                <Fragment>
                    <div className={classes.paperContainer}>
                        <div className={classes.paper}>
                            <Icon className={classes.iconContainer}>
                                <Error className={classes.icon} />
                            </Icon>
                        </div>
                    </div>
                    <Typography className={classes.typography}>{errorInfo.msg}</Typography>
                </Fragment>
            );
        }
        
        return(
            <div 
                id="chartEcharts" 
                ref="chartEcharts" 
                className={classes.contChart}
            >
            </div>
        )
    }  
}

BarChartByPeriodsByActivities.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    errorInfo: PropTypes.object,
    id_dataset: PropTypes.number.isRequired,
    compareOption: PropTypes.bool.isRequired,
    categoryColors: PropTypes.array.isRequired
};

export default withStyles(styles, { withTheme: true })(BarChartByPeriodsByActivities);