const express = require('express');
const app = express();
const events = require('./routes/eventRoute');
const user = require('./routes/userRoute');
const db = require('./db/connect')
const session = require('express-session')
const flash = require('connect-flash');
const passport = require('passport');
require('dotenv').config();

// passport config
require("./config/passport")(passport)

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// beging express-session
app.use(session({
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 * 15 }
}))

// passport middleWare
app.use(passport.initialize());
app.use(passport.session())

// connect flash
app.use(flash())

// glopal variable
app.use((req, res, nxt) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.invalid = req.flash('invalid');
    res.locals.user = req.user;
    nxt();
})

// beging ejs
app.set('view engine', 'ejs')

// beging static
app.use(express.static('public'));
app.use(express.static('node_modules'));


// route
app.get("/", (req, res) => {
    res.redirect('/events')
})

// beging events route
app.use('/events', events);

// beging user route
app.use("/user", user);

const port = process.env.PORT || 3000;
app.listen(port, console.log(`sever Running in port ${port}...`));