const helperMultiplicator = require('./multiplicators.helper');

/** Day By Activities */
exports.JsonDayByActivities = async (dataDay, id_day, id_dataset, id_location, id_service) => {
    try {
        let obj = {};
        let pre_output = [];
        let pre_people = [];
        let data = {};
        let multiplicator = undefined;
        let input_id_activities = [];
        let input_name_activities = [];
        const datasets = id_dataset.split(',').map(p => { return parseInt(p,10); }).sort((a, b) => a - b);
        const title = dataDay[0].title;    


        for(let i = 0; i < datasets.length; i++){
            // Compare the activities in the data with the "all the activities [1,2,3,4,5]" and if it doesn't exist
            // Add "0"(zeros) as the values of people for that specific activity
            multiplicator = await helperMultiplicator.multiplicatorUnfilteredDays(id_location, id_day, id_service, datasets[i]);
            input_id_activities = dataDay.filter(p => { return p.id_dataset === datasets[i]; }).map(i => { return i.id_activity; });
            input_name_activities = dataDay.filter(p => { return p.id_dataset === datasets[i]; }).map(i => { return i.activity_name; });
            for(let j = 0; j < input_id_activities.length; j++){
                obj.id_dataset = datasets[i];
                obj.legend = dataDay.filter(p => { return p.id_dataset === datasets[i]; }).map(a => { return a.dataset_desc; })[0];
                obj.id_day = id_day;
                obj.title = title;
                obj.id_activity = input_id_activities[j];
                obj.xAxis = input_name_activities[j];
                pre_people = dataDay.filter(c => { return c.id_dataset === datasets[i]; }).filter(d => { return d.id_activity === input_id_activities[j]; }).map(p => { return p.people; })[0];
                obj.people = pre_people === undefined ? 0 : Math.round(pre_people * multiplicator);
                pre_output.push(obj);
                obj = {}
            }
            input_id_activities = [];
            input_name_activities = [];
        }

        data = pre_output;
        return data;

    } catch (e) {
		console.error(e);
	}
}

/*** More Categories By Activities (TypeDays, FullDays) */
exports.JsonMoreCategoriesByActivities = async (dataDay, Days, id_dataset, id_location, id_service) => {
    try {
        let obj = {};
        let pre_output = [];
        let pre_people = [];
        let output = [];
        let yAxis = [];
        let people_result = [];
        let data = {};
        let dataset_desc = [];
        let multiplicator = undefined;
        let input_id_activities = [];
        let input_name_activities = [];
        const datasets = id_dataset.split(',').map(p => { return parseInt(p,10); }).sort((a, b) => a - b);
        const input_id_days = Days.length === 2 ? Days.map((d, index) => { return index+6; }) : Days.map((d, index) => { return index+1; });
        const title = dataDay[0].title; 

        
        for(let c = 0; c < datasets.length; c++){
            input_id_activities = [...new Set(dataDay.filter(u => { return u.id_dataset === datasets[c]; }).map(i => { return i.id_activity; }))];
            input_name_activities = [...new Set(dataDay.filter(u => { return u.id_dataset === datasets[c]; }).map(i => { return i.activity_name; }))];
            for(let y = 0; y < input_id_days.length; y++){
                // Compare the activities in the data with the "all the activities [1,2,3,4,5]" and if it doesn't exist
                // Add "0"(zeros) as the values of people for that specific activity
                multiplicator = await helperMultiplicator.multiplicatorUnfilteredDays(id_location, input_id_days[y], id_service, datasets[c]);
                for(let j = 0; j < input_id_activities.length; j++){
                    obj.id_day = input_id_days[y];
                    obj.day = Days[y];
                    obj.id_activity = input_id_activities[j];
                    obj.name_activity = input_name_activities[j];
                    pre_people = dataDay.filter(u => { return u.id_dataset === datasets[c]; }).filter(p => { return p.id_day === input_id_days[y]; }).filter(d => { return d.id_activity === input_id_activities[j]; }).map(p => { return p.people; })[0];
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