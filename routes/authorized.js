const express = require('express');
const router = express.Router();
const path = require('path');
const request = require('request');
const authorizedControllers = require('../controllers/authorized');
router.get('/saved',(req,res,next)=>{
    request({
        url:"https://api.exchangerate.host/convert?from=USD&to=INR&date=2021-06-21&amount=20",
        json: true
      },(err,response,body)=>{
         getData(body);
      }
      );
      const getData = (cb)=>{
        const data=[];
        data.push(cb.query);
        data.push(cb.date);
        data.push(cb.result);
        console.log(data);
        res.render('authorized/saved',{data:data,userType:'authorized'});
     }
});

router.get('/',authorizedControllers.getHome);
router.post('/',authorizedControllers.postHome);
module.exports = router;