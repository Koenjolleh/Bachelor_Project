import { theme } from '../../../../theme';

const textColor = theme.palette.secondary.light;
const lineColor = theme.palette.secondary.light;
const fontSizeTitle = theme.typography.subtitle1.fontSize;
const fontSizeLegend = theme.typography.subtitle2.fontSize;
const fontSizeAxisLabel = theme.typography.h4.fontSize;

export const config = {
    top: 10,
    left: 10,
    right: 10,
    bottom: 10,
    serieLabel: {
        normal: {
            show: true,
            position: 'insideRight'
        }
    },
    titleTextStyle: {
        color: textColor,
        fontSize: fontSizeTitle
    },
    tooltipAxisPointer: {  
        type : 'shadow',
        label: {
            show: true
        }
    },
    legendTextStyle: {
        color: textColor,
        fontSize: fontSizeLegend
    },
    toolbox: {
        show: true,
        right: 10,
        top: 10,
        // orient: 'vertical',
        feature: {
            magicType: {
                show: true,
                title: {
                    line: 'Line',
                    bar: 'Bar'
                },
                type: ['line', 'bar']
            },
            restore: {
                show: true,
                title: "Restore"
            },
            saveAsImage: {
                show: true,
                title: "Save Image"
            },
            // dataZoom: {
            //     title: {
            //         zoom: "zoom by rectangle",
            //         back: "undo zooming"
            //     }
            // }
            // dataView: {
            //     show: true,
            //     title: "Table"
            // }
        }
    },
    dataZoom: [{
        type: 'inside',
        xAxisIndex: [0],
        moveOnMouseMove: true,
    },
    {
        type: 'inside',
        yAxisIndex: [0],
        moveOnMouseMove: true,
    }],
    grid: {
        left: 20,
        // right: 5,
        bottom: 20,
        containLabel: true,
        show: true,
        // backgroundColor: "#fff",
        width: "90%",
        height: "90%",
        borderColor: "transparent"
    },
    axisTick: {
        alignWithLabel: true
    },
    axisLine: {
        onZero: true,
        lineStyle: {
            color: lineColor
        }
    },
    axisLineTop: {
        onZero: false,
        lineStyle: {
            color: lineColor
        }
    },
    yAxisLine: {
        onZero: false,
        lineStyle: {
            color: lineColor
        }
    },
    axisLabel : {
        show:true,
        interval: 'auto',    // {number}
        //rotate: 45,
        margin: 8,
        //formatter: '{value}月',
        textStyle: {
            color: textColor,
            fontFamily: 'sans-serif',
            fontSize: fontSizeAxisLabel,
            //fontStyle: 'italic',
            fontWeight: 'bold'
        }
    }
};