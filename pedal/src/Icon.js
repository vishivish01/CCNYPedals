import L from 'leaflet';

const birdIcon = new L.Icon({
    iconUrl: require('./markers/bird.png'),
    iconAnchor: null,
    popupAnchor: [0, -20],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(40, 40),
});

const lyftIcon = new L.Icon({
    iconUrl: require('./markers/lyft.png'),
    iconAnchor: null,
    popupAnchor: [0, -20],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(40, 40),
});

const trainIcon = new L.Icon({
    iconUrl: "https://i.pinimg.com/236x/cf/58/4a/cf584aff36fb87c055a8a026bfcb859e--moodboard-trains.jpg",
    iconAnchor: null,
    popupAnchor: [0, -20],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(40, 40),
});

export { birdIcon, lyftIcon, trainIcon }