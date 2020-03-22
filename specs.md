# JSON Specification

All backend routes start with `/api`, e.g. `localhost:8000/api/pedals`

    
## GET    

- `/api/pedals`
    + returns a list of the closest ten bikes/scooters near user's current location

- `/api/pedals/:lat/:lon'`
    + returns a list of the closest ten bikes/scooters at the location provided by the params `lat` and `lon`
    
- `/api/pedals/:lat/:lon?sort_by=price`
    + returns a list of bikes/scooters sorted by fare price

- `/api/pedals/:lat/:lon?sort_by=duration`
    + returns a list of bikes/scooters sorted by trip duration time
    
- `/api/route/:start/:end`
    + returns an array containing a list of directions that will guide the user from `start` location to `end` location