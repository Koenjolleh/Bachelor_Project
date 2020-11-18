import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import echarts from 'echarts';

// Material UI
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import Error from '@material-ui/icons/Error';

// Components
import Spinner from '../../Spinner';

//Styles
import { theme } from '../../../../theme';
import { styles } from './styles';

// Configuration
import { config } from '../Conf';

class BarChartUnfilteredWeekByHours extends Component { 
    
    componentDidMount = () => {
        const { data } = this.props;
        if(data.length > 0){
            this.createChart();
        }
    }

    componentDidUpdate = (prevProps) => {
        const { data, id_dataset } = this.props;
        if(data !== prevProps.data || id_dataset !== prevProps.id_dataset){
            if(data.length > 0){
                this.createChart();
            }
        }
    }

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


    createChart = () => {
        const { data, id_dataset, categoryColors } = this.props;
        const idChart = `chart${id_dataset}`;
        let myChart = echarts.init(this.refs[idChart]);
        const DaysEveryHour = data.filter(d => { return d.id_dataset === id_dataset; }).map(d => { return d.xAxisTop; });
        let Days = [...new Set(DaysEveryHour)];
        let legend = data.filter(d => { return d.id_dataset === id_dataset; }).map(d => { return d.legend; });
        legend = [...new Set(legend)];
        const title = data[0].title;
        let xAxisTop = [];
        let xAxisBottom = data.filter(d => { return d.id_dataset === id_dataset; }).map(h => { return h.xAxisBottom; });
        let series = [];
        let option = null;      
        
        for(let m = 0; m < Days.length; m++){
            let lenDays = DaysEveryHour.filter(f => { return f === Days[m]; }).map(d => { return d.substring(0, 3) });
            for(let n = 0; n < lenDays.length; n++){
                if(n !== (Math.ceil(lenDays.length / 2)-1)){
                    lenDays[n] = "";
                }
                xAxisTop.push(lenDays[n]);
            }
        }

        
        series = { 
            name: legend,
            type: 'bar',
            data: data.filter(d => { return d.id_dataset === id_dataset; }).map( p => p.people ),
            itemStyle: {
                normal: {
                    color:  `rgba(${categoryColors}, 0.8)`,
                    shadowBlur: 200,
                    shadowColor: `rgba(${categoryColors}, 0.6)`
                },
                // emphasis: {
                //     color: `rgba(${categoryColors}, 0.9)`,
                //     shadowBlur: 200,
                //     shadowColor: `rgba(${categoryColors}, 0.6)`
                // }
            }
        };

        const bgColor = theme.palette.secondary.main;
        const lineColor = theme.palette.secondary.light;
        const bgColorTooltip = theme.palette.secondary.dark;

        option = {
            backgroundColor: bgColor,
            title: {
                text: title,
                left: 'center',
                top: config.top,
                textStyle: config.titleTextStyle
            },
            tooltip: {
                trigger: 'axis',
                backgroundColor: bgColorTooltip,
                axisPointer: config.tooltipAxisPointer,
                formatter: function(params){
                    return `<span style="color:${params[0].color}">\u25CF</span>  <span style="font-weight:bold">${params[0].name}</span> <br /> <span style="font-weight:bold">${params[0].seriesName}</span> <br /> ${params[0].value}`;
                }
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
            xAxis: [{
                    type: 'category',
                    axisTick: config.axisTick,
                    axisLine: config.axisLine,
                    data: xAxisBottom,
                    axisLabel : config.axisLabel
                },{
                    type: 'category',
                    boundaryGap:false,
                    axisLabel: {
                    interval: 0,
                    rotate:-90
                    },
                    axisLine: {
                        onZero: false,
                        lineStyle: {
                            color: lineColor
                        }
                    },
                    data: xAxisTop
                },
            ],
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
        const { classes, data, errorInfo, id_dataset } = this.props;
        const idChart = `chart${id_dataset}`;
        if(data.length === 0 && errorInfo.status === null){
            return (
                <Spinner size={80} />
            );
        } else if(errorInfo.status === 404 && data.length === 0){
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
        } else {
            return(
                <div 
                    id={idChart} 
                    ref={idChart} 
                    className={classes.contChart}
                >
                </div>
            )
        }
    }  
}

BarChartUnfilteredWeekByHours.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
    errorInfo: PropTypes.object,
    id_dataset: PropTypes.number.isRequired,
    categoryColors: PropTypes.string.isRequired
};

export default withStyles(styles, { withTheme: true })(BarChartUnfilteredWeekByHours);