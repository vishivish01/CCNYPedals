import React, { Component } from 'react';
//import L from 'leaflet';
import ReactLeafletSearch from "react-leaflet-search";
import {Marker, TileLayer, Map, Popup} from 'react-leaflet';
import LocateControl from "./locatecontrol.js";
import Routing from "./routing.js";
import TransitRouting from "./TransitRouting.js"
import Control from "react-leaflet-control";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownToggle from 'react-bootstrap/DropdownToggle';
import DropdownMenu from 'react-bootstrap/DropdownMenu';
import DropdownItem from 'react-bootstrap/DropdownItem';
import { ResultsList } from './ResultsList.js';
import { birdIcon, lyftIcon, trainIcon } from './Icon.js';
import { BikePopup, TrainPopup } from './MyPopups';

const someData = [
  {
    "bike_id": "7f5a4199-4f9d-490d-8ac2-2565ba501fe7",
    "lat": 38.895802,
    "lon": -77.006593,
    "price": 1.20,
    "distance": 10,
  },
  {
    "bike_id": "b675160c-306c-4ed6-99b8-b94fa3269cc2",
    "lat": 38.903634,
    "lon": -77.026413,
    "price": 2.20,
    "distance": 8,
  },
  {
    "bike_id": "c0f3eed4-6e48-4755-b5b7-303c42f475bb",
    "lat": 38.90307,
    "lon": -77.043318,
    "price": 3.20,
    "distance": 3,
  },
  {
    "bike_id": "c1d509e7-ac19-43c4-a1e3-54623e0cb9d8",
    "lat": 38.900236,
    "lon": -77.01053,
    "price": 4.20,
    "distance": 7,
  },
];

let sLat = null;
let sLng = null;

// var myIcon = L.icon({
//   iconURL: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png",
//   iconSize: [25, 41],
//   iconAnchor: [12.5, 45],
//   popupAnchor: [0, -41]
// });

var initLat = 38.9072;
var initLong = -77;
var initZoom = 12;

const locateOptions = {
  position: 'topright',
  strings: {
    title: 'Current geolocation'
  },
  onActivate: () => { } // callback before engine starts retrieving locations
}

class App extends Component {
  constructor() {
    super();
    this.bikeClick = this.bikeClick.bind(this);
    this.trainClick = this.trainClick.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      isLoaded: false,
      bikes: [],
      showBike: false,
      showBPrice: false,
      showTrain: false,
      location: {
        lat: initLat,
        lng: initLong,
      },
      isSelected: false,
      selected: {
        lat: null,
        lng: null,
      },
      zoom: initZoom,
      isMapInit: false
    }
  }

  bikeClick() {
    console.log('Bike Click happened');
    if (this.state.showTrain === true) {
      this.setState({
        showBike: true,
        showBPrice: true,
        showTrain: false,
      });
    }
    else {
      this.setState({
        showBike: true,
        showBPrice: true,
      })
    }
  }

  trainClick() {
    console.log('Train Click happened');
    if (this.state.showBike === true) {
      this.setState({
        showBike: false,
        showBPrice: false,
        showTrain: true,
      });
    }
    else {
      this.setState({
        showTrain: true,
      });
    }
  }

  myPopup = (SearchInfo) => {
    sLat = Object.values(SearchInfo.latLng)[0];
    sLng = Object.values(SearchInfo.latLng)[1];
    return(
      <Popup>
      </Popup>
    );
  }

  handleClick = (e) => {
    const { lat, lng } = e.latlng
      this.setState({
      isSelected: true,
      selected: {
        lat: lat,
        lng: lng,
      }
    })
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

    fetch("/api/pedals")
      .then(response => response.json())
      .then((data) => {
        this.setState({
          isLoaded: true,
          bikes: data.bikes
        });
      },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }


  saveMap = map => {
    this.map = map;
    this.setState({
      isMapInit: true
    });
  };

  render() {
    const position = [this.state.location.lat, this.state.location.lng];
    const { error, isLoaded, bikes } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
    return(
      console.log("The position is now:" + position),
      //console.log("lat:"+ sLat + " lng:" + sLng ),
      //console.log("lat:",this.state.selected.lat, "lng:",this.state.selected.lng),
        <Map className="map" style={{ height: "100vh", weight: "100vw" }} center={position} zoom={this.state.zoom} ref={this.saveMap}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://api.mapbox.com/styles/v1/llazala/ck77s50ku0jh41jp3g4swn1g5/tiles/512/{z}/{x}/{y}?access_token=pk.eyJ1IjoibGxhemFsYSIsImEiOiJjazZwdjlwZ2wwZTFyM2tuemtocHBwNHV3In0.FR2WEGpBqWPxj1xz48s3dQ" />
          <LocateControl options={locateOptions} startDirectly />
          {/*this.state.isMapInit && <Routing map={this.map} from={[38.8899, -77.0091]} to={[38.88976815, -76.97188307]} />*/}
          {/*this.state.isMapInit && <TransitRouting map={this.map} from={[38.8899, -77.0091]} to={[38.88976815, -76.97188307]} />*/}
          {this.state.isSelected && <TransitRouting map={this.map} from={[this.state.location.lat, this.state.location.lng]} to={[this.state.selected.lat, this.state.selected.lng]} />}
          <ReactLeafletSearch position="topleft" popUp={this.myPopup} />
          <Control position="topright">
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
                  icon= {birdIcon}
                  onClick={this.handleClick}
                >
                  <BikePopup img="bird" price ={bird.price} distance={bird.distance} />

                </Marker>
              )) : null
            }

            {this.state.showTrain ?
              bikes.map(bikes => (
                <Marker
                  key={bikes.bike_id}
                  position={[
                    bikes.lat,
                    bikes.lon
                  ]}
                  icon = {trainIcon}
                >
                  <TrainPopup />
                </Marker>
              )) : null
            }

            {
              this.state.showBPrice &&
              someData.map(item => (
                <ResultsList key={item.bike_id} img="bird" price={item.price} distance={item.distance}></ResultsList>
              ))
            }
          </Control>
        </Map>
      );
    }
  }
}

export default App;
