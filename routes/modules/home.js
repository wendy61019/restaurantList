const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

//瀏覽全部餐廳
router.get('/', (req, res) => {
    return Restaurant.find()
        .lean()
        .sort({ _id: 'asc' })
        .then(restaurants => res.render('index', { restaurants }))
        .catch(error => console.log(error))
})


//搜尋特定餐廳 加入排序條件
router.get('/search', (req, res) => {

    const sort = req.query.sort
    const userInputKeyword = req.query.keyword.trim()

    const symbols = '`~!@$%^&*()-_+={}[]|;:"<>,.?/\\'
    const processedKeyword = [...userInputKeyword].filter(arrayItem => !symbols.includes(arrayItem)).join('')

    const regexKeyword= new RegExp(`${processedKeyword}`, 'i')
    const sortCondition = {}
    const sortOptions = [
        { name:'A -> Z', value: 'asc' },
        { name: 'Z -> A', value: 'desc' },
        { name: '類別', value: 'category'},
        { name: '地區', value: 'location' },
    ]

    sortOptions.forEach((item, index) => {
        sortOptions[index]['isSelected'] = sort === item.value
    })

    switch (true) {
      case sort === 'asc'  ||  sort === 'desc':
        sortCondition['name'] = sort
        break
      case sort === 'category' || sort === 'location':
        sortCondition[sort] = 'asc'
        break
      default:
        sortCondition['_id'] = 'asc'
    }

    Restaurant.find({ $or: [{ name: regexKeyword }, { category: regexKeyword }] })
        .lean()
        .sort(sortCondition)
        .then(restaurants => res.render('index', { restaurants, keyword: userInputKeyword, sortOptions }
        ))
        .catch(error => console.log(error))
})

module.exports = router
