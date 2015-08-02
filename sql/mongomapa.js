var geojsonDoc = {
    "docnum":7,
    "type": "Feature",
    "properties": {
        "nombre": "Carnes 1",
        "amenity": "local",

        "popupContent": "Carnes 1",
	      "tipoComida":"Carnes",
        "rating":"",
        "menu":[{"nombreComida":"","precio":""}]
    },
    "geometry": {
        "type": "Point",
        "coordinates": [14.126803, -87.218234]
    }
};
db.restaurantes.insert(geojsonDoc);

var geojsonDoc = {
    "docnum":7,
    "type": "Feature",
    "properties": {
        "nombre": "Carnes 1",
        "amenity": "foodcourt",
        "localesAsociados":[1,5,5],
        "popupContent": "Carnes 1",
	      "tipoComida":"Carnes",
        "rating":"",
        "menu":[{"nombreComida":"","precio":""}]
    },
    "geometry": {
        "type": "Point",
        "coordinates": [14.126803, -87.218234]
    }
};
