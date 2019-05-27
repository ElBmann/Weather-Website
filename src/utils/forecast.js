const request = require('request')

const forecast =(lat, long, callback)=>{
    const url = 'https://api.darksky.net/forecast/59d55cd51d0ab8f218b5d225560e17f6/'+ lat + ',' + long
 
    request({url:url, json: true},(error, {body})=>{
      
      
       if(error){
          callback('no service check your internet', undefined)
 
       }else if(body.error){
          callback('issue with coordinates', undefined)
       }else{
          callback(undefined, {
            forecast: body.daily.data[0].summary + 'Temp: '+ body.daily.data[0].temperatureMax
            
          })
       }
 
    })
 
 }
 module.exports = forecast