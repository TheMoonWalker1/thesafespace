var express = require('express')
var app = express()
var hbs = require('hbs')
app.set('view engine', 'hbs')
app.use(express.static('static_files'))

var mysql = require('mysql')

var sql_params = {
  connectionLimit : 10,
  user            : process.env.DIRECTOR_DATABASE_USERNAME,
  password        : process.env.DIRECTOR_DATABASE_PASSWORD,
  host            : process.env.DIRECTOR_DATABASE_HOST,
  port            : process.env.DIRECTOR_DATABASE_PORT,
  database        : process.env.DIRECTOR_DATABASE_NAME
}

app.locals.pool  = mysql.createPool(sql_params);

const compliments = require('./routes/compliments.js')
app.use(compliments);

app.post("/ml_model", (req, res) => {
    res.json([{
        image_recieved: req.body.image
    }])
})

var listener = app.listen(process.env.PORT || 8080, process.env.HOST || "0.0.0.0", function() {
    console.log("Express server started")
})