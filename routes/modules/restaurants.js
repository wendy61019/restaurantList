const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

//新增餐廳頁面
router.get('/new', (req, res) => {
    res.render('new')
})

//瀏覽特定餐廳
router.get('/:restaurant_id', (req, res) => {
    const id = req.params.restaurant_id
    return Restaurant.findById(id)
        .lean()
        .then(restaurant => res.render('show', { restaurant }))
        .catch(error => console.log(error))
})

//新增餐廳
router.post('/restaurants', (req, res) => {
    const {
        name, rating, category, location, google_map, phone, description, image
    } = req.body
    return Restaurant.create(
        name, category, image, location,
        phone, google_map, rating, description
    )
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

//編輯餐廳頁面
router.get('/:restaurant_id/edit', (req, res) => {
    const id = req.params.restaurant_id
    return Restaurant.findById(id)
        .lean()
        .then(restaurant => res.render('edit', { restaurant }))
        .catch(error => console.log(error))
})

//更新餐廳
router.put('/:restaurant_id', (req, res) => {
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
        .catch(error => console.log(error))
})

//刪除餐廳
router.delete('/:restaurant_id', (req, res) => {
    const id = req.params.restaurant_id
    return Restaurant.findById(id)
        .then(restaurant => restaurant.remove())
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})
module.exports = router
