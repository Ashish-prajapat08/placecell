// Requiring in the files
const express = require('express')
const app = express();
const ejsMate = require('ejs-mate')
const path = require('path')
const axios = require('axios')
const cors = require("cors");



// Middlewares here please  
app.engine('ejs',ejsMate)
app.use(express.json())
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))
app.use(express.static(path.join(__dirname,'public')))
app.use(cors({ origin: true }));
app.use(express.urlencoded({extended:true}));


// Route 1
app.get('/',(req,res)=>{
    // res.send("Home page");
    res.render('Homepage.ejs')
})



// Route 2
app.get('/loginStudent',(req,res)=>{
    // res.send("Home page");
    res.render('registerStudent.ejs')
})

// Route3
app.get('/loginCompany',(req,res)=>{
    // res.send("Home page");
    res.render('registerCompany.ejs')
})


app.use('*',(req,res)=>{
res.send("All unspecified req here please")

})
  

// Setting in the server port 
app.listen(3000,()=>{
    console.log("Placement cell Server running on port 3000 ")
})