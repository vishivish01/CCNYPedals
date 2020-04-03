const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

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
    "bikes" : []
  }

  fetch('https://data.lime.bike/api/partners/v1/gbfs/washington_dc/free_bike_status')
    .then(response => response.json()) // get the raw content, convert it to json
    .then(json => { // take that json, extract the first 5 elements and add it to our array
      // console.log(json.data.bikes);
      for (let index = 0; index < 5; index++) {
        // console.log(json.data.bikes[index]);
        jsonResponse.bikes.push(json.data.bikes[index]);
        // console.log(jsonResponse);
      }

      // console.log('End of loop, printing array...');
      // console.log(jsonResponse);
      res.json(jsonResponse);
    });

  // res.json({"bikes": [{"bike_id": 12345}]});
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
});

module.exports = router;