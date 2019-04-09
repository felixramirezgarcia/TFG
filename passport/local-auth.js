const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/userschema');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null,user);
});

passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const user = await User.findOne({ email: email }); 

    if(user){
        return done(null, false, req.flash('signupMessage','The Email is alredy taken.'));
    }else{
        const newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        var saved = await newUser.save();
        if(saved){
            done(null,newUser);
            console.log("Usuario almacenado");
        }else{
            console.log("Usuario no almacenado");
        }
    }
} ));

passport.use('local-signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const user = await User.findOne({ email: email }); 

    if(!user){
        return done(null, false, req.flash('signinMessage','No user found.'));
    }
    if(!user.comparePassword(password)){
        return done(null, false, req.flash('signinMessage','Incorrect password.'));
    }
    done(null,user);
    
} ));