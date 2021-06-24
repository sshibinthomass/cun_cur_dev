const { json } = require('body-parser');
const user = require('../models/User');

exports.postSignUp=(req,res,next)=>{
    const fname = req.body['fName'];
    const lname = req.body['lName'];
    const email = req.body['email'];
    const cNum = req.body['cNum'];
    const conPass = req.body['conPass'];
    const oriPass = req.body['oriPass'];
    const User = new user({
        fname:fname,
        lname:lname,
        email:email,
        contact: cNum,
        password: conPass
    })
    User
    .save()  
    .then(result =>{console.log('Account created');
        res.redirect('/authorized/saved')})
    .catch(err=>{
        console.log(err);
    }) 
}
exports.getSignUp=(req,res,next)=>{
    res.render('unauthorized/signup',{userType:'unauthorized'});
}
exports.getLogin=(req,res,next)=>{
    res.render('unauthorized/login',{userType:'unauthorized'});
}
exports.getHome=(req,res,next)=>{
    res.render('home',{userType:'unauthorized'});
}