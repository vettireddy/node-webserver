const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
  return  new Date().getFullYear();
  // return 'test';
});
hbs.registerHelper('screamIt', (msg) => {
  return msg.toUpperCase();
})
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
  res.render('maintenance.hbs');
  next();
})
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err)=>{
    if (err) {
      console.log('Unable to append to the server.log');
    }
  });
  next();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    title: 'Home Page',
    welcomeMessage: 'welcome venky'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    title: 'About Page'
  });
});
app.listen(port, () => {
  console.log(`server is running at port: ${port}`);
})