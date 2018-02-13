/*
  profile router
*/
var express = require('express');
var profileRouter = express.Router();
var hbs = require('handlebars');
var request = require('request'); //ajax call

//profile page
//GET
profileRouter.get('/', function(req, res, next) {
  var username = req.query.username; //get username form post
  if(username){
    handleProfileRender(username,res);
  }else{
      res.render('index', {title: 'TeamTreehouse Profile', missingUser: true, });
  }

});
//POST
profileRouter.post('/', function(req, res, next) {
  var username = req.body.username; //get username form post
  if(username){
    handleProfileRender(username,res);
  }else{
      res.render('index', {title: 'TeamTreehouse Profile', missingUser: true, });
  }
});

//handle bars helper function
//NOTE: //build the html for the chart
hbs.registerHelper('chart_builder', function(points){
  //sort the points
  var arr_points = sortObject(points)
  var total_points = arr_points[1].value;

  var html ="";
  //container for POINT_LIST
  var points_list = "<div class='points'>";
  points_list += "<h2>Topics</h2>";
  points_list += '<ul>';
  //container for POINTS_CHART
  var points_chart = "<div class='points_chart'>";
  points_chart += "<h2>Points Chart</h2>";
  points_chart += "<div class='chart_container'>";
  var p = "";
  //buildin the content
  for (var i = 0; i < arr_points.length; i++) {
    p = arr_points[i];
    console.log(p);
    // skip courses with zero points
    if(p.value == 0 || p.key == "total"){
      continue;
    }
    points_list += "<li>"+p.key+": <span>"+p.value+"</span></li>";
    //bar
    var bar_class = p.key.toLowerCase().split(' ').join('');

    var bar_width = ((p.value /total_points) * 100).toFixed(2);
    points_chart += "<div title='"+p.key+"' style='width: "+bar_width+"%;' class='bar "+bar_class+"'>"+p.key+"</div>";
  }

  //POINT LIST
  points_list += "</ul>";
  points_list += '</div>';
  //POINTS_CHART
  points_chart += "</div>";
  points_chart += "</div>";


  html = points_list + points_chart;
  return html;
});
//string number seperated by commas
hbs.registerHelper('number_with_commas', function(x){
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
});

hbs.registerHelper('get_year',function(){
  var d = new Date();
  return d.getFullYear();
});

//NOTE: helper function for chart_builder
function sortObject(obj) {
    var arr = [];
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            arr.push({
                'key': prop,
                'value': obj[prop]
            });
        }
    }
    arr.sort(function(a, b) { return  b.value - a.value ; });
    return arr; // returns array
}


//Refactor functions: handle the rendering of the page
function handleProfileRender(username,res){
  //load profile
  loadProfile(username, function(error, response, body) {

    if(body == "Not found"){
      res.render('index', {
        title: 'Profile',
        username: username,
        noFoundUser: true
      });
    }else{
      var profile = JSON.parse(body);
      res.render('profile', {
        title: 'Profile',
        profile: profile
      });
    }

  });
}

//Ajax Call:get data of user
function loadProfile(username, callback) {
  username = encodeURI(username.toLowerCase().trim());//clean data
  var url = "https://teamtreehouse.com/"+username+".json";
  request(url, function(error, response, body) {
    //console.log('error:', error); // Print the error if one occurred
    //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    //console.log('body:', body); // Print the HTML for the Google homepage.
    callback(error, response, body);
  });
}

module.exports = profileRouter;
