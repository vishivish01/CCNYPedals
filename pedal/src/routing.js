import {MapLayer} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';


export default class Routing extends MapLayer {
  componentDidMount() {
    const {from, to} = this.props;
    const { map } = this.props.leaflet;
    this.leafletElement = L.Routing.control({
      waypoints: [
        L.latLng(from[0], from[1]),
        L.latLng(to[0], to[1]),
      ]
    }).addTo(map);
  }

  render() {
    return null;
  }
}
