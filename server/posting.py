import json
import requests

payload = 
  {
    "type": "Feature",
    "geometry": 
      {
      "type": "Point",
      "coordinates": [125.6, 10.1]
      },
      "properties": {
        "name": "Dinagat Islands",
        "temp": 25.2012
      }
  }

headers = {'content-type': 'application/json'}

r = requests.post(url, data=json.dumps(payload), headers=headers)
# To verify proper post
## In [123]: r.ok
## Out[123]: True
