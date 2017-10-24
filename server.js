const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
const app = express();

// middleware lets us configure how our express application works
// app.use will register the middleware
hbs.registerPartials(__dirname + '/views/partials/')
app.set('view engine', 'hbs'); // we tell express that we want to use hbs as our view engine

app.use((req, res, next) => {
  var now = new Date().toString();
  const log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});

// This stops everything after it from executing
// Also because we don't have the next() function
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public')); // this allows us to access the help html page

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

// Get Homepage
app.get('/', (req, res) => {
  // request stores information about request coming in
  // response lets us respond to request however we want

  // send allows us to respond to the request
  // res.send("<h1>Hello Express!</h1>");
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website'
  })
});

app.get('/about', (req, res) => {
  // res.send('About Page');
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: "Unable to fulfill this request"
  });
})

// allows us to listen to the server
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
