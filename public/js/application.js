$(function() {
	// variables para los filtros
	var carneAsada = new L.LayerGroup();
	var mariscos = new L.LayerGroup();
	var baleada = new L.LayerGroup();
	var foodcourt = new L.LayerGroup();
	var vLayers = [carneAsada,mariscos,baleada,foodcourt];

	var baseLayers={};
	var overlays = {
			"Mariscos": mariscos,
			"Carnes Asadas": carneAsada,
			"Baleadas": baleada,
			"FoodCourts": foodcourt
		};
 //---------------------------------------
	var map;

	// estilos de iconos de marcadores personalizados
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

	// check whether browser supports geolocation api
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(positionSuccess, positionError, { enableHighAccuracy: true });
	} else {
		$(".map").text("Your browser is out of fashion, there\'s no geolocation!");
	}

	function positionSuccess(position) {
		var lat = position.coords.latitude;
		var lng = position.coords.longitude;
		var acr = position.coords.accuracy;
		// mark user's position
		var userMarker = L.marker([lat, lng], {
			icon: redIcon
		});

		// load leaflet map
		//los layers vendrian siendo nuestros checkbox en los filtros
		map = L.map("map",{layers: vLayers}).setView([lat, lng], 16);

		// leaflet API key tiler es decir de donde se carga el mapa
		L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
			maxZoom: 18,
			attribution: "",
			detectRetina: true }).addTo(map);
			//se agrega la ubicacion actual del usuario
		userMarker.addTo(map);
		userMarker.bindPopup("Usted esta aqui").openPopup();
		//funcion que pone los restaurantes en el mapa por categorias
    setMarker();
	}

  function setMarker() {
		setCatMariscos();
		setCatCarneAsada();
		setCatBaleadas();
		setCatFoodCourts();
		//aqui agregamos la caja para los filtros
		L.control.layers(baseLayers,overlays).addTo(map);
	}

	function setCatMariscos(){
		$.ajax("mapa/CatMariscos",
	          {
	              "method":"GET",
	              "data":{},
	              "dataType":"json",
	              "success":function(jsonDoc,status,jqXHR){
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

	function setCatBaleadas() {
		$.ajax("mapa/CatBaleadas",
	          {
	              "method":"GET",
	              "data":{},
	              "dataType":"json",
	              "success":function(jsonDoc,status,jqXHR){
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

	function setCatFoodCourts() {
		$.ajax("mapa/CatFoodCourt",
	          {
	              "method":"GET",
	              "data":{},
	              "dataType":"json",
	              "success":function(jsonDoc,status,jqXHR){
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
