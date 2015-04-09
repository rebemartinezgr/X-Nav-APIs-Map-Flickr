
var map;
var feature;
var inp;

function load_map() {
	
 	map = L.map('map').setView([40.2838, -3.8215], 16);//crea el mapa y lo ajsuta al punto dado
	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://           			creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
   		 maxZoom: 18
  	}).addTo(map);
	$("#addr").val(" ");
}
function addr_search() {
	$("#images").empty();
 	inp = document.getElementById("addr");
	$.getJSON('http://nominatim.openstreetmap.org/search?format=json&limit=5&q=' + inp.value, function(data){
		var items = [];
		$.each(data, function(key, val) {
  			items.push(
			//la funcion chooseAddr es la responsable de centrar el mapa en el reusltado elegido
    			"<li><a href='#' onclick='chooseAddr(" + 
    			val.lat + ", " + val.lon + ");return false;'>" + val.display_name + '</a></li>'
			);
		});
		$('#results').empty();
   		if (items.length != 0) {
     			$('<p>', { html: "Search results:" }).appendTo('#results');
      			$('<ul/>', {
        			'class': 'my-new-list',
        			html: items.join('')
      			}).appendTo('#results');
    		} else {
      			$('<p>', { html: "No results found" }).appendTo('#results');
    		}
  	});	
}

function chooseAddr(lat, lng, type) {

	var location = new L.LatLng(lat, lng);
  	map.panTo(location);
	if (type == 'city' || type == 'administrative') {
    		map.setZoom(11);
  	} else {
    	map.setZoom(13);
  	}
	//funcionalidad flickir
	$("#images").empty();
		var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
		var tag = inp.value;
		$.getJSON( flickerAPI, {
			tags: tag,
			tagmode: "any",
			format: "json"
		})
		.done(function( data ) {
			$.each( data.items, function( i, item ) {
				$( "<img>" ).attr( "src", item.media.m ).appendTo( "#images" );
				if ( i === 5 ) {
					return false;
				}
			});
		});
}

window.onload = load_map;	

 

   


