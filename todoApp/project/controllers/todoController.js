let bodyParser = require('body-parser')
let nodemailer = require('nodemailer')
let data =[{item:'Delete Me!'}]
let urlencodedParser = bodyParser.urlencoded({extended:false})
module.exports =(app) =>{  
    
    app.get('/',(req,res) =>{
        res.render('landing')
        })

    app.get('/exuser',(req,res) =>{
        res.render('exuser')
        })

    app.get('/newuser',(req,res) =>{
        res.render('newuser')
        })

    app.post('/newuser', urlencodedParser, async function smg(req,res){
        let success = req.body.username + ', You are successfully registered.'
        let mail = req.body.email
        const msg = `
        <h1>Hello, ${success} </h1>
        <p>Now you can keep track of your task easily!</p>`
        // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: false, // true for 465, false for other ports
    auth: {
      user: '1694970av@gmail.com', // generated ethereal user
      pass: '9039970890' // generated ethereal password
    },
    tls:{
        rejectUnauthorized:false
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"To-Do App 👻" <1694970av@gmail.com>', // sender address
    to: mail, // list of receivers
    subject: "Thanks for registration ✔", // Subject line
    text: "", // plain text body
    html: msg // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        res.render('exuser',{succ:success})
        smg().catch(console.error);
    })
    

    app.post('/exuser', urlencodedParser,(req,res) =>{
            var names = (req.body.username)
            res.render('todo',{todo:data,names:names})
        })

    app.get('/todo',(req,res) =>{
    res.render('todo',{todo:data})
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
}