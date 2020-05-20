import { MapLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import "lrm-google";
import { withLeaflet } from "react-leaflet";

class TransitRouting extends MapLayer {
  createLeafletElement() {
    const { from, to } = this.props;
    const { map } = this.props;
    let leafletElement = L.Routing.control({
      waypoints: [
        L.latLng(from[0], from[1]),
        L.latLng(to[0], to[1])
      ],
      router: new L.Routing.Google({
        travelMode: 'TRANSIT',
        // transitOptions: {
        //  modes: ['SUBWAY']
        // }
      }),
      lineOptions: {
        styles: [
          {
            color: "red",
            opacity: 0.6,
            weight: 4
          }
        ]
      },
      addWaypoints: true,
      draggableWaypoints: false,
      fitSelectedRoutes: false,
      showAlternatives: false,
      show: false,
      collapsible: true
    }).addTo(map.leafletElement);
    return leafletElement.getPlan();
  }
}
export default withLeaflet(TransitRouting);
