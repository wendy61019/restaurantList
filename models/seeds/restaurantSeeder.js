const Restaurant = require("../restaurant.js")
const restaurantList = require("../../restaurant.json")

const db = require('../../config/mongoose')

db.once("open", () => {
    restaurantList.results.forEach(data => {
    const { 
      name, category, image, location, 
      phone, google_map, rating, description 
    } = data

    Restaurant.create({
      name, category, image, location,
      phone, google_map, rating, description
    })
  })
    
  console.log('restaurantSeeder done!')
})
