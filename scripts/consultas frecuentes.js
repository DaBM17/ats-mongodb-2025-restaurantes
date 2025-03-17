// Consultar información de un restaurante dado el nombre
db["restaurants"].find({"name": "042 Restaurant & Bar"})

// Consultar que restaurantes hay en una determinada ciudad
db["restaurants"].find({"address line 2": "Cardiff"})

// Consultar los restaurantes mejor valorados
db["restaurants"].find({"rating": {$ne: "Not yet rated"}}).sort({"rating": -1})

// Consultar las inspecciones de un restaurante
db["inspections"].find({"business_name": "@ THAI RESTAURANT"})
