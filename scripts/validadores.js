// Validation Scheme Restauarnts
db.createCollection("restaurants", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["name", "address", "type_of_food"],
            properties: {
                name: {
                    bsonType: "string",
                    description: "Nombre del restaurante"
                },
                address: {
                    bsonType: "array",
                    description: "Array con la calle, ciudad y CP del restaurante",
                    items: {
                        bsonType: "object",
                        required: ["street", "city", "postcode"],
                        properties: {
                            street: { bsonType: "string" },
                            city: { bsonType: "string" },
                            postcode: { bsonType: "string" }
                        }
                    }
                },
                type_of_food: {
                    bsonType: "string",
                    description: "Tipo de comida que sirve el restaurante"
                }
            }
        }
    }
})

// Validation Scheme Inspections
db.createCollection("inspections", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["restaurant_id", "certificate_number", "date", "result", "sector"],
            properties: {
                restaurant_id: {
                    bsonType: "objectId",
                    description: "ID del restaurante inspeccionado"
                },
                certificate_number: {
                    bsonType: "int",
                    description: "Numero del certificado de la inspeccion"
                },
                date: {
                    bsonType: "date",
                    description: "Fecha de la inspeccion"
                },
                result: {
                    bsonType: "string",
                    description: "Resultado de la inspeccion"
                },
                sector: {
                    bsonType: "string",
                    description: "Asunto analizado en la inspeccion"
                }
            }
        }
    }
})
