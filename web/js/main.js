function genrandata() {
  var testData = [];
  for (var i = 0; i < 100; i++)
    testData.push(
      {
        geometry: {
          coordinates: [Math.random()* 0.19 + 14.6, -90.55 + Math.random()*0.28],
          type: "Point"
        },
        type: "Feature",
        properties: {
          temperature:  Math.random(),
          humidity: Math.random(),
          noise: Math.random(),
          co2: Math.random(),
          sunlight: Math.random(),
          uvlight: Math.random()
        }
      });
  return {_items: testData};
}

function refreshScreen() {
  var navHeight = 52;
  var winHeight = $(window).height()
  var mapHeight = (winHeight - navHeight);

  if (winHeight > 452) {
    $('.masthead').height(mapHeight);
    $('#map').height(mapHeight);
  } else {
    $('.masthead').height(452 - navHeight);
    $('#map').height(452 - navHeight);
  }
}

function toggleSidePanel() {
  if ($("#sidepanel").css("right") == "-5px")
    $("#sidepanel").animate({
      "right": -245
    }, 600);
  else 
    $("#sidepanel").animate({
      "right": -5
    }, 600);
}

$(window).resize(function() {
  refreshScreen();
});

$(function () {
  'use strict';

  refreshScreen();

  /* put the small logo */
  var smallHidden = true;
  $(window).scroll(function () {
    if ($(window).height() < $(window).scrollTop()+30) {
      if (smallHidden) {
        $('#small-logo').removeClass('hide');
        $('#logo').addClass('hide');

        smallHidden = false;
      }
    }
    else {
      if (!smallHidden) {
        $('#small-logo').addClass('hide');
        $('#logo').removeClass('hide');

        smallHidden = true;
      }
    }
  });
  /* affix the navbar after scroll below header */
  $('#nav').affix({
    offset: {
      top: function() {
        /* as a function so it changes the affixtop dynamically */

        var mapHeight = ($(window).height() - 52);
        return ($(window).height() > 452) ? mapHeight : 400;
      }
    }
  });

  /* highlight the top nav as scrolling occurs */
  $('body').scrollspy({ target: '#nav' })

  /* smooth scrolling for scroll to top */
  $('.scroll-top').click(function(){
    $('body, html').animate({scrollTop: 0}, 1000);
  })

  /* smooth scrolling for nav sections */
  $('#nav .navbar-nav li>a').click(function(){
    var link = $(this).attr('href');
    var posi = $(link).offset().top;
    $('body,html').animate({scrollTop:posi}, 700);
  });

  /* Side panel */
  $("#toggle_panel").click(toggleSidePanel);

  urbanmap();
});

/* test function to initilize and handle the map */
/* TODO: put this into a nice class with a better structure */
function urbanmap () {
  var map = L.map('map', {
    scrollWheelZoom: false,
    infoControl: false
  })
  .setView([14.62, -90.48], 14);

  var tilejson = 'elguille.i059n18d';

  // OSM tilejson
  // var tilejson = {
  //     "tilejson": "2.0.0",
  //     "name": "OpenStreetMap",
  //     "description": "A free editable map of the whole world.",
  //     "version": "1.0.0",
  //     "attribution": "&copy; OpenStreetMap contributors, CC-BY-SA",
  //     "scheme": "xyz",
  //     "tiles": [
  //         "http://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
  //         "http://b.tile.openstreetmap.org/{z}/{x}/{y}.png",
  //         "http://c.tile.openstreetmap.org/{z}/{x}/{y}.png"
  //     ]
  // };
  // var geojsonMarkerOptions = {
  //   radius: 8,
  //   fillColor: "#449",
  //   color: "#000",
  //   weight: 1,
  //   opacity: 0.7,
  //   fillOpacity: 0.1
  // };
  var urbanmarker = L.icon({
    iconUrl: 'img/urbanmarker.png',
    iconAnchor: L.point(16,32)
  });

  map.addLayer(L.mapbox.tileLayer(tilejson));
  map.addControl(L.mapbox.legendControl());
  // the heat layer
  var heatmap = L.heatLayer([], {
         opacity: 0.5,
         radius: 20,
         blur: 19
    }).addTo(map);

  var humidityLayer = L.heatLayer([],{
      radius: 20,
      opacity: 0.8,
      blur: 19,
      gradient: { 0.1: "black", 0.8: "rgb(200,200,255)", 1.0: "white" }
  });
  var lightLayer = L.heatLayer([], {
      radius: 20,
      opacity: 0.5,
      blur: 19,
      gradient: {
         0.45: "rgb(100,100,100)",
         0.55: "rgb(100,100,0)",
         0.65: "rgb(200,200,0)",
         0.95: "rgb(250,250,0)",
         1.0: "rgb(255,255,200)"
      }
  });
  var uvLayer = L.heatLayer([], {
      radius: 20,
      opacity: 0.5,
      blur: 19,
      gradient: {
         0.65: "rgb(100,100,100)", 0.8: "rgb(210,0,230)"
      }
  });
  var co2Layer = L.heatLayer([], { 
      radius: 20,
      opacity: 0.5,
      blur: 19,
      gradient: {
         0.45: "rgb(100,100,100)",
         0.75: "rgb(200,200,200)",
         1.0: "rgb(255,0,0)"
      }
  });
  var noiseLayer = L.heatLayer([], {
      radius: 20,
      opacity: 0.5,
      blur: 19,
      gradient: {
        0.15: "rgb(155,155,155)",
        0.45: "rgb(255,255,255)",
        1.0: "rgb(0,0,0)"
      }
  });

  var overlayMaps = {
      'Temperature': heatmap,
      'Humidity' : humidityLayer,
      'Light': lightLayer,
      'UVLight': uvLayer,
      'Noise': noiseLayer,
      'CO2': co2Layer
  };

  $('.icon-checkbox').click(function (){
    if ($(this).data("checked"))
      overlayMaps[$(this).data('overlay_map')].addTo(map);
    else 
      map.removeLayer(overlayMaps[$(this).data('overlay_map')]);
  });

  // Real or fake data. 
  //var dataPromise = $.ajax("http://urban-data.sebastianoliva.com:5000/data_point");  
  var dataPromise = new $.Deferred(); 
  dataPromise.resolve(genrandata());

  dataPromise.then(function (response) {
    // hide the loading
    $('body').removeClass('loading');
    $('.load').delay(500).queue( function(next) {
        $(this).hide();
        next();
    });

    // iterate over the geojson response
    var feature, data = response._items;
    for (var i = 0; i < data.length; i ++) {
      
      feature = data[i];

      // TODO fix this.
      // swap coordinates
      temp = feature.geometry.coordinates[0];
      feature.geometry.coordinates[0] = feature.geometry.coordinates[1];
      feature.geometry.coordinates[1] = temp;
      // *******************

      L.geoJson(feature, {
        onEachFeature: function (feature, layer) {
          map.addControl(L.mapbox.legendControl("<div><h3>Raspi X</h3> Temperature : 23.43 C</div>"));
        },
        pointToLayer: function (feature, latlng) {
          return L.marker(latlng, {icon: urbanmarker});
        }
      }).addTo(map);
      if (feature.properties.humidity) 
        humidityLayer.addLatLng(new L.latLng(
          [feature.geometry.coordinates[1], feature.geometry.coordinates[0], feature.properties.humidity] 
          ));  
      if (feature.properties.temperature)
        heatmap.addLatLng(new L.latLng(
          [feature.geometry.coordinates[1], feature.geometry.coordinates[0], feature.properties.temperature] 
          ));
      if (feature.properties.sunlight)
        lightLayer.addLatLng(new L.latLng(
          [feature.geometry.coordinates[1], feature.geometry.coordinates[0], feature.properties.sunlight] 
          ));
      if (feature.properties.uvlight)
        uvLayer.addLatLng(new L.latLng(
          [feature.geometry.coordinates[1], feature.geometry.coordinates[0], feature.properties.uvlight] 
          ));
      if (feature.properties.noise)
        noiseLayer.addLatLng(new L.latLng(
          [feature.geometry.coordinates[1], feature.geometry.coordinates[0], feature.properties.noise] 
          ));
      if (feature.properties.co2)
        co2Layer.addLatLng(new L.latLng(
          [feature.geometry.coordinates[1], feature.geometry.coordinates[0], feature.properties.co2] 
          ));
    }
  });

}