var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

var Data = require('../data/logindata.js')

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/register', function(req, res, next) {
  res.render('registration');
});

router.get('/forgot', function(req, res, next) {
  res.render('forgot');
});



router.post('/register',async function(req,res,next){
  //res.send(req.body);

  try {
  const re = await Data.create(req.body);

    res.status(201).json({
      starus:'Success',
      data:re
    })
  } catch (error) {
    
  }
})

router.post('/login', async function(req,res,next){
  res.send(req.body.password);
  try {

    const email = req.body.email;
    const password = req.body.password;
    const useremail = await Data.findOne({email:email})

    if(useremail.password == password)
    {
      res.status(201).render("dashboard");
    }
    else
    {
      res.send("invilid Login Details..!")
    }
    
  } catch (error) {

    res.send("invilid Login Details..!")
  }
})

var otp = Math.random();
otp = otp*1000000;
otp = parseInt(otp);

router.post('/forgot',function(req,res,next){

  console.log(otp);

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'dkachhadiya116@gmail.com',
      pass: 'Dharmik@0137'
    }
  });
  
  var mailOptions = {
    from: 'dkachhadiya116@gmail.com',
    to: req.body.email,
    subject: 'Sending Email using Node.js',
    text: 'That was easy!',
    html:"<h1 style={{color:'blue'}}>Varification Code:-"+otp+"</h1>"
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  res.render("otp");

})

router.post('/otp',function(req,res,next){
  var txtotp = req.body.otp;

  if(txtotp == otp)
  {
    res.render("new_pass");
  }
  else
  {
    res.send("<h1>Invilid Login OTP..!<h1>")
  }
  // res.send(txtotp);
})

router.post('/new_pass', async function(req,res,next){
  //  res.send(req.body.new);
  //  res.send(req.body.confirm);

  var first = req.body.new;
  var confirm = req.body.confirm;

  try {
    if(first == confirm)
    {
      res.status(201).render("dashboard");
    }
    else
    {
      res.send("<h1>Invilid Password..!<h1>")
    }
  } catch (error) {
    
  }

  // // router.patch('/id',function(req,res,next){

  // // })
});

module.exports = router;
