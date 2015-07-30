use LaChampadb;
var geojsonDoc = {
    "docnum":1,
    "type": "Feature",
    "properties": {
        "nombre": "Nose 1",
        "amenity": "",
        "popupContent": "",
	      "tipoComida":"Carne Asada"
    },
    "geometry": {
        "type": "Point",
        "coordinates": [14.122947, -87.221605]
    }
};

db.restaurantes.insert(geojsonDoc);

var geojsonDoc = {
    "docnum":2,
    "type": "Feature",
    "properties": {
        "nombre": "Nose 2",
        "amenity": "",
        "popupContent": "",
	      "tipoComida":"Carne Asada"
    },
    "geometry": {
        "type": "Point",
        "coordinates": [14.124609, -87.224002]
    }
};

db.restaurantes.insert(geojsonDoc);

var usuarios = {
 "usuario":"",
 "correo":"",
 "contrasenia":"",
 "favoritos":""
};
