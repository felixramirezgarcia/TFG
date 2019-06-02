class Datos{
    constructor(error,array){
        this.getError(error);
        this.urls = [];
        this.beds = [];
        this.baths = [];
        this.prices = [];
        this.summarys = [];
        this.types = [];
        this.places = [];
        this.lista = [];
        this.initVars(array);
        this.initList();
        console.log('CONSTRUCTOR INVOKED')
        console.log('error, array ',array)
    }

    getError(error){
        if (error && error.code >= 1) {
            alert(error.msg);
        }
    }

    initVars(array){
        for(let place of array) {
            var p = place.price;
            this.prices.push(p);
            this.urls.push(place.listerUrl);
            this.beds.push(place.bedroomNumber);
            this.baths.push(place.bathroomNumber);
            this.summarys.push(place.summary);
            this.types.push(place.propertyType);
            var latitud = place.latitude;
            var longitud = place.longitude;
            var placex = {lat: latitud, lng: longitud};
            this.places.push(placex);
        } 
    }

    initList(){
        for(var i=0; i < this.prices.length; i++) {
            this.lista.push({
                'url' : this.urls[i],
                'price' : this.prices[i],
                'bed' : this.beds[i],
                'bath' : this.baths[i],
                'summary' : this.summarys[i],
                'place' : this.places[i],
            });
        } 

        this.lista.sort( (a, b) => {
            if (parseInt(a.price, 10) > parseInt(b.price, 10)) return 1;
            if (parseInt(a.price, 10) < parseInt(b.price, 10)) return -1;
            return 0;
        });

        for(var i=0; i < this.lista.length; i++) {
            this.prices[i]= this.lista[i].price;
            this.urls[i]= this.lista[i].url;
            this.beds[i]= this.lista[i].bed;
            this.baths[i]= this.lista[i].bath;
            this.summarys[i]= this.lista[i].summary;
            this.places[i]= this.lista[i].place;
        } 
        
    }

    getUrls(){return this.urls;}

    getBeds(){return this.beds;}

    getBaths(){return this.baths;}

    getSummarys(){return this.summarys;}

    getTypes(){return this.types;}

    getPlaces(){return this.places;}

    getPrices(){return this.prices;}


}