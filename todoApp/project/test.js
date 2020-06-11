db.items.insertMany([{name:'samsungA30',price:15000,ratings:4.5},{name:'iphoneX',price:100000,ratings:4.9},{name:'iphoneXr',price:45000,ratings:3.5}])
db.items.find({price:{$gte:45000},ratings:{$lt:4}})
db.items.find({$or:[{price:{$gt:35000}},{ratings:{$gt:3.5}}]})
db.items.updateOne({name:'vermarjun'},{$set:{name:'arjun24x6',email:'arjunverma098@gmail.com'}})
app.get('/todo',(req,res) =>{
    console.log(req.url)
res.render('todo',{todo:data})
})