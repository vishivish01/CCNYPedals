const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

// This is a simple example for providing basic CRUD routes for
// a resource/model. It provides the following:
//    GET    /posts
//    POST   /posts
//    GET    /posts/:id
//    PUT    /posts/:id
//    DELETE /posts/:id 

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

/* router.get('/:id', (req, res) => {
  
}); */


module.exports = router;