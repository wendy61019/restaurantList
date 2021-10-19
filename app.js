const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

app.use(express.static('public'))

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.get('/', (req,res) => {
    // past the restaurant data into 'index' partial template
    res.render('index', { restaurants: restaurantList.results } )
})

app.get('/restaurants/:restaurant_id', (req, res) => {
    const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
    res.render('show', { restaurant: restaurant })
})

app.get('/search', (req, res) => {
    if (!req.query.keyword) {
    res.redirect("/")
  }
    const keyword = req.query.keyword.trim().toLowerCase()
    const restaurants = restaurantList.results.filter(restaurant => {
        return restaurant.name.toLowerCase().includes(keyword) || restaurant.category.includes(keyword)
    })
    res.render('index', { restaurants: restaurants, keyword: keyword })
})

app.listen(port, () => {
    console.log(`Express is listening on localhost:${port}`)
})