import L from 'leaflet';

var thisIcon = new L.Icon({
    iconUrl: require('./icon/bike.PNG'),
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(60, 75),
});

export { thisIcon };