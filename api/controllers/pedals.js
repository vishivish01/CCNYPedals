const express = require('express');
const router = express.Router();

// This is a simple example for providing basic CRUD routes for
// a resource/model. It provides the following:
//    GET    /posts
//    POST   /posts
//    GET    /posts/:id
//    PUT    /posts/:id
//    DELETE /posts/:id 

router.get('/', (req,res) => {
  res.json({"bikes": [{"bike_id": 12345}]});
});

/* router.get('/:id', (req, res) => {
  
}); */


module.exports = router;