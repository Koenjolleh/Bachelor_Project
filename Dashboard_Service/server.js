const express =  require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');
const Cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const passport = require('passport');

const app = express();
dotenv.config();


//Only update the structure of the database without delete the data
// db.sequelize.sync({alter: true}).then(() => {
//  	console.log('Update the Database structure { alter: true }');
// });

 //force: true will drop the table if it already exists
/*  db.sequelize.sync({force: true}).then(() => {
   console.log('Drop and Resync with { force: true }');
   initial();
 }); */

const PORT = process.env.PORT || 3006;

require('./config/passport');

app.use(helmet());
app.use(Cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(passport.initialize());

// Root route
app.get('/', (req, res, next) => {
	res.status(200).json({ message: 'OK' });
});


require('./dashboard-service/routes/')(app);


app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

module.exports = app;