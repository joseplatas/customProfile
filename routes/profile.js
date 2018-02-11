/*
  profile router
*/
const express = require('express');
const router = express.Router();

//profile page
router.get('/',function (req, res, next){
    res.render('profile', {title: 'Profile', condition: false});
});



module.exports = router;
