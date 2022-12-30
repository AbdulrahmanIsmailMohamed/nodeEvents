const express = require('express');
const events = require('./routes/event.routes');
const app = express();
const db = require('./db/connect')
const badyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash')
require('dotenv').config()

// middleware
app.use(badyParser.urlencoded({ extended: false }));
app.use(badyParser.json());

// beging connect-flash and express-session
app.use(session({
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 * 15 }
}))
app.use(flash())

// beging ejs
app.set('view engine', 'ejs')

// beging static
app.use(express.static('public'))
app.use(express.static('node_modules'))

// beging events route
app.use('/events', events);

const port = process.env.PORT || 3000;
app.listen(port, console.log(`sever Running in port ${port}...`));