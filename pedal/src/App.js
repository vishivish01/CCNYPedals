import React,{ useState } from 'react';
import ReactMapGL from 'react-map-gl';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiY2NoZW4wMDgiLCJhIjoiY2s2NnYxN29wMWFjOTNvbzhmaDY3ZGxyYyJ9.VJqAlOFb4jz7AnbhadcuDQ';

export default function App() {
  const[viewport, setViewport] = useState({
    latitude: 38.9072,
    longitude: -77,
    width: "100vw",
    height: "100vh",
    zoom: 12
  });

  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        mapStyle="mapbox://styles/cchen008/ck6fhdne30sjb1iqvxge9w504"
        onViewportChange={viewport => {
          setViewport(viewport);
        }}
        >
      </ReactMapGL>
    </div>
  );
}