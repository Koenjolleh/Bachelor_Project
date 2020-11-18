export const styles = (theme) => ({
    root: {
        boxShadow: theme.shadows[5],
        margin: 10,
        padding: 10,
        backgroundColor: theme.palette.secondary.main,
    },
    appBar:{
        position: 'fixed'
    },
    formControl: {
        width: '100%'
    },
    select: {
    },
    step1Container: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: 10
    },
    step2Container: {
        display: 'grid',
        justifyContent: 'start',
        margin: 10
    },
    step3Container: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: 10,
        position: 'relative'
    },
    step3ContainerInside: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: 10,
        position: 'relative',
        width: '40%'
    },

    step4Container: {
        display: 'block',
        margin: 10
    },
    step5Container: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: 10,
        position: 'relative'
    },
    // Returning customer
    formRow: {
        margin: 0
    },
    checkBox: {
        padding: 5,
        marginRight: 5,
        fontSize: '0.8rem'
    },
    /// DESCRIPTION ACTIVITIES
    iconInfo: {
        position: 'absolute',
        right: '5%',
        color: theme.palette.secondary.light+ ' !important',
        opacity: 0.2
    },

    // Custom Period
    typography: {
        textAlign: 'left',
        width: '100%',
        paddingLeft: 12,
        paddingTop: 6,
        color: theme.palette.secondary.light
    },
    button: {
    },
    formConfirmed: {
        pointerEvents: "none", 
        opacity: "0.7",
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-start'
    },
    formEditabled: {
        pointerEvents: "visible", 
        opacity: "1",
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-start'
    },
    activitiesContainerDisabled: {
        pointerEvents: "none", 
        opacity: "0.7",
    },
    activitiesContainerVisible: {
        pointerEvents: "visible", 
        opacity: "1"
    },

    // datasetsForm
    containerDatasetsForm: {
        width: '100%',
        padding: '5px 0'
    },
    paperDatasetsForm: {
        width: '100%',
        height: '100%',
        display: 'block',
        backgroundColor: theme.palette.secondary.main,
        boxShadow: 'none'
    },
    containerCheckBoxDatasetsForm: {
        width: 0
    },
    checkBoxDatasetsForm: {
        padding: 5,
        marginRight: 5,
        fontSize: '0.8rem',
        borderBottom: 'none'
    },
    visualizationContainer: {
        width: '100%',
        height: 'calc(100% - 58px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'auto'
    },
    chartsContainer: {
        width: '100%',
        height: 'calc(100% - 58px)',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        boxShadow: 'none',
        position: 'relative',
        backgroundColor: theme.palette.secondary.dark
    },
    chart: {
        maxWidth: '48%',
        width: '48%',
        height: '100%',
        maxHeight: '100%',
        marginTop: 10,
        marginBottom: 10,
        boxSizing: 'border-box'
    },
    chartMore: {
        maxWidth: '48%',
        width: '48%',
        height: '50%',
        maxHeight: '50%',
        marginTop: 10,
        marginBottom: 10,
        boxSizing: 'border-box'
    },
    
    // comparison Zones
    zonesContainer: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row-reverse'
    },
    iconInfoZones: {
        color: theme.palette.secondary.light+ ' !important',
        opacity: 0.2,
        verticalAlign: 'middle',
        marginLeft: 4
    },
    svg:{
        height: 'auto',
        position: 'relative'
    },
    typographyZones: {
        color: theme.palette.secondary.light
    },
    buttonAddNewForm: {
        marginTop: '0%'
    },
    buttonVisualize: {
        marginTop: 2
    },
    buttonBack: {
        marginTop: '0%'
    }
});