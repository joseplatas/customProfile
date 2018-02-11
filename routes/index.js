/*
  default router
*/
const express = require('express');
const router = express.Router();

//homepage
router.get('/',function(req, res, next){
  res.render('index', {title: 'Homepage', condition: false});
});


module.exports = router;
