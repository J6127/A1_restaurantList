const express = require ('express')
const port = 3000
const app = express ()
//handlers
const exphbs = require ('express-handlebars')
//json
const restaurant = require ('./restaurant.json').results //get restuarant.results

//template engine setting
app.engine ('handlebars',exphbs({defaultLayout:'main'}))
app.set ('view engine','handlebars')

//setting static doc
app.use (express.static('public'))

//routers setting
app.get ('/',(req,res)=>{
    res.render (`index`,{ restaurant:restaurant})
})

//routers detials
app.get ('/restaurants/:restaurant_id',(req,res)=>{
    console.log(`req.params.restaurant_id`,req.params.restaurant_id)
    const restaurants = restaurant.find (
        restaurant => restaurant.id.toString() === req.params.restaurant_id
        )
    res.render ('show',{ restaurant:restaurants})

    })



//searchbar
app.get('/search', (req, res) => {
    const keyword = req.query.keyword
    const restaurantlist = restaurant.filter(restaurant => {
      return restaurant.name.toLowerCase().includes(keyword.toLowerCase())||
      restaurant.name_en.toLowerCase().includes(keyword.toLowerCase())||
      restaurant.category.includes(keyword)
    })
    res.render('index', { restaurant: restaurantlist, keyword:keyword })
  })

//listen
app.listen (port,()=>{
    console.log(`This is restaurant list port:${port}`)
})