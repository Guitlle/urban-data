# virtualenv venv/
source venv/bin/activate

$ curl -d ''{"geometry": {"type": "Point", "coordinates": [125.6, 10.1]}, "type": "Feature", "properties": {"name": "Dinagat Islands"}}'' -H 'Content-Type: application/json' http://localhost:5000/data_point