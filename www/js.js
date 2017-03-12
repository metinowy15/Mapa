window.addEventListener("DOMContentLoaded", start);


let Gamma;
let Beta;
let marker;
let map;
let pozycja;
let id2;
let id1;
let id3;
let id4;



function start() {



    window.addEventListener('deviceorientation', ruch);

}

function Pozycja(positio) {

    let geoPos = {
        lat: positio.coords.latitude,
        lng: positio.coords.longitude,
    }
    map.setCenter(geoPos);
    marker.setPosition(geoPos);
    map.setZoom(13);

}

function initMap() {

    navigator.geolocation.getCurrentPosition(Pozycja);
    let id = navigator.geolocation.watchPosition(Pozycja);

    map = new google.maps.Map(document.querySelector("#mapa"), {
        zoom: 4,

    });
    marker = new google.maps.Marker({
        map: map,
        draggable: true,
        animation: google.maps.Animation.DROP,

    });
}

function ruch(e) {

    Beta = Math.round(e.beta);
    Gamma = Math.round(e.gamma);


    //najpierw Beta w góre
    if (Beta > 0) {
        if (id1 == null) {
            cancelAnimationFrame(id2);
            id2 = null;
            zwiekszBete(e);

        }

    }
    //potem beta w dol
    if (Beta < 0) {

        if (id2 == null) {
            cancelAnimationFrame(id1);
            id1 = null;
            zmniejszBete(e);

        }
    }
    //taraz gamma w góre
    if (Gamma < 0) {
        if (id3 == null) {
            cancelAnimationFrame(id4);
            id4 = null;
            zwiekszGamme(e);
        }

    }
    //no i gamma w dół
    if (Gamma > 0) {
        if (id4 == null) {
            cancelAnimationFrame(id3);
            id3 = null
            zmniejszGamme(e);
        }
    }

    //funkcja zwieksza Bete animuje sie
    function zwiekszBete(e) {
        if (Beta > 0) {
            let latlng = new google.maps.LatLng(marker.getPosition().lat() - skalowanie(Beta), marker.getPosition().lng());
            marker.setPosition(latlng);

            console.log("zwieksza");
        }
        id1 = requestAnimationFrame(zwiekszBete);

    }
    //funkcja zmniejsza bete tez sie animuje
    function zmniejszBete(e) {
        if (Beta < 0) {
            let latlng = new google.maps.LatLng(marker.getPosition().lat() - skalowanie(Beta), marker.getPosition().lng());
            marker.setPosition(latlng);

            console.log(Beta);
        }
        id2 = requestAnimationFrame(zmniejszBete);
    }
    //funkcja która za zadanie ma zrobienie takiej samej rzeczy jak ta o funkcje powyzej tylko dla gammy
    function zwiekszGamme(e) {
        if (Gamma < 0) {
            let latlng = new google.maps.LatLng(marker.getPosition().lat(), marker.getPosition().lng() - skalowanie(Gamma * -1));
            marker.setPosition(latlng);
        }
        id3 = requestAnimationFrame(zwiekszGamme);
    }
    //Funkcja odpowiedzialna za poruszanie sie markera po mapie z predkoscia zalezna od gammy

    function zmniejszGamme(e) {
        if (Gamma > 0) {
            let latlng = new google.maps.LatLng(marker.getPosition().lat(), marker.getPosition().lng() - skalowanie(Gamma * -1));
            marker.setPosition(latlng);
        }
        id4 = requestAnimationFrame(zmniejszGamme);
    }

}

//Funkcja ktora sprawia ze beata jest szybsza

function skalowanie(Beata) {
    return 0.0001 * (Beata / 30);
}