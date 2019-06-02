class Mapa{
    
    constructor(mid,zu, idElement,err,arr){
        const classob = new Datos(err,arr);
        this.map = new google.maps.Map(document.getElementById(idElement), {
            center: {lat: mid.lat , lng: mid.lng},
            zoom: zu
        });

        this.centro = mid;
        this.infowindow = new google.maps.InfoWindow();
        this.colorRojo = "FE7569";
        this.colorNaranja = "EEAC69";
        this.colorAmarillo = "ECF361";
        this.colorAzul = "61BAF3";
        this.colorVerde = "5AB440";
        this.rojo =      new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + this.colorRojo,
                        new google.maps.Size(21, 34),new google.maps.Point(0,0),new google.maps.Point(10, 34));
        this.naranja =   new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + this.colorNaranja,
                        new google.maps.Size(21, 34),new google.maps.Point(0,0),new google.maps.Point(10, 34));
        this.amarillo =  new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + this.colorAmarillo,
                        new google.maps.Size(21, 34),new google.maps.Point(0,0),new google.maps.Point(10, 34));
        this.azul =      new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + this.colorAzul,
                        new google.maps.Size(21, 34),new google.maps.Point(0,0),new google.maps.Point(10, 34));
        this.verde =     new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + this.colorVerde,
                        new google.maps.Size(21, 34),new google.maps.Point(0,0),new google.maps.Point(10, 34));
        this.pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
                        new google.maps.Size(40, 37),new google.maps.Point(0, 0),new google.maps.Point(12, 35));
        
        this.types = classob.getTypes();
        this.beds = classob.getBeds();
        this.baths = classob.getBaths();
        this.prices = classob.getPrices();
        this.summarys = classob.getSummarys();
        this.urls = classob.getUrls();
        this.places = classob.getPlaces();

        this.printMarkers();
    }

    printMarkers(){
        for(let j=0; j< this.places.length; j++){
            let tam = this.places.length/5;
            let marker;
            if(j < tam){
                marker = new google.maps.Marker({
                    map: this.map,
                    position: this.places[j],
                    icon: this.verde,
                    shadow: this.pinShadow
                });
            }else if(j < tam*2){
                marker = new google.maps.Marker({
                    map: this.map,
                    position: this.places[j],
                    icon: this.azul,
                    shadow: this.pinShadow
                });
            }else if(j < tam*3){
                marker = new google.maps.Marker({
                    map: this.map,
                    position: this.places[j],
                    icon: this.amarillo,
                    shadow: this.pinShadow
                });
            }else if(j < tam*4){
                marker = new google.maps.Marker({
                    map: this.map,
                    position: this.places[j],
                    icon: this.naranja,
                    shadow: this.pinShadow
                });
            }else if(j < tam*5){
                marker = new google.maps.Marker({
                    map: this.map,
                    position: this.places[j],
                    icon: this.rojo,
                    shadow: this.pinShadow
                });
            }else{
                marker = new google.maps.Marker({
                    map: this.map,
                    position: this.places[j],
                    icon: this.amarillo,
                    shadow: this.pinShadow
                });
            }

            google.maps.event.addListener(marker, 'click', ((marker, j) => {
                return  () => {
                    let aux;

                    if(this.types[j] === 'house')    aux = "Casa"
                    else if(this.types[j] === 'flat')    aux = "Piso"
                    else if(this.types[j] === 'property')   aux = "Propiedad"
                    
                    let a = '<div align="center">'+
                                '<p>Tipo de vivienda: '+ aux + '</p>' +
                                '<p>'+ this.beds[j] + ' Habitaciones</p>' +
                                '<p>'+ this.baths[j] + ' Baños</p>' +
                                '<p>'+ this.prices[j] + '€</p>' +
                                '<p>'+ this.summarys[j] + '</p>' +
                                '<a href="'+ this.urls[j] + '" target="_blank">Ver más información</a>' +
                            '</div>';
                    this.infowindow.setContent(a);
                    this.infowindow.open(this.map, marker);
                }
            })(marker, j)); 
        } 
    }

}