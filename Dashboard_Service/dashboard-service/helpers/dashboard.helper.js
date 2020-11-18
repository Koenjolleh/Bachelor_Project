/** Dashboard */
exports.JsonDashboardOverview = (locations, dashboard) => {

    return locations.map(d => {
        return {
            id_location: d.id_location,
            id_user: d.id_user,
            address: d.address,
            street_activity: dashboard.filter(obj => { return obj.id_location === d.id_location && obj.id_topic === 1;})
                .map( obj => { return {value: obj.value, comparison: obj.comparison}}),
            store_activity: dashboard.filter(obj => { return obj.id_location === d.id_location && obj.id_topic === 2;})
                .map( obj => { return {value: obj.value, comparison: obj.comparison}}),
            street_engagement: dashboard.filter(obj => { return obj.id_location === d.id_location && obj.id_topic === 3;})
                .map( obj => { return {value: obj.value, comparison: obj.comparison}}),
            store_engagement: dashboard.filter(obj => { return obj.id_location === d.id_location && obj.id_topic === 4;})
                .map( obj => { return {value: obj.value, comparison: obj.comparison}}),
            returning_customers: dashboard.filter(obj => { return obj.id_location === d.id_location && obj.id_topic === 5;})
                .map( obj => { return {value: obj.value, comparison: obj.comparison}}),
            take_away_customers: dashboard.filter(obj => { return obj.id_location === d.id_location && obj.id_topic === 6;})
                .map( obj => { return {value: obj.value, comparison: obj.comparison}}),
            sit_down_customers: dashboard.filter(obj => { return obj.id_location === d.id_location && obj.id_topic === 7;})
                .map( obj => { return {value: obj.value, comparison: obj.comparison}})
        };
    });
}

exports.JsonSpecificDashboardOverview = (dashboard) => {

    let combinedDashboard = [''];

    return combinedDashboard.map(d => {
        return {
            street_activity: dashboard.filter(obj => { return obj.id_topic === 1;})
                .map( obj => { return {value: obj.value, comparison: obj.comparison}}),
            store_activity: dashboard.filter(obj => { return obj.id_topic === 2;})
                .map( obj => { return {value: obj.value, comparison: obj.comparison}}),
            street_engagement: dashboard.filter(obj => { return obj.id_topic === 3;})
                .map( obj => { return {value: obj.value, comparison: obj.comparison}}),
            store_engagement: dashboard.filter(obj => { return obj.id_topic === 4;})
                .map( obj => { return {value: obj.value, comparison: obj.comparison}}),
            returning_customers: dashboard.filter(obj => { return obj.id_topic === 5;})
                .map( obj => { return {value: obj.value, comparison: obj.comparison}}),
            take_away_customers: dashboard.filter(obj => { return obj.id_topic === 6;})
                .map( obj => { return {value: obj.value, comparison: obj.comparison}}),
            sit_down_customers: dashboard.filter(obj => { return obj.id_topic === 7;})
                .map( obj => { return {value: obj.value, comparison: obj.comparison}}),
        };
    });
}