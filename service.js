var express = require("express");
var cors = require("cors");
var app = express();

let rabbitMQ = require('./rabbitMQ');
let stockData = require('./stockData');


app.use(cors({
    exposedHeaders: ['Content-Length', 'Content-Type'],
}));

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.get("/getstockData", function (req, res) {
    //res.send(stockData.data);
    res.send(stockData.data.sort((a, b) => a.name.localeCompare(b.name)))
})


app.post('/updatestockData', async (req, res) => {
    try {
        var updateStock = req.body;              
       
        findAndUpdateStock(updateStock);
      
        console.log("StockData:"+JSON.stringify(stockData.data));
        console.log("Stock:"+JSON.stringify(updateStock));

        rabbitMQ("updateStock", JSON.stringify(updateStock));

        return res.status(200).json({ status: "succesfully update" });
    } catch (error) {
        res.status(500).send(error);
    }
})

function findAndUpdateStock(updateStock)
{
    findStockIndex = stockData.data.findIndex(o => o.name === updateStock.name);
    stockData.data.splice(findStockIndex,1);
    stockData.data.push(updateStock);
}

app.listen(9480);