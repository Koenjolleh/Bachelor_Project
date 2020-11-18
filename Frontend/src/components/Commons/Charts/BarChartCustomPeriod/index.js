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

class BarChartCustomPeriod extends Component { 
    
    componentDidMount = () => {
        const { data } = this.props;
        if(data.length > 0){
            this.createChart();
        }
    }

    componentDidUpdate = (prevProps) => {
        const { data } = this.props;
        if(data !== prevProps.data){
            if(this.props.data.length > 0){
                this.createChart();
            }
        }
    }

    shouldComponentUpdate(nextProps, nextState){
        const { data, errorInfo } = this.props;
        if(nextProps.data !== data){
            return true
        } else if(nextProps.errorInfo !== errorInfo){
            return true;
        }
        return false;
    }

    // componentWillUnmount() {
    //     let myChart = echarts.init(this.refs.chartEcharts);
    //     myChart.clear();
    // }

    createChart = () => {
        const { data, categoryColors } = this.props;
        let myChart = echarts.init(this.refs.chartEcharts);
        let legend = data.map(d => { return d.legend; });
        legend = [...new Set(legend)];
        const title = data[0].title;
        let xAxis = data.map( h => { return h.xAxis; } );
        xAxis = [...new Set(xAxis)];
        let id_dataset = data.map(d => { return d.id_dataset; });
        id_dataset = [...new Set(id_dataset)];
        let series = [];
        let option = null;

        for(let i=0; i < id_dataset.length; i++){
            series[i] = { 
                name: legend[i],
                type: 'bar',
                label: config.serieLabel,
                data: data.filter(d => { return d.id_dataset === id_dataset[i]; }).map( p => p.people ),
                itemStyle: {
                    normal: {
                        color:  `rgba(${categoryColors[i]}, 0.8)`,
                        shadowBlur: 200,
                        shadowColor: `rgba(${categoryColors[i]}, 0.6)`
                    },
                    // emphasis: {
                    //     color: '#00E5FF',
                    //     shadowBlur: 200,
                    //     shadowColor: `rgba(${categoryColors[i]}, 0.6)`
                    // }
                }
            };
        }

        const bgColor = theme.palette.secondary.main;
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
                // formatter: function(params){
                //     return `<span style="color:${params[0].color}">\u25CF</span>  <span style="font-weight:bold">${params[0].name}</span> <br /> <span style="font-weight:bold">${params[0].seriesName}</span> <br /> ${params[0].value}`;
                // }
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
            xAxis: {
                type: 'category',
                data: xAxis,
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
                axisLabel: config.axisLabel
            },
            // dataZoom: config.dataZoom,
            // grid: config.grid,
            series: series
        }

        if (option && typeof option === "object") {
            myChart.setOption(option, true);
            window.onresize = function() {
                myChart.resize();
            };
        }
    }

    render() {
        const { classes, data, errorInfo } = this.props;

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
                    id="chartEcharts" 
                    ref="chartEcharts" 
                    className={classes.contChart}
                >
                </div>
            )
        }
    }  
}

BarChartCustomPeriod.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
    errorInfo: PropTypes.object,
    categoryColors: PropTypes.array.isRequired
};

export default withStyles(styles, { withTheme: true })(BarChartCustomPeriod);