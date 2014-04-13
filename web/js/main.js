function genrandata() {
  var testData = [];
  for (var i = 0; i < 100; i++)
    testData.push({lat: Math.random()* 0.1 + 14.6 , lon: -90.55 + Math.random()*0.1, value: Math.random() });
  return testData;
}
var heatmapLayer;
$(function() {
  /* affix the navbar after scroll below header */
  $('#nav').affix({
    offset: {
      top: $(window).height() - $('#nav').height()
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

  var mapHeight = $(window).height() - $('#nav').height()
  $('.masthead').height(mapHeight);
  $('#map').height(mapHeight);

  // add an OpenStreetMap tile layer
  var baseLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  });
  
  heatmapLayer = L.TileLayer.heatMap({
      radius: 20,
      opacity: 0.6,
      gradient: {
	  0.45: "rgb(0,0,255)",
	  0.55: "rgb(0,255,255)",
	  0.65: "rgb(0,255,0)",
	  0.95: "yellow",
	  1.0: "rgb(255,0,0)"
      }
  });
  var humidityLayer = L.TileLayer.heatMap({
      radius: 20,
      opacity: 0.6,
      gradient: {
	  0.45: "rgb(0,0,20)",
	  0.55: "rgb(0,0,60)",
	  0.65: "rgb(0,0,100)",
	  0.95: "rgb(0,0,130)",
	  1.0: "rgb(0,0,200)"
      }
  });
  var lightLayer = L.TileLayer.heatMap({
      radius: 20,
      opacity: 0.6,
      gradient: {
	  0.45: "rgb(100,100,100)",
	  0.55: "rgb(100,100,0)",
	  0.65: "rgb(200,200,0)",
	  0.95: "rgb(250,250,0)",
	  1.0: "rgb(255,255,200)"
      }
  });
  var uvLayer = L.TileLayer.heatMap({
      radius: 20,
      opacity: 0.6,
      gradient: {
	  0.45: "rgb(200,0,255)",
	  0.55: "rgb(100,0,200)",
	  0.65: "rgb(0,255,0)",
	  0.95: "yellow",
	  1.0: "rgb(255,0,0)"
      }
  });
  var co2Layer = L.TileLayer.heatMap({
      radius: 20,
      opacity: 0.6,
      gradient: {
	  0.45: "rgb(0,50,0)",
	  0.55: "rgb(0,100,0)",
	  0.65: "rgb(0,155,0)",
	  0.95: "rgb(0,200,0)",
	  1.0: "rgb(0,250,0)"

      }
  });
  var noiseLayer = L.TileLayer.heatMap({
      radius: 20,
      opacity: 0.8,
      gradient: {
	  0.45: "rgb(20,0,0)",
	  0.55: "rgb(60,0,0)",
	  0.65: "rgb(100,0,0)",
	  0.95: "rgb(130,0,0)",
	  1.0: "rgb(200,0,0)"
      }
  });

  heatmapLayer.addData(genrandata());
  humidityLayer.addData(genrandata());
  noiseLayer.addData(genrandata());
  co2Layer.addData(genrandata());
  lightLayer.addData(genrandata());
  
  var overlayMaps = {
      'Temperature': heatmapLayer,
      'Humidity' : humidityLayer,
      'Light': lightLayer,
      'UVLight': uvLayer,
      'Noise': noiseLayer,
      'CO2': co2Layer
  };

  var controls = L.control.layers(null, overlayMaps, {collapsed: false});

  var map = new L.Map('map', {
      center: new L.LatLng(14.634, -90.5),
      zoom: 13,
      layers: [baseLayer, heatmapLayer],
      scrollWheelZoom: false
  });
  
  $.ajax({url: 'http://198.199.98.147:5000/data_point', 
	 success: function(data) 
	 { 
	   var tempData = [];
	   var myLayer = L.geoJson().addTo(map);
	   
	   $.each(data._items, function (i,e) 
	   {
	     if (e.properties.temperature) 
	     {
	      tempData.push({ lat: e.geometry.coordinates[0], lon: e.geometry.coordinates[1], value: e.properties.temperature});
	      var temp = e.geometry.coordinates[0];
	      e.geometry.coordinates[0] = e.geometry.coordinates[1];
	      e.geometry.coordinates[1] = temp;
	      console.log(e);
	      myLayer.addData(e);
	     }
	   });
	   myLayer.addTo(map);
	   console.log(map);
	   //console.log(tempData);
	   heatmapLayer.addData(tempData);
	   heatmapLayer.redraw();
	} });
  
  controls.addTo(map);

  // make accessible for debugging
  layer = heatmapLayer;
});
