import React, {Component} from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


const MAPBOX_TOKEN = 'pk.eyJ1IjoibGxhemFsYSIsImEiOiJjazZwdmJ3OHExcW1yM2VueXB1NXcyNXU5In0.CMjAdPgsN5UGqO6yhwrtSQ';
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

// setUserLocation = () => {

//   navigator.geolocation.getCurrentPosition(position => {
//       let newViewport = {
//           height: "100vh",
//           width: "100vw",
//           latitude: position.coords.latitude,
//           longitude: position.coords.longitude,
//           zoom: 12
//       }
//       this.setState({
//           viewport: newViewport
//       })
//   })
// }

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

  render() {
    return(
        <Form style={{width:400}} >
          <Form.Group controlId="formDestination">
            <Form.Control type="text" placeholder="Enter your location" />
          </Form.Group>
          <Form.Group controlId="formDestination">
            <Form.Control type="text" placeholder="Enter your destination" />
            <Button id="search">
              Search
            </Button>
          </Form.Group>
        </Form>
    );
 }
}

export default App;
