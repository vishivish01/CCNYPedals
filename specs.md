# JSON Specification

## GET `/api/pedals`

- Explanation of HTTP response (JSON format)

    Field | Type | Defines
    ---|---|---|
    `bikes` |  Array | Array that contains one object per bike that is currently stopped as defined below.
    \-&nbsp;`bike_id` |  String | Identifier of a bike
    \-&nbsp;`lat` |  Number | Latitude of the bike.
    \-&nbsp;`lon` |  Number | Longitude of the bike.

- `/api/pedals` returns a list of the closest ten bikes/scooters near user's current location:
    ```json
    {
        "bikes" : [ 
            {
                "bike_id": "e23ab4",
                "lat": "38.9248",
                "lon": "-77.0321",
                "vehicle_type": "scooter"
            },
            {
                "...": "..."
            }
        ]
    }
    ```

- `/api/pedals/:lat/:lon` returns a list of the closest ten bikes/scooters at the location provided by the params `lat` and `lon`
    ```json
    {
        "bikes" : [ 
            {
                "bike_id": "e23ab4",
                "lat": "38.9248",
                "lon": "-77.0321",
                "vehicle_type": "scooter"
            },
            {
                "...": "..."
            }
        ]
    }
    ```
    
- `/api/pedals/:lat/:lon?sort_by=price` returns a list of bikes/scooters sorted by fare price
    ```jsonc
    {
        "bikes" : [ 
            {
                "bike_id": "e23ab4",
                "lat": "38.9248",
                "lon": "-77.0321",
                "vehicle_type": "scooter"
            },
            {
                "...": "..."
            }
        ]
    }
    ```

- `/api/pedals/:lat/:lon?sort_by=duration` returns a list of bikes/scooters sorted by trip duration time
    ```jsonc
    {
        "bikes" : [ 
            {
                "bike_id": "e23ab4",
                "lat": "38.9248",
                "lon": "-77.0321",
                "vehicle_type": "scooter"
            },
            {
                "...": "..."
            }
        ]
    }
    ```
    
- `/api/route/:start/:end` returns an array containing a list of directions that will guide the user from `start` location to `end` location