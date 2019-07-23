class Datos{
    
    constructor(error,array){
        this.getError(error);
        this.data = array;
    }

    getError(error){
        if (error && error.code >= 1) { 
            alert(error.msg);
        }
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