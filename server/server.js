const express= require('express');
const app= express();
const mongoose=require('mongoose');
const cors = require('cors');
const path= require('path');
const user=require('./user/user');
const router = express.Router();
const url=`mongodb://${user.name}:${user.password}@ds113815.mlab.com:13815/new_database`
const port = process.env.PORT || 5000

app.use(cors());
app.use(express.json());

mongoose.connect(url,{
    useNewUrlParser:true
})
.then(()=>console.log('mlab is running'))
.catch((err)=>console.log(err.message))

const Schema=mongoose.Schema

const TodosSchema= new Schema({
    todo:{
        type:String,
        required:true
    },
    
})

const Todos = mongoose.model('todos', TodosSchema);

let todoArr=[];


app.get('/',(req,res)=>{
    Todos.find((err,result)=>{
        if(err){return err} ;
        todoArr=result;
        res.send(todoArr);
    })
   
})

app.post('/',(req,res) =>{
    const {todo}= req.body;
    const newTodo= new Todos({todo})

    newTodo.save((err,result)=>{
        if(err){return err} ;
         res.send(result);  
    })
    

})

 
app.put('/:id',(req,res)=>{
    Todos.updateOne({_id:req.params.id},req.body,(err,result)=>{
        if(err){return err};
        res.send(result)
    })
    
})

app.delete('/:id',(req,res)=>{
    Todos.deleteOne({_id:req.params.id},(err,result)=>{
        if(err){return err} 
        res.send(result)
    })
})
app.delete('/deleteAll',(req,res)=>{
    Todos.remove((err,result)=>{
        if(err){return err} 
        res.send(result)
    })
})


// app.use('/',router);


    
app.listen((port),()=>console.log('server is running on port '+ port))