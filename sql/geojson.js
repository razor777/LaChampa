use LaChampadb;
var geojsonDoc = {
    "docnum":7,
    "type": "Feature",
    "properties": {
        "nombre": "Carnes 1",
        "amenity": "local",
        "popupContent": "Carnes 1",
	      "tipoComida":"carneAsada"
    },
    "geometry": {
        "type": "Point",
        "coordinates": [14.126803, -87.218234]
    }
};
db.restaurantes.insert(geojsonDoc);
var geojsonDoc = {
    "docnum":8,
    "type": "Feature",
    "properties": {
        "nombre": "Carnes 2",
        "amenity": "local",
        "popupContent": "Carnes 2",
	      "tipoComida":"carneAsada"
    },
    "geometry": {
        "type": "Point",
        "coordinates": [14.125638, -87.217398]
    }
};
db.restaurantes.insert(geojsonDoc);
var geojsonDoc = {
    "docnum":9,
    "type": "Feature",
    "properties": {
        "nombre": "Pescado 1",
        "amenity": "local",
        "popupContent": "Pescado 1",
	      "tipoComida":"mariscos"
    },
    "geometry": {
        "type": "Point",
        "coordinates": [14.121664, -87.218127]
    }
};
db.restaurantes.insert(geojsonDoc);
var geojsonDoc = {
    "docnum":10,
    "type": "Feature",
    "properties": {
        "nombre": "Pescado 2",
        "amenity": "local",
        "popupContent": "Pescado 2",
	      "tipoComida":"mariscos"
    },
    "geometry": {
        "type": "Point",
        "coordinates": [14.120359, -87.216090]
    }
};

db.restaurantes.insert(geojsonDoc);
