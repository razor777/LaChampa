$(function() {
	// variables para los filtros
	var carneAsada = new L.LayerGroup();
	var mariscos = new L.LayerGroup();

	var baseLayers={};
	var overlays = {
			"Mariscos": mariscos,
			"Carne Asada": carneAsada
		};
 //---------------------------------------
	var userId = Math.random().toString(16).substring(2,15);
	var map;

	var doc = $(document);

	// custom marker's icon styles
	var tinyIcon = L.Icon.extend({
		options: {
			shadowUrl: "../assets/marker-shadow.png",
			iconSize: [25, 39],
			iconAnchor:   [12, 36],
			shadowSize: [41, 41],
			shadowAnchor: [12, 38],
			popupAnchor: [0, -30]
		}
	});
	var redIcon = new tinyIcon({ iconUrl: "../assets/marker-red.png" });
	var yellowIcon = new tinyIcon({ iconUrl: "../assets/marker-yellow.png" });

	var markers = {};

	// check whether browser supports geolocation api
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(positionSuccess, positionError, { enableHighAccuracy: true });
	} else {
		$(".map").text("Your browser is out of fashion, there\'s no geolocation!");
	}

  $.ajax("mapa/mapa",
          {
              "method":"GET",
              "data":{},
              "dataType":"json",
              "success":function(jsonDoc,status,jqXHR){
                console.log("success");
								console.log(jsonDoc);
              },
              "error":function(jqXHR,status, errorMsg){
								console.log("error");
                console.log(errorMsg);
              }
          }
  );//ajax

	function positionSuccess(position) {
		var lat = position.coords.latitude;
		var lng = position.coords.longitude;
		var acr = position.coords.accuracy;
		// mark user's position
		var userMarker = L.marker([lat, lng], {
			icon: redIcon
		});

		// load leaflet map
		map = L.map("map",{layers: [carnes, pescado]}).setView([lat, lng], 16);

		// leaflet API key tiler
		L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
			maxZoom: 18,
			attribution: "",
			detectRetina: true }).addTo(map);
		userMarker.addTo(map);
		userMarker.bindPopup("Usted esta aqui").openPopup();
    setMarker();
	}

  function setMarker() {
		setCatMariscos();
		setCatCarneAsada();
		L.control.layers(baseLayers,overlays).addTo(map);
	}

	function setCatMariscos(){
		$.ajax("mapa/setCatMariscos",
	          {
	              "method":"GET",
	              "data":{},
	              "dataType":"json",
	              "success":function(jsonDoc,status,jqXHR){
										console.log("setCatCarneAsada");
	                  console.log(jsonDoc);
										for (i = 0; i < jsonDoc.restaurantes.length; i++) {
											var marker = L.marker([jsonDoc.restaurantes[i].geometry.coordinates[0],
								        jsonDoc.restaurantes[i].geometry.coordinates[1]], { icon: yellowIcon }).addTo(mariscos);
								      marker.bindPopup(jsonDoc.restaurantes[i].properties.popupContent);
										}

	              },
	              "error":function(jqXHR,status, errorMsg){
	                  console.log(errorMsg);
	                  console.log("error");
	              }
	          }
	  );//ajax
	}

	function setCatCarneAsada(){
		$.ajax("mapa/CatCarneAsada",
	          {
	              "method":"GET",
	              "data":{},
	              "dataType":"json",
	              "success":function(jsonDoc,status,jqXHR){
										console.log("setCatCarneAsada");
	                  console.log(jsonDoc);
										for (i = 0; i < jsonDoc.restaurantes.length; i++) {
											var marker = L.marker([jsonDoc.restaurantes[i].geometry.coordinates[0],
								        jsonDoc.restaurantes[i].geometry.coordinates[1]], { icon: yellowIcon }).addTo(carneAsada);
								      marker.bindPopup(jsonDoc.restaurantes[i].properties.popupContent);
										}

	              },
	              "error":function(jqXHR,status, errorMsg){
	                  console.log(errorMsg);
	                  console.log("error");
	              }
	          }
	  );//ajax

	}

	// handle geolocation api errors
	function positionError(error) {
		var errors = {
			1: "Authorization fails", // permission denied
			2: "Can\'t detect your location", //position unavailable
			3: "Connection timeout" // timeout
		};
		showError("Error:" + errors[error.code]);
	}

	function showError(msg) {
		info.addClass("error").text(msg);
	}
});
