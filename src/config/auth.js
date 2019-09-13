// Import Dependency
const localStrategy = require('passport-local').Strategy
const Sha256 = require('sha256');

const User = require('../models/User');

module.exports = function(passport) {
    passport.use(new localStrategy({usernameField: 'email', passwordField: 'password'}, (email, password, done) => {
        let Errors = [];

        // Check if the string has the @ character
        if (!email.includes('@')) {
            Errors.push({ msg: "Invalid email" });
        }

        // Checks if password is longer than 6 characters
        if (password.length < 6) {
            Errors.push({ msg: "Short password, must have more than 6 characters" });
        }

        // If errors show errors
        if (Errors.length > 0) {
            return done(null, false, { message: '' });
        }

        // Search User Document in Bank
        User.findOne({ email: email }).then((user) => {
            // Check If Account Exist or No
            if (!user) {
                return done(null, false, { message: 'This account nothing exist' });
            }

            // Check If Password Match
            if (user.password === Sha256(password)) {
                return done(null, user);
            }

            return done(null, false, { message: "Password Incorrect" });
        })
    }));

    // Create Session
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // Delete Session
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
}