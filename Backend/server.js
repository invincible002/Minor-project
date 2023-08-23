const nodemailer = require("nodemailer");
const express = require('express');
const { translate } = require('free-translate');
const app = express();
const cors = require('cors')

app.use(
    cors({
        origin : "http://localhost:3000"
    })
)


app.use(express.json()) // jo bhi incoming request aa rahi hai yeh line usko json format me change kregi 


// app.get('/', (req,res)=>{
//     res.send('this is a mailing server');
// })

// this is for language change

app.post('/lang', (req,res)=>{
    
    translate(`${req.body.sourceText}`, { from: 'en', to: 'hi' }).then((translatedText)=>{
        //console.log(translatedText); 
        res.send(translatedText)
    })
    
    //  res.send("translatedText")
})




// this is for sending email
app.get('/sendemail', async(req,res)=>{

    let testAccount = await nodemailer.createTestAccount();

    // connect with the smtp server
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
            user: 'allie.heidenreich1@ethereal.email',
            pass: 'ssjBQUN3Y3pAX8QCXa'
        },
      });

    let info = await transporter.sendMail({
            from: '"Harkirat 👻" <harkirat@gmail.com>', // sender address
            to: "bhumika@gmail.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
          });

      res.json(info);
})

const start = () =>{
    try {
        app.listen(5000, ()=>{
            console.log('server is runing on port 5000');
        })
    } catch (error) {
        console.log(error);
    }
}

start();