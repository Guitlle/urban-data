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

  // initialize the map on the "map" div with a given center and zoom
  var map = L.map('map', {
      center: [51.505, -0.09],
      zoom: 13,
      scrollWheelZoom: false
  });
  // add an OpenStreetMap tile layer
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
});
