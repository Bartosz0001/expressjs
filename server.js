const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const fileUpload = require('express-fileupload');

const app = express();

app.engine('hbs', hbs());
app.set('view engine', '.hbs');
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload());

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

app.post('/contact/send-message', (req, res) => {

  const { author, sender, title, message } = req.body;

  if(author && sender && title && message && req.files) {
    const photo = req.files.image.name;
    req.files.image.mv(`./public/${photo}`, function(err) {
      if (err) return res.status(500).send(err);
      else {
        res.render('contact', {isSent: true, img: photo});
      }
    });
  }
  else {
    res.render('contact', {isError: true});
  }

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