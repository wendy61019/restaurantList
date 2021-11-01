const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const methodOverride = require("method-override")
const Restaurant = require('./models/Restaurant')
const restaurant = require('./models/Restaurant')

const app = express()
const port = 3000

mongoose.connect('mongodb://localhost/restaurant-list', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection

db.on('error', () => {
    console.log('mongodb error!')
})

db.once('open', () => {
    console.log('mongodb connected!')
})

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

//Set Routing Here
//瀏覽全部餐廳
app.get('/', (req, res) => {
    return Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(err => console.log(err))
})

//搜尋特定餐廳
app.get('/search', (req, res) => {
    if(!req.query.keyword) {
      res.redirect('/')
    }

    const keyword = req.query.keyword.trim().toLowerCase()

    return Restaurant.find()
      .lean()
      .then(restaurants => {
          const filterrestaurants = restaurants.filter(data => data.name.toLowerCase().includes(keyword) || data.category.includes(keyword))
          res.render('index', { restaurants: filterrestaurants, keyword })
      })
      .catch(err => console.log(err))
})

//新增餐廳頁面
app.get('/restaurants/new', (req, res) => {
    res.render('new')
})

//瀏覽特定餐廳
app.get('/restaurants/:restaurant_id', (req, res) => {
    const id = req.params.restaurant_id
    return Restaurant.findById(id)
      .lean()
      .then(restaurant => res.render('show', { restaurant }))
      .catch(err => console.log(err))
})

//新增餐廳
app.post('/restaurants', (req, res) => {
    const {
    name, rating, category, location, google_map, phone, description, image
    } = req.body
    return Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

//編輯餐廳頁面
app.get('/restaurants/:restaurant_id/edit', (req, res) => {
    const id = req.params.restaurant_id
    return Restaurant.findById(id)
        .lean()
        .then(restaurant => res.render('edit', { restaurant }))
        .catch(err => console.log(err))
})

//更新餐廳
app.post('/restaurants/:restaurant_id/edit', (req, res) => {
    const id = req.params.restaurant_id
    const {
    name, rating, category, location, google_map, phone, description, image
    } = req.body
    return Restaurant.findById(id)
    .then(restaurant => {
        restaurant.name = name
        restaurant.rating = Number(rating)
        restaurant.category = category
        restaurant.location = location
        restaurant.google_map = google_map
        restaurant.phone = phone
        restaurant.description = description
        restaurant.image = image
        restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(err => console.log(err))
})

//刪除餐廳
app.delete('/restaurants/:restaurant_id', (req, res) => {
    const id = req.params.restaurant_id
    return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.listen(port, () => {
    console.log(`Express is listening on localhost:${port}`)
})
