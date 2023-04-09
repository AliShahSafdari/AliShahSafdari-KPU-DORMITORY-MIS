const passport = require('passport');
const { Strategy } = require('passport-local');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

passport.use(
    new Strategy({ usernameField: "email" }, async (email, password, done) => {
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return done(null, false, { message: "کاربری با این ایمیل پیدا نشد" });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            // if user found or not found
            return isMatch ? done(null, user) : done(null, false, { message: "حسابی با این ایمیل یا پسورد پیدا نشد" })

        } catch (err) {
            console.log(err);
        }
    }));

passport.serializeUser((user, done) => {
    done(null, user);
})

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    })
})