const express = require('express');
const router = express.Router();
const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signin');
});

router.get('/signup', function(req, res, next) {
  res.render('signup');
});

router.post('/signup', passport.authenticate('local-signup' ,{
  successRedirect: '/profile',
  failureRedirect: '/signup',
  passReqToCallback: true
}));

router.get('/signin', function(req, res, next) {
  res.render('signin');
});

router.post('/signin', passport.authenticate('local-signin' ,{
  successRedirect: '/profile',
  failureRedirect: '/signin',
  passReqToCallback: true
}));

router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect("/signin");
});

router.get('/profile', isAuthenticated, function(req, res, next) {
    res.render('profile');
});

function isAuthenticated(req, res, next) {
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/signin');
};

module.exports = router;
