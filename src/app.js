const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/gecode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express Config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partials = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partials)

//Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Brian R'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'Brian R'
    })

})

app.get('/help',(req,res) =>{
    res.render('help',{
        title: 'Help',
        name: 'Brian R',
        message: 'A Jay A Day Keeps The Doctor Away :)'
    })

})

app.get('/weather',(req, res) =>{
    if(!req.query.address){
         res.send({
            error: 'Hey we need an address to get you the weather'
        })
    }else{
        geocode(req.query.address,(error,{latitude,longitude,location} ={})=>{
            if(error){
                return res.send({ error })

            }
        
            forecast(latitude,longitude,(error,forecast)=>{
                if(error){
                   return res.send({ error })
                }
                res.send({
                    forecast: forecast,
                    location: location,
                    address: req.query.address
                })
            })
          

        })
        
    }
    
})

app.get('/products',(req,res)=>{
   if(!req.query.search){
      return res.send({
           error: 'Must provide search term'
       })

   }
   console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res)=>{
   res.render('404',{
       title:'404',
       error:'Nothing over Here',
       name: 'Brian R'
   })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        error: 'Page Not Found',
        name: 'Brian R'
        
    })
    
})


app.listen(port, ()=>{

    console.log('server is up on port '+ port)

})