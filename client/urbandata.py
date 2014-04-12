import requests
import json
import datetime

Config = {
    'url' : 'http://198.199.98.147:5000/data_point',
    'agent' : 'Default'
    'user' : 'urbanuser',
    'password' : 'urbankey' 
  }

# send (latitud, longitud, extra)
# Sends a bundle of data to the server as a geojson point 
# usage :
#send( 14.123, -90.1234, {
#  'ambient_temperature': 27.2,
#  'pressure': 123.21,
#  'humidity': 123.4567
#})
def send(latitud, longitud, extra):
  headers = {'content-type': 'application/json'}
  
  properties = {
    "agent": agent,
    "time":  datetime.datetime.now().strftime("%a, %d %b %Y %H:%M:%S GMT"),
    
  }
  
  properties = dict(properties.items() + extra.items())
  
  payload = {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [latitud, longitud]
    },
    "properties": properties
  }
  r = requests.post(url, data=json.dumps(payload), headers=headers, auth=(user, password))