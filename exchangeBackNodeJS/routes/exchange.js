var express = require('express');
var router = express.Router();
var https = require('https');
var http = require('http');
var config = require('../config')

/**
 *  Llamar a api que te retorne los tipos de monedas para llamar 
 *  https://openexchangerates.org/api/currencies.json
 *  
 */
router.get('/currencies', function(req, res, next) {
    request = https.get('https://openexchangerates.org/api/currencies.json', (resp) => {
        resp.on('data', (response) => {
            try {
                res.send(JSON.parse(response));
            } catch(e){
                console.log(e)
                res.end('error');
            }	
        });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    }).end();
});

/**
 *  Llamada que retorna el tipo de cambio a partir de un parametro
 *  http://api.devises.zone/v1/quotes/ARS/{parameter}/json?qty=1&k={YOUR_KEY}
 *  
 */
router.get('/exchange/:currencyFrom/:currencyTo', function(req, res, next) {
    let key = config.keyCambioToday;
    let currencyFrom = parsedCurrencyType(req.param('currencyFrom'));
    let currencyTo = parsedCurrencyType(req.param('currencyTo'));
    let api = 'https://api.devises.zone/v1/quotes/'+currencyFrom+'/'+currencyTo+'/json?qty=1&key='+key;
    
    request = https.get(api, (resp) => {
        resp.on('data', (response) => {
            response = JSON.parse(response);
            let parsedResponse = {
                "moneda": response.result.source,
                "precio": response.result.value
            };
            res.send(parsedResponse);
        });  
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    }).end();
});

/**
 *  Retorna las primeras 3 monedas contra el dolar
 *  https://openexchangerates.org/api/currencies.json
 *  
 */
router.get('/exchangesTop', function(req, res, next) {
    res.send(config.exchangesTop);
});

let parsedCurrencyType = (currencyType) => {
    switch(currencyType){
        case 'dolar' : currencyType = "USD";
        break;
        case 'euro' : currencyType = "EUR";
        break;
        case 'real' : currencyType = "BRL";
        break;
    }
    return currencyType;
}
module.exports = router;
