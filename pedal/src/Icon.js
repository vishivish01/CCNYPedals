import L from 'leaflet';

const birdIcon = new L.Icon({
    iconUrl: require('./markers/bird.png'),
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(30, 30),
});

const lyftIcon = new L.Icon({
    iconUrl: require('./markers/lyft.png'),
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(30, 30),
});

export { birdIcon, lyftIcon };