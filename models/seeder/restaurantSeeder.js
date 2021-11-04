const Restaurant = require("../restaurant.js")
const restaurantList = require("../../restaurant.json")

const db = require('../../config/mongoose')

db.once("open", () => {
    console.log("running restaurantSeeder script...")

    Restaurant.create(restaurantList)
    .then(() => {
        console.log("restaurantSeeder done!")
        db.close()
    })
    .catch(err => console.log(err))
})
