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



app.get('/',(req,res)=>{
    // res.send("Home page");
    res.render('Homepage.ejs')
})

app.use('*',(req,res)=>{
res.send("All unspecified req here please")

})
  


app.listen(3000,()=>{
    console.log("Placement cell Server running on port 3000 ")
})