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

/* GET cookies. */
router.get('/cookies', function(req, res, next) {
  res.render('cookies');
});

/* GET map. */
router.get('/map', isAuthenticated, function(req, res, next) {
  getMap1(res);
});

/* POST map. */
router.post('/map', isAuthenticated, function(req, res, next) {
  var cityname = req.body.city;
  var datafont = req.body.font;
  var bathnum = req.body.bath;
  var bednum = req.body.bed;
  var pricemin = req.body.price_min;
  var pricemax = req.body.price_max;
  var type = req.body.type;
  var zoom = 8;
  if(cityname) zoom = 14;
  if(type === "allTypes") type = null;
  var query = getQuery(cityname,datafont,bathnum,bednum,pricemin,pricemax,type);
  getMap2(res,query,zoom);
});

function isAuthenticated(req, res, next) {
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/signin');
};

function getQuery(cityname,datafont,bathnum,bednum,pricemin,pricemax,type) {
  var query;

  ///7 combinations
  if(cityname && datafont && bathnum && bednum && pricemin && pricemax && type){ //1.-ciudad,fuente,baños,camas,precio_min,precio_max,tipo
    query = {city: cityname, datasourceName:datafont, bathroomNumber:bathnum ,bedroomNumber:bednum ,price:{$gte: pricemin, $lte: pricemax} ,propertyType: type};
  ///6 combinations
  }else if(cityname && datafont && bathnum && bednum && pricemin && pricemax){ // 1.-cityname,datafont,bathnum,bednum,pricemin,pricemax
    query = {city: cityname, datasourceName:datafont, bathroomNumber:bathnum ,bedroomNumber:bednum ,price:{$gte: pricemin, $lte: pricemax}};
  }else if(cityname && datafont && bathnum && bednum && pricemin && type){ // 2.-cityname,datafont,bathnum,bednum,pricemin,type
    query = {city: cityname, datasourceName:datafont, bathroomNumber:bathnum ,bedroomNumber:bednum ,price:{$gte: pricemin} ,propertyType: type};
  }else if(cityname && datafont && bathnum && bednum && pricemax && type){ //3.-cityname,datafont,bathnum,bednum,pricemax,type
    query = {city: cityname, datasourceName:datafont, bathroomNumber:bathnum ,bedroomNumber:bednum ,price:{$lte: pricemax} ,propertyType: type};
  }else if(cityname && datafont && bathnum && pricemin && pricemax && type){ //4.-cityname,datafont,bathnum,pricemin,pricemax,type
    query = {city: cityname, datasourceName:datafont, bathroomNumber:bathnum ,price:{$gte: pricemin, $lte: pricemax} ,propertyType: type};
  }else if(cityname && datafont && bednum && pricemin && pricemax && type){ //5.-cityname,datafont,bednum,pricemin,pricemax,type
    query = {city: cityname, datasourceName:datafont ,bedroomNumber:bednum ,price:{$gte: pricemin, $lte: pricemax} ,propertyType: type};
  }else if(cityname && bathnum && bednum && pricemin && pricemax && type){ //6.-cityname,bathnum,bednum,pricemin,pricemax,type
    query = {city: cityname, bathroomNumber:bathnum ,bedroomNumber:bednum ,price:{$gte: pricemin, $lte: pricemax} ,propertyType: type};
  }else if(datafont && bathnum && bednum && pricemin && pricemax && type){ //7.-datafont,bathnum,bednum,pricemin,pricemax,type
    query = {datasourceName:datafont, bathroomNumber:bathnum ,bedroomNumber:bednum ,price:{$gte: pricemin, $lte: pricemax} ,propertyType: type};
  ///5 combinations
  }else if(cityname && datafont && bathnum && bednum && pricemin){ //1.-cityname,datafont,bathnum,bednum,pricemin
    query = {city: cityname, datasourceName:datafont, bathroomNumber:bathnum ,bedroomNumber:bednum ,price:{$gte: pricemin}};
  }else if(cityname && datafont && bathnum && bednum && pricemax){ //2.-cityname,datafont,bathnum,bednum,pricemax
    query = {city: cityname, datasourceName:datafont, bathroomNumber:bathnum ,bedroomNumber:bednum ,price:{$lte: pricemax}};
  }else if(cityname && datafont && bathnum && bednum && type){ //3.-cityname,datafont,bathnum,bednum,type 
    query = {city: cityname, datasourceName:datafont, bathroomNumber:bathnum ,bedroomNumber:bednum ,propertyType: type};
  }else if(cityname && datafont && bathnum && pricemin && pricemax){ //4.-cityname,datafont,bathnum,pricemin,pricemax
    query = {city: cityname, datasourceName:datafont, bathroomNumber:bathnum ,price:{$gte: pricemin, $lte: pricemax}};
  }else if(cityname && datafont && bathnum && pricemin && type){ //5.-cityname,datafont,bathnum,pricemin,type
    query = {city: cityname, datasourceName:datafont, bathroomNumber:bathnum ,price:{$gte: pricemin} ,propertyType: type};
  }else if(cityname && datafont && bathnum && pricemax && type){ //6.-cityname,datafont,bathnum,pricemax,type
    query = {city: cityname, datasourceName:datafont, bathroomNumber:bathnum ,price:{$lte: pricemax} ,propertyType: type};
  }else if(cityname && datafont && bednum && pricemin && pricemax){ //7.-cityname,datafont,bednum,pricemin,pricemax
    query = {city: cityname, datasourceName:datafont ,bedroomNumber:bednum ,price:{$gte: pricemin, $lte: pricemax}};
  }else if(cityname && datafont && bednum && pricemin && type){ //8.-cityname,datafont,bednum,pricemin,type
    query = {city: cityname, datasourceName:datafont ,bedroomNumber:bednum ,price:{$gte: pricemin} ,propertyType: type};
  }else if(cityname && datafont && bednum && pricemax && type){ //9.-cityname,datafont,bednum,pricemax,type
    query = {city: cityname, datasourceName:datafont ,bedroomNumber:bednum ,price:{$lte: pricemax} ,propertyType: type};
  }else if(cityname && datafont && pricemin && pricemax && type){ //10.-cityname,datafont,pricemin,pricemax,type
    query = {city: cityname, datasourceName:datafont ,price:{$gte: pricemin, $lte: pricemax} ,propertyType: type};
  }else if(cityname && bathnum && bednum && pricemin && pricemax){ //11.-cityname,bathnum,bednum,pricemin,pricemax
    query = {city: cityname, bathroomNumber:bathnum ,bedroomNumber:bednum ,price:{$gte: pricemin, $lte: pricemax}};
  }else if(cityname && bathnum && bednum && pricemin && type){ //12.-cityname,bathnum,bednum,pricemin,type
    query = {city: cityname, bathroomNumber:bathnum ,bedroomNumber:bednum ,price:{$gte: pricemin} ,propertyType: type};
  }else if(cityname && bathnum && bednum && pricemax && type){ //13.-cityname,bathnum,bednum,pricemax,type
    query = {city: cityname, bathroomNumber:bathnum ,bedroomNumber:bednum ,price:{$lte: pricemax} ,propertyType: type};
  }else if(cityname && bathnum && pricemin && pricemax && type){ //14.-cityname,bathnum,pricemin,pricemax,type
    query = {city: cityname, bathroomNumber:bathnum ,price:{$gte: pricemin, $lte: pricemax} ,propertyType: type};
  }else if(cityname && bednum && pricemin && pricemax && type){ //15.-cityname,bednum,pricemin,pricemax,type
    query = {city: cityname ,bedroomNumber:bednum ,price:{$gte: pricemin, $lte: pricemax} ,propertyType: type};
  }else if(datafont && bathnum && bednum && pricemin && pricemax){ //16.-datafont,bathnum,bednum,pricemin,pricemax
    query = {datasourceName:datafont, bathroomNumber:bathnum ,bedroomNumber:bednum ,price:{$gte: pricemin, $lte: pricemax}};
  }else if(datafont && bathnum && bednum && pricemin && type){ //17.-datafont,bathnum,bednum,pricemin,type
    query = {datasourceName:datafont, bathroomNumber:bathnum ,bedroomNumber:bednum ,price:{$gte: pricemin} ,propertyType: type};
  }else if(datafont && bathnum && bednum && pricemax && type){ //18.-datafont,bathnum,bednum,pricemax,type
    query = {datasourceName:datafont, bathroomNumber:bathnum ,bedroomNumber:bednum ,price:{$lte: pricemax} ,propertyType: type};
  }else if(datafont && bathnum && pricemin && pricemax && type){ //19.-datafont,bathnum,pricemin,pricemax,type
    query = {datasourceName:datafont, bathroomNumber:bathnum ,price:{$gte: pricemin, $lte: pricemax} ,propertyType: type};
  }else if(datafont && bednum && pricemin && pricemax && type){ //20.-datafont,bednum,pricemin,pricemax,type
    query = {datasourceName:datafont ,bedroomNumber:bednum ,price:{$gte: pricemin, $lte: pricemax} ,propertyType: type};
  }else if(bathnum && bednum && pricemin && pricemax && type){ //21.-bathnum,bednum,pricemin,pricemax,type
    query = {bathroomNumber:bathnum ,bedroomNumber:bednum ,price:{$gte: pricemin, $lte: pricemax} ,propertyType: type};
  ///4 combinations
  }else if(cityname && datafont && bathnum && bednum){ //1.-cityname,datafont,bathnum,bednum
    query = {city: cityname, datasourceName:datafont, bathroomNumber:bathnum ,bedroomNumber:bednum};
  }else if(cityname && datafont && bathnum && pricemin){ //2.-cityname,datafont,bathnum,pricemin
    query = {city: cityname, datasourceName:datafont, bathroomNumber:bathnum ,price:{$gte: pricemin}};
  }else if(cityname && datafont && bathnum && pricemax){ //3.-cityname,datafont,bathnum,pricemax
    query = {city: cityname, datasourceName:datafont, bathroomNumber:bathnum  ,price:{ $lte: pricemax}};
  }else if(cityname && datafont && bathnum && type){ //4.-cityname,datafont,bathnum,type
    query = {city: cityname, datasourceName:datafont, bathroomNumber:bathnum ,propertyType: type};
  }else if(cityname && datafont && bednum && pricemin){ //5.-cityname,datafont,bednum,pricemin
    query = {city: cityname, datasourceName:datafont, bedroomNumber:bednum ,price:{$gte: pricemin}};
  }else if(cityname && datafont && bednum && pricemax ){ //6.-cityname,datafont,bednum,pricemax
    query = {city: cityname, datasourceName:datafont ,bedroomNumber:bednum ,price:{$lte: pricemax}};
  }else if(cityname && datafont && bednum && type){ //7.-cityname,datafont,bednum,type
    query = {city: cityname, datasourceName:datafont ,bedroomNumber:bednum ,propertyType: type};
  }else if(cityname && datafont && pricemin && pricemax){ //8.-cityname,datafont,pricemin,pricemax
    query = {city: cityname, datasourceName:datafont ,price:{$gte: pricemin, $lte: pricemax}};
  }else if(cityname && datafont && pricemin && type){ //9.-cityname,datafont,pricemin,type
    query = {city: cityname, datasourceName:datafont ,price:{$gte: pricemin} ,propertyType: type};
  }else if(cityname && datafont && pricemax && type){ //10.-cityname,datafont,pricemax,type
    query = {city: cityname, datasourceName:datafont ,price:{$lte: pricemax} ,propertyType: type};
  }else if(cityname && bathnum && bednum && pricemin){ //11.-cityname,bathnum,bednum,pricemin
    query = {city: cityname, bathroomNumber:bathnum ,bedroomNumber:bednum ,price:{$gte: pricemin}};
  }else if(cityname && bathnum && bednum && pricemax){ //12.-cityname,bathnum,bednum,pricemax
    query = {city: cityname, bathroomNumber:bathnum ,bedroomNumber:bednum ,price:{ $lte: pricemax}};
  }else if(cityname && bathnum && bednum && type){ //13.-cityname,bathnum,bednum,type
    query = {city: cityname, bathroomNumber:bathnum ,bedroomNumber:bednum ,propertyType: type};
  }else if(cityname && bathnum && pricemin && pricemax){ //14.-cityname,bathnum,pricemin,pricemax
    query = {city: cityname, bathroomNumber:bathnum ,price:{$gte: pricemin, $lte: pricemax}};
  }else if(cityname && bathnum && pricemin && type){ //15.-cityname,bathnum,pricemin,type
    query = {city: cityname, bathroomNumber:bathnum ,price:{$gte: pricemin} ,propertyType: type};
  }else if(cityname && bathnum && pricemax && type){ //16.-cityname,bathnum,pricemax,type
    query = {city: cityname, bathroomNumber:bathnum ,price:{$lte: pricemax} ,propertyType: type};
  }else if(cityname && bednum && pricemin && pricemax){ //17.-cityname,bednum,pricemin,pricemax
    query = {city: cityname,bedroomNumber:bednum ,price:{$gte: pricemin, $lte: pricemax}};
  }else if(cityname && bednum && pricemin && type){ //18.-cityname,bednum,pricemin,type
    query = {city: cityname ,bedroomNumber:bednum ,price:{$gte: pricemin} ,propertyType: type};
  }else if(cityname && bednum && pricemax && type){ //19.-cityname,bednum,pricemax,type
    query = {city: cityname ,bedroomNumber:bednum ,price:{$lte: pricemax} ,propertyType: type};
  }else if(cityname && pricemin && pricemax && type){ //20.-cityname,pricemin,pricemax,type
    query = {city: cityname ,price:{$gte: pricemin, $lte: pricemax} ,propertyType: type};
  }else if(datafont && bathnum && bednum && pricemin){ //21.-datafont,bathnum,bednum,pricemin
    query = {datasourceName:datafont, bathroomNumber:bathnum ,bedroomNumber:bednum ,price:{$gte: pricemin}};
  }else if(datafont && bathnum && bednum && pricemax){ //22.-datafont,bathnum,bednum,pricemax
    query = {datasourceName:datafont, bathroomNumber:bathnum ,bedroomNumber:bednum ,price:{$lte: pricemax}};
  }else if(datafont && bathnum && bednum && type){ //23.-datafont,bathnum,bednum,type
    query = {datasourceName:datafont, bathroomNumber:bathnum ,bedroomNumber:bednum ,propertyType: type};
  }else if(datafont && bathnum && pricemin && pricemax){ //24.-datafont,bathnum,pricemin,pricemax
    query = {datasourceName:datafont, bathroomNumber:bathnum ,price:{$gte: pricemin, $lte: pricemax}};
  }else if(datafont && bathnum && pricemin && type){ //25.-datafont,bathnum,pricemin,type
    query = {datasourceName:datafont, bathroomNumber:bathnum ,price:{$gte: pricemin} ,propertyType: type};
  }else if(datafont && bathnum && pricemax && type){ //26.-datafont,bathnum,pricemax,type
    query = {datasourceName:datafont, bathroomNumber:bathnum ,price:{$lte: pricemax} ,propertyType: type};
  }else if(datafont && bednum && pricemin && pricemax){ //27.-datafont,bednum,pricemin,pricemax
    query = {datasourceName:datafont ,bedroomNumber:bednum ,price:{$gte: pricemin, $lte: pricemax}};
  }else if(datafont && bednum && pricemin && type){ //28.-datafont,bednum,pricemin,type
    query = {datasourceName:datafont ,bedroomNumber:bednum ,price:{$gte: pricemin} ,propertyType: type};
  }else if(datafont && bednum && pricemax && type){ //29.-datafont,bednum,pricemax,type
    query = {datasourceName:datafont ,bedroomNumber:bednum ,price:{$lte: pricemax} ,propertyType: type};
  }else if(datafont && pricemin && pricemax && type){ //30.-datafont,pricemin,pricemax,type
    query = {datasourceName:datafont ,price:{$gte: pricemin, $lte: pricemax} ,propertyType: type};
  }else if(bathnum && bednum && pricemin && pricemax){ //31.-bathnum,bednum,pricemin,pricemax
    query = {bathroomNumber:bathnum ,bedroomNumber:bednum ,price:{$gte: pricemin, $lte: pricemax}};
  }else if(bathnum && bednum && pricemin && type){ //32.-bathnum,bednum,pricemin,type
    query = {bathroomNumber:bathnum ,bedroomNumber:bednum ,price:{$gte: pricemin} ,propertyType: type};
  }else if(bathnum && bednum && pricemax && type){ //33.-bathnum,bednum,pricemax,type
    query = {bathroomNumber:bathnum ,bedroomNumber:bednum ,price:{$lte: pricemax} ,propertyType: type};
  }else if(bathnum && pricemin && pricemax && type){ //34.-bathnum,pricemin,pricemax,type
    query = {bathroomNumber:bathnum ,price:{$gte: pricemin, $lte: pricemax} ,propertyType: type};
  }else if(bednum && pricemin && pricemax && type){ //35.-bednum,pricemin,pricemax,type
    query = {bedroomNumber:bednum ,price:{$gte: pricemin, $lte: pricemax} ,propertyType: type};
  ///3 combinations
  }else if(cityname && datafont && bathnum){ //1.-cityname,datafont,bathnum
    query = {city: cityname, datasourceName:datafont, bathroomNumber:bathnum};
  }else if(cityname && datafont && bednum ){ //2.-cityname,datafont,bednum
    query = {city: cityname, datasourceName:datafont ,bedroomNumber:bednum};
  }else if(cityname && datafont && pricemin){ //3.-cityname,datafont,pricemin
    query = {city: cityname, datasourceName:datafont ,price:{$gte: pricemin}};
  }else if(cityname && datafont && pricemax){ //4.-cityname,datafont,pricemax
    query = {city: cityname, datasourceName:datafont,price:{$lte: pricemax}};
  }else if(cityname && datafont && type){ //5.-cityname,datafont,type
    query = {city: cityname, datasourceName:datafont ,propertyType: type};
  } else if(cityname && bathnum && bednum ){ //6.-cityname,bathnum,bednum
    query = {city: cityname, bathroomNumber:bathnum ,bedroomNumber:bednum};
  }else if(cityname && bathnum && pricemin){ //7.-cityname,bathnum,pricemin
    query = {city: cityname, bathroomNumber:bathnum ,price:{$gte: pricemin}};
  }else if(cityname && bathnum && pricemax){ //8.-cityname,bathnum,pricemax
    query = {city: cityname, bathroomNumber:bathnum ,price:{$lte: pricemax}};
  }else if(cityname && bathnum && type){ //9.-cityname,bathnum,type
    query = {city: cityname, bathroomNumber:bathnum ,propertyType: type};
  }else if(cityname && bednum && pricemin){ //10.-cityname,bednum,pricemin
    query = {city: cityname,bedroomNumber:bednum ,price:{$gte: pricemin}};
  }else if(cityname && bednum && pricemax ){ //11.-cityname,bednum,pricemax
    query = {city: cityname ,bedroomNumber:bednum ,price:{$lte: pricemax}};
  }else if(cityname && bednum && type){ //12.-cityname,bednum,type
    query = {city: cityname ,bedroomNumber:bednum ,propertyType: type};
  }else if(cityname && pricemin && pricemax){ //13.-cityname,pricemin,pricemax
    query = {city: cityname ,price:{$gte: pricemin, $lte: pricemax}};
  }else if(cityname && pricemin && type){ //14.-cityname,pricemin,type
    query = {city: cityname ,price:{$gte: pricemin} ,propertyType: type};
  }else if(cityname && pricemax && type){ //15.-cityname,pricemax,type
    query = {city: cityname ,price:{$lte: pricemax} ,propertyType: type};
  }else if(datafont && bathnum && bednum){ //16.-datafont,bathnum,bednum
    query = {datasourceName:datafont, bathroomNumber:bathnum ,bedroomNumber:bednum};
  }else if(datafont && bathnum && pricemin){ //17.-datafont,bathnum,pricemin
    query = {datasourceName:datafont, bathroomNumber:bathnum ,price:{$gte: pricemin}};
  }else if(datafont && bathnum && pricemax){ //18.-datafont,bathnum,pricemax
    query = {datasourceName:datafont, bathroomNumber:bathnum ,price:{$lte: pricemax}};
  }else if(datafont && bathnum && type){ //19.-datafont,bathnum,type
    query = {datasourceName:datafont, bathroomNumber:bathnum ,propertyType: type};
  }else if(datafont && bednum && pricemin){ //20.-datafont,bednum,pricemin
    query = {datasourceName:datafont ,bedroomNumber:bednum ,price:{$gte: pricemin}};
  }else if(datafont && bednum && pricemax ){ //21.-datafont,bednum,pricemax
    query = {datasourceName:datafont,bedroomNumber:bednum ,price:{$lte: pricemax}};
  }else if(datafont && bednum && type){ //22.-datafont,bednum,type
    query = {datasourceName:datafont, bedroomNumber:bednum ,propertyType: type};
  } else if(datafont && pricemin && pricemax){ //23.-datafont,pricemin,pricemax
    query = {datasourceName:datafont,price:{$gte: pricemin, $lte: pricemax}};
  }else if(datafont && pricemin && type){ //24.-datafont,pricemin,type
    query = {datasourceName:datafont,price:{$gte: pricemin} ,propertyType: type};
  }else if(datafont && pricemax && type){ //25.-datafont,pricemax,type
    query = {datasourceName:datafont,price:{$lte: pricemax} ,propertyType: type};
  }else if(bathnum && bednum && pricemin){ //26.-bathnum,bednum,pricemin
    query = {bathroomNumber:bathnum ,bedroomNumber:bednum ,price:{$gte: pricemin}};
  }else if(bathnum && bednum && pricemax){ //27.-bathnum,bednum,pricemax
    query = {bathroomNumber:bathnum ,bedroomNumber:bednum ,price:{$lte: pricemax}};
  }else if(bathnum && bednum && type){ //28.-bathnum,bednum,type
    query = {bathroomNumber:bathnum ,bedroomNumber:bednum ,propertyType: type};
  } else if(bathnum && pricemin && pricemax ){ //29.-bathnum,pricemin,pricemax
    query = {bathroomNumber:bathnum ,price:{$gte: pricemin, $lte: pricemax}};
  }else if(bathnum && pricemin && type){ //30.-bathnum,pricemin,type
    query = {bathroomNumber:bathnum ,price:{$gte: pricemin} ,propertyType: type};
  }else if(bathnum && pricemax && type){ //31.-bathnum,pricemax,type
    query = {bathroomNumber:bathnum ,price:{$lte: pricemax} ,propertyType: type};
  }else if(bednum && pricemin && pricemax){ //32.-bednum,pricemin,pricemax
    query = {bedroomNumber:bednum ,price:{$gte: pricemin, $lte: pricemax}};
  }else if(bednum && pricemin && type){ //33.-bednum,pricemin,type
    query = {bedroomNumber:bednum ,price:{$gte: pricemin} ,propertyType: type};
  }else if(bednum && pricemax && type){ //34.-bednum,pricemax,type
    query = {bedroomNumber:bednum ,price:{$lte: pricemax} ,propertyType: type};
  }else if(pricemin && pricemax && type){ //35.-pricemin,pricemax,type
    query = {price:{$gte: pricemin, $lte: pricemax} ,propertyType: type};
  ///2 combinations
  }else if(cityname && datafont){ //1.-cityname,datafont
    query = {city: cityname, datasourceName:datafont};
  }else if(cityname && bathnum){ //2.-cityname,bathnum
    query = {city: cityname, bathroomNumber:bathnum};
  }else if(cityname && bednum){ //3.-cityname,bednum
    query = {city: cityname, bedroomNumber:bednum };
  }else if(cityname && pricemin){ // 4.-cityname,pricemin
    query = {city: cityname, price:{$gte: pricemin}};
  }else if(cityname && pricemax){ //5.-cityname,pricemax
    query = {city: cityname, price:{$lte: pricemax}};
  }else if(cityname && type){ //6.-cityname,type
    query = {city: cityname ,propertyType: type};
  }else if(datafont && bathnum){ //7.-datafont,bathnum
    query = {datasourceName:datafont, bathroomNumber:bathnum};
  }else if(datafont && bednum){ //8.-datafont,bednum
    query = {datasourceName:datafont ,bedroomNumber:bednum};
  }else if(datafont && pricemin){ //9.-datafont,pricemin
    query = {datasourceName:datafont ,price:{$gte: pricemin}};
  }else if(datafont && pricemax){ //10.-datafont,pricemax
    query = {datasourceName:datafont, price:{$lte: pricemax}};
  }else if(datafont && type){ //11.-datafont,type
    query = {datasourceName:datafont ,propertyType: type};
  }else if(bathnum && bednum){ //12.-bathnum,bednum
    query = {bathroomNumber:bathnum ,bedroomNumber:bednum};
  }else if(bathnum && pricemin){ //13.-bathnum,pricemin
    query = {bathroomNumber:bathnum ,price:{$gte: pricemin}};
  }else if(bathnum && pricemax){ //14.-bathnum,pricemax
    query = {bathroomNumber:bathnum ,price:{$lte: pricemax}};
  }else if(bathnum && type){ //15.-bathnum,type
    query = {bathroomNumber:bathnum ,propertyType: type};
  }else if(bednum && pricemin){ //16.-bednum,pricemin
    query = {bedroomNumber:bednum ,price:{$gte: pricemin}};
  }else if(bednum && pricemax){ //17.-bednum,pricemax
    query = {bedroomNumber:bednum ,price:{$lte: pricemax}};
  }else if(bednum && type){ //18.-bednum,type
    query = {bedroomNumber:bednum ,propertyType: type};
  }else if(pricemin && pricemax){ //19.-pricemin,pricemax
    query = {price:{$gte: pricemin, $lte: pricemax}};
  }else if(pricemin && type){ //20.-pricemin,type
    query = {price:{$gte: pricemin} ,propertyType: type};
  }else if(pricemax && type){ //21.-pricemax,type
    query = {price:{$lte: pricemax} ,propertyType: type};
  ///1 combinations
  }else if(cityname){ //1.-cityname
    query = {city: cityname};
  }else if(datafont){ //2.-datafont
    query = {datasourceName:datafont};
  }else if(bathnum){ //3.-bathnum
    query = {bathroomNumber:bathnum};
  }else if(bednum){ //4.-bednum
    query = {bedroomNumber:bednum};
  }else if(pricemin){ //5.-pricemin
    query = {price:{$gte: pricemin}};
  }else if(pricemax){ //6.-pricemax
    query = {price:{$lte: pricemax}};
  }else if(type){ //7.-type
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
              var qery = {alert: "Viviendas no encontradas"};
              res.render('map',{array:houses, location:citys, middle:position, zum:8, error:0, qry : qery});
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
