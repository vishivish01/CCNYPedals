const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const distFrom = require('distance-from');

/* object to store list of systems */
const systems = {
  lime: "https://data.lime.bike/api/partners/v1/gbfs/washington_dc/free_bike_status",
  lyft: "https://s3.amazonaws.com/lyft-lastmile-production-iad/lbs/dca/free_bike_status.json",
  spin: "https://web.spin.pm/api/gbfs/v1/washington_dc/free_bike_status"
}

/* returns a random list of bikes/scooters aggregated from several vendors */
router.get('/', (req,res) => {
  // variable used as output
  let data = {
    "bikes": []
  }

  // store system names in a convenient array
  let systemNames = Object.keys(systems);

  // array of Promises returned by 'fetch'
  let fetchPromises = systemNames.map(name => fetch(systems[name]).then(resp => resp.json()));
  
  // given a collection of Promises, wait until all have been resolved
  Promise.all(fetchPromises)
    .then(json => {
      for (let sIndex = 0; sIndex < systemNames.length; sIndex++) {
        for (let index = 0; index < 10; index++) {
          // push the currently indexed object into the bikes array (only storing necessary properties)
          data.bikes.push({
            bike_id: json[sIndex].data.bikes[index].bike_id,
            lat: json[sIndex].data.bikes[index].lat,
            lon: json[sIndex].data.bikes[index].lon,
            type: json[sIndex].data.bikes[index].type,
            vendor: systemNames[sIndex]
          });
        }
      }

      res.json(data);
    });

  /* fetch(systems["spin"])
    .then(resp => resp.json()) // once the promise has been resolved, convert it to JSON => which will return yet another promise
    .then(json => { // once that's been resolved, you now have access to the response body in JSON format
      // add the first ten bikes that you see to your output variable
      for (let index = 0; index < 10; index++) {
        // push the currently indexed object into the bikes array (only storing necessary properties)
        data.bikes.push({
          bike_id: json.data.bikes[index].bike_id,
          lat: json.data.bikes[index].lat,
          lon: json.data.bikes[index].lon,
          type: json.data.bikes[index].type
        });
      }
      res.json(data);
    }); */
  
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

  // variable used as output
  let data = {
    "bikes": []
  }

  // location variable needs to be in an array ([lat, lon]) in order to pass as argument to helper function
  let userLocation = [];
  userLocation.push(Number(req.params.lat));
  userLocation.push(Number(req.params.lon));
  
  // convenient storage for bike's "location"
  let bikeLocation = [];

  // binding to hold computed distance between user's location and a specific bike; will be updated everytime we iterate through the JSON response
  let distance;

  // binding to hold JSON API response
  let bikeResponse;

  fetch('https://s3.amazonaws.com/lyft-lastmile-production-iad/lbs/dca/free_bike_status.json')
    .then(resp => resp.json())
    .then(json => {
      // reference the bikes array value from the JSON response and ...
      // file it under a convenient name for easy loop iteration and modification
      // REMEMBER: json.data.bikes points to an ARRAY with each element an object representing a bike/scooter
      bikeResponse = json.data.bikes;

      for (let index = 0; index < bikeResponse.length; index++) {
        // you now have access to the array 'bikeResponse' containing an object for every available bike/scooter
        
        // for each bike in the array, compute the distance between the user's location and the bike by first,
        // extracting the bike's lat, long and storing them in an array
        bikeLocation.push(Number(bikeResponse[index].lat));
        bikeLocation.push(Number(bikeResponse[index].lon));
        // and passing the appropriate bindings to the helper function
        // perhaps, save the computed distance in a variable?
        distance = distFrom(userLocation).to(bikeLocation).in('mi'); // this is meters, not miles
        // add a property called "distance" to the currently indexed bike and have its value the distance that you just computed/saved
        bikeResponse[index].distance = distance;        
      }

    // now that you've computed the distance between a user's location and every other bike in the response, try returning the closest 10
    // perhaps sort the list of bikes now with computed distances
    // iterate through the first 10 and push them into your output array
    // alternatively, we can "slice the array
    bikeResponse = bikeResponse.sort((a, b) => a - b);

    for (let index = 0; index < 10; index++) {
      data.bikes.push(bikeResponse[index]);
    }

    res.json(data); /* final output */
    });
});

module.exports = router;