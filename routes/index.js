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
  var winner;

  if(cityname){
    zoom = 14;

    var replaced = cityname.split(' ').join('-');
    var list_citys = [
    "Abla","Abrucena","Adra","Alboloduy","Albánchez","Alcudia-de-Monteagud","Alcóntar","Alhabia","Alhama-de-Almería","Alicún","Almería","Alsodux","Arboleas","Armuña-de-Almanzora","Bacares","Bayarque","Bayárcal","Beires","Benahadux","Benitagla","Benizalón","Bentarique","Berja","Bédar","Canjáyar","Cantoria","Carboneras","Chercos","Chirivel","Cuevas-del-Almanzora","Cóbdar","Dalías","Ejido","Enix","Felix","Fines","Fiñana","Fondón","Garrucha","Gádor","Gérgal","Huécija","Huércal-de-Almería","Huércal-Overa","Illar","Instinción","Laroya","Lubrín","Lucainena-de-las-Torres","Láujar-de-Andarax","Líjar",
    "Lúcar","Macael","María","Mojonera","Mojácar","Nacimiento","Níjar","Ohanes","Olula-de-Castro","Olula-del-Río","Oria","Padules","Partaloa","Paterna-del-Río","Pulpí","Purchena","Roquetas-de-Mar","Rágol","Santa-Fe-de-Mondújar","Serón","Sierro","Sorbas","Suflí","Tabernas","Taberno","Tahal","Terque","Tres-Villas","Turre","Turrillas","Tíjola","Uleila-del-Campo","Urrácal","Velefique","Vera","Viator","Vélez-Blanco","Vélez-Rubio","Vícar","Zurgena","Alcalá-de-los-Gazules","Algeciras","Algodonales","Arcos-de-la-Frontera","Barbate","Benalup-Casas-Viejas","Benaocaz",
    "Bornos","Castellar-de-la-Frontera","Chiclana-de-la-Frontera","Chipiona","Conil-de-la-Frontera","Cádiz","Espera","Gastor","Grazalema","Jerez-de-la-Frontera","Jimena-de-la-Frontera","Línea-de-la-Concepción","Medina-Sidonia","Olvera","Paterna-de-Rivera","Prado-del-Rey","Puerto-Real","Puerto-Serrano","Puerto-de-Santa-María","Rota","San-Fernando","San-José-del-Valle","San-Roque","Sanlúcar-de-Barrameda","Setenil-de-las-Bodegas","Tarifa","Trebujena","Ubrique","Vejer-de-la-Frontera","Villaluenga-del-Rosario","Villamartín","Zahara","Adamuz","Aguilar-de-la-Frontera","Alcaracejos","Almedinilla","Almodóvar-del-Río","Añora","Baena","Belalcázar","Benamejí","Blázquez","Bujalance","Cabra","Carcabuey","Cardeña","Carlota","Carpio","Castro-del-Río","Cañete-de-las-Torres","Córdoba","Dos-Torres","Espejo","Espiel","Fernán-Núñez","Fuente-Obejuna","Fuente-Palmera","Fuente-Tójar","Granjuela","Guadalcázar","Hinojosa-del-Duque","Hornachuelos","Iznájar","Lucena","Luque","Montalbán-de-Córdoba","Montilla","Montoro","Monturque","Moriles","Nueva-Carteya","Obejo","Palma-del-Río","Pedro-Abad","Peñarroya-Pueblonuevo","Posadas","Pozoblanco","Priego-de-Córdoba","Puente-Genil","Rute","San-Sebastián-de-los-Ballesteros","Santa-Eufemia","Santaella","Torrecampo","Victoria","Villa-del-Río","Villafranca-de-Córdoba","Villaharta","Villanueva-de-Córdoba","Villanueva-del-Duque","Villaralto",
    "Villaviciosa-de-Córdoba","Zuheros","Albolote","Albondón","Albuñol","Albuñuelas","Albuñán","Alfacar","Algarinejo","Alhama-de-Granada","Alhendín","Almegíjar","Almuñécar","Alpujarra-de-la-Sierra","Alquife","Arenas-del-Rey","Armilla","Atarfe","Baza","Beas-de-Granada","Beas-de-Guadix","Benamaurel","Bubión","Busquístar","Bérchules","Cacín","Calahorra","Calicasas","Campotéjar","Caniles","Capileira","Carataunas","Castilléjar","Castril","Cenes-de-la-Vega","Chauchina","Chimeneas","Churriana-de-la-Vega","Cijuela","Cogollos-de-Guadix","Cogollos-de-la-Vega","Colomera","Cortes-de-Baza","Cortes-y-Graena","Cuevas-del-Campo","Cádiar","Cájar",
    "Cástaras","Cáñar","Cúllar","Cúllar-Vega","Darro","Deifontes","Diezma","Dílar","Dólar","Dúdar","Dúrcal","Escúzar","Fonelas","Freila","Fuente-Vaqueros","Gabias","Gorafe","Granada","Guadahortuna","Guadix","Guajares","Gualchos","Gójar","Güejar-Sierra","Güevéjar","Huélago","Huéneja","Huéscar","Huétor-Tájar","Huétor-Vega","Huétor-de-Santillán","Illora","Itrabo","Iznalloz","Jayena","Jerez-del-Marquesado","Jete","Jun","Juviles","Lanjarón","Lanteira","Lecrín","Lentegí","Lobras","Loja",
    "Láchar","Lújar","Malahá","Maracena","Marchal","Moclín","Monachil","Montefrío","Montejícar","Montillana","Moraleda-de-Zafayona","Morelábor","Motril","Murtas","Nevada","Nigüelas","Nívar","Ogíjares","Orce","Otívar","Padul","Pampaneira","Pedro-Martínez","Peligros","Pinos-Genil","Pinos-Puente","Puebla-de-Don-Fadrique","Pulianas","Purullena","Pórtugos","Quéntar","Salobreña","Santa-Cruz-del-Comercio","Santa-Fe","Soportújar","Sorvilán","Taha","Torvizcón","Trevélez","Turón",
    "Ugíjar","Valle-del-Zalabí","Vegas-del-Genil","Ventas-de-Huelma","Villamena","Villanueva-Mesía","Villanueva-de-las-Torres","Válor","Vélez-de-Benaudalla","Víznar","Zafarraya","Zagra","Zubia","Órgiva","Aljaraque","Almonaster-la-Real","Almonte","Alosno","Alájar","Aracena","Aroche","Arroyomolinos-de-León","Ayamonte","Beas","Bollullos-Par-del-Condado","Bonares","Cabezas-Rubias","Cala","Calañas","Cartaya","Castaño-del-Robledo","Cañaveral-de-León","Chucena","Corteconcepción","Cortelazor","Cumbres-Mayores","Encinasola","Escacena-del-Campo","Fuenteheridos","Galaroza","Gibraleón","Granada-de-Río-Tinto",
    "Granado","Higuera-de-la-Sierra","Hinojales","Hinojos","Huelva","Isla-Cristina","Jabugo","Lepe","Linares-de-la-Sierra","Lucena-del-Puerto","Manzanilla","Minas-de-Riotinto","Moguer","Nerva","Niebla","Palma-del-Condado","Palos-de-la-Frontera","Paterna-del-Campo","Paymogo","Puebla-de-Guzmán","Puerto-Moral","Punta-Umbría","Rociana-del-Condado","Rosal-de-la-Frontera","San-Bartolomé-de-la-Torre","San-Juan-del-Puerto","Sanlúcar-de-Guadiana","Santa-Ana-la-Real","Santa-Bárbara-de-Casa","Santa-Olalla-del-Cala","Trigueros","Valdelarco","Valverde-del-Camino","Villablanca","Villalba-del-Alcor","Villanueva-de-los-Castillejos","Villarrasa","Zalamea-la-Real","Zufre","Albanchez-de-Mágina","Alcalá-la-Real",
    "Alcaudete","Aldeaquemada","Andújar","Arjona","Arjonilla","Arquillos","Arroyo-del-Ojanco","Baeza","Bailén","Baños-de-la-Encina","Beas-de-Segura","Bedmar-y-Garcíez","Begíjar","Cabra-del-Santo-Cristo","Cambil","Campillo-de-Arenas","Carboneros","Carolina","Castellar","Castillo-de-Locubín","Cazalilla","Chiclana-de-Segura","Chilluévar","Cárcheles","Escañuela","Espelúy","Frailes","Fuensanta-de-Martos","Fuerte-del-Rey","Guarromán","Génave","Hinojares","Huelma","Huesa","Ibros","Iznatoraf","Jabalquinto","Jamilena","Jaén","Jimena","Jódar","Linares","Lopera","Lupión","Mancha-Real","Marmolejo","Martos","Mengíbar","Montizón","Noalejo","Orcera","Peal-de-Becerro","Pegalajar","Pozo-Alcón","Puente-de-Génave","Quesada","Rus","Sabiote","Santiago-de-Calatrava","Santiago-Pontones","Santisteban-del-Puerto","Segura-de-la-Sierra","Siles","Torre-del-Campo","Torreblascopedro","Torredonjimeno","Torreperogil","Torres-de-Albánchez","Valdepeñas-de-Jaén","Vilches","Villacarrillo","Villanueva-de-la-Reina","Villanueva-del-Arzobispo","Villardompardo","Villarrodrigo","Villatorres","Alcaucín","Alfarnate","Alfarnatejo","Algarrobo","Algatocín",
    "Alhaurín-de-la-Torre","Alhaurín-el-Grande","Almargen","Almogía","Almáchar","Alozaina","Alpandeire","Antequera","Ardales","Arenas","Arriate","Atajate","Benahavís","Benalauría","Benalmádena","Benamargosa","Benamocarra","Benaoján","Benarrabá","Borge","Burgo","Canillas-de-Aceituno","Canillas-de-Albaida","Carratraca","Casabermeja","Casarabonela","Casares","Cañete-la-Real","Colmenar","Comares","Cortes-de-la-Frontera","Coín","Cuevas-Bajas","Cuevas-de-San-Marcos","Cártama","Cómpeta","Cútar","Estepona","Frigiliana","Fuente-de-Piedra","Gaucín","Genalguacil","Guaro","Humilladero","Igualeja","Istán","Iznate","Jimera-de-Líbar","Jubrique","Júzcar","Macharaviaya","Manilva","Marbella","Mijas","Moclinejo","Mollina","Monda","Montejaque","Málaga","Nerja","Ojén","Parauta","Periana","Pizarra","Rincón-de-la-Victoria","Ronda","Salares","Sayalonga","Sedella","Sierra-de-Yeguas","Teba","Tolox","Torremolinos","Torrox","Totalán","Valle-de-Abdalajís","Villanueva-de-Algaidas","Villanueva-de-Tapia","Villanueva-del-Trabuco","Vélez-Málaga","Yunquera","Álora","Árchez","Alanís",
    "Albaida-del-Aljarafe","Alcalá-de-Guadaíra","Alcalá-del-Río","Alcolea-del-Río","Algaba","Algámitas","Almadén-de-la-Plata","Almensilla","Arahal","Aznalcázar","Aznalcóllar","Badolatosa","Benacazón","Bollullos-de-la-Mitación","Bormujos","Brenes","Cabezas-de-San-Juan","Camas","Campana","Cantillana","Carmona","Carrión-de-los-Céspedes","Casariche","Castilblanco-de-los-Arroyos","Castilleja-de-Guzmán","Castilleja-de-la-Cuesta","Castilleja-del-Campo","Cazalla-de-la-Sierra","Cañada-Rosal","Constantina","Coria-del-Río","Coripe","Coronil","Dos-Hermanas","Espartinas","Estepa","Fuentes-de-Andalucía","Garrobo","Gelves","Gerena","Gilena","Gines","Guadalcanal",
    "Guillena","Herrera","Isla-Mayor","Lantejuela","Lebrija","Lora-de-Estepa","Lora-del-Río","Luisiana","Madroño","Mairena-del-Alcor","Mairena-del-Aljarafe","Marchena","Marinaleda","Martín-de-la-Jara","Morón-de-la-Frontera","Navas-de-la-Concepción","Osuna","Palacios-y-Villafranca","Palomares-del-Río","Paradas","Peñaflor","Pilas","Pruna","Puebla-de-Cazalla","Puebla-de-los-Infantes","Puebla-del-Río","Real-de-la-Jara","Rinconada","Ronquillo","Salteras","San-Juan-de-Aznalfarache","Sanlúcar-la-Mayor","Santiponce","Saucejo",
    "Sevilla","Tocina","Tomares","Umbrete","Utrera","Valencina-de-la-Concepción","Villamanrique-de-la-Condesa","Villanueva-de-San-Juan","Villanueva-del-Ariscal","Villanueva-del-Río-y-Minas","Villaverde-del-Río","Viso-del-Alcor","Écija"];
    var winnerNumber = 100000;

    for (var b = 0; b < list_citys.length; b++) {
        var distance = levenshtein_distance(replaced, list_citys[b]);
        if (distance < winnerNumber) {
            winnerNumber = distance;
            winner = list_citys[b]; 
        }
    }

  } 

  if(type === "allTypes") type = null;
  var query = getQuery(winner,datafont,bathnum,bednum,pricemin,pricemax,type);
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
  var init_map = 1;

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
              res.render('map',{array:houses, location:citys, middle:position, zum:8, error:0, qry:query, init:init_map});
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
  var init_map = 0;

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
                res.render('map',{array: houses, location:citys, middle:position, zum:zoom, error:0, qry : query, init:init_map});
              }else{
                var position = {lat: 37.6000000, lng: -4.5000000};
                res.render('map',{array: houses, location:citys, middle:position, zum:zoom, error:0, qry : query, init:init_map});
              }
            }else{
              var position = {lat: 37.6000000, lng: -4.5000000};
              var qery = {alert: "Viviendas no encontradas"};
              res.render('map',{array:houses, location:citys, middle:position, zum:8, error:0, qry : qery, init:init_map});
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

function blankArray(length){
  var temp = [];
  for (var a = 0; a < length; a++) {
      temp[a] = 0;    
  }
  return temp;
}

function levenshtein_distance(pattern,text){
  var i = 0, i2 = 0, matrix = [], width = text.length, height = pattern.length;
      
  for (i = 0; i <= width; i++) {
      matrix[i] = blankArray(height+1);
      matrix[i][0] = i;
  }
  
  for (i = 0; i <= height; i++) {
      matrix[0][i] = i;    
  }
  
  for (i = 1; i <= height; i++) {
      for (i2 = 1; i2 <= width; i2++) {
          if (pattern[i-1] === text[i2-1]) {
              matrix[i2][i] = matrix[i2-1][i-1];    
          } else {
              var deletion = matrix[i2-1][i] + 1;
              var insertion = matrix[i2][i-1] + 1;
              var substitution = matrix[i2-1][i-1] + 1;
              matrix[i2][i] = Math.min(deletion, insertion, substitution);                                    
          }
      }
  }
  return matrix[width][height];
};

module.exports = router;

