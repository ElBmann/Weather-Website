const request = require('request')

const advice = (callback)=>{

    const url = 'https://api.adviceslip.com/advice'

    request({url: url, json: true},(error, response,body)=> {
        // console.log(response.statusCode)
        // console.log(response)
        // callback(undefined, {
           
        //   })
        if(error){
            
        }else{
            callback({
                advice: body.slip.advice
            })
        }
        //console.log(body.slip.advice)
        
     })
}

module.exports = advice