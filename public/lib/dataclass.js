class Datos{
    
    constructor(error,array){
        this.getError(error);
        this.data = array;
        this.init = this.initializeCityes();
    }

    getError(error){
        if (error && error.code >= 1) { 
            alert(error.msg);
        }
    }

    initializeCityes(){
        //Sevilla, Cadiz, Granada, Almeria, Cordoba, Malaga, Huelva, Jaen
        return [{lat: 37.389091, lng: -5.984459},{lat: 36.527061, lng: -6.288596},{lat: 37.177338, lng: -3.598557}
               ,{lat: 36.834045, lng: -2.463714},{lat: 37.888176, lng: -4.779383},{lat: 36.721275, lng: -4.421399}
               ,{lat: 37.261421, lng: -6.944722},{lat: 37.765781, lng: -3.789390}]
    }

    getCitys(){
        return this.init;
    }

    getCount(){
        //Sevilla, Cadiz, Granada, Almeria, Cordoba, Malaga, Huelva, Jaen
        return ['9700','1459','5700','3758','9450','10550','2433','2050'];
    }

    setPrices(){
        $.ajax({
            url: "/house/getPricesInterval",
            context: document.body
          }).done(function() {
            $( this ).addClass( "done" );
          });
    }

    getData(){
        return this.data;
    }

    getPricesUntil(cantidad){
        return this.data.filter(place => place.price < cantidad);
    }

    getPricesBetween(start,end){
        return this.data.filter(place => (place.price >= start && place.price < end));
    }
}