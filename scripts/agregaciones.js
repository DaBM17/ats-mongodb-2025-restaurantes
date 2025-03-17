// Agrupar restaurantes por tipo de comida y calcular la calificación promedio
db.restaurants.aggregate([
    {
        $group: {
            _id: "$type_of_food",
            averageRating: { $avg: "$rating" }
        }
    }
]);

// Contar el número de inspecciones por resultado y mostrar los porcentajes
db.inspections.aggregate([
    {
      $group: {
        _id: "$result",
        count: { $sum: 1 }
      }
    },
    {
      $group: {
        _id: null,
        results: { $push: { result: "$_id", count: "$count" } },
        totalCount: { $sum: "$count" }
      }
    },
    {
      $unwind: "$results"
    },
    {
      $project: {
        _id: "$results.result",
        count: "$results.count",
        percentage: {
          $multiply: [
            { $divide: ["$results.count", "$totalCount"] },
            100
          ]
        }
      }
    },
    {
      $sort: { count: -1 }
    }
]);

// Unir restaurantes con sus inspecciones utilizando $lookup
db.restaurants.aggregate([
    {
        $lookup: {
            from: "inspections",
            let: { restaurantId: { $toString: "$_id" } },
            pipeline: [
                { $match: { $expr: { $eq: ["$restaurant_id", "$$restaurantId"] } } }
            ],
            as: "inspection_history"
        }
    },
    {
        $project: {
            _id: 0,
            restaurantName: "$name",
            inspectionCount: { $size: "$inspection_history" }
        }
    },
    {
        $sort: {
            inspectionCount: 1
        }
    }
]);
