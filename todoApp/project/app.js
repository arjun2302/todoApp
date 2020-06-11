let express = require('express')
//let todoController = require('./controllers/todoController')//add controllers
let bodyParser = require('body-parser')
let nodemailer = require('nodemailer')
let mongoose = require('mongoose')

let data =[{item:'Delete Me!'}]
let urlencodedParser = bodyParser.urlencoded({extended:false})
let app = express()

// to set views
app.set('view engine','ejs')

//static files 
app.use(express.static('./public'))
app.use(bodyParser.json())

// connect to database
mongoose.connect('mongodb://localhost:27017/userinfo', {useNewUrlParser: true, useUnifiedTopology: true});
//database schema
const todoSchema = new mongoose.Schema({
    name:String,
    email:String,
    things: [mongoose.Schema.Types.Mixed]
})
//defining a model
const items = mongoose.model('items', todoSchema); 

app.get('/',(req,res) =>{
    res.render('landing')
    })

app.get('/exuser',(req,res) =>{
    res.render('exuser')
    })

app.get('/newuser',(req,res) =>{
    res.render('newuser')
    })

app.post('/newuser', urlencodedParser, (req,res) =>{
    let uname = req.body.username
    let succ = uname + '! You are succesfully registered'
    let mail = req.body.email
    let msg = `<h2>Thanks ${succ} </h2>
    <br>
    <p>now you can keep track of your todo's easily</p>`
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'gotechbox@gmail.com', // generated ethereal user
          pass: '9039970890' // generated ethereal password
        }
      });
    
      // send mail with defined transport object
      let mailOptions = {
        from: '"TO-DO App👻" <gotechbox@gmail.com>', // sender address
        to: mail, // list of receivers
        subject: "Aapka Swagat Hai! ✔", // Subject line
        text: "Hello world?", // plain text body
        html: msg // html body
      };
      transporter.sendMail(mailOptions,(err,info)=>{
          if(err){
              console.log(err)
          }
      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

      //add username and email into database 
      var itemOne = new items({
      name: uname,
      email: mail
    }).save((err) =>{
        if(err) throw err
        console.log('saved succesfully')
    })
    res.render('gateway',{succ:succ})
      })
})

app.post('/exuser', urlencodedParser,(req,res) =>{
        var names = req.body.username
        //var checkName= items.find({name:req.body.username})
        //if(names===checkName){
           // items.find({name:checkName},{things:1} ,(err,data) =>{
            //if(err) throw err
            res.render('todo',{todo:data,names:names})
            //})
        //}
})

app.post('/gateway', urlencodedParser,(req,res) =>{
        names = req.body.username
        res.render('todo',{todo:data, names:names})
    })

app.post('/todo', urlencodedParser,(req,res) =>{
    data.push(req.body)
    res.json(data)
})

app.delete('/todo/:item',(req,res) =>{
    data = data.filter((todo) =>{
        return todo.item.replace(/ /g, "-") !== req.params.item
    })
    res.json(data)
})

//runserver
app.listen(3000,() =>{
    console.log('Server is running at http://127.0.0.1:3000/')
})