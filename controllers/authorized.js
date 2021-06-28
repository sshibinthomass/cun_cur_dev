const { json } = require('body-parser');
const { response } = require('express');
const request = require('request');
const user = require('../models/User');
exports.getHome=(req,res,next)=>{
   if(!req.session.loggedin){
      res.redirect('/');
   }
   else{
   const email = req.session.email;
   const date = new Date().toISOString().slice(0,10);
   const from = 'USD';
   const to = 'INR';
   const amt =1;
   var fdt = new Date(date.slice(0,4),date.slice(5,7)-1,date.slice(8,10));
   fdt.setDate(fdt.getDate() - 2 );
    const fromDate = new Date(fdt).toISOString().slice(0, 10);
    var tdt = new Date(date.slice(0,4),date.slice(5,7)-1,date.slice(8,10));
    tdt.setDate(tdt.getDate() + 4 );
    const toDate = new Date(tdt).toISOString().slice(0,10);
   request({
       url:'https://api.exchangerate.host/timeseries?start_date='+fromDate+'&end_date='+toDate+'&base='+from+'&symbols='+to+'&amount='+amt,
       json: true
     },(err,response,body)=>{
        getData(body);
     }
     );
     const getData = (cb)=>{
       const data =[];
       data.push(date);
       data.push(from);
       data.push(to);
       data.push(amt);
       const dates =[];
       const rates = [];
       for(let i in cb.rates)
       {
           dates.push(i);
           rates.push(cb.rates[i][to]);
       }

       data.push(dates);
       data.push(rates);
       data.push(cb.rates[date][to]);
       res.setHeader("Cache-control", "no-store, must-revalidate, private,no-cache");
      res.setHeader("Pragma", "no-cache");
      res.setHeader("Expires", "0");
       res.render('home',{title:'Home',userType:'authorized',from:data[1],to:data[2],froVal:data[3],toVal:data[6],date:data[0],rates:data[5],dates:data[4],email:email});
       
       }
      }
}
exports.postHome=(req,res,next)=>{
   if(!req.session.loggedin){
      res.redirect('/');
   }
   else{
   const email = req.session.email;
   const from =req.body['from'];
   const to = req.body['to'];
   const amt = req.body['val'];
   const date = req.body['date'];
   var fdt = new Date(date.slice(0,4),date.slice(5,7)-1,date.slice(8,10));
   fdt.setDate(fdt.getDate() - 2 );
    const fromDate = new Date(fdt).toISOString().slice(0, 10);
    var tdt = new Date(date.slice(0,4),date.slice(5,7)-1,date.slice(8,10));
    tdt.setDate(tdt.getDate() + 4 );
    const toDate = new Date(tdt).toISOString().slice(0,10);
   request({
       url:'https://api.exchangerate.host/timeseries?start_date='+fromDate+'&end_date='+toDate+'&base='+from+'&symbols='+to+'&amount='+amt,
       json: true
     },(err,response,body)=>{
        getData(body);
     }
     );
     const getData = (cb)=>{
       const data =[];
       data.push(date);
       data.push(from);
       data.push(to);
       data.push(amt);
       const dates =[];
       const rates = [];
       for(let i in cb.rates)
       {
           dates.push(i);
           rates.push(cb.rates[i][to]);
       }

       data.push(dates);
       data.push(rates);
       data.push(cb.rates[date][to]);
       res.render('home',{title:'Home',userType:'authorized',from:data[1],to:data[2],froVal:data[3],toVal:data[6],date:data[0],rates:data[5],dates:data[4],email:email
      });
    }
   }
}
exports.logout=(req,res,next)=>{
   if(req.session.loggedin)
   {
      res.setHeader("Cache-control", "no-store, must-revalidate, private,no-cache");
      res.setHeader("Pragma", "no-cache");
      res.setHeader("Expires", "0");
   req.session.destroy((err)=>{
      if(err)
      {
       console.log(err);
      }
      res.redirect('/');
   });
   }
   else{
      res.redirect('/');
   }
}
exports.saved=(req,res,next)=>{
   if(!req.session.loggedin){
      res.redirect('/');
   }
   else{
      const email = req.session.email;
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
       res.setHeader("Cache-control", "no-store, must-revalidate, private,no-cache");
      res.setHeader("Pragma", "no-cache");
      res.setHeader("Expires", "0");
       res.render('authorized/saved',{title:'Saved searches',data:data,userType:'authorized',email:email});
    }
   }
}