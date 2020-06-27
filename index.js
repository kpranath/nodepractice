const express = require("express");
const Debugger = require('debug')('app:startup');
const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const Joi = require('joi');
const logger = require('./middleware/logger');
const courses = require('./Routes/courses');
const home = require('./Routes/home');
// const auth = require('./middleware/authenticate');
const app = express()

app.set('view engine', 'pug');
app.set('views', './views');

// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
// console.log(`app: ${app.get('env')}`);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses', courses);
app.use('/', home);

//configuration
// console.log('Application Name : ' + config.get('name'));
// console.log('Mail server Name : ' + config.get('mail.host'));

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    Debugger("morgan enabled");
}

app.use(logger);

// app.use(auth);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening at port ${port}...`));