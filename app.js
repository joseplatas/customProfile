var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var app = express();

//homepage
app.get('/',function(req, res, next){
  res.render('index', {title: 'Cool hug', condition: false});
  // res.send("hello world");
});

//handlebars engine
app.engine('hbs', exphbs({extname: 'hbs', defaultLayout: 'main', layoutDir: __dirname + '/views/layouts/'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// serve static files from /public
app.use('/static',express.static(path.join(__dirname, 'public')));

//404 error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});
app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  res.render('errors/404');
});


//server setup
app.listen(5000, function(){
  console.log("TeamTreehouse Porfolio Running in port 5000");
});
