const { json } = require('body-parser');
const request = require('request');
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
        res.redirect('/unauthorized/login')})
    .catch(err=>{
        if(err.code === 11000)
        {
            res.render('unauthorized/signup',{duplicate:true,userType:'unauthorized'})
        }
        console.log(err);
    }) 
}
exports.getSignUp=(req,res,next)=>{
    res.render('unauthorized/signup',{userType:'unauthorized',duplicate:false});
}
exports.getLogin=(req,res,next)=>{
    res.render('unauthorized/login',{userType:'unauthorized'});
}
exports.getHome=(req,res,next)=>{
    request({
        url:"https://api.exchangerate.host/convert?from=USD&to=INR&amount=1",
        json: true
      },(err,response,body)=>{
         getData(body);
      }
      );
      const getData = (cb)=>{
        const data=[];
        data.push(cb.query);
        data.push(cb.result);
        data.push(cb.date);
        console.log(data);
        res.render('home',{userType:'unauthorized',from:data[0].from,to:data[0].to,froVal:data[0].amount,toVal:data[1],date:data[2]});
     }
    
}
exports.postHome=(req,res,next)=>{
    const from =req.body['from'];
    const to = req.body['to'];
    const amt = req.body['val'];
    const date =req.body['date'];
    console.log(date);
    request({
        url:'https://api.exchangerate.host/convert?from='+from+'&to='+to+'&amount='+amt+'&date='+date,
        json: true
      },(err,response,body)=>{
         getData(body);
      }
      );
      const getData = (cb)=>{
        const data=[];
        data.push(cb.query);
        data.push(cb.result);
        data.push(cb.date);
        console.log(data);
        res.render('home',{userType:'unauthorized',from:data[0].from,to:data[0].to,froVal:data[0].amount,toVal:data[1],date:data[2]});
     }
}