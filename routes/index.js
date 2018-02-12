/*
  default router
*/
const express = require('express');
const router = express.Router();

//homepage
router.get('/',function(req, res, next){
  res.render('index', {title: 'TeamTreehouse Profile', condition: false});
});


module.exports = router;
