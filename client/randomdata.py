import urbandata
import random

for i in range(1,100):
  urbandata.send(random.uniform(14.5, 14.7), random.uniform(-90.50, -90.60), {
      'temperature': random.uniform(24.5, 27.7),
      'humidity': random.uniform(1, 10),
      'uvlight': random.uniform(1, 10),
      'sunlight': random.uniform(1, 10),
      'noise': random.uniform(1, 10),
      'co2': random.uniform(1,10)
    })