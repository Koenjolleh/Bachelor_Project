const helperMultiplicator = require('./multiplicators.helper');

/*** Day By Periods ***/
exports.JsonDayByPeriods = async (dataDay, id_dataset, id_location, id_service, custom_period) => {
    try {
        let obj = {};
        let pre_output = [];
        let pre_people = [];
        let data = [];
        let multiplicator = undefined;
        const datasets = id_dataset.split(',').map(p => { return parseInt(p,10); }).sort((a, b) => a - b);
        const custom_hours = custom_period.split(',').map(p => { return parseInt(p,10); }).sort((a, b) => a - b);
        const start_period = Math.min(...custom_hours);
        const end_period = Math.max(...custom_hours);
        const title = `${dataDay[0].title} from ${start_period}:00 to ${end_period}:00`;
        const id_day = dataDay[0].id_day;
        const day_name = dataDay[0].day_name;
        let people_sum = undefined;
        let legend_sum = [];
        let title_sum = [];
        let data_sum = {};

        for(let i = 0; i < datasets.length; i++){
            // Compare the days in the data with the "all the days [1,2,3,4,5,6,7]" and if it doesn't exist
            // Add "0"(zeros) as the values of people for that specific day
            multiplicator = await helperMultiplicator.multiplicatorUnfilteredHours(id_location, id_day, start_period, id_service, datasets[i]);
            obj.id_dataset = datasets[i];
            obj.legend = dataDay.filter(c => { return c.id_dataset === datasets[i]; }).map(p => { return p.dataset_desc; })[0];
            obj.title = title;
            pre_people = dataDay.filter(c => { return c.id_dataset === datasets[i]; }).map(p => { return p.people; })[0];
            obj.people = pre_people === undefined ? 0 : Math.round(pre_people * multiplicator);
            pre_output.push(obj);
            obj = {}
        }

        for(let z = 0; z < datasets.length; z++){
            people_sum = pre_output.filter(f => { return f.id_dataset === datasets[z]; }).map(p => { return p.people; })[0];
            legend_sum = pre_output.filter(f => { return f.id_dataset === datasets[z]; }).map(d => { return d.legend; });
            title_sum = pre_output.filter(f => { return f.id_dataset === datasets[z]; }).map(d => { return d.title; });
            data_sum = { id_dataset: datasets[z], legend: [...new Set(legend_sum)][0], title: [...new Set(title_sum)][0], people: people_sum, xAxis: day_name };
            data.push(data_sum);
        }

        return data;
    } catch (e) {
        console.error(e);
    }
}


/*** More Categories By Periods */
exports.JsonMoreCategoriesByPeriods = async (Days, dataDay, id_dataset, id_location, id_service, custom_period) => {
    try {
        let obj = {};
        let pre_output = [];
        let pre_people = [];
        let output = [];
        let data = [];
        let multiplicator = undefined;
        const datasets = id_dataset.split(',').map(p => { return parseInt(p,10); }).sort((a, b) => a - b);
        const input_id_days = Days.length === 2 ? Days.map((d, index) => { return index+6; }) : Days.map((d, index) => { return index+1; });
        const custom_hours = custom_period.split(',').map(p => { return parseInt(p,10); }).sort((a, b) => a - b);
        const start_period = Math.min(...custom_hours);
        const end_period = Math.max(...custom_hours);
        const title = `${dataDay[0].title} from ${start_period}:00 to ${end_period}:00`;


        for(let c = 0; c < datasets.length; c++){
            for(let y = 0; y < input_id_days.length; y++){
                // Compare the activities in the data with the "all the activities [1,2,3,4,5]" and if it doesn't exist
                // Add "0"(zeros) as the values of people for that specific activity
                multiplicator = await helperMultiplicator.multiplicatorUnfilteredHours(id_location, input_id_days[y], start_period, id_service, datasets[c]);
                obj.id_day = input_id_days[y];
                obj.id_dataset = datasets[c];
                obj.dataset_desc = dataDay.filter(p => { return p.id_dataset === datasets[c]; }).map(a => { return a.dataset_desc; })[0];
                obj.day = Days[y];
                obj.title = title;
                pre_people = dataDay.filter(d => { return d.id_dataset === datasets[c]; }).filter(p => { return p.id_day === input_id_days[y]; }).map(p => { return p.people; })[0];
                obj.people = pre_people === undefined ? 0 : Math.round(pre_people * multiplicator);
                pre_output.push(obj);
                obj = {}
            }
        }

        for(let z = 0; z < datasets.length; z++){
            for(let x = 0; x < input_id_days.length; x++){
                people_sum = pre_output.filter(f => { return f.id_dataset === datasets[z]; }).filter(d=> { return d.id_day === input_id_days[x]; }).map(p => { return p.people; })[0];
                let dataset_desc_sum = pre_output.filter(f => { return f.id_dataset === datasets[z]; }).filter(d => { return d.id_day === input_id_days[x]; }).map(q => { return q.dataset_desc; });
                let title_sum = pre_output.filter(f => { return f.id_dataset === datasets[z]; }).filter(d => { return d.id_day === input_id_days[x]; }).map(q => { return q.title; });
                let xAxis_sum = pre_output.filter(f => { return f.id_dataset === datasets[z]; }).filter(d => { return d.id_day === input_id_days[x]; }).map(q => { return q.day; });
                let id_day_sum = pre_output.filter(f => { return f.id_dataset === datasets[z]; }).filter(d => { return d.id_day === input_id_days[x]; }).map(q => { return q.id_day; });
                let data_sum = { id_dataset: datasets[z], dataset_desc: [...new Set(dataset_desc_sum)][0], id_day: [...new Set(id_day_sum)][0], xAxis: [...new Set(xAxis_sum)][0], title: [...new Set(title_sum)][0], people: people_sum };
                data.push(data_sum);
            }
        }
    
        return data;
    } catch (e) {
        console.error(e);
    }
}