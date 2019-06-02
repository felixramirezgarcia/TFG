const express = require('express');
const router = express.Router();
const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signin');
});

/* GET signup. */
router.get('/signup', function(req, res, next) {
  res.render('signup');
});

/* POST signup. */
router.post('/signup', passport.authenticate('local-signup' ,{
  successRedirect: '/map',
  failureRedirect: '/signup',
  passReqToCallback: true
}));

/* GET signin. */
router.get('/signin', function(req, res, next) {
  res.render('signin');
});

/* POST signin. */
router.post('/signin', passport.authenticate('local-signin' ,{
  successRedirect: '/map',
  failureRedirect: '/signin',
  passReqToCallback: true
}));

/* GET logout. */
router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect("/signin");
});

/* GET profile. */
router.get('/profile', isAuthenticated, function(req, res, next) {
    res.render('profile');
});

/* GET map. */
router.get('/map', isAuthenticated, function(req, res, next) {
  getMap1(res);
});

/* POST map. */
router.post('/map', isAuthenticated, function(req, res, next) {
  var recharge = req.body.recharge;
  var cityname = req.body.city;
  var bathnum = req.body.bath;
  var bednum = req.body.bed;
  var pricemin = req.body.price_min;
  var pricemax = req.body.price_max;
  var type = req.body.type;
  var zoom = 8;
  if(cityname) zoom = 14;
  if(type === "allTypes") type = null;
  var query = getQuery(cityname,bathnum,bednum,pricemin,pricemax,type);
  getMap2(res,query,zoom);
});

function isAuthenticated(req, res, next) {
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/signin');
};

function getQuery(cityname,bathnum,bednum,pricemin,pricemax,type) {
  var query;

  ///6 combinations
  if(cityname && bathnum && bednum && pricemin && pricemax && type){ //1.-ciudad,baños,camas,precio_min,precio_max,tipo
    query = {city: cityname, bathroomNumber:bathnum ,bedroomNumber:bednum ,price:{$gte: pricemin, $lte: pricemax} ,propertyType: type};
  //5 combinations
  }else if(cityname && bathnum && bednum && pricemin && pricemax){  //1.-ciudad,baños,camas,precio_min,precio_max
    query = {city: cityname, bathroomNumber:bathnum ,bedroomNumber:bednum ,price:{$gte: pricemin, $lte: pricemax}};
  }else if(cityname && bathnum && bednum && pricemin && type){  //2.-ciudad,baños,camas,precio_min,tipo
    query = {city: cityname, bathroomNumber:bathnum ,bedroomNumber:bednum ,price:{$gte: pricemin}, propertyType:type};
  }else if(cityname && bathnum && bednum && pricemax && type){  //3.-ciudad,baños,camas,precio_max,tipo
    query = {city: cityname, bathroomNumber:bathnum ,bedroomNumber:bednum ,price:{$lte: pricemax}, propertyType:type};
  }else if(cityname && bathnum && pricemin && pricemax && type){  //4.-ciudad,baños,precio_min,precio_max,tipo
    query = {city: cityname, bathroomNumber:bathnum ,price:{$gte: pricemin, $lte: pricemax, propertyType:type}};
  }else if(cityname && bednum && pricemin && pricemax && type){ //5.-ciudad,camas,precio_min,precio_max,tipo
    query = {city: cityname, bedroomNumber:bednum ,price:{$gte: pricemin, $lte: pricemax, propertyType:type}};
  }else if(bathnum && bednum && pricemin && pricemax && type){  //6.-baños,camas,precio_min,precio_max,tipo
    query = {bathroomNumber:bathnum, bedroomNumber:bednum ,price:{$gte: pricemin, $lte: pricemax, propertyType:type}};
  //4 combinations
  }else if(cityname && bathnum && bednum && pricemin){ //1.-ciudad,baños,camas,precio_min
    query = {city: cityname, bathroomNumber:bathnum ,bedroomNumber:bednum ,price:{$gte: pricemin}};
  }else if(cityname && bathnum && bednum && pricemax){ //2.-ciudad,baños,camas,precio_max
    query = {city: cityname, bathroomNumber:bathnum ,bedroomNumber:bednum ,price:{$lte: pricemax}};
  }else if(cityname && bathnum && bednum && type){ //3.-ciudad,baños,camas,tipo
    query = {city: cityname, bathroomNumber:bathnum ,bedroomNumber:bednum ,propertyType: type};
  }else if(cityname && bathnum && pricemin && pricemax){ //4.-ciudad,baños,precio_min,precio_max
    query = {city: cityname, bathroomNumber:bathnum ,price:{$gte: pricemin, $lte: pricemax}};
  }else if(cityname && bathnum && pricemin && type){ //5.-ciudad,baños,precio_min,tipo
    query = {city: cityname, bathroomNumber:bathnum ,price:{$gte: pricemin} ,propertyType: type};
  }else if(cityname && bathnum && pricemax && type){ //6.-ciudad,baños,precio_max,tipo
    query = {city: cityname, bathroomNumber:bathnum ,price:{$lte: pricemax} ,propertyType: type};
  }else if(cityname && bednum && pricemin && pricemax){ //7.-ciudad,camas,precio_min,precio_max
    query = {city: cityname,bedroomNumber:bednum ,price:{$gte: pricemin, $lte: pricemax}};
  }else if(cityname && bednum && pricemin && type){ //8.-ciudad,camas,precio_min,tipo
    query = {city: cityname, bedroomNumber:bednum ,price:{$gte: pricemin} ,propertyType: type};
  }else if(cityname && bednum && pricemax && type){ //9.-ciudad,camas,precio_max,tipo
    query = {city: cityname ,bedroomNumber:bednum ,price:{$lte: pricemax} ,propertyType: type};
  }else if(cityname && pricemin && pricemax && type){ //10.-ciudad,precio_min,precio_max,tipo
    query = {city: cityname ,price:{$gte: pricemin, $lte: pricemax} ,propertyType: type};
  }else if(bathnum && bednum && pricemin && pricemax){ //11.-baños,camas,precio_min,precio_max
    query = {bathroomNumber:bathnum ,bedroomNumber:bednum ,price:{$gte: pricemin, $lte: pricemax}};
  }else if(bathnum && bednum && pricemin && type){ //12.-baños,camas,precio_min,tipo
    query = {bathroomNumber:bathnum ,bedroomNumber:bednum ,price:{$gte: pricemin} ,propertyType: type};
  }else if(bathnum && bednum && pricemax && type){ //13.-baños,camas,precio_max,tipo
    query = {bathroomNumber:bathnum ,bedroomNumber:bednum ,price:{$lte: pricemax} ,propertyType: type};
  }else if(bathnum && pricemin && pricemax && type){ //14.-baños,precio_min,precio_max,tipo
    query = {bathroomNumber:bathnum ,price:{$gte: pricemin, $lte: pricemax} ,propertyType: type};
  }else if(bednum && pricemin && pricemax && type){ //15.-camas,precio_min,precio_max,tipo
    query = {bedroomNumber:bednum ,price:{$gte: pricemin, $lte: pricemax} ,propertyType: type};
  //3 combinations
  }else if(cityname && bathnum && bednum){ //1.-ciudad,baños,camas
    query = {city: cityname, bathroomNumber:bathnum ,bedroomNumber:bednum};
  }else if(cityname && bathnum && pricemin){ //2.-ciudad,baños,precio_min
    query = {city: cityname, bathroomNumber:bathnum ,price:{$gte: pricemin}};
  }else if(cityname && bathnum && pricemax){ //3.-ciudad,baños,precio_max
    query = {city: cityname, bathroomNumber:bathnum ,price:{$lte: pricemax}};
  }else if(cityname && bathnum && type){ //4.-ciudad,baños,tipo
    query = {city: cityname, bathroomNumber:bathnum ,propertyType: type};
  }else if(cityname && bednum && pricemin){ //5.-ciudad,camas,precio_min
    query = {city: cityname, bedroomNumber:bednum ,price:{$gte: pricemin}};
  }else if(cityname && bednum && pricemax){ //6.-ciudad,camas,precio_max
    query = {city: cityname,bedroomNumber:bednum ,price:{$lte: pricemax}};
  }else if(cityname && bednum && type){ //7.-ciudad,camas,tipo
    query = {city: cityname,bedroomNumber:bednum,propertyType: type};
  }else if(cityname && pricemin && pricemax){ //8.-ciudad,precio_min,precio_max
    query = {city: cityname ,price:{$gte: pricemin, $lte: pricemax}};
  }else if(cityname && pricemin && type){ //9.-ciudad,precio_min,tipo
    query = {city: cityname ,price:{$gte: pricemin} ,propertyType: type};
  }else if(cityname && pricemax && type){ //10.-ciudad,precio_max,tipo
    query = {city: cityname ,price:{$lte: pricemax} ,propertyType: type};
  }else if(bathnum && bednum && pricemin){ //11.-baños,camas,precio_min
    query = {bathroomNumber:bathnum ,bedroomNumber:bednum ,price:{$gte: pricemin}};
  }else if(bathnum && bednum && pricemax){ //12.-baños,camas,precio_max
    query = {bathroomNumber:bathnum ,bedroomNumber:bednum ,price:{$lte: pricemax}};
  }else if(bathnum && bednum && type){ //13.-baños,camas,tipo
    query = {bathroomNumber:bathnum ,bedroomNumber:bednum ,propertyType: type};
  }else if(bathnum && pricemin && pricemax){ //14.-baños,precio_min,precio_max
    query = {bathroomNumber:bathnum ,price:{$gte: pricemin, $lte: pricemax}};
  }else if(bathnum && pricemin && type){ //15.-baños,precio_min,tipo
    query = {bathroomNumber:bathnum ,price:{$gte: pricemin} ,propertyType: type};
  }else if(bathnum && pricemax && type){ //16.-baños,precio_max,tipo
    query = {bathroomNumber:bathnum ,price:{$lte: pricemax} ,propertyType: type};
  }else if(bednum && pricemin && pricemax){ //17.-camas,precio_min,precio_max
    query = {bedroomNumber:bednum ,price:{$gte: pricemin, $lte: pricemax}};
  }else if(bednum && pricemin && type){ //18.-camas,precio_min,tipo
    query = {bedroomNumber:bednum ,price:{$gte: pricemin} ,propertyType: type};
  }else if(bednum && pricemax && type){ //19.-camas,precio_max,tipo
    query = {bedroomNumber:bednum ,price:{$lte: pricemax} ,propertyType: type};
  }else if(pricemin && pricemax && type){ //20.-precio_min,precio_max,tipo
    query = {price:{$gte: pricemin, $lte: pricemax} ,propertyType: type};
  //2 combinations
  }else if(cityname && bathnum){ //1.-ciudad,baños
    query = {city: cityname, bathroomNumber:bathnum};
  }else if(cityname && bednum){ //2.-ciudad,camas
    query = {city: cityname,bedroomNumber:bednum};
  }else if(cityname && pricemin){ //3.-ciudad,precio_min
    query = {city: cityname,price:{$gte: pricemin}};
  }else if(cityname && pricemax){ //4.-ciudad,precio_max
    query = {city: cityname ,price:{$lte: pricemax}};
  }else if(cityname && type){ //5.-ciudad,tipo
    query = {city: cityname,propertyType: type};
  }else if(bathnum && bednum){ //6.-baños,camas
    query = {bathroomNumber:bathnum ,bedroomNumber:bednum};
  }else if(bathnum && pricemin){ //7.-baños,precio_min
    query = {bathroomNumber:bathnum ,price:{$gte: pricemin}};
  }else if(bathnum && pricemax){ //8.-baños,precio_max
    query = {bathroomNumber:bathnum ,price:{$lte: pricemax}};
  }else if(bathnum && type){ //9.-baños,tipo
    query = {bathroomNumber:bathnum ,propertyType: type};
  }else if(bednum && pricemin){ //10.-camas,precio_min
    query = {bedroomNumber:bednum ,price:{$gte: pricemin}};
  }else if(bednum && pricemax){ //11.-camas,precio_max
    query = {bedroomNumber:bednum ,price:{$lte: pricemax}};
  }else if(bednum && type){ //12.-camas,tipo
    query = {bedroomNumber:bednum ,propertyType: type};
  }else if(pricemin && pricemax){ //13.-precio_min,precio_max
    query = {price:{$gte: pricemin, $lte: pricemax}};
  }else if(pricemin && type){ //14.-precio_min,tipo
    query = {price:{$gte: pricemin} ,propertyType: type};
  }else if(pricemax && type){ //15.-precio_max,tipo
    query = {price:{$lte: pricemax} ,propertyType: type};
  //2 combinations
  }else if(cityname){ //1.-ciudad
    query = {city: cityname};
  }else if(bathnum){ //2.-baños
    query = {bathroomNumber:bathnum};
  }else if(bednum){ //3.-camas
    query = {bedroomNumber:bednum};
  }else if(pricemin){ //4.-precio_min
    query = {price:{$gte: pricemin}};
  }else if(pricemax){ //5.-precio_max
    query = {price:{$lte: pricemax}};
  }else if(type){ //6.-tipo
    query = {propertyType: type};
  }else{
    query = {city: "Granada"};
  }

  return query;
};

function getMap1(res) {
  var House = require('../models/houseschema');
  var position = {lat: 37.6000000, lng: -4.5000000};

  House.distinct("city").exec((err,citys) => {
    if(err){
      res.status(500).send({
        message: 'Error en el servidor'
      });
    }else{
      if(citys){
        var query = {somethin:" "};
        House.find(query).exec((err,houses) => {
          if(err){
            res.status(500).send({
              message: 'Error en el servidor'
            });
          }else{
            if(houses){
              res.render('map',{array:houses, location:citys, middle:position, zum:8, error:0, qry : query});
            }else{
              res.status(404).send({
                message: 'No hay casas'
              });
            }
          }
        });
      }else{
        res.status(404).send({
          message: 'No hay casas'
        });
      }
    }
  });
};

function getMap2(res,query,zoom) {
  
  var House = require('../models/houseschema');

  House.distinct("city").exec((err,citys) => {
    if(err){
      res.status(500).send({
        message: 'Error en el servidor'
      });
    }else{
      if(citys){
        House.find(query).exec((err,houses) => {
          if(err){
            res.status(500).send({
              message: 'Error en el servidor'
            });
          }else{
            if(houses && Array.isArray(houses) && houses.length >=1){
              if(houses[0].latitude && houses[0].longitude){
                var position = {lat: houses[0].latitude, lng: houses[0].longitude};
                res.render('map',{array: houses, location:citys, middle:position, zum:zoom, error:0, qry : query});
              }else{
                var position = {lat: 37.6000000, lng: -4.5000000};
                res.render('map',{array: houses, location:citys, middle:position, zum:zoom, error:0, qry : query});
              }
            }else{
              var position = {lat: 37.6000000, lng: -4.5000000};
              res.render('map',{array: houses, location:citys, middle:position, zum:8, error:{code:1, msg:"Ciudad no valida"}, qry : query});
            }
          }
        });
      }else{
        res.status(404).send({
          message: 'No hay casas'
        });
      }
    }
  });
};

module.exports = router;
