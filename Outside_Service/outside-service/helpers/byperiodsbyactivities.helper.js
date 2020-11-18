const helperMultiplicator = require('./multiplicators.helper');

/** Helpers Day By Periods & By Activities */
exports.JsonDayByPeriodsByActivities = async (dataDay, id_day, id_dataset, id_location, id_service, custom_period) => {
    try{
        let obj = {};
        let pre_people = [];
        let pre_output = [];
        let data = [];
        let multiplicator = undefined;
        const datasets = id_dataset.split(',').map(p => { return parseInt(p,10); }).sort((a, b) => a - b);
        const input_id_day = id_day;
        const input_periods = custom_period.split(',').map(p => { return parseInt(p,10); }).sort((a, b) => a - b);
        const start_period = Math.min(...input_periods);
        const end_period = Math.max(...input_periods);
        const title = `${dataDay[0].title} from ${start_period}:00 to ${end_period}:00`;
        const input_id_activities = [...new Set(dataDay.map(a => { return a.id_activity; }))];
        const input_name_activities = [...new Set(dataDay.map(a => { return a.activity_name; }))];


        for(let c = 0; c < datasets.length; c++){
            // Compare the activities in the data with the "all the activities [1,2,3,4,5]" and if it doesn't exist
            // Add "0"(zeros) as the values of people for that specific activity
            multiplicator = await helperMultiplicator.multiplicatorUnfilteredDays(id_location, id_day, id_service, datasets[c]);
            for(let j = 0; j < input_id_activities.length; j++){
                obj.id_dataset = datasets[c];
                obj.dataset_desc = dataDay.filter(p => { return p.id_dataset === datasets[c]; }).map(a => { return a.dataset_desc; })[0];
                obj.id_day = input_id_day;
                obj.title = title;
                obj.id_activity = input_id_activities[j];
                obj.name_activity = input_name_activities[j];
                pre_people = dataDay.filter(u => { return u.id_dataset === datasets[c]; }).filter(d => { return d.id_activity === input_id_activities[j]; }).map(p => { return p.people; })[0];
                obj.people = pre_people === undefined ? 0 : Math.round(pre_people * multiplicator);
                pre_output.push(obj);
                obj = {}
            }
        }

        for(let x = 0; x < datasets.length; x++){
            for(let m = 0; m < input_id_activities.length; m++){
                let people_sum = pre_output.filter(f => { return f.id_dataset === datasets[x]; }).filter(d => { return d.id_activity === input_id_activities[m]; }).map(p => { return p.people; }).reduce((a,b) => a + b, 0);
                let dataset_desc_sum = pre_output.filter(f => { return f.id_dataset === datasets[x]; }).filter(d => { return d.id_activity === input_id_activities[m]; }).map(d => { return d.dataset_desc; });
                let title_sum = pre_output.filter(f => { return f.id_dataset === datasets[x]; }).filter(d => { return d.id_activity === input_id_activities[m]; }).map(d => { return d.title; });
                let id_activity_sum = pre_output.filter(f => { return f.id_dataset === datasets[x]; }).filter(d => { return d.id_activity === input_id_activities[m]; }).map(d => { return d.id_activity; });
                let activity_name_sum = pre_output.filter(f => { return f.id_dataset === datasets[x]; }).filter(d => { return d.id_activity === input_id_activities[m]; }).map(d => { return d.name_activity; });
                let data_sum = { id_dataset: datasets[x], legend: [...new Set(dataset_desc_sum)][0], title: [...new Set(title_sum)][0], id_activity: [...new Set(id_activity_sum)][0], xAxis: [...new Set(activity_name_sum)][0], people: people_sum };
                data.push(data_sum);
            }
        }

        return data;
    } catch (e) {
		console.error(e);
	}
}


/*** More Categories By Periods & By Activities */
exports.JsonMoreCategoriesByPeriodsByActivities = async (dataDay, Days, id_dataset, id_location, id_service, custom_period) => {
    try{
        let obj = {};
        let pre_people = [];
        let pre_output = [];
        let output = [];
        let people_result = [];
        let dataset_desc = [];
        let yAxis = [];
        let data = [];
        let multiplicator = undefined;
        const datasets = id_dataset.split(',').map(p => { return parseInt(p,10); }).sort((a, b) => a - b);
        const input_periods = custom_period.split(',').map(p => { return parseInt(p,10); }).sort((a, b) => a - b);
        const start_period = Math.min(...input_periods);
        const end_period = Math.max(...input_periods);
        const title = `${dataDay[0].title} from ${start_period}:00 to ${end_period}:00`;
        const input_id_activities = [...new Set(dataDay.map(a => { return a.id_activity; }))];
        const input_name_activities = [...new Set(dataDay.map(a => { return a.activity_name; }))];
        const input_id_days = Days.length === 2 ? Days.map((d, index) => { return index+6; }) : Days.map((d, index) => { return index+1; });


        for(let c = 0; c < datasets.length; c++){
            // Compare the activities in the data with the "all the activities [1,2,3,4,5]" and if it doesn't exist
            // Add "0"(zeros) as the values of people for that specific activity            
            for(let y = 0; y < input_id_days.length; y++){
                multiplicator = await helperMultiplicator.multiplicatorUnfilteredDays(id_location, input_id_days[y], id_service, datasets[c]);
                for(let j = 0; j < input_id_activities.length; j++){
                    obj.id_dataset = datasets[c];
                    obj.dataset_desc = dataDay.filter(p => { return p.id_dataset === datasets[c]; }).map(a => { return a.dataset_desc; })[0];
                    obj.id_day = input_id_days[y];
                    obj.title = title;
                    obj.id_activity = input_id_activities[j];
                    obj.name_activity = input_name_activities[j];
                    pre_people = dataDay.filter(u => { return u.id_dataset === datasets[c]; }).filter(d => { return d.id_day === input_id_days[y]; }).filter(d => { return d.id_activity === input_id_activities[j]; }).map(p => { return p.people; })[0];
                    obj.people = pre_people === undefined ? 0 : Math.round(pre_people * multiplicator);
                    pre_output.push(obj);
                    obj = {}
                }

                output[y] = pre_output;
                pre_output = [];
            }

            for(let i = 0; i < input_id_activities.length; i++){
                people_result.push(output.map(a => a.filter(v => v.id_activity === input_id_activities[i]).map(m => { return m.people; })[0]));
            }

            dataset_desc = dataDay.filter(p => { return p.id_dataset === datasets[c]; }).map(a => { return a.dataset_desc; })[0];
            yAxis[c] = { id_dataset: datasets[c], dataset_desc: dataset_desc, people: people_result.filter(p => { return p.length > 0; }) };
            people_result = [];
        }

        
        data = { title, xAxis: Days, legend: input_name_activities, yAxis };   
        return data;
    } catch (e) {
        console.error(e);
    }
}