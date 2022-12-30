const express = require('express');
const events = require('./routes/event.routes');
const app = express();
const db = require('./db/connect')
const badyParser = require('body-parser')

// middleware
app.use(badyParser.urlencoded({ extended: false }));
app.use(badyParser.json());

// beging ejs
app.set('view engine', 'ejs')

// beging static
app.use(express.static('public'))
app.use(express.static('node_modules'))

// beging events route
app.use('/events', events);

const port = process.env.PORT || 3000;
app.listen(port, console.log(`sever Running in port ${port}...`));