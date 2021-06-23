const express = require('express');
const router = express.Router();

router.get('/',(req,res,next)=>{
    res.render('home',{userType:'unauthorized'});
})

router.get('/login',(req,res,next)=>{
    res.render('unauthorized/login',{userType:'unauthorized'});
});
router.get('/signup',(req,res,next)=>{
    res.render('unauthorized/signup',{userType:'unauthorized'});
});

module.exports = router;