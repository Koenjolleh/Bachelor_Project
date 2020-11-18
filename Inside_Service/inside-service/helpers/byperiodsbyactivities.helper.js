const helperMultiplicator = require('./multiplicator_custom_period.helper');

/** Helpers Day By Periods & By Activities */
exports.JsonDayByPeriodsByActivities = async (dataDay, id_day, id_dataset, id_location, custom_period, dayByCustomPeriod, all_peopleData) => {
    try{
        let obj = {};
        let pre_people = [];
        let data = [];
        let people_custom_period = [];
        let multiplicator = undefined;
        const datasets = id_dataset.split(',').map(p => { return parseInt(p,10); }).sort((a, b) => a - b);
        const input_id_day = id_day;
        const input_periods = custom_period.split(',').map(p => { return parseInt(p,10); }).sort((a, b) => a - b);
        const input_id_activities = [...new Set(dataDay.map(a => { return a.id_activity; }))];
        const input_name_activities = [...new Set(dataDay.map(a => { return a.activity_name; }))];
        const start_period = input_periods[0];
        const end_period = input_periods[input_periods.length-1];  
        const title = `${dataDay[0].title} from ${start_period}:00 to ${end_period}:00`;
        let all_people = all_peopleData === undefined ? all_peopleData : all_peopleData.map(p => { return p.people })[0];


        for(let c = 0; c < datasets.length; c++){
            // Compare the activities in the data with the "all the activities [1,2,3,4,5]" and if it doesn't exist
            // Add "0"(zeros) as the values of people for that specific activity
            for(let j = 0; j < input_id_activities.length; j++){
                if(all_people === undefined){
                    people_custom_period = dayByCustomPeriod.filter(u => { return u.id_dataset === datasets[c]; }).map(p => { return p.people; })[0];
                    multiplicator = await helperMultiplicator.multiplicatorCustomPeriodByActivities(id_location, input_id_day, start_period, end_period, datasets[c], people_custom_period);
                    pre_people = dataDay.filter(u => { return u.id_dataset === datasets[c]; }).filter(d => { return d.id_activity === input_id_activities[j] }).map(p => { return p.people; })[0];
                    obj.people = pre_people === undefined ? 0 : Math.round(pre_people * multiplicator);
                } else if(all_people !== undefined){ 
                    pre_people = dataDay.filter(u => { return u.id_dataset === datasets[c]; }).filter(d => { return d.id_activity === input_id_activities[j] }).map(p => { return p.people; })[0];
                    multiplicator = await helperMultiplicator.multiplicatorCustomPeriodReturningCustomer(id_location, input_id_day, start_period, end_period, datasets[c], pre_people, all_people);
                    obj.people = pre_people === undefined ? 0 : Math.round(multiplicator);
                }
                obj.id_dataset = datasets[c];
                obj.legend = dataDay.filter(p => { return p.id_dataset === datasets[c]; }).map(a => { return a.dataset_desc; })[0];
                obj.id_day = input_id_day;
                obj.title = title;
                obj.id_activity = input_id_activities[j];
                obj.xAxis = input_name_activities[j];
                data.push(obj);
                obj = {}
            }
        }

        return data;
    } catch (e) {
		console.error(e);
	}
}


/*** More Categories Custom Periods & By Activities */
exports.JsonMoreCategoriesByPeriodsByActivities = async (dataDay, openinghours, id_dataset, id_location, custom_period, dayByCustomPeriod, all_peopleData) => {
    try{
        let obj = {};
        let pre_output = [];
        let pre_people = [];
        let output = [];
        let data = [];
        let people_result = [];
        let dataset_desc = [];
        let yAxis = [];
        let multiplicator = undefined;
        let input_id_activities = [];
        let input_name_activities = [];
        let people_custom_period = [];
        const datasets = id_dataset.split(',').map(p => { return parseInt(p,10); }).sort((a, b) => a - b);
        const input_id_days = openinghours.map(d => { return d.id_day; });
        const input_name_days = openinghours.map(d => { return d.day_name; });
        const input_periods = custom_period.split(',').map(p => { return parseInt(p,10); }).sort((a, b) => a - b);
        const start_period = input_periods[0];
        const end_period = input_periods[input_periods.length-1];
        const title = `${dataDay[0].title} from ${start_period}:00 to ${end_period}:00`;
        let all_people = all_peopleData === undefined ? all_peopleData : all_peopleData.map(p => { return p.people });


        for(let c = 0; c < datasets.length; c++){
            input_id_activities = [...new Set(dataDay.filter(u => { return u.id_dataset === datasets[c]; }).map(i => { return i.id_activity; }))];
            input_name_activities = [...new Set(dataDay.filter(u => { return u.id_dataset === datasets[c]; }).map(i => { return i.activity_name; }))];
            for(let i = 0; i < input_id_days.length; i++){
                // Compare the activities in the data with the "all the activities [1,2,3,4,5]" and if it doesn't exist
                // Add "0"(zeros) as the values of people for that specific activity
                for(let j = 0; j < input_id_activities.length; j++){
                    obj.id_dataset = datasets[c];
                    obj.id_day = input_id_days[i];
                    obj.day = input_name_days[i]
                    obj.id_activity = input_id_activities[j];
                    obj.name_activity = input_name_activities[j]
                    if(all_people === undefined){
                        people_custom_period = dayByCustomPeriod.filter(u => { return u.id_dataset === datasets[c]; }).filter(d => { return d.id_day === input_id_days[i]}).map(p => { return p.people; })[0];
                        multiplicator = await helperMultiplicator.multiplicatorCustomPeriodByActivities(id_location, input_id_days[i], start_period, end_period, datasets[c], people_custom_period);
                        pre_people = dataDay.filter(u => { return u.id_dataset === datasets[c]; }).filter(d => { return d.id_day === input_id_days[i]}).filter(d => { return d.id_activity === input_id_activities[j] }).map(p => { return p.people; })[0];
                        obj.people = pre_people === undefined ? 0 : Math.round(pre_people * multiplicator);
                    } else if(all_people !== undefined){ 
                        pre_people = dataDay.filter(u => { return u.id_dataset === datasets[c]; }).filter(d => { return d.id_day === input_id_days[i]}).filter(d => { return d.id_activity === input_id_activities[j] }).map(p => { return p.people; })[0];
                        multiplicator = await helperMultiplicator.multiplicatorCustomPeriodReturningCustomer(id_location, input_id_days[i], start_period, end_period, datasets[c], pre_people, all_people[i]);
                        obj.people = pre_people === undefined ? 0 : Math.round(multiplicator);
                    }
                    pre_output.push(obj);
                    obj = {};
                }

                output[i] = pre_output;
                pre_output = [];
            }

            for(let y = 0; y < input_id_activities.length; y++){
                people_result.push(output.map(a => a.filter(v => v.id_activity === input_id_activities[y]).map(m => { return m.people; })[0]));
            }

            dataset_desc = dataDay.filter(p => { return p.id_dataset === datasets[c]; }).map(a => { return a.dataset_desc; })[0];
            yAxis[c] = { id_dataset: datasets[c], dataset_desc: dataset_desc, people: people_result.filter(p => { return p.length > 0; }) };
            people_result = [];
        }

        data = { title, xAxis: input_name_days, legend: input_name_activities, yAxis };   
        return data;
    } catch (e) {
        console.error(e);
    }
}