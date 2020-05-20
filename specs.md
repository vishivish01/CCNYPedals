# API JSON Specification

API is using the following systems to fulfill endpoints:
- Lime: https://data.lime.bike/api/partners/v1/gbfs/washington_dc/gbfs.json
- Lyft: https://s3.amazonaws.com/lyft-lastmile-production-iad/lbs/dca/gbfs.json
- Bike JUMP System: https://gbfs.uber.com/v1/dcb/gbfs.json
- Scooter JUMP System: https://gbfs.uber.com/v1/dcs/gbfs.json

## GET `/api/pedals`

- HTTP JSON response for this endpoint will have the following fields:

    Field | Type | Meaning
    ---|---|---|
    `bikes` |  Array | An array containing an object for each available bike/scooter: `[{...}, {...}, {...}]`. Inside the object will be the properties defined below.
    \-&nbsp;`bike_id` |  String | Identifier of a bike.
    \-&nbsp;`lat` |  Number | Latitude of the bike.
    \-&nbsp;`lon` |  Number | Longitude of the bike.
    \-&nbsp;`type` |  String | Entity of type bike or electric scooter.
    \-&nbsp;`vendor` |  String | Name of company owning/operating the bike.

- `/api/pedals` a *test* endpoint that returns a random list of bikes/scooters aggregated from several vendors:
    ```json
    {
        "bikes": [ 
            {
                "bike_id": "e23ab4",
                "lat": 38.9248,
                "lon": -77.0321,
                "vehicle_type": "scooter",
                "vendor": "lime"
            },
            /* and so on... */
        ]
    }
    ```

- `/api/pedals/:lat/:lon` returns a list of the closest ten bikes/scooters at the location provided by the params `lat` and `lon`
    ```json
    {
        "bikes": [ 
            {
                "bike_id": "e23ab4",
                "lat": 38.9248,
                "lon": -77.0321,
                "vehicle_type": "scooter",
                "vendor": "lime"
            },
            /* and so on... */
        ]
    }
    ```
    
- `/api/pedals/:lat/:lon?sort_by=price` returns a list of bikes/scooters sorted by fare price
    ```jsonc
    {
        "bikes": [ 
            {
                "bike_id": "e23ab4",
                "lat": 38.9248,
                "lon": -77.0321,
                "vehicle_type": "scooter",
                "vendor": "lime"
            },
            /* and so on... */
        ]
    }
    ```

- `/api/pedals/:lat/:lon?sort_by=duration` returns a list of bikes/scooters sorted by trip duration time
    ```jsonc
    {
        "bikes": [ 
            {
                "bike_id": "e23ab4",
                "lat": 38.9248,
                "lon": -77.0321,
                "vehicle_type": "scooter",
                "vendor": "lime"
            },
            /* and so on... */
        ]
    }
    ```
    
- `/api/route/:start/:end` returns an array containing a list of directions that will guide the user from `start` location to `end` location