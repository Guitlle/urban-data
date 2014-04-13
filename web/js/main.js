var heatmapLayer;
var testData=[];
for (var i = 0; i < 100; i++)
  testData.push({lat: Math.random()* 0.1 + 14.6 , lon: -90.55 + Math.random()*0.1, value: Math.random() });
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
      opacity: 0.8,
      gradient: {
	  0.45: "rgb(0,0,255)",
	  0.55: "rgb(0,255,255)",
	  0.65: "rgb(0,255,0)",
	  0.95: "yellow",
	  1.0: "rgb(255,0,0)"
      }
  });

  heatmapLayer.addData(testData);

  var overlayMaps = {
      'Heatmap': heatmapLayer
  };

  var controls = L.control.layers(null, overlayMaps, {collapsed: false});

  var map = new L.Map('map', {
      center: new L.LatLng(14.6, -90.55),
      zoom: 13,
      layers: [baseLayer, heatmapLayer]
  });

  controls.addTo(map);

  // make accessible for debugging
  layer = heatmapLayer;
});
