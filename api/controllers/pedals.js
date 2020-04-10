const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const distFrom = require('distance-from');

/* object to store list of systems */
const systems = {
  lime: "https://data.lime.bike/api/partners/v1/gbfs/washington_dc/gbfs.json",
  lyft: "https://s3.amazonaws.com/lyft-lastmile-production-iad/lbs/dca/gbfs.json",
  bike_jump: "https://gbfs.uber.com/v1/dcb/gbfs.json",
  scooter_jump: "https://gbfs.uber.com/v1/dcs/gbfs.json"
}

/* returns a random list of bikes/scooters aggregated from several vendors */
router.get('/', (req,res) => {
  // initialize an array of empty bikes
  let jsonResponse = {
    "bikes": []
  }

  fetch('https://s3.amazonaws.com/lyft-lastmile-production-iad/lbs/dca/free_bike_status.json')
    .then(response => response.json()) // get the raw content, convert it to json
    .then(json => { // take that json, extract the first 10 elements and add it to our array
      for (let index = 0; index < 10; index++) {
        jsonResponse.bikes.push(json.data.bikes[index]);
      }
      res.json(jsonResponse);
    });
});

/* returns a list of the closest ten bikes/scooters at the location provided by the params :lat and :lon */
router.get('/:lat/:lon', (req, res) => {
  /*
    IDEA:
    - keep track of a "top ten" list by:
    - (i) call every api to get a list of bikes/scooters
    - (ii) compute the distance between user's location and each specific bike => store that distance in a field
    - (iii) at the end, filter out only the first ten and return to the client
  */

  let data = {
    "bikes": [] // variable for output
  }

  // location variable needs to be in a format of of [lat, lon] in order to pass as argument to helper function
  let userLocation = [];
  // remember to convert the string values in the params object into numbers
  userLocation.push(Number(req.params.lat));
  userLocation.push(Number(req.params.lon));
  console.log(userLocation);

  // convenient storage for bike's "location"
  let bikeLocation = [];

  // binding to hold computed distance between user's location and a specific bike; will be updated everytime we iterate through the "bikes" array
  let distance;

  fetch('https://s3.amazonaws.com/lyft-lastmile-production-iad/lbs/dca/free_bike_status.json')
    .then(response => response.json())
    .then(json => {
      // file the output data under a convenient name
      // extract the bikes array from the JSON object
      // json.data.bikes points to an ARRAY with each element an object representing a bike/scooter
      let bikeResponse = json.data.bikes;

      for (let index = 0; index < 10; index++) {
        // you now have access to the JSON object contaning the entire list of available bikes/scooters
        // for each bike in json, compute the distance between user's location and the bike by first,
        // extracting lat, long from each entry and storing them in an array
        bikeLocation.push(Number(bikeResponse[index].lat));
        bikeLocation.push(Number(bikeResponse[index].lon));
        // passing the appropriate arguments to helper function
        // perhaps, save the computed distance in a variable
        distance = distFrom(userLocation).to(bikeLocation).in('m');
        // add a property to the bike called "distance" and have its value the distance that you just computed/saved
        bikeResponse[index].distance = distance;        
      }

      // perhaps sort the list of bikes now with computed distances
      // iterate through the first 10 and push them into your output array
      res.json(data);
    });
});

module.exports = router;