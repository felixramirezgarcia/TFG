class Mapa {

    constructor(mid, zu, idElement, err, arr) {
        const classob = new Datos(err, arr);
        
        this.map = new google.maps.Map(document.getElementById(idElement), {
            center: { lat: mid.lat, lng: mid.lng },
            zoom: zu
        });

        this.centro = mid;
        this.infowindow = new google.maps.InfoWindow();
        this.colorRojo = "FE7569";
        this.colorNaranja = "EEAC69";
        this.colorAmarillo = "ECF361";
        this.colorAzul = "61BAF3";
        this.colorVerde = "5AB440";
        this.rojo = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + this.colorRojo,
            new google.maps.Size(21, 34), new google.maps.Point(0, 0), new google.maps.Point(10, 34));
        this.naranja = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + this.colorNaranja,
            new google.maps.Size(21, 34), new google.maps.Point(0, 0), new google.maps.Point(10, 34));
        this.amarillo = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + this.colorAmarillo,
            new google.maps.Size(21, 34), new google.maps.Point(0, 0), new google.maps.Point(10, 34));
        this.azul = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + this.colorAzul,
            new google.maps.Size(21, 34), new google.maps.Point(0, 0), new google.maps.Point(10, 34));
        this.verde = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + this.colorVerde,
            new google.maps.Size(21, 34), new google.maps.Point(0, 0), new google.maps.Point(10, 34));
        this.pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
            new google.maps.Size(40, 37), new google.maps.Point(0, 0), new google.maps.Point(12, 35));


        this.places = classob.getData();
        this.markers = [];
        this.printMarkers();
        this.toggleMarker = true;
        this.toggleHeatmapFlag = false;
        this.points = this.convertPoints();
        this.heatmap = new google.maps.visualization.HeatmapLayer({
            data: this.points,
            map: this.map
        });
        this.heatmap.set('radius', 100);
        this.heatmap.set('opacity', 0.7);
        this.drawHeatmap(null);
    }

    convertPoints() {
        let temp = [];
        for (let point of this.places) {
            let peso = point.price;
            if(peso < 100000) peso = 0.5;
            else if(peso < 200000) peso = 1;
            else if(peso < 300000) peso = 1.5;
            else if(peso < 400000) peso = 2;
            else if(peso < 500000) peso = 2.5;
            else peso = 3;
            temp.push({ location: new google.maps.LatLng(point.latitude, point.longitude), weight: peso });
        }

        return temp;
    }

    toggleMarkers() {
        if (this.toggleMarker) {
            this.toggleMarker = false;
            this.disableMarkers();
        } else {
            this.toggleMarker = true;
            this.drawMarkers();
        }
    }

    drawMarkers() {
        this.markers.map(marker => marker.setMap(this.map))
    }

    toggleHeatmap() {
        if (this.toggleHeatmapFlag) {
            this.toggleHeatmapFlag = false;
            this.drawHeatmap(null);
        } else {
            this.toggleHeatmapFlag = true;
            this.drawHeatmap(this.map);
        }
    }

    drawHeatmap(map) {
        this.heatmap.setMap(map)
    }

    disableMarkers() {
        this.markers.map(marker => marker.setMap(null))
    }

    printMarkers() {
        for (let j = 0; j < this.places.length; j++) {

            this.markers.push(new google.maps.Marker({
                map: this.map,
                position: {lat: this.places[j].latitude,lng: this.places[j].longitude},
                icon: (this.places[j].price > 0 && this.places[j].price <= 100000) ? this.verde :
                      (this.places[j].price > 100000 && this.places[j].price <= 250000) ? this.azul : 
                      (this.places[j].price > 250000 && this.places[j].price <= 350000) ? this.amarillo : 
                      (this.places[j].price > 350000 && this.places[j].price <= 500000) ? this.naranja :
                      (this.places[j].price > 500000 && this.places[j].price <= 10000000) ? this.rojo : this.rojo,
                shadow: this.pinShadow
            }));

            google.maps.event.addListener(this.markers[j], 'click', ((marker, j) => {
                return () => {
                    let aux;
    
                    if (this.places[j].propertyType === 'house') aux = "Casa"
                    else if (this.places[j].propertyType === 'flat') aux = "Piso"
                    else if (this.places[j].propertyType === 'property') aux = "Propiedad"
                    console.log("Campo places ",this.places[j]);
                    let a = '<div align="center">' +
                        '<p>Tipo de vivienda: ' + aux + '</p>' +
                        '<p>' + this.places[j].bedroomNumber + ' Habitaciones</p>' +
                        '<p>' + this.places[j].bathroomNumber + ' Baños</p>' +
                        '<p>' + this.places[j].price + '€</p>' +
                        '<p>' + this.places[j].summary + '</p>' +
                        '<a href="' + this.places[j].listerUrl + '" target="_blank">Ver más información</a>' +
                        '</div>';
                    this.infowindow.setContent(a);
                    this.infowindow.open(this.map, marker);
                }
            })(this.markers[j], j));
        }

    }

}