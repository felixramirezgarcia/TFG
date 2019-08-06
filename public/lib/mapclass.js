class Mapa {

    constructor(mid, zu, idElement, err, arr, init_map) {
        const classob = new Datos(err, arr);
        
        this.map = new google.maps.Map(document.getElementById(idElement), {
            center: { lat: mid.lat, lng: mid.lng },
            zoom: zu
        });

        this.centro = mid;
        this.infowindow = new google.maps.InfoWindow();

        if(init_map === 0){
            this.initColors();
            this.places = classob.getData();
            this.markers = [];
            this.printMarkers();
            this.points = this.convertPoints();
        }else if(init_map === 1){
            this.places = classob.getCitys();
            this.markers = [];
            this.printInitMarkers(classob.getCount());
        }
        

        this.toggleMarker = true;
        this.toggleHeatmapFlag = false;
        this.heatmap = new google.maps.visualization.HeatmapLayer({
            data: this.points,
            map: this.map
        });
        this.heatmap.set('radius', 23);
        this.heatmap.set('opacity', 0.5);
        this.heatmap.set('maxIntensity', 61);

        this.drawHeatmap(null);
    }

    printInitMarkers(count) {
        for (let j = 0; j < this.places.length; j++) {
            this.markers.push(new google.maps.Marker({
                map: this.map,
                position: {lat: this.places[j].lat, lng: this.places[j].lng},
                label: {
                    color: 'black',
                    fontWeight: 'bold',
                    fontSize: '10px',
                    text: count[j]
                }
            }));
        }

    }

    convertPoints() {
        let temp = [];
        for (let point of this.places) {
            let peso = point.price;
            if(peso < 100000) peso = 1;
            else if(peso < 200000) peso = 2;
            else if(peso < 300000) peso = 3;
            else if(peso < 400000) peso = 4;
            else if(peso < 500000) peso = 5;
            else if(peso < 600000) peso = 6;
            else if(peso < 700000) peso = 7;
            else if(peso < 800000) peso = 8;
            else if(peso < 900000) peso = 9;
            else if(peso < 1000000) peso = 10;
            else if(peso < 1100000) peso = 11;
            else if(peso < 1200000) peso = 12;
            else if(peso < 1300000) peso = 13;
            else if(peso < 1400000) peso = 14;
            else if(peso < 1500000) peso = 15;
            else if(peso < 1600000) peso = 16;
            else if(peso < 1700000) peso = 17;
            else if(peso < 1800000) peso = 18;
            else if(peso < 1900000) peso = 19;
            else if(peso < 2000000) peso = 20;
            else if(peso < 2100000) peso = 21;
            else if(peso < 2200000) peso = 22;
            else if(peso < 2300000) peso = 23;
            else if(peso < 2400000) peso = 24;
            else if(peso < 2500000) peso = 25;
            else if(peso < 2600000) peso = 26;
            else if(peso < 2700000) peso = 27;
            else if(peso < 2800000) peso = 28;
            else if(peso < 2900000) peso = 29;
            else if(peso < 3000000) peso = 30;
            else if(peso < 3100000) peso = 31;
            else if(peso < 3200000) peso = 32;
            else if(peso < 3300000) peso = 33;
            else if(peso < 3400000) peso = 34;
            else if(peso < 3500000) peso = 35;
            else if(peso < 3600000) peso = 36;
            else if(peso < 3700000) peso = 37;
            else if(peso < 3800000) peso = 38;
            else if(peso < 3900000) peso = 39;
            else if(peso < 4000000) peso = 40;
            else if(peso < 4100000) peso = 41;
            else if(peso < 4200000) peso = 42;
            else if(peso < 4300000) peso = 43;
            else if(peso < 4400000) peso = 44;
            else if(peso < 4500000) peso = 45;
            else if(peso < 4600000) peso = 46;
            else if(peso < 4700000) peso = 47;
            else if(peso < 4800000) peso = 48;
            else if(peso < 4900000) peso = 49;
            else if(peso < 5000000) peso = 50;
            else if(peso < 5100000) peso = 51;
            else if(peso < 5200000) peso = 52;
            else if(peso < 5300000) peso = 53;
            else if(peso < 5400000) peso = 54;
            else if(peso < 5500000) peso = 55;
            else if(peso < 5600000) peso = 56;
            else if(peso < 5700000) peso = 57;
            else if(peso < 5800000) peso = 58;
            else if(peso < 5900000) peso = 59;
            else if(peso < 6000000) peso = 60;
            else peso = 61;
            temp.push({ location: new google.maps.LatLng(point.latitude, point.longitude), weight: peso });
        }

        return temp;
    }

    initColors(){
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
                    let a = '<div align="center">' +
                        '<p>Tipo de vivienda: ' + aux + '</p>' +
                        '<p>Fuente de datos: ' + this.places[j].datasourceName + '</p>' +
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