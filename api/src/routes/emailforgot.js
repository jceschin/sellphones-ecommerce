const server = require("express").Router();
const nodemailer = require("nodemailer");
const { User } = require("../db.js");
const crypto = require('crypto');


server.post("/forgotPassword", (req, res) => {
  if(req.body.email === ''){
    res.status(400).send('email required');
  }
  console.log('entro');
  const email = req.body.email;
  User.findOne({ where: { email } }).
  then((user)=> {
    console.log(user);
    if (user === null){
      res.status(403).send('email not in db');
    }else {
      const token = crypto.randomBytes(20).toString('hex');
      user.update({
        resetPasswordToken: token,
        resetPasswordExpires: Date.now() + 360000,
      });

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'ecommercefinal6@gmail.com',
          pass: 'Holahenry123',
        },
      });

      const mailOptions = {
        from:'ecommercefinal6@gmail.com',
        to: `${user.email}`,
        subject: 'Link to Reset Password',
        text:
        'Click on the link to reset the password \n\n'
        + `/reset?${token}\n\n`,

      };
      console.log('sending mail');

      transporter.sendMail(mailOptions, (err,response)=>{
        if(err){
          console.error('there was an error:',err);
        } else{
          console.log('here is the res',response);
          res.status(200).json('recovery email sent');
        }
      })
    }
  })

});

server.post('/reset',(req,res)=>{
  console.log(req.body.token);
   User.findOne({
     where: {
       resetPasswordToken : req.body.token
     },
   }).then(user =>{
     if(user == null){
       console.log('invalid-expired');
       res.json('invalid-expired');
     }else{
       console.log('okey');
       res.status(200).send({
         id : user.id,
         message: 'linkok'
       });
     }
   })
})

module.exports = server;
