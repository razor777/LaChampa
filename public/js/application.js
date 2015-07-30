$(function() {


	// generate unique user id
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
                  console.log(jsonDoc);
                  console.log("success");
                  markers=jsonDoc;

              },
              "error":function(jqXHR,status, errorMsg){
                  console.log(errorMsg);
                  console.log("error");
              }
          }
  );//ajax

	function positionSuccess(position) {
		var lat = position.coords.latitude;
		var lng = position.coords.longitude;
		var acr = position.coords.accuracy;
    console.log("Hola");
    console.log([lat, lng]);
		// mark user's position
		var userMarker = L.marker([lat, lng], {
			icon: redIcon
		});

		// load leaflet map
		map = L.map("map").setView([lat, lng], 16);

		// leaflet API key tiler
		L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
			maxZoom: 18,
			attribution: "",
			detectRetina: true }).addTo(map);
		userMarker.addTo(map);
		userMarker.bindPopup("Usted esta aqui").openPopup();
    setMarker(markers);
	}

  function setMarker(data) {
    for (i = 0; i < data.restaurantes.length; i++) {
      var marker = L.marker([data.restaurantes[i].geometry.coordinates[0],
        data.restaurantes[i].geometry.coordinates[1]], { icon: yellowIcon }).addTo(map);
      marker.bindPopup(data.restaurantes[i].popupContent);
		}
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
