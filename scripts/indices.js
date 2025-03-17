// Indices en coleccion "restaurants"
db["restaurants"].createIndex({"name": 1, "address line 2": 1, "rating": -1})

// Indices en coleccion "inspections"
db["inspections"].createIndex({"business_name": 1})
