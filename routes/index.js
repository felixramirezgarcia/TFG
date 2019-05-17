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
  successRedirect: '/map',
  failureRedirect: '/signup',
  passReqToCallback: true
}));

router.get('/signin', function(req, res, next) {
  res.render('signin');
});

router.post('/signin', passport.authenticate('local-signin' ,{
  successRedirect: '/map',
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

router.get('/map', isAuthenticated, function(req, res, next) {

  var House = require('../models/houseschema');
  House.find({ price:{$gte: 7500000} }).exec((err,houses) => {
    if(err){
      res.status(500).send({
        message: 'Error en el servidor'
      });
    }else{
      if(houses){
        res.render('map',{array: houses});
      }else{
        res.status(404).send({
          message: 'No hay casas'
        });
      }
    }
  });

});

function isAuthenticated(req, res, next) {
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/signin');
};

module.exports = router;
