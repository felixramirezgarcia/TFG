'use strict'

var House = require('../models/houseschema');

/* POST house. */
function saveHouse(req, res) {
  var house = new House();

  var params = req.body;

  if(params.bathroomNumber){
    house.bathroomNumber = params.bathroomNumber;
  }
  if(params.bedroomNumber){
    house.bedroomNumber = params.bedroomNumber;
  }
  if(params.carSpaces){
    house.carSpaces = params.carSpaces;
  }
  if(params.comission){
    house.comission = params.comission;
  }
  if(params.constructionYear){
    house.constructionYear = params.constructionYear;
  }
  if(params.datasourceName){
    house.datasourceName = params.datasourceName;
  }
  if(params.floor){
    house.floor = params.floor;
  }
  if(params.imgHeight){
    house.imgHeight = params.imgHeight;
  }
  if(params.imgUrl){
    house.imgUrl = params.imgUrl;
  }
  if(params.imgWidth){
    house.imgWidth = params.imgWidth;
  }
  if(params.keywords){
    house.keywords = params.keywords;
  }
  if(params.latitude){
    house.latitude = params.latitude;
  }
  if(params.listerName){
    house.listerName = params.listerName;
  }
  if(params.listerUrl){
    house.listerUrl = params.listerUrl;
  }
  if(params.listingType){
    house.listingType = params.listingType;
  }
  if(params.locationAccuracy){
    house.locationAccuracy = params.locationAccuracy;
  }
  if(params.longitude){
    house.longitude = params.longitude;
  }
  if(params.price){
    house.price = params.price;
  }
  if(params.priceCurrency){
    house.priceCurrency = params.priceCurrency;
  }
  if(params.priceFormatted){
    house.priceFormatted = params.priceFormatted;
  }
  if(params.priceHight){
    house.priceHight = params.priceHight;
  }
  if(params.priceLow){
    house.priceLow = params.priceLow;
  }
  if(params.propertyType){
    house.propertyType = params.propertyType;
  }
  if(params.roomNumber){
    house.roomNumber = params.roomNumber;
  }
  if(params.size){
    house.size = params.size;
  }
  if(params.sizeType){
    house.sizeType = params.sizeType;
  }
  if(params.summary){
    house.summary = params.summary;
  }
  if(params.thumbHeight){
    house.thumbHeight = params.thumbHeight;
  }
  if(params.thumbUrl){
    house.thumbUrl = params.thumbUrl;
  }
  if(params.thumbWidth){
    house.thumbWidth = params.thumbWidth;
  }
  if(params.title){
    house.title = params.title;
  }
  if(params.updatedInDays){
    house.updatedInDays = params.updatedInDays;
  }
  if(params.updatedInDaysFormatted){
    house.updatedInDaysFormatted = params.updatedInDaysFormatted;
  }
  if(params.get_day){
    house.get_day = params.get_day;
  }
  if(params.get_month){
    house.get_month = params.get_month;
  }
  if(params.get_year){
    house.get_year = params.get_year;
  } 

  house.save((err, houseStored) => {
    if(err){
      res.status(500).send({
        message: 'Error en el servidor'
      });
    }else{
      if(houseStored){
        res.status(200).send({
          house : houseStored
        });
      }else{
        res.status(200).send({
          message: 'No se ha almacenado'
        });
      }
    }
  });

}

function getHouses(req, res) {
  House.find({ price:{$gte: 5500000} }).exec((err,houses) => {
    if(err){
      res.status(500).send({
        message: 'Error en el servidor'
      });
    }else{
      if(houses){
        res.status(200).send({
          houses
        });
      }else{
        res.status(404).send({
          message: 'No hay casas'
        });
      }
    }
  });
}

function getHouse(req, res) {
  var houseId = req.params.id;

  House.findById(houseId).exec((err,house) => {
    if(err){
      res.status(500).send({
        message: 'Error en el servidor'
      });
    }else{
      if(house){
        res.status(200).send({
          house
        });
      }else{
        res.status(404).send({
          message: 'No hay casa'
        });
      }
    }
  });
}

module.exports = {
    saveHouse,
    getHouses,
    getHouse
};
