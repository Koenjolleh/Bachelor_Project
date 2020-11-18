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

class BarChartByActivities extends Component { 
    
    componentDidMount(){
        if(Object.keys(this.props.data).length > 0){
           this.createChart();
        }
    }

    componentDidUpdate(prevProps){    
        if(this.props.data !== prevProps.data){
            if(Object.keys(this.props.data).length > 0){
                this.createChart();
            }
        }
    }

    shouldComponentUpdate(nextProps, nextState){
        if(nextProps.data !== this.props.data){
            return true
        } else if(nextProps.errorInfo !== this.props.errorInfo){
            return true;
        }
        return false;
    }


    createChart = () => {
        let myChart = echarts.init(this.refs.chartEcharts);
        const { compareOption, categoryColors } = this.props;
        const { title, yAxis, legend, xAxis } = this.props.data;       

        const titleData = title;
        let yAxisData = [...yAxis];
        let xAxisData = [...xAxis];
        let id_dataset = yAxisData.map(d => { return d.id_dataset; });
        id_dataset = [...new Set(id_dataset)];
        let option = null;
        let series = [];
        let datasetDesc = yAxisData.map(de => { return de.dataset_desc; });
        datasetDesc = [...new Set(datasetDesc)];

        for(let j = 0; j < id_dataset.length; j++){     
            for(let i = 0; i < yAxisData[j].people.length; i++){
                series.push(
                    {
                    name: legend[i] !== null && legend[i],
                    type: 'bar',
                    stack: `categories${j}`,
                    label: config.serieLabel,
                    data: yAxisData[j].people.length > 0 && yAxisData[j].people[i],
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
                });
            }
        }

        let dataXaxisTop = [];
        for(let y = 0; y < xAxisData.length; y++){
            for(let z = 0; z < datasetDesc.length; z++){
                dataXaxisTop.push(datasetDesc[z] === undefined ? 'no data' : datasetDesc[z].substring(0, 3));
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
            tooltip : {
                show: true,
                trigger: 'axis',
                backgroundColor: bgColorTooltip,
                axisPointer: config.tooltipAxisPointer,
                formatter: function (params) {
                    let datasetDesc = yAxisData.map(de => { return de.dataset_desc === undefined ? 'no data' : de.dataset_desc; });
                    datasetDesc = [...new Set(datasetDesc)];
                    const arraParamsLeft = [...params];
                    const arraParamsRight = [...params];
                    let tooltipText = "";
                    if(compareOption){
                        const half_length = parseInt(params.length,10) / 2; 
                        const leftSide = arraParamsLeft.splice(0,half_length);
                        const rightSide = arraParamsRight.splice(half_length,params.length);
                        let text1 = "";
                        let text2 = "";
                        for (let i = 0; i < leftSide.length; i++) {
                            let value = '';
                            if(leftSide[i].data === undefined  || leftSide[i].data === null) {
                                value = 'N/A';
                            } else {
                                value = String(leftSide[i].data);
                            }
                            text1 += "<span style=\"color:" + leftSide[i].color + "\">\u25CF</span> " + leftSide[i].seriesName + ": " + value;
                            if (i !== (leftSide.length - 1)) {
                                text1 += "<br />";
                            }
                        }
                        
                        for (let j = 0; j < rightSide.length; j++) {
                            let value = '';
                            if(rightSide[j].data === undefined  || rightSide[j].data === null) {
                                value = 'N/A';
                            } else {
                                value = String(rightSide[j].data);
                            }
                            text2 += "<span style=\"color:" + rightSide[j].color + "\">\u25CF</span> " + rightSide[j].seriesName + ": " + value;
                            if (j !== (rightSide.length - 1)) {
                                text2 += "<br />";
                            }
                        }

                        tooltipText = `<span style="font-weight:bold">${params[0].name}</span>  <br /> <span style="font-weight:bold">${datasetDesc[0]}</span> <br /> ${text1} <br /> <span style="font-weight:bold">${datasetDesc[1]}</span> <br /> ${text2}`;

                    } else if(!compareOption){
                        let text = "";
                        for (let i = 0; i < params.length; i++) {
                            let value = '';
                            if(params[i].data === undefined  || params[i].data === null) {
                                value = 'N/A';
                            } else {
                                value = String(params[i].data);
                            }
                            text += "<span style=\"color:" + params[i].color + "\">\u25CF</span> " + params[i].seriesName + ": " + value;
                            if (i !== (params.length - 1)) {
                                text += "<br />";
                            }
                        }
                        tooltipText = `<span style="font-weight:bold">${params[0].name}</span> <br /> <span style="font-weight:bold">${datasetDesc[0]}</span> <br /> ${text}`;
                    }

                    return tooltipText;
                }
            },
            // axisPointer: {
            //     show: false,
            //     type: 'line',
            //     label: {
            //         formatter: function(params) {
            //             if(isNaN(params.value)) {
            //                 return params.value;
            //             }else {
            //                 return String(params.value);
            //             }
            //         }
            //     }
            // },
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
                data: xAxisData,
                axisTick: config.axisTick,
                axisLine: config.axisLine,
                silent: false,
                splitLine: {show: false},
                splitArea: {show: false},
                axisLabel : config.axisLabel
            },
            {
                type: 'category',
                data: dataXaxisTop,
                axisTick: config.axisTick,
                axisLine: {
                    onZero: false,
                    lineStyle: {
                        color: '#123F020'
                    }
                },
            }],
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

BarChartByActivities.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    errorInfo: PropTypes.object,
    compareOption: PropTypes.bool.isRequired,
    categoryColors: PropTypes.array.isRequired
};

export default withStyles(styles, { withTheme: true })(BarChartByActivities);