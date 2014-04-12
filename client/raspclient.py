#!/usr/bin/python
import os
from Adafruit_BMP085 import BMP085
import urbandata

os.system("sudo modprobe w1-gpio && sudo modprobe w1-therm && cd /sys/bus/w1/devices/ && ls && cd 28-000003e48b1e && cat w1_slave")
bmp = BMP085(0x77)
temp = bmp.readTemperature()
pressure = bmp.readPressure()
altitude = bmp.readAltitude()

while True:
	tfile = open("/sys/bus/w1/devices/28-000003e48b1e/w1_slave")
	text = tfile.read()
	tfile.close()
	secondline = text.split("\n")[1]
	temperaturedata = secondline.split(" ")[9]
	temperature = float(temperaturedata[2:])
	temperature = temperature/1000
	print (temperature)
	print "Temperature: %.2f C" % temp
        print "Pressure:    %.2f hPa" % (pressure / 100.0)
        print "Altitude:    %.2f" % altitude
	
        urbandata.send( 14.123, -90.1234, {
        'temperature': temperature,
        'barometer_BMP085_temperature1': temp,
        'pressure': (pressure / 100.0),
        'altitude': altitude,
        #'humidity': 123.4567
        }) 




