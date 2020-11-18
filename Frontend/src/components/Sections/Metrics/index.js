import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

//Components
// import MetricsMatrix from './MetricsMatrix';
import MetricsMatrix2 from './MetricsMatrix2';
import MetricsCards from './MetricsCards';
// import MetricsCards2 from './MetricsCards2';

// Styles
import { styles } from './styles';

const data1 = [
  { 
    id: 0,
    insightCard: 'Afternoon drinks on Sundays?', // 1st title card
    insight: 'Data shows: Outside potential in the afternoon, 11 to 17, it\'s on par with other days.', // Content Card and Insight detail
    potentialGainCard: 'Revenue like a Saturday afternoon.', // Potential gain content Card
    potentialGain: 'Sit down customers have an average transaction of €21, and on a comparable Saturday, there is 92 sit down customers. Take-away customers has an average transaction of €8. If Sunday fulfills same potential as a Saturday increased earnings will be €129.000/year.',
    actionTitle: 'Others in similar situations have: ',
    actionResult: ['- Open Weinladen from noon to 17 on Sundays.'],
    result: '',
    learnings: '',
    image: 'weinladen_ham1.png'
  },
  { 
    id: 1,
    insightCard: 'Wine shelves on one side of the shop (left side, looking out) doesn\'t get attention.', // 1st title card
    insight: 'Data shows: Both on engagement and popularity the left side lacks behind.', // Content Card and Insight detail
    potentialGainCard: 'Create an environment where take-away is visibly more encouraged.', // Potential gain content Card
    potentialGain: 'Right now engagement is 3 times higher with wine shelves on the right. If left wine shelves fulfill same potential as right shelves.\n Potential extra clients as on left shelves =190/week, \nAverage transaction takeaway = €8, \n 8x190x52 = €79.000/year',
    actionTitle: 'Others in similar situations have: ',
    actionResult: ['- Encourage interaction with wine shelves on the left. For instance, by removing sitting options in front of wine shelves. Alternatively create standing space in front of shop to encourage and enable access to left wine shelves.'],
    result: '',
    learnings: '',
    image: 'weinladen_ham2.png'
  },
  { 
    id: 2,
    insightCard: 'Wine shelves in the back too?', // 1st title card
    insight: 'Data shows: During corona, the back of the shop has seen very little use. Maybe it makes sense to expand wine shelves to the back, in this environment. At the same time, take-outs has increased dramatically so there now is twice as many take-out clients as sit-down clients.', // Content Card and Insight detail
    potentialGainCard: '', // Potential gain content Card
    potentialGain: '',
    actionTitle: 'Others in similar situations have: ',
    actionResult: ['- More shelves and choice would encourage this trend.'],
    result: '',
    learnings: '',
    image: 'weinladen_ham2.png'
  },
];


const data2 = [
  { 
    id: 1,
    insight: 'Data shows: On average 24.484 people passed by Vimmelskaftet in September. For Frederiksberggade in September the average of people passing by was 29.384.', 
  },
  { 
    id: 2,
    insight: 'Data shows: Both Vimmelskaftet and Frederiksberggade show increases in total counts since the metro opened, approx. 10% up from September to November.'
  },
  { 
    id: 3,
    insight: 'Dats shows: Using 3 comparable days (Tuesday-Thursday), the average increased on Vimmelskaftet from 21.670 before the metro opening to 23.545 after the metro opening. On Frederiksbergsgade the was an increase in the average from 25.682 to 27,746.'
  },
  { 
    id: 4,
    insight: 'Data shows: Evenings and nights are up. We saw a steady decline after 18:00 before, now it\'s much busier in the evening and night, from 6pm till 8pm increase is between 40% and 50%.'
  },
  { 
    id: 5,
    insight: 'Data shows: 18:00 as a peak hour is much more pronounced than before.'
  },
  { 
    id: 6,
    insight: 'Data shows: Comparing the two locations, overall counts are higher on Frederiksberggade than Vimmelskaftet, ranging from 10% up to 30% higher on Frederiksberggade.'
  },
  { 
    id: 7,
    insight: 'Data shows: Christmas traffic really pulled through - counts were up, ranging from 50% to 100%.'
  },
  { 
    id: 8,
    insight: 'Data shows: On average 37.299 people passed by Vimmelskaftet in December. For weekdays the average was 33.986. For Frederiksberggade the average in December was 43.226 and on weekdays the average was 43.078.'
  },
  { 
    id: 9,
    insight: 'Data shows: Vimmelskaftet saw a more pronounced increase in traffic during Christmas on all days of the week, with Saturday reaching 57.296 people passing by, surpassing even Frederiksberggade\'s traffic.'
  },
  { 
    id: 10,
    insight: 'Data shows: Frederiksberggade saw very high counts of people passing by on all days of Christmas, Tuesday even logging an increase of over 100%, from 22.022 to 47.040. Though higher numbers than on Vimmelskaftet, the increase was not as pronounced on Frederiksberggade.'
  },
  { 
    id: 11,
    insight: 'Data shows: The rate of engagement (engagement seen as a proportion of passers-by) was overall higher on Frederiksberggade than Vimmelskaftet, 38%. on Frederiksberg vs. 36% on Vimmelskaftet on the busiest days - this potentially impacted by higher number of food and beverage establishments on Frederiksberggade.'
  },
  { 
    id: 12,
    insight: 'Data shows: In absolute numbers people engaging with Frederiksberggade\'s stores were up 57%, and Frederiksberggade also saw a higher engagement rate during Decembers christmas shopping compared to September, increasing from 38% to 42%. Again, food and beverage establishments could influence these counts.'
  }
];

const MetricsContainer = (props) => {
  const { classes, selectedLocation } = props;
  
  return(
    <Fragment>
    {
      selectedLocation.length > 0 &&
        <div className={classes.container}>
          <div className={classes.paper}>
            {
              selectedLocation[0].id_location === 7 && 
                <MetricsCards data={data1} />
            }

            {
              (selectedLocation[0].id_location === 4 || selectedLocation[0].id_location === 5) && 
                <MetricsMatrix2 data={data2} />
            }
          </div>
        </div>
    }
    </Fragment>
  );
}

MetricsContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  id_location: PropTypes.number.isRequired,
  selectedLocation: PropTypes.array.isRequired
};

function mapStateToProps({ app }) {
  return {
      selectedLocation: app.selectedLocation
  }
}

export default  withStyles(styles, { withTheme: true })(connect(mapStateToProps, { })(MetricsContainer));