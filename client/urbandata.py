import requests
import json
import datetime

#url = 'http://198.199.98.147:1234/'
url = '171.17.10.57:5000'
agent = 'Raspie V1'

def sendData(latitud, longitud, agent, extra)
  headers = {'content-type': 'application/json'}
  
  properties = {
    "agent": agent,
    "time":  datetime.datetime.now().strftime("%a, %d %b %Y %H:%M:%S GMT"),
    
  }
  
  dict(properties.items() + extra.items())
  
  payload = {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [latitud, longitud]
    },
    "properties": properties
  }
  
  r = requests.post(url, data=json.dumps(payload), headers=headers)

# usage :   
#data = {
  #'ambient_temperature': 27.2,
  #'pressure': 123.21,
  #'humidity': 123.4567
  #}
#sendData( 14.123, -90.1234, agent, data)