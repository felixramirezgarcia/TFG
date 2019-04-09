'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HouseSchema = new Schema({
    bathroomNumber: Number,
    bedroomNumber: Number,
    carSpaces: Number,
    comission: Number,
    constructionYear: Number,
    datasourceName: String,
    floor: Number,
    imgHeight: Number,
    imgUrl: String,
    imgWidth: Number,
    keywords: String,
    latitude: Number,
    listerName: String,
    listerUrl: String,
    listingType: String,
    locationAccuracy: Number,
    longitude: Number,
    price: Number,
    priceCurrency: String,
    priceFormatted: String,
    priceHight: Number,
    priceLow: Number,
    propertyType: String,
    roomNumber: Number,
    size: Number,
    sizeType: String,
    summary: String,
    thumbHeight: Number,
    thumbUrl: String,
    thumbWidth: Number,
    title: String,
    updatedInDays: Number,
    updatedInDaysFormatted: String,
    get_day: Number,
    get_month: Number,
    get_year: Number
});

module.exports = mongoose.model('House',HouseSchema);