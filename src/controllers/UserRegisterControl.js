// Importing Dependency
const Sha256 = require('sha256');

// Importing File
const User = require('../models/User');

// Exporting Object
module.exports = {
    async store(req, res) {
        if (req.user === undefined) {
            // Get Email, Password ... in Body
            const { name, email, password, repeatPassword } = req.body;

            let Errors = [];

            // Condicions

            // Checks if password is longer than 6 characters
            if (password.length < 6) {
                Errors.push({ msg: "Short password, must have more than 6 characters" });
            }

            // Check if the string has the @ character
            if (!email.includes('@')) {
                Errors.push({ msg: "Invalid email" });
            }
            
            if (!Sha256(password) === Sha256(repeatPassword)) {
                Errors.push({ msg: "password's not match" });
            }
            
            // If errors show errors
            if (Errors.length > 0) {
                return res.json(Errors)
            }

            // Not to create the same account
            let userExist = await User.findOne({
                email: email
            });

            // Checks if user already exists
            if (userExist) {
                return res.json(userExist);
            }

            // Signup User
            const user = await User.create({
                name,
                email,
                password: Sha256(password),
                repeatPassword: Sha256(repeatPassword)
            });

            return res.json(user);
        }

        return res.json({ msg: 'You are not logged in' });
    }

    

};