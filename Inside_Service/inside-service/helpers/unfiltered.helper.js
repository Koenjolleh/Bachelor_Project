const helperMultiplicator = require('./multiplicators.helper');

/*** Day ***/
exports.JsonDay = async (dataDay, id_day, openinghours, id_dataset, id_location, id_service) => { 
    try {
        let obj = {};
        let pre_output = [];
        let pre_people = [];
        let data = {};
        let datasets = id_dataset.split(',').map(p => { return parseInt(p,10); }).sort((a, b) => a - b);
        let multiplicator = undefined;
        const day = dataDay[0].day;
        const open_time = openinghours[0].open_time;
        const close_time = openinghours[0].close_time < 10 ? openinghours[0].close_time + 24 : openinghours[0].close_time;
        

            for(let i = 0; i < datasets.length; i++){
                // Compare the hours in the data with the and if there is not
                // Add "0"(zeros) as the values of people for that specific day
                for(let j = open_time; j <= close_time; j++){
                    multiplicator = await helperMultiplicator.multiplicatorUnfilteredHours(id_location, id_day, j > 23 ? j -24 : j, id_service, datasets[i]);
                    obj.id_dataset = datasets[i];
                    obj.legend = dataDay.filter(c => { return c.id_dataset === datasets[i]; }).map(p => { return p.dataset_desc; })[0];
                    obj.title = day;
                    obj.xAxis = j > 23 ? j -24 : j;
                    pre_people = dataDay.filter(c => { return c.id_dataset === datasets[i]; }).filter(d => { return d.hour === (j > 23 ? j - 24 : j); }).map(p => { return p.people; })[0];
                    obj.people = pre_people === undefined ? 0 : Math.round(pre_people * multiplicator);
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

/************************************************************************************************************/
/*** TypeDays */
exports.JsonTypeDays = async (dataDay, openinghours, id_dataset, id_location, id_service) => {
    try {
        let obj = {};
        let pre_output = [];
        let pre_people = [];
        let data = {};
        let datasets = id_dataset.split(',').map(p => { return parseInt(p,10); }).sort((a, b) => a - b);
        let multiplicator = undefined;
        const title = dataDay[0].title;
        const input_id_days = openinghours.map(d => { return d.id_day; });
        const day_names = openinghours.map(d => { return d.day_name; });
        const open = openinghours.map(d => { return d.open; });


        for(let j = 0; j < datasets.length; j++){
            // Compare the days in the data with the "all the days [1,2,3,4,5,6,7]" and if it doesn't exist
            // Add "0"(zeros) as the values of people for that specific day
            for(let i = 0; i < input_id_days.length; i++){
                if(open[i]){
                    multiplicator = await helperMultiplicator.multiplicatorUnfilteredDays(id_location, input_id_days[i], id_service, datasets[j]);
                    obj.id_dataset = datasets[j];
                    obj.legend = dataDay.filter(c => { return c.id_dataset === datasets[j]; }).map(p => { return p.dataset_desc; })[0];
                    obj.id_day = input_id_days[i];
                    obj.xAxis = day_names[i];
                    obj.title = title;
                    pre_people = dataDay.filter(c => { return c.id_dataset === datasets[j]; }).filter(d => { return d.id_day === input_id_days[i]; }).map(p => { return p.people; })[0];
                    obj.people = pre_people === undefined ? 0 : Math.round(pre_people * multiplicator);
                    pre_output.push(obj);
                    obj = {}
                }
            }
        }

        // data = pre_output.sort((a,b) => { return a.id_day - b.id_day; });
        data = pre_output;
        return data;
    } catch (e) {
		console.error(e);
	}
}

/********************************************************************************************/

/*** FullDays */
exports.JsonFullDays = async (dataDay, openinghours, id_dataset, id_location, id_service) => {
    try {
        let obj = {};
        let pre_output = [];
        let pre_people = [];
        let data = {};
        let datasets = id_dataset.split(',').map(p => { return parseInt(p,10); }).sort((a, b) => a - b);
        let multiplicator = undefined;
        const title = dataDay[0].title;
        const input_id_days = openinghours.map(d => { return d.id_day; });
        const day_names = openinghours.map(d => { return d.day_name; });
        const open = openinghours.map(d => { return d.open; });

        for(let j = 0; j < datasets.length; j++){
            // Compare the days in the data with the "all the days [1,2,3,4,5,6,7]" and if it doesn't exist
            // Add "0"(zeros) as the values of people for that specific day
            for(let i = 0; i < input_id_days.length; i++){
                if(open[i]){
                    multiplicator = await helperMultiplicator.multiplicatorUnfilteredDays(id_location, input_id_days[i], id_service, datasets[j]);
                    obj.id_dataset = datasets[j];
                    obj.legend = dataDay.filter(c => { return c.id_dataset === datasets[j]; }).map(p => { return p.dataset_desc; })[0];
                    obj.id_day = input_id_days[i];
                    obj.title = title;
                    obj.xAxis = day_names[i];
                    pre_people = dataDay.filter(c => { return c.id_dataset === datasets[j]; }).filter(d => { return d.id_day === input_id_days[i]; }).map(p => { return p.people; })[0];
                    obj.people = pre_people === undefined ? 0 : Math.round(pre_people * multiplicator);
                    pre_output.push(obj);
                    obj = {}
                }
            }
        }

        //data = pre_output.sort((a,b) => { return a.id_day - b.id_day; });
        data = pre_output;
        return data;
    } catch (e) {
		console.error(e);
	}
}


/************************************************************************************************************/

/*** FullDays by Hours */
exports.JsonFullDaysByHours = async (dataDay, openinghours, id_dataset, id_location, id_service) => {
    try {
        let pre_people = [];
        let pre_output = [];
        let obj = {};
        let data = {};
        let open_time = undefined;
        let close_time = undefined;
        let multiplicator = undefined;
        const datasets = id_dataset.split(',').map(p => { return parseInt(p,10); }).sort((a, b) => a - b);
        const input_id_days = openinghours.map(d => { return d.id_day; });
        const day_names = openinghours.map(d => { return d.day_name; });
        const open = openinghours.map(d => { return d.open; });
        const title = dataDay[0].title;


        for(let c = 0; c < datasets.length; c++){
            for(let i = 0; i < input_id_days.length; i++){
                if(open[i]){
                    // Compare the days in the data with the "all the days [1,2,3,4,5,6,7]" and if it doesn't exist
                    // Add "0"(zeros) as the values of people for that specific day
                    open_time = openinghours.filter(f => { return f.id_day === input_id_days[i]; }).map(t => { return t.open_time; })[0];
                    close_time = openinghours.filter(f => { return f.id_day === input_id_days[i]; }).map(t => { return t.close_time; })[0];
                    for(let j = open_time; j <= close_time; j++){
                        multiplicator = await helperMultiplicator.multiplicatorUnfilteredHours(id_location, input_id_days[i], j, id_service, datasets[c]);
                        obj.id_dataset = datasets[c];
                        obj.legend = dataDay.filter(d => { return d.id_dataset === datasets[c]; }).map(p => { return p.dataset_desc; })[0];
                        obj.id_day = input_id_days[i];
                        obj.xAxisTop = day_names[i];
                        pre_people = dataDay.filter(d => { return d.id_dataset === datasets[c]; }).filter(f => { return f.id_day === input_id_days[i]; }).filter(d => { return d.hour === j; }).map(p => { return p.people; })[0];
                        obj.people = pre_people === undefined ? 0 :  Math.round(pre_people * multiplicator);
                        obj.xAxisBottom = j;
                        obj.title = title;
                        pre_output.push(obj);
                        obj = {}
                    }
                }
            }
        }

        data = pre_output;
        return data;
    } catch (e) {
		console.error(e);
	}
}