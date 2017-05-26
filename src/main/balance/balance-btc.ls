request = require \request
cheerio = require \cheerio
big-number = require \big.js
iserror = require \../iserror.js

#unconfirmed
#http://ltc.blockr.io/api/v1/address/unconfirmed/LajyQBeZaBA1NkZDeY8YT5RYYVRkXMvb2T

module.exports = (key, callback)->
    err, response <-! request "https://blockchain.info/address/#{key}"
    return callback null if iserror err, "Balance btc #{key}"
    $ = cheerio.load response.body
    html = $ '#final_balance span' .html!
    return callback null if not html?
    
    tr = $('#final_balance span').html!.replace /[^0-9.]/g,""
    #console.log \btc, key,  tr
    callback big-number tr
    
    
