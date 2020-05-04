import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import L from 'leaflet';
import ReactLeafletSearch from "react-leaflet-search";
import {Marker, TileLayer, Map} from 'react-leaflet';
import LocateControl from "./locatecontrol.js";
import Routing from "./routing.js";
import Control from "react-leaflet-control";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownToggle from 'react-bootstrap/DropdownToggle';
import DropdownMenu from 'react-bootstrap/DropdownMenu';
import DropdownItem from 'react-bootstrap/DropdownItem';

const someData = [
  {
    "bike_id":"7f5a4199-4f9d-490d-8ac2-2565ba501fe7",
    "lat":38.895802,
    "lon":-77.006593,},
  {
    "bike_id":"b675160c-306c-4ed6-99b8-b94fa3269cc2",
    "lat":38.903634,
    "lon":-77.026413,},
  {
    "bike_id":"c0f3eed4-6e48-4755-b5b7-303c42f475bb",
    "lat":38.90307,
    "lon":-77.043318,},
  {
    "bike_id":"c1d509e7-ac19-43c4-a1e3-54623e0cb9d8",
    "lat":38.900236,
    "lon":-77.01053,},
];

var myIcon = L.icon({
  iconURL: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png",
  iconSize: [25,41],
  iconAnchor: [12.5, 45],
  popupAnchor: [0, -41]
});

var initLat = 38.9072;
var initLong = -77;
var initZoom = 12;

const locateOptions = {
      position: 'topright',
      strings: {
          title: 'Current geolocation'
      },
      onActivate: () => {} // callback before engine starts retrieving locations
  }

class App extends Component {
  // {someData.map(bird => (
  //   <Marker
  //     key={bird.bike_id}
  //     latitude={bird.lat}
  //     longitude={bird.lon}
  //   >
  //     <button>
  //       <img src="https://cdn0.iconfinder.com/data/icons/bicycle-19/64/road-bike-bicycle-bike-riding-512.png" height={20} width={20} alt = "bike markers"></img>
  //     </button>
  //   </Marker>
  // ))}
  state = {
    location: {
      lat: initLat,
      lng: initLong,
    },
    zoom: initZoom,
    isMapInit: false
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        location: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      }, () => console.log(this.state));
    });
  }

  HandleSubmit(event) {
    return;
  }

  saveMap = map => {
    this.map = map;
    this.setState({
      isMapInit: true
    });
  };

  render() {
    const position = [this.state.location.lat, this.state.location.lng];
    return(
      console.log("The position is now:" + position),
        <Map className="map" style={{ height: "100vh", weight: "100vw" }} center={position} zoom={this.state.zoom} ref={this.saveMap}>
          <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://api.mapbox.com/styles/v1/llazala/ck77s50ku0jh41jp3g4swn1g5/tiles/512/{z}/{x}/{y}?access_token=pk.eyJ1IjoibGxhemFsYSIsImEiOiJjazZwdjlwZ2wwZTFyM2tuemtocHBwNHV3In0.FR2WEGpBqWPxj1xz48s3dQ" />
          <LocateControl options={locateOptions} startDirectly/>
          {this.state.isMapInit && <Routing map={this.map} from={{position}} to={[40.845696, -73.857650]}/>}
          <ReactLeafletSearch position="topleft"/>
          <Control position="topleft">
            <Dropdown>
              <DropdownToggle variant="info">
                  Transportation
              </DropdownToggle>
              <DropdownMenu>
                  <DropdownItem onClick={this.bikeClick} >Bike</DropdownItem>
                  <DropdownItem onClick={this.trainClick}>Train</DropdownItem>
              </DropdownMenu>
          </Dropdown>
          {this.state.showBike ?
              someData.map(bird => (
                <Marker
                  key={bird.bike_id}
                  position={[
                    bird.lat,
                    bird.lon
                  ]}
                >
                </Marker>
              )) : null
          }
          </Control>
          {/* <div id="search-form">
            <Form style={{width:"100vw", position:"absolute"}} onSubmit={this.HandleSubmit}>
              <input type="text" placeholder="Enter your location" />
              <input type="text" placeholder="Enter your destination" />
              <input type="submit" value="Go"/>
            </Form>
          </div> */}
      </Map>
    );
 }
}

export default App;
