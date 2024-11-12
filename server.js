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
const CompanyInfo = require('./models/companyInfo'); // Uncomment 2 
const CompanyRecord = require('./models/companyRecord')
const ApplicationDetails = require('./models/applicationStatus')
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
// Creating a route to handle in the company Info 
app.post('/addCompanyInfo',async(req,res)=>{
    // adding in directly to the schema 

    const newCompanyDetails = new CompanyInfo(req.body);
    const companyEmail = req.body.companyEmail;
    await newCompanyDetails.save();

    console.log("here check>>>>>")
    const newCompanyNowOpenStudents =  new CompanyRecord({companyEmail});
    await newCompanyNowOpenStudents.save();
    res.render('viewCompanies',{newCompanyDetails})

// Now here we will create that company apply system 
        // const newRecord = new companyRecord({companyEmail: emailIdCompanyCarrier});
        // await newRecord.save();

    // Now the company details are succesfully registered 


})



app.get('/editCompanyDetails',async(req,res)=>{

    // const newCompanyDetails = new CompanyInfo(req.body);
    const updatedCompanyDetail = await CompanyInfo.findOne({companyEmail: emailIdCompanyCarrier });
    console.log(updatedCompanyDetail)
    res.render('editCompany',{updatedCompanyDetail})

})

// View company page // Uncomment 3 
// app.get('/viewCompanyInfo',async(req,res)=>{

//     const companyinfo = await CompanyInfo.findOne(email);

//     res.render('viewCompanyInfo',{companyinfo});
// })


// Uncomment 6 
app.post('/updateCompanyInfo', async (req, res) => {

    const updatedData = req.body;  
    
      // Find the user by email and update it with the new data
      const newCompanyDetails = await CompanyInfo.findOneAndUpdate({ companyEmail: emailIdCompanyCarrier }, updatedData, { new: true });

      // Send back the updated user data
    //   return res.status(200).json({ message: 'Company updated successfully', companyData });
    res.render('viewCompanies',{newCompanyDetails})
    }
  );



  // student is clicking in the apply button 
  app.get('/applyToCompany/:id',async(req,res)=>{
    // console.log(req.params.id);

    // const companyEmailFromButton = req.params.id;
    // console.log(companyEmailFromButton)


    // // const companyDetails = await CompanyInfo.findOne({companyEmail: companyEmailFromButton})
    // const companyRecord = await CompanyRecord.findOne({companyEmail: companyEmailFromButton});

    // const companyEmailExtract = companyRecord.companyEmail;

    console.log(req.params.id);

    const companyEmailFromButton = req.params.id;
    console.log(companyEmailFromButton);

 
        // finding the company record 
        const updatedCompanyRecord = await CompanyRecord.findOneAndUpdate(
            { companyEmail: companyEmailFromButton },
            { $push: { registeredStudents: emailIdCarrier } },
            { new: true } // This option returns the updated document
        );
        



        const newApplicationStatus = await ApplicationDetails({
            studentEmail: emailIdCarrier,
            companyEmail: companyEmailFromButton,
            applicationStatus: 'pending(Applied)'

        })
        await newApplicationStatus.save();

        // const allApplicationStatus = await ApplicationDetails.find({});
        const pendingApplications = await ApplicationDetails.find({ applicationStatus: "pending(Applied)" });

        // Extract the companyEmail from each record into a new array
        const pendingCompanyEmails = pendingApplications.map(record => record.companyEmail);


        // same for the rejected and shortlisted 
        const shortListedApplications =  await ApplicationDetails.find({ applicationStatus: "ShortListed" });
        const ShortListedCompanyEmails = shortListedApplications.map(record => record.companyEmail);


        // Rejected 
        const rejectedApplications = await ApplicationDetails.find({ applicationStatus: "Rejected" });
        const rejectedCompanyEmails = rejectedApplications.map(record => record.companyEmail);

        console.log(pendingApplications);        // Shows the filtered records with "pending(Applied)"
        console.log(pendingCompanyEmails);       // Shows an array of companyEmail with "pending(Applied)"


        const companies = await CompanyInfo.find({});

        // console.log("all applcationsStatus")
        // console.log(allApplicationStatus.)

        res.render('appliedStatus',{companies,pendingCompanyEmails,emailIdCompanyCarrier,rejectedCompanyEmails,ShortListedCompanyEmails})



         

      
  

    

  })


  app.get('/viewCompaniesFromStudent',async(req,res)=>{
    // getting all the companies 
    // const companies = await Company.find({});
    // console.log("Company Details:", companies);
    const companies = await CompanyInfo.find({});
    // console.log(companyInfo)
    res.render('companyList',{companies})

  })

// Uncomment 5 
// Rooute for the student to register for a particular company 

app.use('*',(req,res)=>{
res.send("All unspecified req here please")

})


  
  

// Setting in the server port 
app.listen(3000,()=>{
    console.log("Placement cell Server running on port 3000 ")
})