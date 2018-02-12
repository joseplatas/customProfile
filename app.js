var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var app = express();

//handlebars template engine
app.engine('hbs', exphbs({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/' })
);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');

// parse incoming requests
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

// serve static files from /public
app.use('/static',express.static(path.join(__dirname, 'public')));

// routes setup
var mainRoutes = require('./routes');
var profileRoutes = require('./routes/profile');
app.use('/',mainRoutes);
app.use('/profile', profileRoutes);

//404 error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});
app.use(function(err, req, res, next) {
  res.locals.error = err;
  res.status(err.status);
  res.render('errors/404');
});

//server setup
app.listen(5000, function(){
  console.log("TeamTreehouse Porfolio Running in port 5000");
});
