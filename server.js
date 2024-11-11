// Requiring in the files
const express = require('express')
const app = express();
const ejsMate = require('ejs-mate')
const path = require('path')
const axios = require('axios')
const cors = require("cors");
const connectDB = require("./utils/connectionDB")
const bodyParser = require('body-parser');


// Including in the userModel in it here 
const User = require('./models/userDetails')
const Company = require('./models/companyDetails')
const StudentDetails = require('./models/studentDetails')
// const CompanyInfo = require('./models/companyInfo'); // Uncomment 2 
// const CompanRecord = require('./models/companyRecord) // Uncomment 4 


//My unique id carrier jugaad 
let emailIdCarrier = '';
let emailIdCompanyCarrier = '';

// Middlewares here please  
app.engine('ejs',ejsMate)
app.use(express.json())
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))
app.use(express.static(path.join(__dirname,'public')))
app.use(cors({ origin: true }));
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json()); // used to send in and parse the json format 


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

// Route to handle the form data which is coming when we are registering the students 
app.post('/login/student',async(req,res)=>{
    // res.send("Idhar hit ho gya h test!!!!")
    // the above code is for testing ki route hit hora h ki nhi



    const{computerCode, email} = req.body;

    emailIdCarrier= req.body.email;
    console.log(emailIdCarrier);
    
    const user = await User.findOne({computerCode, email });
    // userIdCarrier = user._id;
    // console.log("The user id is ");
    // console.log(userIdCarrier)

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if(req.body.password!==user.password){
        return res.status(400).json({message: 'Wrong password'});
    }

    // yaha pe present h matlab ki auth and password verify ho gye h so 
    // redirect krdo studentProfile k upar 
    res.render('studentProfile',{user})
})


app.post('/studentProfile',async(req,res)=>{
    console.log(req.body);

    const student = new StudentDetails(req.body);
    await student.save();

//   res.send("Saving of the user is successfull")


    res.send("Saved the student details successfully")
})

app.get('/view/studentProfile',async(req,res)=>{

    const student = await StudentDetails.findOne({email : emailIdCarrier});
    console.log("here bud")
    // console.log(userData);
    res.render('viewStudentProfile',{student})


    // res.render('viewStudentProfile')
})


// We will render in all the companies here in the Company List section under the student login 
app.get('/companyList',(req,res)=>{
    // Here we will render in all the companies 
    res.render('companyList')

})


// The one time use code for creating in the users and ids
  
// console.log(req.body)
// const { computerCode, email, password } = req.body;

// const user = new User({
//     computerCode,
//     email,
//     password
//   });
//   await user.save();
//   res.send("Saving of the user is successfull")




// console.log(req.body)
// const { adminUsername, email, password } = req.body;

// const company = new Company({
//     adminUsername,
//     email,
//     password
//   });
//   await company.save();
//   res.send("Saving of the company is successfull")





// Route3
app.get('/loginCompany',(req,res)=>{
    // res.send("Home page");
    res.render('registerCompany.ejs')
})

app.post('/login/company',async(req,res)=>{

    // res.send("Idhar hit ho gya h test!!!!")
    // the above code is for testing ki route hit hora h ki nhi

    const{adminUsername, email} = req.body;


    
    const company = await Company.findOne({adminUsername, email });

    emailIdCompanyCarrier = req.body.email;
    console.log(emailIdCompanyCarrier)
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    if(req.body.password!==company.password){
        return res.status(400).json({message: 'Wrong password'});
    }

    // yaha pe present h matlab ki auth and password verify ho gye h so 
    // redirect krdo studentProfile k upar 
    // res.send('hahahacom')
    res.render('addCompany.ejs')
})


// Uncomment 1 
// // Creating a route to handle in the company Info 
// app.post('/addCompanyInfo',async(req,res)){
//     // adding in directly to the schema 

//     const newCompanyDetails = new CompanyInfo(req.body);
//     await newCompanyDetails.save();

// Now here we will create that company apply system 
        // const newRecord = new companyRecord({companyEmail: emailIdCompanyCarrier});

//     // Now the company details are succesfully registered 


// }

// View company page // Uncomment 3 
// app.get('/viewCompanyInfo',async(req,res)=>{

//     const companyinfo = await CompanyInfo.findOne(email);

//     res.render('viewCompanyInfo',{companyinfo});
// })



// Uncomment 5 
// Rooute for the student to register for a particular company 

app.use('*',(req,res)=>{
res.send("All unspecified req here please")

})
  

// Setting in the server port 
app.listen(3000,()=>{
    console.log("Placement cell Server running on port 3000 ")
})