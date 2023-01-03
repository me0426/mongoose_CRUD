const mongoose = require('mongoose');

const { User } = require('./users');

const express= require('express');

const app= express();

const bodyParser= require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect('mongodb://127.0.0.1:27017/mongoose', {useNewUrlParser: true});
mongoose.connection
.once('open',()=>console.log('CONNECTED'))
.on('error',(err)=>{
    console.log('Could not connect', err);
});
app.post('/users', (req,res)=>{

    const newUser= new User({
       firstName: req.body.fName,
       lastName:req.body.lName,
       isActive: req.body.isActive
    });

    newUser.save().then(savedata=>{
        res.send('user saved')
        console.log(savedata);
    }).catch(err=>{
        res.status(404).send('user not saved')
    })
});

app.get('/users', (req,res)=>{
    User.find({}).then(users=>{
        res.status(200).send(users)
    })
})
app.patch('/users/:id',(req,res)=>{
const id= req.params.id;
const firstName= req.body.firstName;

User.findByIdAndUpdate(id, {$set :{firstName:firstName}}, {new:true})
.then(savedata =>{
    res.send('user update by patch')
})
})

app.delete('/users/:id', (req, res)=>{
    User.findByIdAndRemove({_id: req.params.id}).then(userremoved=>{
        res.send(`user ${userremoved.fName} removed`)
    })
})
const port =4000||process.env.PORT;
app.listen(port,()=>{
    console.log(`listening to the port ${port}`);
});