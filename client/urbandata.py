import requests
import json
import datetime
import logging


Config = {
    'url' : 'http://198.199.98.147:5000/data_point',
    'agent' : 'Default',
    'user': 'urbanuser',
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
    "agent": Config['agent'],
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
  r = requests.post(Config['url'], data=json.dumps(payload), headers=headers, auth=(Config['user'], Config['password']))

  logger = logging.getLogger('urban-data')
  logger.setLevel(logging.DEBUG)
  ch = logging.StreamHandler()
  ch.setLevel(logging.DEBUG)
  logger.addHandler(ch)

  #TODO: add SQL or TXT file logging policies
  #fh = logging.FileHandler('spam.log')
  # https://docs.python.org/2/howto/logging-cookbook.html
  if r.ok: 
    logger.debug("Succesful request")
  logger.info("Sent data with values: {0}".format(json.dumps(payload)))
