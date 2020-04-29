import React, {Component} from 'react';
import L from 'leaflet';
import ReactLeafletSearch from "react-leaflet-search";
import {Marker, TileLayer, Map} from 'react-leaflet';
import LocateControl from "./locatecontrol.js";
import Routing from "./routing.js";
import Control from "react-leaflet-control";
import TransportBtn from "./TransportBtn";
import search from "./Search";
import ResultsList from "./ResultsList.js";

const sampleData = [
  {
    "bike_id":"7f5a4199-4f9d-490d-8ac2-2565ba501fe7",
    "lat":40.8678662948582,
    "lon":-73.858680725097,},
  {
    "bike_id":"b675160c-306c-4ed6-99b8-b94fa3269cc2",
    "lat":40.869797247896,
    "lon":-73.866233825683,},
  {
    "bike_id":"c0f3eed4-6e48-4755-b5b7-303c42f475bb",
    "lat":40.871354950487,
    "lon":-73.85941028594,},
  {
    "bike_id":"c1d509e7-ac19-43c4-a1e3-54623e0cb9d8",
    "lat":40.865545831425,
    "lon":-73.86445283889,},
];

const PriceList = () => (
  <ListGroup>
    {someData.map(item => (
      <ListGroup.Item key={item.bike_id} action="true" >
        Price: ${item.price}
      </ListGroup.Item>
    ))}
  </ListGroup>
)

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
  constructor() {
    super();
    this.bikeClick = this.bikeClick.bind(this);
    this.trainClick = this.trainClick.bind(this);
    this.state = {
      isLoaded: false,
      bikes: [],
      showBike: false,
      showTrain: false,
      location: {
        lat: initLat,
        lng: initLong,
      },
      zoom: initZoom,
      isMapInit: false
    }
  }

  bikeClick() {
    console.log('Bike Click happened');
    if(this.state.showTrain ==true) {
      this.setState({
        showBike: true,
        showTrain: false,
      });
    }
    else {
      this.setState({
        showBike: true,
      })
    }
  }

  trainClick(){
    console.log('Train Click happened');
    if(this.state.showBike == true){
      this.setState({
        showBike: false,
        showTrain: true,
      });
    }
    else {
      this.setState({
        showTrain: true,
      });
    }
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

    fetch("http://localhost:3000/api/pedals")
      .then(res => res.json())
      .then((result) => {
          this.setState({
            isLoaded: true,
            bikes: result.bikes
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
    const { error, isLoaded, bikes } = this.state;
    /*
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {*/
    return(
      console.log("The position is now:" + position),
        <Map className="map" style={{ height: "100vh", weight: "100vw" }} center={position} zoom={this.state.zoom} ref={this.saveMap}>
        {/*
        {someData.map(bird => (
          <Marker
            key={bird.bike_id}
            position={[
              bird.lat,
              bird.lon
            ]}
          >
          </Marker>
        ))}
          */}
          <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://api.mapbox.com/styles/v1/llazala/ck77s50ku0jh41jp3g4swn1g5/tiles/512/{z}/{x}/{y}?access_token=pk.eyJ1IjoibGxhemFsYSIsImEiOiJjazZwdjlwZ2wwZTFyM2tuemtocHBwNHV3In0.FR2WEGpBqWPxj1xz48s3dQ" />
          <LocateControl options={locateOptions} startDirectly/>
          {this.state.isMapInit && <Routing map={this.map} from={[40.8712738210487, -73.8575649261474]} to={[40.84569686831983, -73.8576507568359]}/>}
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
          <PriceList></PriceList>
          </Control>
          <Control position='topleft'>
            <ResultsList></ResultsList>
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
