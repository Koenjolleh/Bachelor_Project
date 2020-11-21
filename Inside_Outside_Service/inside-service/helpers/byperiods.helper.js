const helperMultiplicator = require('./multiplicator_custom_period.helper');

/** By Periods */
exports.JsonDayByPeriods = async (dataDay, id_dataset, id_location, custom_period, all_peopleData) => {
    try {
        let obj = {};
        let pre_output = [];
        let pre_people = [];
        let data = {};
        let datasets = id_dataset.split(',').map(p => { return parseInt(p,10); }).sort((a, b) => a - b);
        let multiplicator = undefined;
        const input_id_day = dataDay[0].id_day;
        const input_name_day = dataDay[0].day_name;
        const input_periods = custom_period.split(',').map(p => { return parseInt(p,10); }).sort((a, b) => a - b);
        const start_period = input_periods[0];
        const end_period = input_periods[input_periods.length-1];
        const title = `${dataDay[0].title} from ${start_period}:00 to ${end_period}:00`;
        let all_people = all_peopleData === undefined ? all_peopleData : all_peopleData.map(p => { return p.people })[0];


        for(let i = 0; i < datasets.length; i++){
            pre_people = dataDay.filter(c => { return c.id_dataset === datasets[i]; }).map(p => { return p.people; })[0];
            if(all_people === undefined){
                multiplicator = await helperMultiplicator.multiplicatorCustomPeriod(id_location, input_id_day, start_period, end_period, datasets[i], pre_people,);
                obj.people = pre_people === undefined ? 0 : Math.round(pre_people * multiplicator); // here is multiplicator
            } else if(all_people !== undefined){
                multiplicator = await helperMultiplicator.multiplicatorCustomPeriodReturningCustomer(id_location, input_id_day, start_period, end_period, datasets[i], pre_people, all_people);
                obj.people = pre_people === undefined ? 0 : Math.round(multiplicator); // here the multiplciator is the final_people_result
            }
            obj.id_dataset = datasets[i];
            obj.legend = dataDay.filter(p => { return p.id_dataset === datasets[i]; }).map(a => { return a.dataset_desc; })[0];
            obj.xAxis = input_name_day;
            obj.title = title;
            pre_output.push(obj);
            obj = {}
        }

        data = pre_output;        
        return data;
    } catch (e) {
		console.error(e);
	}
}


/*** More Categories By Periods */
exports.JsonMoreCategoriesByPeriods = async (dataDay, openinghours, id_dataset, id_location, custom_period, all_peopleData) => {
    try {
        let obj = {};
        let pre_output = [];
        let pre_people = [];
        let data = {};
        let multiplicator = undefined;
        const datasets = id_dataset.split(',').map(p => { return parseInt(p,10); }).sort((a, b) => a - b);
        const input_id_days = openinghours.map(d => { return d.id_day; });
        const input_name_days = openinghours.map(d => { return d.day_name; });
        const input_periods = custom_period.split(',').map(p => { return parseInt(p,10); }).sort((a, b) => a - b);
        const start_period = input_periods[0];
        const end_period = input_periods[input_periods.length-1];
        const title = `${dataDay[0].title} from ${start_period}:00 to ${end_period}:00`;
        let all_people = all_peopleData === undefined ? all_peopleData : all_peopleData.map(p => { return p.people });
        
        for(let c = 0; c < datasets.length; c++){
            for(let y = 0; y < input_id_days.length; y++){
                // Compare the activities in the data with the "all the activities [1,2,3,4,5]" and if it doesn't exist
                // Add "0"(zeros) as the values of people for that specific activity
                pre_people = dataDay.filter(u => { return u.id_dataset === datasets[c]; }).filter(p => { return p.id_day === input_id_days[y]; }).map(p => { return p.people; })[0];
                if(all_people === undefined){
                    multiplicator = await helperMultiplicator.multiplicatorCustomPeriod(id_location, input_id_days[y], start_period, end_period, datasets[c], pre_people);
                    obj.people = pre_people === undefined ? 0 : Math.round(pre_people * multiplicator);
                } else if(all_people !== undefined){
                    multiplicator = await helperMultiplicator.multiplicatorCustomPeriodReturningCustomer(id_location, input_id_days[y], start_period, end_period, datasets[c], pre_people, all_people[y]);
                    obj.people = pre_people === undefined ? 0 : Math.round(multiplicator);
                }
                obj.id_dataset = datasets[c];
                obj.legend = dataDay.filter(p => { return p.id_dataset === datasets[c]; }).map(a => { return a.dataset_desc; })[0];
                obj.id_day = input_id_days[y];
                obj.xAxis = input_name_days[y];
                obj.title = title;
                pre_output.push(obj);
                obj = {}
            }
        }
        
        data = pre_output;
        return data;
    } catch (e) {
		console.error(e);
	}
}