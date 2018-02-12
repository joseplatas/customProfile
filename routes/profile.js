/*
  profile router
*/
var express = require('express');
var profileRouter = express.Router();
var request = require('request'); //ajax call

//profile page
//GET
profileRouter.get('/', function(req, res, next) {
  var username = req.query.username; //get username form post
  handleProfileRender(username,res);
});
//POST
profileRouter.post('/', function(req, res, next) {
  var username = req.body.username; //get username form post
  handleProfileRender(username,res);
});
//handle the rending of the page
function handleProfileRender(username,res){
  //load profile
  loadProfile(username, function(error, response, body) {

    if(body == "Not found"){
      res.render('errors/profileNotFound', {
        title: 'Profile',
        username: username,
        condition: false
      });
    }else{
      var profile = JSON.parse(body);
      res.render('profile', {
        title: 'Profile',
        profile: profile,
        condition: false
      });
    }

  });
}

//fuction to get data for user
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
