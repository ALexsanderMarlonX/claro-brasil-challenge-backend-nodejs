const express = require('express');
const mongoose = require('mongoose');
const server = express();
const session = require('express-session');
const passport = require('passport');
require('./src/config/auth')(passport);

function formatDate(date) {
    const d = new Date(date);

    return [d.getHours(), d.getMinutes(), d.getSeconds()].join(':');
}

mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb+srv://admin:159852@test-bl2j4.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser:true
}).then(() => console.log(`Success Mongoose Connect..`)).catch(err => console.error(err));

// Set Session
server.use(session({
    secret: 'df56g4dg4df54g',
    resave: false,
    saveUninitialized: false
}));

// Set Passport Initialize and Passport Session
server.use(passport.initialize());
server.use(passport.session());

// Set Express Json
server.use(express.json());

const routes = require('./routes');
server.use(routes);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server Started Success in ${PORT}... | ${formatDate(Date.now())}`))