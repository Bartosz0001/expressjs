const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');

const app = express();

app.engine('hbs', hbs());
app.set('view engine', '.hbs');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/home', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about', {layout: 'dark'});
});

app.get('/info', (req, res) => {
  res.render('info');
});

app.get('/history', (req, res) => {
  res.render('history');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/hello/:name', (req, res) => {
  res.render('hello', { name: req.params.name });
});

app.use('/user', (req, res, next) => {
  res.render('forbidden');
});

app.use(express.static(path.join(__dirname + '/public')));

app.use((req, res) => {
    res.status(404).render('not-found');
  });

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});