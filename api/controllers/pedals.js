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

// sample JSON from each system (visualization purposes)
let sample = {
  "data": {
    "bikes": [
      {
        "name": "169cdbb1da54e121e25da33bf03df076",
        "type": "electric_scooter",
        "is_disabled": 0,
        "bike_id": "169cdbb1da54e121e25da33bf03df076",
        "lon": -76.98485716666667,
        "lat": 38.9004825,
        "is_reserved": 0,
        "rental_uris": {
          "android": "https://dc.lft.to/lastmile_qr_scan",
          "ios": "https://dc.lft.to/lastmile_qr_scan"
        }
      }
    ]
  }
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
    IDEA: keep track of a "top ten" list by:
    - (i) call every api to get a list of bikes/scooters
    - (ii) for each call, compute the distance between user's location and each specific bike => store that distance in a field
    - (iii) at the end, filter out only the first ten and return to the client
  */

  // variable used as output
  let data = {
    "bikes": []
  }

  // store system names in a convenient array
  let systemNames = Object.keys(systems);

  // array of Promises returned by 'fetch'
  let fetchPromises = systemNames.map(name => fetch(systems[name]).then(resp => resp.json()));

  /* LOCATION STUFF: START */
  /***/
    // location variable needs to be in an array ([lat, lon]) in order to pass as argument to helper function
    // get coordinates of user into a data structure
    let userLocation = [];
    userLocation.push(Number(req.params.lat));
    userLocation.push(Number(req.params.lon));
    
    // just like for the user, we need to save the coordinates of a bike into a data structure in order to pass as argument to helper function
    // convenient storage for bike's "location"
    let bikeLocation = [];

    // finally, binding to hold computed distance between user's location and a specific bike; will be updated everytime we iterate through the array of bikes objects
    let distance;
  /***/
  /* LOCATION STUFF: END */

  // binding to hold JSON API response
  let bikeResponse;

  // given an array of Promises, wait until all have been resolved
  Promise.all(fetchPromises)
    // 'json' is an array contaning a JSON response for each system called
    .then(json => {
      // outer-loop which iterates through each system response
      for (let sIndex = 0; sIndex < systemNames.length; sIndex++) {
        // reference the bikes array value from the JSON response and ...
        // file it under a convenient name for easy loop iteration and modification
        // REMEMBER: json[sIndex].data.bikes points to an ARRAY with each element an object representing a bike/scooter
        bikeResponse = json[sIndex].data.bikes;

        // inner loop to compute distance between user's location and each bike/scooter
        for (let index = 0; index < bikeResponse.length; index++) {
          // do what we did for the user's params: extract the bike's lat, long saving them in an array
          bikeLocation.push(Number(bikeResponse[index].lat));
          bikeLocation.push(Number(bikeResponse[index].lon));
          // compute distance between values held in 'userLocation' and 'bikeLocation' via helper function
          // and save the computed distance in a variable?
          distance = distFrom(userLocation).to(bikeLocation).in('m'); // this is meters, not miles
          // add a property called 'distance' to the currently indexed bike and have its value the distance that you just computed/saved
          bikeResponse[index].distance = distance;
          // also save the vendor name :D
          bikeResponse[index].vendor = systemNames[sIndex];
          // compute price
          bikeResponse[index].price = computePrice(3, 21).toFixed(2);
          // now we want to save the currently indexed bike object into our output array - we will filter our array later
          data.bikes.push(bikeResponse[index]);
        }
      }
      /* AT THIS POINT, all distances should have been computed between the user and bikes/scooters in the surrounding area */

      // try returning the closest 10
      // perhaps sort the list of bikes now with computed distances
      // iterate through the first 10 and push them into your output array
      // alternatively, we can "slice" the array
      // data.bikes = data.bikes.sort(comparePrice);
      data.bikes = data.bikes.sort((a, b) => (a.distance > b.distance) ? 1 : -1);

      /* for (let index = 0; index < 10; index++) {
        data.bikes.push(bikeResponse[index]);
      } */

      data.bikes = data.bikes.slice(0, 10);

      res.json(data); /* final output */
    });
});

function computePrice(min, max) {
  return Math.random() * (max - min) + min;
}

function comparePrice(a, b) {
  
  console.log(a.distance);
  const distanceA = a.distance
  const distanceB = b.distance;

  let comparison = 0;
  if (distanceA > distanceB) {
    comparison = 1;
  } else if (distanceA < distanceB) {
    comparison = -1;
  }
  return comparison;
}

module.exports = router;