const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

const app=express();
app.set('view engine', 'ejs');
const dbURI ="mongodb+srv://johnj:asdfghjkl@cluster0.eyljh7n.mongodb.net/n";
mongoose.set('strictQuery', true);
mongoose.connect(process.env.DATABASE_URL ||dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => console.log("connected"))
  .catch(err => console.log(err));

app.listen(process.env.PORT || 3030);

app.use(express.urlencoded({ extended: true }));
app.use( express.static( "public" ) );
app.get('/',(req,res)=>
{
  res.redirect('/view')
})
app.get('/create', (req, res) => {
    res.render('form');

  });
  app.get('/edit/:id', (req, res) => {      //more to do
    const id=req.params.id;
    Blog.findById(id)
    .then(result => {
       
      res.render('edit', { blog: result });
    })
    .catch(err => {
      console.log(err);
    });
  });
  app.post('/b', (req, res) => {
     
    const blog = new Blog(req.body);
  
    blog.save()
      .then(result => {
       res.render('home');
      })
      .catch(err => {
        console.log(err);
      });
  });
  app.get('/view/:id',(req,res)=>{
    const id=req.params.id;
    
    
    Blog.findById(id)
    .then(result => {
       result.body=result.body.replaceAll("\n","<br>");
      res.render('a', { blog: result });
    })
    .catch(err => {
      console.log(err);
    });
  });
app.post('/view/:id',(req,res)=>{
  const id=req.params.id;
  
  
    Blog.findOneAndUpdate({_id:id},req.body)
    .then(result=>{
      res.redirect('/view/'+id);
    })
    .catch(err=>{
      console.log(err);
    })

})
  app.get('/view',(req,res)=>{
    
        Blog.find()
        .then(result => {
          //console.log(result);
          res.render('d', { blog: result });
        })
        .catch(err => {
          console.log(err);
        });
      
  })
 
  app.get('/b/:id',(req,res)=>
  {const id=req.params.id;
    
    Blog.findByIdAndDelete(id)
    .then(result=>{
      res.redirect('/');
    })
    .catch(err=>{
      console.log(err);
    })

  })
