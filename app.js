const express = require('express');
const request = require('request');

const port = process.env.PORT || 8080;

var app = express();

const apiKey = 'd83784ed16c7685325cf63998023793c';
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs')

app.use(express.static(__dirname + '/public'));

app.get('/', (request, response) => {
    response.send('<h1>Welcome Bakr!</h1>' +
        '<a href="/about.html">Image</a>' +
        '<p></p>' +
        '<a href="/weather">Weather</a>');
});

/*app.get('/weather', (request, response) => {
    response.send(weather);
});*/

app.get('/weather', function (req, res) {
  res.render('index', {weather: null, error: null});
})

app.post('/weather', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
  //test code
  //res.render('index');
  //console.log(req.body.city);
    request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        res.render('index', {weather: weatherText, error: null});
      }
    }
  });
})

app.listen(port, () => {
    console.log(`Server is up on the port ${port}`);
});