const helperMultiplicator = require('./multiplicators.helper');

/*** Day ***/
exports.JsonDay = async (dataDay, DaysHours, id_dataset, id_location, id_service) => {
    try {
        let obj = {};
        let pre_output = [];
        let pre_people = [];
        let data = {};
        let datasets = id_dataset.split(',').map(p => { return parseInt(p,10); }).sort((a, b) => a - b);
        let multiplicator = undefined;
        const day = dataDay[0].day;
        const id_day = dataDay[0].id_day;


        for(let i = 0; i < datasets.length; i++){
            // Compare the days in the data with the "all the days [1,2,3,4,5,6,7]" and if it doesn't exist
            // Add "0"(zeros) as the values of people for that specific day
            for(let j = 0; j < DaysHours.length; j++){
                multiplicator = await helperMultiplicator.multiplicatorUnfilteredHours(id_location, id_day, DaysHours[j], id_service, datasets[i]);
                obj.id_dataset = datasets[i];
                obj.legend = dataDay.filter(c => { return c.id_dataset === datasets[i]; }).map(p => { return p.dataset_desc; })[0];
                obj.title = day;
                obj.xAxis = DaysHours[j];
                pre_people = dataDay.filter(c => { return c.id_dataset === datasets[i]; }).filter(d => { return d.hour === DaysHours[j]; }).map(p => { return p.people; })[0];
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

/********************************************************************************************/

/*** TypeDays */
exports.JsonTypeDays = async (dataDay, Days, id_dataset, id_location, id_service) => {
    try {
        let input_id_days = Days.length === 2 ? Days.map((d, index) => { return index+6; }) : Days.map((d, index) => { return index+1; }).sort((a, b) => a - b);
        let obj = {};
        let pre_output = [];
        let pre_people = [];
        let data = {};
        let datasets = id_dataset.split(',').map(p => { return parseInt(p,10); }).sort((a, b) => a - b);
        const title = dataDay[0].title;
        let multiplicator = undefined;


        for(let j = 0; j < datasets.length; j++){
            // Compare the days in the data with the "all the days [1,2,3,4,5,6,7]" and if it doesn't exist
            // Add "0"(zeros) as the values of people for that specific day
            for(let i = 0; i < input_id_days.length; i++){
                multiplicator = await helperMultiplicator.multiplicatorUnfilteredDays(id_location, input_id_days[i], id_service, datasets[j]);
                obj.id_dataset = datasets[j];
                obj.legend = dataDay.filter(c => { return c.id_dataset === datasets[j]; }).map(p => { return p.dataset_desc; })[0];
                obj.id_day = input_id_days[i];
                obj.xAxis = Days.length === 2 ? Days[input_id_days[i]-6] : Days[input_id_days[i]-1];
                obj.title = title;
                pre_people = dataDay.filter(c => { return c.id_dataset === datasets[j]; }).filter(d => { return d.id_day === input_id_days[i]; }).map(p => { return p.people; })[0];
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

/********************************************************************************************/

/*** FullDays */
exports.JsonFullDays = async (dataDay, Days, id_dataset, id_location, id_service) => {
    try {
        let input_id_days = Days.map((d, index) => { return index+1; }).sort((a, b) => a - b);
        let obj = {};
        let pre_output = [];
        let pre_people = [];
        let data = {};
        let datasets = id_dataset.split(',').map(p => { return parseInt(p,10); }).sort((a, b) => a - b);
        let multiplicator = undefined;
        const title = dataDay[0].title;

        for(let j = 0; j < datasets.length; j++){
            // Compare the days in the data with the "all the days [1,2,3,4,5,6,7]" and if it doesn't exist
            // Add "0"(zeros) as the values of people for that specific day
            for(let i = 0; i < input_id_days.length; i++){
                multiplicator = await helperMultiplicator.multiplicatorUnfilteredDays(id_location, input_id_days[i], id_service, datasets[j]);
                obj.id_dataset = datasets[j];
                obj.legend = dataDay.filter(c => { return c.id_dataset === datasets[j]; }).map(p => { return p.dataset_desc; })[0];
                obj.id_day = input_id_days[i];
                obj.title = title;
                obj.xAxis = Days[input_id_days[i]-1]
                pre_people = dataDay.filter(c => { return c.id_dataset === datasets[j]; }).filter(d => { return d.id_day === input_id_days[i]; }).map(p => { return p.people; })[0];
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

/*** FullDays by Hours */
exports.JsonFullDaysByHours = async (dataDay, Days, DaysHours, id_dataset, id_location, id_service) => {
    try {
        let input_id_days = Days.map((d, index) => { return index+1; }).sort((a, b) => a - b);
        let pre_people = [];
        let pre_output = [];
        let obj = {};
        let data = {};
        let datasets = id_dataset.split(',').map(p => { return parseInt(p,10); }).sort((a, b) => a - b);
        let multiplicator = undefined;
        const title = dataDay[0].title;

        
        for(let m = 0; m < datasets.length; m++){
            for(let i = 0; i < input_id_days.length; i++){
                // Compare the days in the data with the "all the days [1,2,3,4,5,6,7]" and if it doesn't exist
                // Add "0"(zeros) as the values of people for that specific day
                for(let j = 0; j < DaysHours.length; j++){
                    multiplicator = await helperMultiplicator.multiplicatorUnfilteredHours(id_location, input_id_days[i], DaysHours[j], id_service, datasets[m]);
                    obj.id_dataset = datasets[m];
                    obj.legend = dataDay.filter(c => { return c.id_dataset === datasets[m]; }).map(p => { return p.dataset_desc; })[0];
                    obj.xAxisTop = Days[input_id_days[i]-1];
                    pre_people = dataDay.filter(c => { return c.id_dataset === datasets[m]; }).filter(f => { return f.id_day === input_id_days[i]; }).filter(d => { return d.hour === DaysHours[j]; }).map(p => { return p.people; })[0];
                    obj.people = pre_people === undefined ? 0 : Math.round(pre_people * multiplicator);
                    obj.xAxisBottom = DaysHours[j];
                    obj.title = title;
                    pre_output.push(obj);
                    obj = {}
                }
            }
        }

        data = pre_output;
        return data;
    } catch (e) {
		console.error(e);
	}
}